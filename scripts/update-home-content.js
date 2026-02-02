#!/usr/bin/env node
/**
 * Update Home page content with personal academic homepage structure
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

    console.log("🏠 Updating Home page content...\n");

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

    // Step 2: Add new content blocks
    console.log("📝 Adding new content...\n");

    const newBlocks = [
        // Profile Section - Callout with intro
        {
            object: "block",
            type: "callout",
            callout: {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: "👋 Welcome! I'm "
                        }
                    },
                    {
                        type: "text",
                        text: {
                            content: "Sungho Park"
                        },
                        annotations: {
                            bold: true
                        }
                    },
                    {
                        type: "text",
                        text: {
                            content: ", a PhD student at POSTECH. My research focuses on Natural Language Processing, Knowledge Graphs, and Table Understanding."
                        }
                    }
                ],
                icon: {
                    type: "emoji",
                    emoji: "🎓"
                },
                color: "gray_background"
            }
        },
        // Divider
        {
            object: "block",
            type: "divider",
            divider: {}
        },
        // About Section
        {
            object: "block",
            type: "heading_2",
            heading_2: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "About" }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "paragraph",
            paragraph: {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: "I am a PhD student in the Department of Computer Science and Engineering at POSTECH (Pohang University of Science and Technology), advised by Prof. Suha Kwak. My research interests lie at the intersection of natural language processing, knowledge representation, and machine learning."
                        }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "paragraph",
            paragraph: {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: "Before starting my PhD, I received my Bachelor's degree in Computer Science from POSTECH."
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
        },
        // Research Interests Section
        {
            object: "block",
            type: "heading_2",
            heading_2: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "Research Interests" }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "Natural Language Processing" },
                        annotations: { bold: true }
                    },
                    {
                        type: "text",
                        text: { content: " - Large Language Models, Text Understanding" }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "Knowledge Graphs" },
                        annotations: { bold: true }
                    },
                    {
                        type: "text",
                        text: { content: " - Multi-modal Reasoning, Knowledge Representation" }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "Table Understanding" },
                        annotations: { bold: true }
                    },
                    {
                        type: "text",
                        text: { content: " - Structured Data Processing, Table QA" }
                    }
                ]
            }
        },
        // Divider
        {
            object: "block",
            type: "divider",
            divider: {}
        },
        // Contact Section
        {
            object: "block",
            type: "heading_2",
            heading_2: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "Contact" }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "paragraph",
            paragraph: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "📧 Email: " }
                    },
                    {
                        type: "text",
                        text: {
                            content: "shpark@dblab.postech.ac.kr",
                            link: { url: "mailto:shpark@dblab.postech.ac.kr" }
                        }
                    }
                ]
            }
        },
        {
            object: "block",
            type: "paragraph",
            paragraph: {
                rich_text: [
                    {
                        type: "text",
                        text: { content: "🐙 GitHub: " }
                    },
                    {
                        type: "text",
                        text: {
                            content: "github.com/pshlego",
                            link: { url: "https://github.com/pshlego" }
                        }
                    }
                ]
            }
        }
    ];

    try {
        await notion.blocks.children.append({
            block_id: pageId,
            children: newBlocks
        });
        console.log("✅ Content added successfully!\n");
    } catch (error) {
        console.error("❌ Error adding content:", error.message);
        if (error.body) {
            console.error("Details:", JSON.stringify(error.body, null, 2));
        }
        process.exit(1);
    }

    console.log("🎉 Home page updated!");
    console.log("\nYou can now:");
    console.log("1. Open Notion and add a profile image");
    console.log("2. Customize the text content as needed");
    console.log("3. Run 'npm run dev' to preview");
}

main().catch(console.error);
