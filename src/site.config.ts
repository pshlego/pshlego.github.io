export const site = {
	title: "Sungho Park’s Personal Homepage",
	description: "Personal homepage of Sungho Park, Ph.D. student at POSTECH.",
	author: "Sungho Park",
	lang: "en",
	// Occurrences of this name in author lists are shown in bold.
	highlightAuthor: "Sungho Park",
	// Number of news items shown before the "Past notices" toggle.
	newsCount: 3,
	nav: [
		{ title: "Home", path: "/" },
		{ title: "About", path: "/about/" },
		{ title: "Publications", path: "/collections/publications/" },
		{ title: "Personal Notes", path: "/collections/personal-notes/" },
	],
	socials: [
		{ label: "Email", icon: "email", href: "mailto:shpark@dblab.postech.ac.kr" },
		{ label: "Github", icon: "github", href: "https://github.com/pshlego" },
		{
			label: "This-github-repo",
			icon: "this-github-repo",
			href: "https://github.com/pshlego/pshlego.github.io",
		},
	],
	// Tag chip colors (keys of TAG_COLORS in src/lib/content.ts); unlisted tags get "gray".
	tagColors: {
		"Multihop QA": "pink",
		"Table-Text QA": "orange",
		Benchmark: "yellow",
		KGQA: "red",
		IR: "gray",
		"Open-domain QA": "gray",
		Agents: "blue",
	},
} as const;
