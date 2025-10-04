#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

require 'rubygems'
require 'erb'
require 'psych'
require 'date'

# Simple Jekyll-like article renderer
class ArticleRenderer
  def initialize
    @layout_template = File.read('_layouts/article.html')
  end

  def render_article(markdown_file)
    puts "Rendering #{markdown_file}..."
    
    # Read the markdown file with proper encoding
    content = File.read(markdown_file, encoding: 'utf-8')
    
    # Parse front matter
    front_matter_match = content.match(/\A---\s*\n(.*?)\n---\s*\n(.*)\Z/m)
    
    if front_matter_match
      front_matter = Psych.load(front_matter_match[1])
      article_content = front_matter_match[2]
    else
      puts "No front matter found in #{markdown_file}"
      return
    end
    
    # Replace links to work from articles directory
    article_content = article_content.gsub(/!\[(.*?)\]\((.*?)\)/, '![\1](../\2)')
    
    # Generate HTML from markdown using basic replacements
    html_content = convert_markdown_to_html(article_content)
    
    # Template variables
    template_vars = {
      'page.title' => front_matter['title'],
      'page.date' => DateTime.strptime(front_matter['date'], '%Y-%m-%d'),
      'page.reading_time' => front_matter['reading_time'] || '5 min read',
      'page.tags' => front_matter['tags'] || [],
      'page.image' => front_matter['image'],
      'content' => html_content,
      'site.title' => 'Adeyemi Aina'
    }
    
    # Create ERB template from layout
    template = ERB.new(@layout_template)
    
    # Replace template variables
    rendered = template.result(binding)
    
    # Write the HTML file
    output_file = markdown_file.gsub('.md', '.html')
    File.write(output_file, rendered)
    
    puts "Generated #{output_file}"
  rescue => e
    puts "Error rendering #{markdown_file}: #{e.message}"
  end
  
  private
  
  def convert_markdown_to_html(content)
    html = content
    
    # Headers
    html = html.gsub(/^### (.*)$/, '<h3>\1</h3>')
    html = html.gsub(/^## (.*)$/, '<h2>\1</h2>')
    html = html.gsub(/^# (.*)$/, '<h1>\1</h1>')
    
    # Bold and italic
    html = html.gsub(/\*\*(.*?)\*\*/, '<strong>\1</strong>')
    html = html.gsub(/\*(.*?)\*/, '<em>\1</em>')
    
    # Code blocks
    html = html.gsub(/```(\w+)?\n(.*?)\n```
/m, '<pre><code class="language-\1">\2</code></pre>')
    html = html.gsub(/```\n(.*?)\n```
/m, '<pre><code>\1</code></pre>')
    html = html.gsub(/`(.*?)`/, '<code>\1</code>')
    
    # Lists
    html = html.gsub(/^- (.*)$/, '<li>\1</li>')
    html = html.gsub(/(<li>.*<\/li>)/m) { |match| "<ul>\n#{match}\n</ul>" }
    
    # Line breaks
    html = html.gsub(/\n\n/, '</p><p>')
    html = html.gsub(/\n/, '<br/>')
    
    # Wrap in paragraph
    html = '<p>' + html + '</p>'
    
    html
  end
end

# Main script
if __FILE__ == $0
  renderer = ArticleRenderer.new
  
  # Find all markdown files in _articles directory
  Dir.glob('_articles/*.md').each do |markdown_file|
    renderer.render_article(markdown_file)
  end
  
  puts "Article regeneration complete!"
end
