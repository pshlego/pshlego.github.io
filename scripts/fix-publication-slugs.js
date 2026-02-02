#!/usr/bin/env node
/**
 * Fix slugs for the created publication pages
 * Sets "Specific Slug" property which the Slug formula reads from
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

    console.log("🔧 Fixing publication slugs...\n");

    // Get data source ID
    const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const dataSourceId = dbInfo.data_sources[0].id;

    // Query for publications
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
            property: "Collection",
            select: {
                equals: "publications"
            }
        }
    });

    const slugMap = {
        "Planning in 16 Tokens: A Compact Discrete Tokenizer": "planning-16-tokens",
        "Multi-Modal Knowledge Graph Reasoning": "multimodal-kg-reasoning",
        "Efficient Table Understanding with LLMs": "efficient-table-llm"
    };

    console.log(`Found ${response.results.length} publication pages\n`);

    for (const page of response.results) {
        const title = page.properties.Page?.title?.[0]?.plain_text || "";
        const slug = slugMap[title];

        if (slug) {
            console.log(`Updating slug for "${title}" to "${slug}"...`);
            try {
                await notion.pages.update({
                    page_id: page.id,
                    properties: {
                        "Specific Slug": {
                            rich_text: [{ text: { content: slug } }]
                        }
                    }
                });
                console.log("  ✅ Done\n");
            } catch (error) {
                console.error(`  ❌ Failed: ${error.message}\n`);
            }
        }
    }

    console.log("🎉 Slugs fixed!");
}

main().catch(console.error);
