# 📚 Jekyll Articles System Setup Guide

This guide explains how to use the new articles system integrated into your portfolio website.

## 🌟 What's Been Added

### 1. **Jekyll Integration**
- ✅ GitHub Pages compatible setup
- ✅ Markdown article writing
- ✅ Automatic article listing
- ✅ SEO optimization
- ✅ Category filtering

### 2. **New Files Created**
- `_config.yml` - Jekyll configuration
- `_layouts/article.html` - Article template
- `articles.html` - Articles listing page
- `_articles/` - Directory for article markdown files
- `.github/workflows/pages.yml` - GitHub Actions workflow
- `Gemfile` - Ruby dependencies

### 3. **Updated Files**
- `sidebar.html` - Added Articles navigation item

## 📝 How to Write Articles

### Creating Articles
1. Create a new `.md` file in the `_articles/` directory
2. Use the front matter template below
3. Write your content in Markdown
4. Push to GitHub - articles automatically appear!

### Article Template
```markdown
---
layout: article
title: "Your Article Title"
date: 2025-01-15
excerpt: "Brief description of your article that appears in listings"
author: "Adeyemi Aina"
category: "AI" # Categories: AI, Engineering, Research, Tutorials
tags: ["tag1", "tag2", "tag3"]
reading_time: "5 min read"
image: "/images/your-image.jpg"
---

Your article content goes here...

## Section Headers

Content with **bold** and *italic* text.

### Code Blocks
```javascript
function example() {
  return "Hello World!";
}
```

### Images
![Alt text](/images/your-image.jpg)

### Lists
- Item 1
- Item 2
- Item 3

### Links
[External Link](https://example.com)
[Internal Link](/other-page)
```

## 🎨 Article Features

### Categories
- **AI**: Artificial intelligence content
- **Engineering**: Software engineering articles  
- **Research**: Academic and research insights
- **Tutorials**: Step-by-step guides

### Front Matter Options
```yaml
layout: article          # Required
title: "Article Title"   # Required
date: 2025-01-15        # Required (YYYY-MM-DD)
excerpt: "Description"  # Required (shows in listings)
author: "Name"          # Optional (defaults to site.author)
category: "Category"    # Optional
tags: ["tag1", "tag2"]  # Optional
reading_time: "5 min"   # Optional (calculated automatically)
image: "/images/..."    # Optional (used in social sharing)
```

### Article Images
- Place images in the `images/` directory
- Use relative paths: `/images/filename.jpg`
- Images are automatically optimized
- Supports: JPG, PNG, SVG, WebP

### Code Highlighting
- Automatic syntax highlighting with Rouge
- Supports 100+ programming languages
- Dark theme compatible

```javascript
// JavaScript example
const greeting = "Hello World!";
console.log(greeting);
```

```python
# Python example
def hello_world():
    return "Hello World!"

print(hello_world())
```

## 🚀 Publishing Process

### Local Development
```bash
# Install dependencies
bundle install

# Start Jekyll server
bundle exec jekyll serve

# View site at http://localhost:4000
```

### GitHub Pages Deployment
1. **Push to GitHub**: Articles automatically build via GitHub Actions
2. **Automatic deployment**: Changes deploy to GitHub Pages within minutes
3. **No manual work**: Just push your markdown files!

## 📱 Navigation Features

### Sidebar Integration
- Articles section added to navigation
- Shows recent articles
- Links to full article listing

### Article Listing Page
- Category filtering (All, AI, Engineering, Research, Tutorials)
- Search functionality
- Reading time estimates
- Publication dates
- Tag system

### Individual Articles
- Clean reading experience
- Previous/Next navigation
- Social sharing optimized
- Mobile responsive

## 🔧 Customization Options

### Adding New Categories
1. Update categories in `articles.html`:
```javascript
const categoryButtons = document.querySelectorAll('.category-btn');
```
2. Add new category buttons
3. Articles automatically filter by front matter `category`

### Changing Article Layout
- Edit `_layouts/article.html`
- Modify `articles.html` for listing page
- Customize `css/page-transitions.css` for animations

### SEO Optimization
- Automatic meta tags
- Open Graph images
- Structured data
- Sitemap generation

## 📊 Sample Articles Included

1. **ChatGPT-5 Prompting Best Practices** - AI content
2. **Top 5 AI Tips for iPhone Users** - Mobile AI tips
3. **3 AI Habits That Save Me 20+ Hours a Week** - Productivity

Each includes:
- ✅ Proper front matter
- ✅ Images and code examples
- ✅ Category and tag system
- ✅ Reading time estimates
- ✅ Social sharing optimization

## 🛠️ Troubleshooting

### Common Issues
1. **Articles not appearing**: Check front matter syntax
2. **Images not loading**: Verify image paths start with `/images/`
3. **Build errors**: Validate YAML front matter

### GitHub Pages Issues
- Ensure repository has GitHub Pages enabled
- Check Actions tab for build logs
- Verify `_config.yml` settings

### Local Development
```bash
# Clear Jekyll cache
bundle exec jekyll clean

# Rebuild everything
bundle exec jekyll build --watch
```

## 📈 Next Steps

### Suggested Enhancements
1. **Comments System**: Add GitHub-based commenting
2. **Newsletter Integration**: Email signup for new articles  
3. **Analytics**: Integrate Google Analytics or Plausible
4. **RSS Feed**: Automatic RSS generation for articles

### Content Ideas
- Monthly AI tool reviews
- Weekly developer tips
- Research paper summaries
- Tutorial series
- Industry insights

---

**Ready to start writing?** Create your first article in the `_articles/` directory and see it automatically appear on your site!

💡 **Pro Tip**: Use descriptive file names (slugified versions of titles) for better SEO and readability.
