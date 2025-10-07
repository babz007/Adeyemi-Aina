#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
// Simple markdown to HTML converter (avoiding ESM issues)

// Read the project layout template
const layoutTemplatePath = '_layouts/project.html';
const layoutTemplate = fs.readFileSync(layoutTemplatePath, 'utf8');

// Directory containing markdown projects
const projectsDir = '_projects';

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
    const projectMarkdown = frontMatterMatch[2];

    let frontMatter;
    try {
        frontMatter = yaml.load(frontMatterString);
    } catch (e) {
        console.error(`Error parsing YAML front matter in ${markdownFilePath}:`, e);
        return;
    }

    // Convert markdown content to HTML
    const projectHtmlContent = convertMarkdownToHtml(projectMarkdown);

    // Prepare data for the template
    const page = {
        title: frontMatter.title || 'Untitled Project',
        date: frontMatter.date ? new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
        excerpt: frontMatter.excerpt || '',
        author: frontMatter.author || 'Unknown Author',
        category: frontMatter.category || '',
        tags: frontMatter.tags || [],
        duration: frontMatter.duration || '',
        status: frontMatter.status || '',
        github_url: frontMatter.github_url || '',
        live_url: frontMatter.live_url || '',
        stats: frontMatter.stats || []
    };

    // Simple replacement for Jekyll-like variables in the layout
    let renderedHtml = layoutTemplate;

    // Replace page variables
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.title\s*\}\}/g, page.title);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.date\s*\|\s*date:\s*"%B %d, %Y"\s*\}\}/g, page.date);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.excerpt\s*\}\}/g, page.excerpt);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.author\s*\}\}/g, page.author);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.category\s*\}\}/g, page.category);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.duration\s*\}\}/g, page.duration);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.status\s*\}\}/g, page.status);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.github_url\s*\}\}/g, page.github_url);
    renderedHtml = renderedHtml.replace(/\{\{\s*page\.live_url\s*\}\}/g, page.live_url);

    // Replace content
    renderedHtml = renderedHtml.replace(/\{\{\s*content\s*\}\}/g, projectHtmlContent);

    // Handle conditional tags
    if (page.tags.length > 0) {
        const tagsHtml = page.tags.map(tag => `<span class="project-tag">#${tag}</span>`).join('\n            ');
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.tags\.size\s*>\s*0\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<div class="project-tags">\n            ${tagsHtml}\n        </div>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.tags\.size\s*>\s*0\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }
    
    // Handle page.category conditional
    if (page.category) {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.category\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<div class="inline-flex items-center mb-6">\n                    <span class="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-gray-700 dark:to-gray-600 text-orange-800 dark:text-orange-200 rounded-full text-sm font-semibold shadow-sm">\n                        ${page.category}\n                    </span>\n                </div>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.category\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Handle stats section
    if (page.stats.length > 0) {
        const statsHtml = page.stats.map(stat => 
            `<div class="stat-card">
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            </div>`
        ).join('\n            ');
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.stats\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<div class="project-stats">\n            ${statsHtml}\n        </div>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.stats\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Handle duration conditional
    if (page.duration) {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.duration\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="font-medium">${page.duration}</span>
                    </div>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.duration\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Handle status conditional
    if (page.status) {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.status\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<div class="flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="font-medium">${page.status}</span>
                    </div>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.status\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Handle GitHub URL conditional
    if (page.github_url) {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.github_url\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<a href="${page.github_url}" class="btn btn-gray-border" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.github_url\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Handle Live URL conditional
    if (page.live_url) {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.live_url\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, `<a href="${page.live_url}" class="btn btn-gray-border" target="_blank" rel="noopener noreferrer">
                    Live Demo →
                </a>`);
    } else {
        renderedHtml = renderedHtml.replace(/\{\%\s*if\s*page\.live_url\s*\%\}(.*?)\{\%\s*endif\s*\%\}/s, '');
    }

    // Output file path (e.g., _projects/my-project.html)
    const outputFileName = path.basename(markdownFilePath, '.md') + '.html';
    const outputFilePath = path.join(projectsDir, outputFileName);

    fs.writeFileSync(outputFilePath, renderedHtml, 'utf8');
    console.log(`Generated ${outputFilePath}`);
}

// Function to convert markdown to HTML
function convertMarkdownToHtml(markdown) {
    let processed = markdown;
    
    // Replace code blocks
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
        if (p.includes('<pre><code') || p.match(/^<h[1-6]>/)) {
            return p;
        }
        if (!p.trim()) return '';
        return `<p>${p.trim()}</p>`;
    }).filter(p => p !== '');
    
    return htmlParagraphs.join('\n\n');
}

// Process all markdown files in the _projects directory
fs.readdirSync(projectsDir).forEach(file => {
    if (file.endsWith('.md')) {
        const markdownFilePath = path.join(projectsDir, file);
        processMarkdownFile(markdownFilePath);
    }
});

console.log('Project generation complete!');
