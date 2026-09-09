import { createApp } from "vue";
import Demos from "./common/Index.vue";

import { Globals, Button, Segmented, Locale, Willow, WillowDark } from "@svar-ui/vue-core";

import "@svar/vue-core/style.css";
import "@svar/vue-toolbar/style.css";
import "@svar/vue-comments/style.css";
import "@svar/vue-tasklist/style.css";

import { router } from "./common/helpers.js";

const skins = [
	{ id: "willow", label: "Willow", component: Willow },
	{ id: "willow-dark", label: "Dark", component: WillowDark },
];

const app = createApp(Demos, {
	publicName: "Editor",
	skins,
	productTag: "editor",
	productLink: "editor",
	Globals,
	Button,
	Segmented,
	Locale,
});
app.use(router);
app.mount("#app");
