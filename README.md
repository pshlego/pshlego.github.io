# Sungho Park - Personal Website

Personal academic website built with [Webtrotion](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog) (Astro + Notion CMS).

## Setup Instructions

### 1. Notion Setup

1. **Create a Notion Integration**:
   - Go to [Notion Developers](https://www.notion.so/my-integrations)
   - Create a new integration
   - Copy the "Internal Integration Secret" (starts with `secret_`)

2. **Create a Notion Database**:
   - Duplicate the [Webtrotion Notion Template](https://nerdymomocat-templates.github.io/webtrotion-astro-notion-cms-website-blog/)
   - Share your database with your integration (click "..." → "Add connections" → select your integration)

3. **Get Database/Data Source ID**:
   - Find your Data Source ID at [Notion API Reference](https://developers.notion.com/reference/retrieve-a-data-source#finding-a-data-source-id)
   - Or use the Database ID from the URL: `notion.so/{workspace}/{database-id}?...`

4. **Update Configuration**:
   - Edit `constants-config.json5`
   - Add your `data-source-id` or `database-id` in the `notion` section

### 2. GitHub Setup

1. **Add Notion Secret to GitHub**:
   - Go to Repository Settings → Secrets and variables → Actions
   - Add a new secret: `NOTION_API_SECRET` with your Notion integration token

2. **Enable GitHub Pages**:
   - Go to Repository Settings → Pages
   - Set Source to "GitHub Actions"

### 3. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Note**: For local development, create a `.env` file with:
```
NOTION_API_SECRET=your_notion_secret_here
```

## Color Palette

| Usage | Hex | Description |
|-------|-----|-------------|
| Primary | #013328 | Deep green |
| Secondary | #100C0D | Almost black |
| Accent | #CC8B65 | Terracotta |
| Background | #E3DCD2 | Warm beige |

## Content Migration

Your previous Jekyll site content has been backed up in the `backup-jekyll-original` branch. Key information:

- **Profile**: Sungho Park, Ph.D. student at Data Systems Lab @ POSTECH
- **Email**: shpark@dblab.postech.ac.kr
- **Research Focus**: Agentic AI, Multi-modal QA, Neural Information Retrieval

### Publications to migrate to Notion:
1. **SPARTA** (2025, Submitted) - Tree-Structured Multi-hop QA
2. **SAFE** (EMNLP 2025) - Knowledge Graph Querying
3. **HELIOS** (ACL 2025) - Table-Text Retrieval
4. **KDD Cup 2024** - RAG Framework (Winner)

## Credits

Built with [Webtrotion](https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog) by [Nerdy Momo Cat](https://ko-fi.com/nerdymomocat).

## License

[MIT License](LICENSE)
