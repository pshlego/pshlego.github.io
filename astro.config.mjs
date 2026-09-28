import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	site: "https://pshlego.github.io",
	trailingSlash: "always",
	// Pages from the previous Notion-based site that no longer exist.
	redirects: {
		"/posts/acl-2025-accept/": "/posts/helios/",
		"/posts/kdd-cup-2024-winner/": "/posts/kdd-cup-2024/",
		"/posts/oracle-labs-internship/": "/",
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
