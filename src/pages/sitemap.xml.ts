import type { APIContext } from "astro";
import { getAllTags, getNotes, getPublications, postPath, tagPath } from "@/lib/content";

export async function GET(context: APIContext) {
	const paths = [
		"/",
		"/about/",
		"/collections/publications/",
		"/collections/personal-notes/",
		"/tags/",
		...(await getPublications()).map((p) => postPath(p.id)),
		...(await getNotes()).map((n) => postPath(n.id)),
		...(await getAllTags()).map((t) => tagPath(t.name)),
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(p, context.site)}</loc></url>`).join("\n")}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
