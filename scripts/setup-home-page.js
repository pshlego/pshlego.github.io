#!/usr/bin/env node
/**
 * Setup/Check Home page in Notion
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

    console.log("🏠 Checking Home page...\n");

    // Get data source ID
    const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const dataSourceId = dbInfo.data_sources[0].id;

    // Find Home page
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: "home"
                }
            }
        }
    });

    if (response.results.length === 0) {
        console.log("❌ Home page not found. Creating one...\n");

        // Create Home page
        await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {
                "Page": {
                    title: [{ text: { content: "Home" } }]
                },
                "Collection": {
                    select: { name: "main" }
                },
                "Published": {
                    checkbox: true
                },
                "Specific Slug": {
                    rich_text: [{ text: { content: "home" } }]
                }
            }
        });
        console.log("✅ Home page created!\n");
    } else {
        const homePage = response.results[0];
        console.log("✅ Home page found!");
        console.log(`   Page ID: ${homePage.id}`);
        console.log(`   Title: ${homePage.properties.Page?.title?.[0]?.plain_text || "(none)"}`);
        console.log(`   Collection: ${homePage.properties.Collection?.select?.name || "(none)"}`);
        console.log(`   Published: ${homePage.properties.Published?.checkbox || false}`);
        console.log("");

        // Get the page content (blocks)
        console.log("📄 Fetching page content...\n");
        try {
            const blocks = await notion.blocks.children.list({
                block_id: homePage.id,
                page_size: 50
            });

            if (blocks.results.length === 0) {
                console.log("   Page is empty. You should add content in Notion:\n");
                console.log("   Recommended structure:");
                console.log("   ├── Column List (for profile section)");
                console.log("   │   ├── Column 1: Profile Image");
                console.log("   │   └── Column 2: Introduction text");
                console.log("   ├── Heading 2: About");
                console.log("   │   └── Paragraph: About text...");
                console.log("   └── Heading 2: Research Interests");
                console.log("       └── Bulleted List: Interest items...");
            } else {
                console.log(`   Found ${blocks.results.length} blocks:\n`);
                for (const block of blocks.results) {
                    let content = "";
                    if (block.type === "paragraph" && block.paragraph?.rich_text?.[0]) {
                        content = block.paragraph.rich_text[0].plain_text.slice(0, 50) + "...";
                    } else if (block.type === "heading_1" && block.heading_1?.rich_text?.[0]) {
                        content = block.heading_1.rich_text[0].plain_text;
                    } else if (block.type === "heading_2" && block.heading_2?.rich_text?.[0]) {
                        content = block.heading_2.rich_text[0].plain_text;
                    } else if (block.type === "heading_3" && block.heading_3?.rich_text?.[0]) {
                        content = block.heading_3.rich_text[0].plain_text;
                    } else if (block.type === "callout" && block.callout?.rich_text?.[0]) {
                        content = block.callout.rich_text[0].plain_text.slice(0, 50) + "...";
                    }
                    console.log(`   - ${block.type}${content ? `: "${content}"` : ""}`);
                }
            }
        } catch (error) {
            console.error("   Error fetching blocks:", error.message);
        }
    }

    console.log("\n🎉 Done!");
}

main().catch(console.error);
