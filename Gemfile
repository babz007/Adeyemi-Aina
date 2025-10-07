source "https://rubygems.org"

# GitHub Pages compatible Jekyll configuration
gem "github-pages", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library as platform-specific gems
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "x64-mingw32", ">= 3.1", "~> 3.1"
end

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:windows]

# Serving local files with a catch-all route that provides authentication for
# pushing arbitrary files to the repository
gem "webrick", "~> 1.7"
