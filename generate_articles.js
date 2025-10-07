#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*)$/gm, '<h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h3>');
  html = html.replace(/^## (.*)$/gm, '<h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">$1</h2>');
  html = html.replace(/^# (.*)$/gm, '<h1 class="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-white">$1</h1>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Code blocks
  html = html.replace(/```(\w+)?\n(.*?)\n```/gs, '<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg mt-6 mb-6 overflow-x-auto"><code class="language-$1">$2</code></pre>');
  html = html.replace(/```\n(.*?)\n```/gs, '<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg mt-6 mb-6 overflow-x-auto"><code>$1</code></pre>');
  html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-white">$1</code>');
  
  // Lists
  html = html.replace(/^- (.*)$/gm, '<li class="mb-2 text-gray-700 dark:text-gray-300">$1</li>');
  html = html.replace(/(<li class="mb-2 text-gray-700 dark:text-gray-300">.*<\/li>)/gs, '<ul class="list-disc ml-6 mt-4 mb-4 text-gray-700 dark:text-gray-300">\n$1\n</ul>');
  
  // Blockquotes
  html = html.replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-orange-500 pl-6 py-2 my-6 bg-orange-50 dark:bg-gray-800/50 italic text-gray-700 dark:text-gray-300">$1</blockquote>');
  
  // Line breaks and paragraphs
  html = html.replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">');
  html = html.replace(/\n/g, '<br/>');
  
  // Wrap in paragraph
  html = '<p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">' + html + '</p>';
  
  return html;
}

// Load the article layout template
const layoutTemplate = fs.readFileSync('_layouts/article.html', 'utf8');

// Function to generate HTML from markdown file
function generateArticleFromMarkdown(mdFile) {
  console.log(`Processing ${mdFile}...`);
  
  try {
    // Read markdown file
    const content = fs.readFileSync(mdFile, 'utf8');
    
    // Parse front matter
    const frontMatterMatch = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
    
    if (!frontMatterMatch) {
      console.log(`No front matter found in ${mdFile}`);
      return;
    }
    
    const frontMatterText = frontMatterMatch[1];
    const markdownContent = frontMatterMatch[2];
    
    // Parse front matter fields
    const frontMatter = {};
    frontMatterText.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*"(.*)"$/);
      if (match) {
        frontMatter[match[1]] = match[2];
      } else {
        const match2 = line.match(/^(\w+):\s*\[(.*)\]$/);
        if (match2) {
          frontMatter[match2[1]] = match2[2].split(',').map(tag => tag.trim().replace(/"/g, ''));
        } else {
          const match3 = line.match(/^(\w+):\s*(.*)$/);
          if (match3) {
            frontMatter[match3[1]] = match3[2];
          }
        }
      }
    });
    
    // Convert markdown to HTML
    const htmlContent = convertMarkdownToHtml(markdownContent);
    
    // Generate the HTML file using template
    let finalHtml = layoutTemplate
      .replace(/\{\{\s*page\.title\s*\}\}/g, frontMatter.title || 'Article Title')
      .replace(/\{\{\s*page\.excerpt\s*\}\}/g, frontMatter.excerpt || '')
      .replace(/\{\{\s*page\.author\s*\}\}/g, frontMatter.author || 'Adeyemi Aina')
      .replace(/\{\{\s*page\.category\s*\}\}/g, frontMatter.category || '')
      .replace(/\{\{\s*page\.reading_time\s*\}\}/g, frontMatter.reading_time || '5 min read')
      .replace(/\{\{\s*page\.date\s*\|[^}]*\}\}/g, new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
      .replace(/\{\{\s*content\s*\}\}/g, htmlContent);
    
    // Handle tags
    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      const tagsHtml = frontMatter.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('\n                ');
      finalHtml = finalHtml.replace('{% if page.tags.size > 0 %}\n            <div class="article-tags">\n                {% for tag in page.tags %}\n                <span class="article-tag">{{ tag }}</span>\n                {% endfor %}\n            </div>\n            {% endif %}', 
        frontMatter.tags.length > 0 ? `<div class="article-tags">\n                ${tagsHtml}\n            </div>` : '');
    } else {
      finalHtml = finalHtml.replace('{% if page.tags.size > 0 %}\n            <div class="article-tags">\n                {% for tag in page.tags %}\n                <span class="article-tag">{{ tag }}</span>\n                {% endfor %}\n            </div>\n            {% endif %}', '');
    }
    
    // Fix CSS and JS asset paths
    finalHtml = finalHtml.replace(/{{ '\s*\/css\/\s*(.*?)' \| relative_url }}/g, '../css/$1');
    finalHtml = finalHtml.replace(/{{ '\s*\/js\/\s*(.*?)' \| relative_url }}/g, '../js/$1');
    finalHtml = finalHtml.replace(/{{ '\s*\/images\/\s*(.*?)' \| relative_url }}/g, '../images/$1');
    
    // Remove Jekyll template syntax
    finalHtml = finalHtml.replace(/\{% if page\.previous %\}(.*?)\{% endif %\}/gs, '');
    finalHtml = finalHtml.replace(/\{% else %\}/g, '');
    finalHtml = finalHtml.replace(/{{ page\.previous\.(.*?) \| relative_url }}/g, '');
    finalHtml = finalHtml.replace(/{{ page\.previous\.(.*?) }}/g, '');
    finalHtml = finalHtml.replace(/{{ page\.next\.(.*?) \| relative_url }}/g, '');
    finalHtml = finalHtml.replace(/{{ page\.next\.(.*?) }}/g, '');
    finalHtml = finalHtml.replace(/{{ '\s*\/articles\/\s*' \| relative_url }}/g, '../articles.html');
    finalHtml = finalHtml.replace(/{{ page\.url \| absolute_url }}/g, '#');
    finalHtml = finalHtml.replace(/{{ page\.image \| absolute_url }}/g, frontMatter.image || '../images/RANDOM-PICS--2-.png');
    finalHtml = finalHtml.replace(/{{ site\.title }}/g, 'Adeyemi Aina');
    finalHtml = finalHtml.replace(/{{ page\.author \| slice: 0 }}/g, (frontMatter.author || 'Adeyemi Aina').charAt(0));
    finalHtml = finalHtml.replace(/{% if page\.image %}(.*?){% endif %}/gs, frontMatter.image ? '$1' : '');
    finalHtml = finalHtml.replace(/{% if page\.excerpt %}(.*?){% endif %}/gs, frontMatter.excerpt ? '$1' : '');
    finalHtml = finalHtml.replace(/{% if page\.category %}(.*?){% endif %}/gs, frontMatter.category ? '$1' : '');
    finalHtml = finalHtml.replace(/{% if page\.tags\.size > 0 %}(.*?){% endif %}/gs, (frontMatter.tags && frontMatter.tags.length > 0) ? '$1' : '');
    
    // Write the HTML file
    const outputFile = mdFile.replace('.md', '.html');
    fs.writeFileSync(outputFile, finalHtml);
    console.log(`Generated ${outputFile}`);
    
  } catch (error) {
    console.log(`Error processing ${mdFile}: ${error.message}`);
  }
}

// Process all markdown files
const markdownFiles = [
  '_articles/ai-habits-productivity.md',
  '_articles/build-first-ai-agent-n8n.md',
  '_articles/chatgpt-5-prompting-best-practices.md',
  '_articles/ai-tips-for-iphone-users.md'
];

markdownFiles.forEach(file => {
  if (fs.existsSync(file)) {
    generateArticleFromMarkdown(file);
  } else {
    console.log(`File ${file} not found`);
  }
});

console.log('Article generation complete!');
