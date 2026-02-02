#!/usr/bin/env node
/**
 * Update Home page with profile section (Column List) and Updates section
 * Matches reference site: jinsingsangsung.github.io
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

    console.log("🏠 Updating Home page with profile section...\n");

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
        console.error("❌ Home page not found!");
        process.exit(1);
    }

    const homePage = response.results[0];
    const pageId = homePage.id;
    console.log(`Found Home page: ${pageId}\n`);

    // Step 1: Delete existing blocks
    console.log("🗑️  Clearing existing content...");
    const existingBlocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100
    });

    for (const block of existingBlocks.results) {
        try {
            await notion.blocks.delete({ block_id: block.id });
        } catch (e) {
            console.log(`   Could not delete block: ${e.message}`);
        }
    }
    console.log("   Done!\n");

    // Step 2: Create Column List for profile section
    console.log("📝 Creating profile section with columns...\n");

    // First, create the column list
    const columnListResponse = await notion.blocks.children.append({
        block_id: pageId,
        children: [
            {
                object: "block",
                type: "column_list",
                column_list: {
                    children: [
                        // Column 1: Text content (larger)
                        {
                            object: "block",
                            type: "column",
                            column: {
                                children: [
                                    {
                                        object: "block",
                                        type: "heading_2",
                                        heading_2: {
                                            rich_text: [
                                                { type: "text", text: { content: "Hi, I'm Sungho" } }
                                            ]
                                        }
                                    },
                                    {
                                        object: "block",
                                        type: "paragraph",
                                        paragraph: {
                                            rich_text: [
                                                { type: "text", text: { content: "I am currently a Ph.D candidate at " } },
                                                {
                                                    type: "text",
                                                    text: { content: "POSTECH", link: { url: "https://postech.ac.kr" } },
                                                    annotations: { bold: true }
                                                },
                                                { type: "text", text: { content: ", where I am having fun doing research!" } }
                                            ]
                                        }
                                    },
                                    {
                                        object: "block",
                                        type: "paragraph",
                                        paragraph: {
                                            rich_text: [
                                                { type: "text", text: { content: "I am interested in " } },
                                                {
                                                    type: "text",
                                                    text: { content: "Natural Language Processing" },
                                                    annotations: { bold: true, italic: true }
                                                },
                                                { type: "text", text: { content: ", " } },
                                                {
                                                    type: "text",
                                                    text: { content: "Knowledge Graphs" },
                                                    annotations: { bold: true }
                                                },
                                                { type: "text", text: { content: ", and " } },
                                                {
                                                    type: "text",
                                                    text: { content: "Table Understanding" },
                                                    annotations: { bold: true }
                                                },
                                                { type: "text", text: { content: "." } }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        // Column 2: Profile image (smaller)
                        {
                            object: "block",
                            type: "column",
                            column: {
                                children: [
                                    {
                                        object: "block",
                                        type: "paragraph",
                                        paragraph: {
                                            rich_text: [{ type: "text", text: { content: "" } }]
                                        }
                                    },
                                    {
                                        object: "block",
                                        type: "paragraph",
                                        paragraph: {
                                            rich_text: [
                                                { type: "text", text: { content: "📷 Add your profile image here in Notion" } }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    });

    // Step 3: Add Updates section with toggle
    console.log("📝 Creating Updates section...\n");

    await notion.blocks.children.append({
        block_id: pageId,
        children: [
            // Updates Heading
            {
                object: "block",
                type: "heading_2",
                heading_2: {
                    rich_text: [{ type: "text", text: { content: "Updates" } }]
                }
            },
            // Toggle for Past notices
            {
                object: "block",
                type: "toggle",
                toggle: {
                    rich_text: [
                        {
                            type: "text",
                            text: { content: "Past notices" },
                            annotations: { bold: true }
                        }
                    ],
                    children: [
                        // Sample update callout
                        {
                            object: "block",
                            type: "callout",
                            callout: {
                                rich_text: [
                                    { type: "text", text: { content: "📅 Feb 2, 2026\n" } },
                                    { type: "text", text: { content: "Website launched with new design!" } }
                                ],
                                icon: { type: "emoji", emoji: "💡" },
                                color: "yellow_background"
                            }
                        },
                        {
                            object: "block",
                            type: "callout",
                            callout: {
                                rich_text: [
                                    { type: "text", text: { content: "📅 Jan 15, 2026\n" } },
                                    { type: "text", text: { content: "New paper accepted to ACL 2026!" } }
                                ],
                                icon: { type: "emoji", emoji: "🎉" },
                                color: "green_background"
                            }
                        }
                    ]
                }
            },
            // Divider
            {
                object: "block",
                type: "divider",
                divider: {}
            }
        ]
    });

    console.log("✅ Home page updated!\n");
    console.log("📌 Next steps in Notion:");
    console.log("1. Replace the placeholder with your actual profile image");
    console.log("2. Adjust column widths by dragging the border between columns");
    console.log("3. Update the intro text with your actual information");
    console.log("4. Add real updates to the 'Past notices' toggle");
    console.log("\n🎉 Done!");
}

main().catch(console.error);
