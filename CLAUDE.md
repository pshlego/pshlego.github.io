# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a Jekyll-based academic website using the **al-folio** theme. The site is designed for academics to showcase their work, publications, and profile.

### Key Components

- **Jekyll Static Site Generator**: Uses Jekyll with Liquid templating for dynamic content generation
- **Academic Theme**: Based on al-folio theme optimized for academic portfolios
- **Ruby/Jekyll Ecosystem**: Built with Ruby gems and Jekyll plugins for extended functionality
- **GitHub Pages Deployment**: Automatically deploys via GitHub Actions to `gh-pages` branch

### Directory Structure

- `_config.yml` - Main Jekyll configuration file with site settings, plugin configuration, and theme options
- `_pages/` - Main site pages (about, CV, publications, projects, etc.)
- `_posts/` - Blog posts with academic content features
- `_projects/` - Project portfolio items  
- `_layouts/` - Jekyll layout templates (includes distill.pub style layouts)
- `_includes/` - Reusable template components
- `_data/` - YAML data files (CV data, repositories, social links)
- `_bibliography/` - BibTeX files for publications (papers.bib)
- `_sass/` - SCSS stylesheets and theme customizations
- `assets/` - Static assets (CSS, JS, images, PDFs, fonts)
- `_plugins/` - Custom Jekyll plugins for extended functionality

## Common Development Commands

### Local Development
```bash
# Using Docker (Recommended)
docker compose pull && docker compose up

# Using Docker slim version (faster)
docker compose -f docker-compose-slim.yml up

# Legacy local setup (requires Ruby/Bundler)
bundle install && bundle exec jekyll serve
```

### Build and Deploy
```bash
# Build static site
bundle exec jekyll build

# Build with CSS purging (for production)
bundle exec jekyll build && purgecss -c purgecss.config.js

# Manual deploy trigger (via GitHub Actions)
# Go to Actions -> Deploy -> Run workflow
```

### Code Quality
```bash
# Format code with Prettier
npx prettier --write .

# No specific linting commands defined in package.json
```

## Key Configuration Files

- `_config.yml` - Jekyll configuration including plugins, scholar settings, theme options
- `Gemfile` - Ruby gem dependencies for Jekyll plugins
- `package.json` - Node.js dependencies (minimal - only Prettier for formatting)
- `docker-compose.yml` - Docker setup for local development
- `purgecss.config.js` - CSS optimization for production builds

## Academic Features

- **Publications**: Automatic generation from BibTeX files using jekyll-scholar
- **CV Generation**: Supports both JSON Resume format and YAML data
- **Math Support**: MathJax integration for mathematical content
- **Code Highlighting**: Syntax highlighting with Jekyll/Rouge
- **Blog Posts**: Academic blog with Distill.pub styling support
- **Project Portfolio**: Responsive grid layout for research projects
- **Bibliography Search**: Client-side search through publications

## Development Notes

- Site runs on Jekyll with extensive plugin ecosystem
- Uses Bootstrap and custom SCSS for styling
- Responsive design with light/dark mode support
- Extensive third-party library integration (MathJax, Chart.js, Plotly, etc.)
- SEO and social media preview optimization built-in
- All content is markdown-based with YAML front matter