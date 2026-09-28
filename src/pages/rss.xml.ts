import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getNews, getNotes, getPublications, postPath } from "@/lib/content";
import { site } from "@/site.config";

export async function GET(context: APIContext) {
	const pubs = await getPublications();
	const notes = await getNotes();
	const news = await getNews();
	const items = [
		...pubs.map((p) => ({
			title: p.data.title,
			pubDate: p.data.date,
			link: postPath(p.id),
			description: `${p.data.authors.join(", ")}. ${p.data.venue}.`,
			categories: p.data.tags,
		})),
		...notes.map((n) => ({
			title: n.data.title,
			pubDate: n.data.date,
			link: postPath(n.id),
			description: n.data.description ?? "",
			categories: n.data.tags,
		})),
		...news.map((n) => ({
			title: `News: ${n.data.title}`,
			pubDate: n.data.date,
			link: n.data.link ?? "/",
			description: n.body ?? "",
		})),
	].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: site.title,
		description: site.description,
		site: context.site!,
		items,
	});
}
