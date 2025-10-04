#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read the working template (openai-tips-for-iphone-users.html)
const workingTemplatePath = '_articles/openai-tips-for-iphone-users.html';
const workingTemplate = fs.readFileSync(workingTemplatePath, 'utf8');

// Directory containing markdown articles
const articlesDir = '_articles';

// Function to replace template content with actual article data
function replaceTemplateContent(template, frontMatter, htmlContent) {
  // Extract the article-specific content from working template
  const articleStartTag = '<article class="prose prose-lg max-w-4xl mx-auto article-content">';
  const articleEndTag = '</article>';
  
  // Find the article content section in template
  const startIndex = template.search(new RegExp(articleStartTag));
  const endIndex = template.search(new RegExp(articleEndTag));
  
  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find article content markers in template');
    return template;
  }
  
  // Replace article content
  const beforeContent = template.substring(0, startIndex + articleStartTag.length + 1); // +1 to include newline
  const afterContent = template.substring(endIndex);
  
  // Update <title>
  let newTemplate = template.replace(
    /<title>.*<\/title>/, 
    `<title>${frontMatter.title} - Adeyemi Aina</title>`
  );
  
  // Update meta description
  newTemplate = newTemplate.replace(
    /content="[^"]*AI features[^"]*"/, 
    `content="${frontMatter.excerpt || frontMatter.description || ''}"`
  );
  
  // Update canonical URL
  newTemplate = newTemplate.replace(
    /href="\/articles\/ai-tips-for-iphone-users\/"/, 
    `href="/articles/${frontMatter.slug || frontMatter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/"`
  );
  
  // Update main heading
  newTemplate = newTemplate.replace(
    /<h1 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-1 dark:text-white">.*<\/h1>/,
    `<h1 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-1 dark:text-white">${frontMatter.title}</h1>`
  );
  
  // Update article date and reading time
  const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  newTemplate = newTemplate.replace(
    /<div class="article-date">.*<\/div>/,
    `<div class="article-date">${formattedDate}</div>`
  );
  
  newTemplate = newTemplate.replace(
    /<div class="article-reading-time">.*<\/div>/,
    `<div class="article-reading-time">${frontMatter.reading_time}</div>`
  );
  
  // Replace article content and add tags
  let tagsSection = '';
  if (frontMatter.tags && frontMatter.tags.length > 0) {
    const tagsHtml = frontMatter.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('\n            ');
    tagsSection = `\n            <div class="article-tags">\n                ${tagsHtml}\n            </div>`;
  }
  
  newTemplate = newTemplate.replace(
    new RegExp(articleStartTag + '[\\s\\S]*?' + articleEndTag),
    articleStartTag + '\n            ' + htmlContent + tagsSection + '\n        </article>'
  );
  
  // Update navigation links (basic implementation - could be enhanced)
  newTemplate = newTemplate.replace(
    /href="\.\.\/_articles\/chatgpt-5-prompting-best-practices\.html"/,
    'href="#"'  // Disable navigation for now, could implement proper article chaining
  );
  
  newTemplate = newTemplate.replace(
    /href="\.\.\/_articles\/ai-habits-productivity\.html"/,
    'href="#"'  // Disable navigation for now
  );
  
  return newTemplate;
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
  
  // Use working template as base and replace content
  const finalHtml = replaceTemplateContent(workingTemplate, frontMatter, htmlContent);
  
  // Write the HTML file
  const fileParts = markdownFilePath.split('/');
  const fileName = fileParts[fileParts.length - 1];
  const outputFile = path.join(articlesDir, fileName.replace('.md', '.html'));
  fs.writeFileSync(outputFile, finalHtml);
  console.log(`Generated ${outputFile}`);
}

// Function to convert markdown to HTML
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

console.log('Article generation complete!');
console.log('Note: All articles now use the same structure as openai-tips-for-iphone-users.html');
