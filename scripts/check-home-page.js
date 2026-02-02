#!/usr/bin/env node
/**
 * Check if Home page exists and has the correct configuration
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

    console.log("🔍 Checking Home page...\n");

    // Get data source ID
    const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const dataSourceId = dbInfo.data_sources[0].id;

    // Query all pages
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        page_size: 100
    });

    console.log(`Found ${response.results.length} pages:\n`);

    for (const page of response.results) {
        const title = page.properties.Page?.title?.[0]?.plain_text || "(untitled)";
        const slug = page.properties.Slug?.formula?.string || page.properties["Specific Slug"]?.rich_text?.[0]?.plain_text || "";
        const collection = page.properties.Collection?.select?.name || "";
        const published = page.properties.Published?.checkbox || false;

        console.log(`- "${title}"`);
        console.log(`  Slug: ${slug || "(none)"}`);
        console.log(`  Collection: ${collection || "(none)"}`);
        console.log(`  Published: ${published}`);
        console.log("");
    }
}

main().catch(console.error);
