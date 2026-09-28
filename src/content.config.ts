import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Every piece of site content lives in src/content/ as Markdown.
// Edit or add a file there, push to main, and GitHub Actions redeploys the site.

// src/content/publications/<slug>.md  ->  /posts/<slug>/
const publications = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			authors: z.array(z.string()).min(1),
			// Venue line, e.g. "ACL 2025 | Main Conference".
			venue: z.string(),
			// Optional award, shown after the venue with a trophy.
			award: z.string().optional(),
			// Used for ordering (newest first). Acceptance / publication date.
			date: z.coerce.date(),
			tags: z.array(z.string()).default([]),
			// Path relative to the Markdown file, e.g. ../../assets/publications/helios.png
			image: image().optional(),
			links: z
				.object({
					pdf: z.string().url().optional(),
					project: z.string().url().optional(),
					code: z.string().url().optional(),
				})
				.default({}),
			// Set 1, 2, 3, ... to show on the home page under "Selected Publications", in that order.
			selected: z.number().int().positive().optional(),
			draft: z.boolean().default(false),
		}),
});

// src/content/news/<anything>.md — one file per news item on the home page.
const news = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		// Optional link for the title: a site path ("/posts/helios/") or a full URL.
		link: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

// src/content/notes/<slug>.md  ->  /posts/<slug>/
const notes = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

// src/content/pages/home.md (intro on the home page) and about.md (/about/).
const pages = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			photo: image().optional(),
		}),
});

export const collections = { publications, news, notes, pages };
