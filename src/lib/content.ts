import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "@/site.config";

export type Publication = CollectionEntry<"publications">;
export type Note = CollectionEntry<"notes">;
export type NewsItem = CollectionEntry<"news">;

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
	b.data.date.getTime() - a.data.date.getTime();

export async function getPublications(): Promise<Publication[]> {
	return (await getCollection("publications", ({ data }) => !data.draft)).sort(byDateDesc);
}

export async function getSelectedPublications(): Promise<Publication[]> {
	return (await getPublications())
		.filter((p) => p.data.selected !== undefined)
		.sort((a, b) => a.data.selected! - b.data.selected!);
}

export async function getNotes(): Promise<Note[]> {
	return (await getCollection("notes", ({ data }) => !data.draft)).sort(byDateDesc);
}

export async function getNews(): Promise<NewsItem[]> {
	return (await getCollection("news", ({ data }) => !data.draft)).sort(byDateDesc);
}

// Publications and notes share the /posts/<slug>/ namespace.
export const postPath = (id: string) => `/posts/${id}/`;

export const slugify = (s: string) =>
	s
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}]+/gu, "-")
		.replace(/^-+|-+$/g, "");

export const tagPath = (tag: string) => `/tags/${slugify(tag)}/`;

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
}

// Notion's tag palette, carried over so chips keep their colors.
export const TAG_COLORS = {
	gray: "bg-[#E3E2E0] dark:bg-[#5A5A5A]",
	brown: "bg-[#EEE0DA] dark:bg-[#603B2C]",
	orange: "bg-[#FADEC9] dark:bg-[#854C1D]",
	yellow: "bg-[#F9E4BC] dark:bg-[#835E33]",
	green: "bg-[#DBEDDB] dark:bg-[#2B593F]",
	blue: "bg-[#D3E5EF] dark:bg-[#28456C]",
	purple: "bg-[#E8DEEE] dark:bg-[#492F64]",
	pink: "bg-[#F5E0E9] dark:bg-[#69314C]",
	red: "bg-[#FFE2DD] dark:bg-[#6E3630]",
} as const;

export function tagColorClass(tag: string): string {
	const color = (site.tagColors as Record<string, keyof typeof TAG_COLORS>)[tag] ?? "gray";
	return TAG_COLORS[color];
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
	const counts = new Map<string, number>();
	for (const entry of [...(await getPublications()), ...(await getNotes())]) {
		for (const tag of entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => a.name.localeCompare(b.name));
}

// Short name shown on publications without an image, e.g. "HELIOS" from "HELIOS: ...".
export const shortTitle = (title: string) => title.split(":")[0]!.trim();
