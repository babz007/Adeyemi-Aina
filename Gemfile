source "https://rubygems.org"

# Hello! This is Jekyll's Gemfile. If you're looking at this file, you might be
# confused as to what's going on. You'll need a little Ruby knowledge to grok the
# parts that are relevant to you.

# We'd strongly recommend reading Bundler's Getting Started guide since most of
# this file is explained there: https://bundler.io/guides/bundler_setup.html

# This file represents a gemset of version 2 or higher.

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# Jekyll configuration
gem "jekyll", "~> 4.3"

# specify what group groups we want
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library as platform-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "x64-mingw32", ">= 3.1", "~> 3.1"
end

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :mswin, :x64_mingw]

# Serving local files with a catch-all route that provides authentication for
# pushing arbitrary files to the repository
gem "webrick", "~> 1.7"

# GitHub Pages compatible
gem "github-pages", group: :jekyll_plugins
