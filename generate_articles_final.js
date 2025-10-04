#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read the enhanced working template (use the master template)
const templatePath = '_articles/master-template.html';
const template = fs.readFileSync(templatePath, 'utf8');

// Directory containing markdown articles
const articlesDir = '_articles';

// Function to replace template content with actual article data
function replaceTemplateContent(templateHtml, frontMatter, htmlContent) {
  // Start with the template
  let articleHtml = templateHtml;
  
  // 1. Update the <title> tag
  articleHtml = articleHtml.replace(
    /<title>.*<\/title>/,
    `<title>${frontMatter.title} - Adeyemi Aina</title>`
  );
  
  // 2. Update meta description
  articleHtml = articleHtml.replace(
    /content="Essential AI features[^"]*"/,
    `content="${frontMatter.excerpt || 'AI & Technology insights and tutorials.'}"`
  );
  
  // 3. Update canonical URL
  articleHtml = articleHtml.replace(
    /href="\/articles\/ai-tips-for-iphone-users\/"/,
    `href="/articles/${frontMatter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/"`
  );
  
  // 4. Update the title in the <h1> span (this is the ONLY dynamic content replacement)
  articleHtml = articleHtml.replace(
    /Top 5 AI Tips for iPhone Users/,
    frontMatter.title
  );
  
  // 5. Update article date
  const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  articleHtml = articleHtml.replace(
    /September 09, 2025/,
    formattedDate
  );
  
  // 6. Update reading time
  articleHtml = articleHtml.replace(
    /3 min read/,
    frontMatter.reading_time || '5 min read'
  );
  
  // 7. Extract and replace article content (from <article> tag)
  const articleStart = '<article class="prose prose-lg max-w-4xl mx-auto article-content">';
  const articleEnd = '</article>';
  
  const startIndex = articleHtml.indexOf(articleStart);
  const endIndex = articleHtml.indexOf(articleEnd, startIndex);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const beforeContent = articleHtml.substring(0, startIndex + articleStart.length + 1);
    const afterContent = articleHtml.substring(endIndex);
    
    // Add tags if they exist
    let tagsHtml = '';
    if (frontMatter.tags && frontMatter.tags.length > 0) {
      tagsHtml = `\n            <div class="article-tags">\n                ` +
        frontMatter.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('\n                ') +
        '\n            </div>';
    }
    
    // Replace content
    articleHtml = beforeContent + '\n            ' + htmlContent + tagsHtml + '\n        ' + afterContent;
  }
  
  // 8. Update navigation links
  articleHtml = articleHtml.replace(
    /href="\.\.\/_articles\/chatgpt-5-prompting-best-practices\.html"/,
    'href="#"'  // Disable navigation for now
  );
  
  articleHtml = articleHtml.replace(
    /href="\.\.\/_articles\/ai-habits-productivity\.html"/,
    'href="#"'  // Disable navigation for now
  );
  
  return articleHtml;
}

// Function to process a single markdown file
function processMarkdownFile(markdownFilePath) {
  console.log(`Processing ${markdownFilePath}...`);
  
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
  
  // Extract front matter and content
  const frontMatterMatch = markdownContent.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/ms);
  
  if (!frontMatterMatch) {
    console.error(`Error: Could not parse front matter in ${markdownFilePath}`);
    return;
  }
  
  const frontMatterString = frontMatterMatch[1];
  const htmlContent = convertMarkdownToHtml(frontMatterMatch[2]);
  
  let frontMatter;
  try {
    frontMatter = yaml.load(frontMatterString);
  } catch (e) {
    console.error(`Error parsing YAML front matter in ${markdownFilePath}:`, e);
    return;
  }
  
  // Use enhanced template as base and replace content
  const finalHtml = replaceTemplateContent(template, frontMatter, htmlContent);
  
  // Write the HTML file
  const fileParts = markdownFilePath.split('/');
  const fileName = fileParts[fileParts.length - 1];
  const outputFile = path.join(articlesDir, fileName.replace('.md', '.html'));
  fs.writeFileSync(outputFile, finalHtml);
  console.log(`Generated ${outputFile}`);
}

// Function to convert markdown to HTML (same as before)
function convertMarkdownToHtml(markdown) {
  // First, protect code blocks and inline code before processing paragraphs
  let processed = markdown;
  
  // Replace code blocks (must be done in order)
  processed = processed.replace(/```([\w]*)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
  });
  
  // Replace inline code
  processed = processed.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  
  // Convert headers
  processed = processed.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  processed = processed.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  processed = processed.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  
  // Convert emphasis
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert links
  processed = processed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Convert lists
  processed = processed.replace(/^- (.*?)$/gm, '<li>$1</li>');
  
  // Split into paragraphs, excluding code blocks
  const paragraphs = processed.split('\n\n');
  const htmlParagraphs = paragraphs.map(p => {
    // Skip if it's a code block or header (already processed)
    if (p.includes('<pre><code') || p.match(/^<h[1-6]>/)) {
      return p;
    }
    // Skip empty paragraphs
    if (!p.trim()) return '';
    // Wrap in paragraph tags
    return `<p>${p.trim()}</p>`;
  }).filter(p => p !== '');
  
  return htmlParagraphs.join('\n\n');
}

// Process all markdown files in the _articles directory
fs.readdirSync(articlesDir).forEach(file => {
  if (file.endsWith('.md') && !file.includes('TEMPLATE')) { // Skip template files
    const markdownFilePath = path.join(articlesDir, file);
    processMarkdownFile(markdownFilePath);
  }
});

console.log('✅ Article generation complete!');
console.log('📄 All articles now use the enhanced openai-tips-for-iphone-users.html template');
console.log('🎨 Titles, dates, reading times, and content have been updated');
console.log('🚀 All articles maintain the proven responsive design');
