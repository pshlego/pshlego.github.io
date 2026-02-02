#!/usr/bin/env node
/**
 * Setup script for Notion Publications collection
 *
 * Usage:
 *   NOTION_API_SECRET=your_secret node scripts/setup-notion-publications.js
 */

const { Client } = require("@notionhq/client");

const DATABASE_ID = "9c9c3c7c218c82fa975a016b5a42e26b";

async function main() {
    const notionApiSecret = process.env.NOTION_API_SECRET;

    if (!notionApiSecret) {
        console.error("Error: NOTION_API_SECRET environment variable is not set.");
        process.exit(1);
    }

    const notion = new Client({ auth: notionApiSecret });

    console.log("🚀 Setting up Notion Publications...\n");

    // First, get the database info to find the data source ID
    console.log("📋 Retrieving database info...");
    let dataSourceId;
    try {
        const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
        if (dbInfo.data_sources && dbInfo.data_sources.length > 0) {
            dataSourceId = dbInfo.data_sources[0].id;
            console.log(`Data source ID: ${dataSourceId}\n`);
        } else {
            console.error("❌ No data sources found in database");
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Failed to retrieve database:", error.message);
        process.exit(1);
    }

    // Query for existing pages using dataSources.query
    console.log("📋 Querying for existing pages...");
    let pages = [];
    try {
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            page_size: 1
        });
        pages = response.results;
        console.log(`Found ${pages.length} page(s)\n`);
    } catch (error) {
        console.error("❌ Failed to query database:", error.message);
        console.log("Continuing with default property names...\n");
    }

    // Analyze the first page to understand property structure
    let propertyNames = {
        title: "Name",
        collection: "Collection",
        published: "Published",
        slug: "Slug",
        excerpt: "Excerpt"
    };

    if (pages.length > 0) {
        const samplePage = pages[0];
        console.log("📋 Discovered properties from sample page:");
        for (const [name, prop] of Object.entries(samplePage.properties)) {
            console.log(`  - ${name}: ${prop.type}`);

            // Map property types to our expected properties
            if (prop.type === "title") {
                propertyNames.title = name;
            }
            if (prop.type === "select" && name.toLowerCase().includes("collection")) {
                propertyNames.collection = name;
            }
            if (prop.type === "checkbox" && name.toLowerCase().includes("publish")) {
                propertyNames.published = name;
            }
            // "Specific Slug" is the rich_text field that feeds into the Slug formula
            if (prop.type === "rich_text" && name.toLowerCase().includes("slug")) {
                propertyNames.slug = name;
            }
            if (prop.type === "rich_text" && name.toLowerCase() === "excerpt") {
                propertyNames.excerpt = name;
            }
        }
        console.log("");
    }

    console.log("Using property names:");
    console.log(`  Title: ${propertyNames.title}`);
    console.log(`  Collection: ${propertyNames.collection}`);
    console.log(`  Published: ${propertyNames.published}`);
    console.log(`  Slug: ${propertyNames.slug}`);
    console.log(`  Excerpt: ${propertyNames.excerpt}`);
    console.log("");

    // Sample publications to create
    const publications = [
        {
            title: "Planning in 16 Tokens: A Compact Discrete Tokenizer",
            slug: "planning-16-tokens",
            excerpt: `Jinsung Lee*, Sungho Park*, Suha Kwak
ICLR 2026 | oral
---
pdf: https://arxiv.org/abs/example1
project: https://example-project.github.io
code: https://github.com/example/repo1`
        },
        {
            title: "Multi-Modal Knowledge Graph Reasoning",
            slug: "multimodal-kg-reasoning",
            excerpt: `Sungho Park, Collaborator Name
NeurIPS 2025 | poster
---
pdf: https://arxiv.org/abs/example2
code: https://github.com/example/repo2`
        },
        {
            title: "Efficient Table Understanding with LLMs",
            slug: "efficient-table-llm",
            excerpt: `Sungho Park, Another Author
ACL 2025 | oral
---
pdf: https://arxiv.org/abs/example3`
        }
    ];

    console.log("📝 Creating sample publication pages...\n");

    for (const pub of publications) {
        console.log(`  Creating: "${pub.title}"...`);
        try {
            const properties = {
                [propertyNames.title]: {
                    title: [{ text: { content: pub.title } }]
                },
                [propertyNames.collection]: {
                    select: { name: "publications" }
                },
                [propertyNames.published]: {
                    checkbox: true
                },
                [propertyNames.slug]: {
                    rich_text: [{ text: { content: pub.slug } }]
                },
                [propertyNames.excerpt]: {
                    rich_text: [{ text: { content: pub.excerpt } }]
                }
            };

            await notion.pages.create({
                parent: { database_id: DATABASE_ID },
                properties: properties
            });
            console.log(`  ✅ Created successfully\n`);
        } catch (error) {
            console.error(`  ❌ Failed to create: ${error.message}`);
            if (error.body) {
                console.error(`     Details: ${JSON.stringify(error.body)}`);
            }
            console.log("");
        }
    }

    console.log("\n🎉 Setup complete!");
    console.log("\nNext steps:");
    console.log("1. Add FeaturedImage to each publication page in Notion manually");
    console.log("2. Run 'npm run dev' to preview the site");
    console.log("3. Check the home page for the Publications section");
}

main().catch(console.error);
