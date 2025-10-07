# How to Add New Projects

This guide explains how to add new project pages to your portfolio website using the project system.

## Overview

The project system works similarly to the articles system:
- **Markdown files** in `_projects/` directory contain project content
- **Project template** (`_layouts/project.html`) provides consistent styling
- **Generation script** (`generate_projects.js`) converts markdown to HTML
- **Individual project pages** are automatically created

## Step-by-Step Guide

### Step 1: Create a New Project Markdown File

1. Navigate to the `_projects/` directory
2. Copy `PROJECT_TEMPLATE.md` to create your new project file:
   ```bash
   cp _projects/PROJECT_TEMPLATE.md _projects/your-project-name.md
   ```

### Step 2: Fill in Project Information

Edit your new markdown file and update the front matter (the section between `---` lines):

```yaml
---
layout: project
title: "Your Project Title"
date: 2024-01-01
excerpt: "Brief description of your project and its impact."
author: "Adeyemi Aina"
category: "Project Category"  # e.g., "Open Source", "DevOps", "Research"
tags: ["Tag1", "Tag2", "Tag3"]  # Technologies, frameworks, etc.
duration: "X months"
status: "Status"  # Development/Production/Completed
github_url: "https://github.com/your-repo"  # Optional
live_url: "https://your-demo-url.com"  # Optional
stats:
  - number: "100%"
    label: "Performance Improvement"
  - number: "1000+"
    label: "Users Served"
  - number: "99.9%"
    label: "Uptime"
---
```

### Step 3: Write Project Content

Replace the template content with your actual project details. The markdown supports:

- **Headers**: `#`, `##`, `###` for different heading levels
- **Bold text**: `**bold**`
- **Italic text**: `*italic*`
- **Code blocks**: 
  ```
  ```python
  def hello():
      print("Hello World")
  ```
  ```
- **Inline code**: `code`
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Images**: `![alt text](image-url)`

### Step 4: Add Project Images

1. Place images in the `images/` directory
2. Reference them in your markdown: `![Description](../images/your-image.png)`
3. Use relative paths: `../images/` (since projects are in `_projects/`)

### Step 5: Generate HTML Pages

Run the generation script to create HTML pages:

```bash
node generate_projects.js
```

This will create `your-project-name.html` in the `_projects/` directory.

### Step 6: Update Project Index (Optional)

To add your project to the main projects page (`project.html`):

1. Open `project.html`
2. Find the project cards section
3. Add a new project card with a link to your project:

```html
<div class="project-card">
    <div class="project-content">
        <div class="project-image-container">
            <img src="images/your-image.png" alt="Your Project" class="project-image">
        </div>
        <h3 class="project-title">
            <a href="_projects/your-project-name.html" class="text-gray-900 dark:text-white hover:text-orange-500 transition-colors">
                Your Project Title
            </a>
        </h3>
        <ul class="contributions-list">
            <li class="contribution-item">Key achievement 1</li>
            <li class="contribution-item">Key achievement 2</li>
            <li class="contribution-item">Key achievement 3</li>
        </ul>
        <div class="project-links">
            <a href="https://github.com/your-repo" class="project-link">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                Github
            </a>
            <a href="https://your-demo-url.com" class="project-link">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Live
            </a>
        </div>
    </div>
</div>
```

## Project Structure

Each project page includes:

### Header Section
- **Project title** with gradient styling
- **Category badge** (e.g., "Open Source", "DevOps")
- **Excerpt** describing the project
- **Meta information**: Date, duration, status

### Stats Section (Optional)
- **Key metrics** displayed in cards
- **Performance indicators**
- **Impact measurements**

### Content Section
- **Project overview**
- **Problem statement**
- **Solution architecture**
- **Technical implementation**
- **Impact & results**
- **Future enhancements**

### Navigation
- **Back to projects** link
- **GitHub repository** link (if provided)
- **Live demo** link (if provided)

## Best Practices

### Content Writing
- **Start with impact**: Lead with the problem you solved
- **Use metrics**: Include specific numbers and percentages
- **Show architecture**: Include diagrams and technical details
- **Tell a story**: Explain the journey from problem to solution

### Technical Details
- **Include code snippets** for key implementations
- **Add architecture diagrams** using Mermaid syntax
- **Document challenges** and how you overcame them
- **Show before/after** comparisons

### Visual Content
- **Screenshots** of the application in action
- **Architecture diagrams** showing system design
- **Performance charts** demonstrating improvements
- **User interface mockups** or wireframes

## File Organization

```
_projects/
├── PROJECT_TEMPLATE.md          # Template for new projects
├── splice-catalog.md            # Project markdown files
├── opendsa-lti-integration.md
├── canvas-kubernetes-deployment.md
├── splice-catalog.html          # Generated HTML files
├── opendsa-lti-integration.html
└── canvas-kubernetes-deployment.html
```

## Troubleshooting

### Common Issues

1. **Front matter parsing errors**:
   - Ensure YAML syntax is correct
   - Check for proper indentation
   - Verify all required fields are present

2. **Image not displaying**:
   - Check image path is correct (`../images/filename`)
   - Ensure image exists in the `images/` directory
   - Verify image file permissions

3. **Generation script fails**:
   - Run `npm install js-yaml` to ensure dependencies
   - Check markdown file syntax
   - Verify file encoding is UTF-8

### Getting Help

If you encounter issues:
1. Check the console output for error messages
2. Verify your markdown syntax
3. Compare with existing working project files
4. Ensure all required front matter fields are present

## Automation

The project system is designed to be automated:
- **New projects** automatically get consistent styling
- **Template updates** apply to all projects
- **Generation script** handles markdown to HTML conversion
- **Responsive design** works across all devices

This system ensures all your project pages maintain professional consistency while allowing you to focus on content creation rather than formatting.
