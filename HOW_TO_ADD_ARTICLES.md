# 📝 How to Add Articles to Your Website

This guide walks you through adding new articles to your Jekyll-based website. Follow these steps to create and publish articles with automatic sidebar integration.

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Your Article File

Navigate to the `_articles/` directory and create a new markdown file:

```bash
cd _articles/
touch your-article-title.md
```

### Step 2: Add Front Matter

Every article needs front matter (metadata) at the top. Copy this template:

```yaml
---
layout: article
title: "Your Article Title Here"
date: 2025-01-01
excerpt: "Brief description of your article (2-3 sentences)"
author: "Your Name"
category: "Engineering"
tags: ["AI", "Productivity", "Tutorial"]
reading_time: "5 min read"
image: "/images/your-image.png"
---

```

### Step 3: Write Your Content

After the front matter, write your article content in Markdown:

```markdown
## Introduction

After experimenting with multiple solutions, I found the key to...

## Main Section 1

Understanding this concept is crucial because...

### Code Example

```javascript
function example() {
  console.log("Your code here");
}
```

## Conclusion

In summary, the most important takeaway is...
```

### Step 4: Save and Generate HTML

Run this command to regenerate your article with sidebar navigation:

```bash
node fix_articles.js
```

That's it! Your article will automatically appear in the articles section with full sidebar navigation.

---

## 📋 Detailed Front Matter Reference

| Field | Description | Example |
|-------|-------------|---------|
| `layout` | Always use `article` | `article` |
| `title` | Article title | `"AI Tools That Changed My Workflow"` |
| `date` | Publication date (YYYY-MM-DD) | `2025-01-01` |
| `excerpt` | Brief description for previews | `"Discover AI tools that boosted my productivity"` |
| `author` | Your name | `"Adeyemi Aina"` |
| `category` | Article category | `Engineering`, `Tutorials`, `Opinions` |
| `tags` | Keywords for organization | `["AI", "Productivity", "Tools"]` |
| `reading_time` | Estimated read time | `"5 min read"`, `"12 min read"` |
| `image` | Featured image path | `"/images/article-image.png"` |

---

## 🖼️ Adding Images

### Option 1: Add Images to Existing Directory

Place images in the `images/` folder and reference them:

```markdown
![Image description](/images/your-image.png)
```

### Option 2: Create Article-Specific Images

Create a subfolder for your article images:

```bash
mkdir images/articles/your-article-name/
# Copy your images there
```

Then reference them:

```markdown
![Image description](/images/articles/your-article-name/image.png)
```

---

## 📝 Markdown Syntax Guide

### Headers
```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
```

### Code Blocks
````markdown
```javascript
function example() {
  console.log("Code block");
}
```
````

### Lists
```markdown
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

1. First step
2. Second step
3. Third step
```

### Links and References
```markdown
[Link text](https://example.com)
[Internal link](articles.html)
```

---

## 🎨 Article Style Guidelines

### Title Best Practices
- ✅ **Clear and specific**: "Build Your First AI Agent in n8n"
- ✅ **Action-oriented**: "How to Configure Auto-Deployment"
- ❌ Avoid: "AI Article" or "Technical Post"

### Content Structure
1. **Hook**: Start with a compelling introduction
2. **Section headers**: Use H2 for main sections
3. **Code examples**: Include practical examples
4. **Conclusion**: Summarize key takeaways

### Length Guidelines
- **Short articles**: 800-1,500 words (3-5 min read)
- **Medium articles**: 1,500-3,000 words (6-10 min read)
- **Long articles**: 3,000+ words (10+ min read)

---

## 🔧 Advanced Features

### Adding Table of Contents

For longer articles, add this snippet:

```html
<div class="table-of-contents">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#section1">Section 1</a></li>
    <li><a href="#section2">Section 2</a></li>
  </ul>
</div>
```

### Code Syntax Highlighting

Use language identifiers for syntax highlighting:

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

Supported languages: `javascript`, `python`, `bash`, `html`, `css`, `sql`, etc.

### Callout Boxes

Add emphasis with styled callouts:

```html
<div class="info-callout">
  💡 **Pro Tip**: This is an important note for readers.
</div>
```

---

## 🚨 Troubleshooting

### Article Not Showing Up?

1. **Check front matter**: Ensure YAML syntax is correct
2. **Run regeneration**: Execute `node fix_articles.js`
3. **Verify file location**: Article must be in `_articles/` folder
4. **Check file extension**: Use `.md`, not `.markdown`

### Sidebar Not Loading?

1. **Verify layout**: Front matter must have `layout: article`
2. **Check JavaScript**: Ensure `sidebar-loader.js` is working
3. **Clear cache**: Refresh browser with `Ctrl+F5`

### Images Not Displaying?

1. **Check file path**: Use `/images/filename.png` format
2. **Verify file exists**: Ensure image is in `images/` directory
3. **File permissions**: Make sure web server can read the file

### Style Issues?

1. **Markdown syntax**: Check for proper formatting
2. **HTML tags**: Ensure all tags are properly closed
3. **CSS classes**: Use existing classes from `main.min.css`

---

## 🔄 Workflow Summary

```bash
# 1. Navigate to articles directory
cd _articles/

# 2. Create new article file
touch your-new-article.md

# 3. Edit with front matter and content
nano your-new-article.md

# 4. Generate HTML with sidebar
node fix_articles.js

# 5. Preview your changes
# Open the browser and navigate to your article
```

---

## 📚 Article Examples

### Example 1: Tutorial Article
```yaml
---
layout: article
title: "Building a REST API with Node.js"
date: 2025-01-15
excerpt: "Learn to create a secure REST API with authentication, validation, and database integration."
author: "Adeyemi Aina"
category: "Tutorials"
tags: ["Node.js", "API", "Backend", "Authentication"]
reading_time: "12 min read"
image: "/images/api-tutorial.png"
---
```

### Example 2: Opinion/Insight Article
```yaml
---
layout: article
title: "Why TypeScript Changes Everything"
date: 2025-01-20
excerpt: "My journey from JavaScript skepticism to TypeScript advocacy and why you should make the switch."
author: "Adeyemi Aina"
category: "Opinions"
tags: ["TypeScript", "JavaScript", "Web Development"]
reading_time: "8 min read"
-image: "/images/typescript-logo.png"
---
```

### Example 3: Technical Review
```yaml
---
layout: article
title: "AI Code Review Tools Compared"
date: 2025-01-25
excerpt: "An in-depth comparison of GitHub Copilot, ChatGPT Code Interpreter, and other AI coding assistants."
author: "Adeyemi Aina"
category: "Reviews"
tags: ["AI", "Code Review", "Development Tools"]
reading_time: "15 min read"
image: "/images/ai-tools-comparison.png"
---
```

---

## 💡 Pro Tips

1. **Write drafts first**: Create `.md` files and iterate before generating HTML
2. **Use version control**: Commit articles to track changes
3. **Keep consistent naming**: Use kebab-case for file names (`my-article-title.md`)
4. **Preview before publishing**: Always check generated HTML
5. **SEO optimization**: Write descriptive excerpts and use relevant tags
6. **Regular updates**: Update `reading_time` as you add content

---

## 🆘 Need Help?

If you encounter issues:

1. **Check the code**: Look at existing articles in `_articles/` for examples
2. **Refer to documentation**: Jekyll docs at jekyllrb.com
3. **Test incrementally**: Add content gradually to isolate problems
4. **Use templates**: Copy the structure from working articles

---

*Happy writing! Remember: every great article starts with a single markdown file.*