<script setup>
defineOptions({ name: "EditorUploads" });

import { ref } from "vue";
import { Editor, registerEditorItem, Attachments } from "../../src";

registerEditorItem("files", Attachments);
registerEditorItem("files", Attachments, { readonly: true });

let counter = 100;
// fake server: returns the permanent id after a delay,
// fails for files with "fail" in the name
const uploadURL = (file) =>
	new Promise((res, rej) =>
		setTimeout(() => {
			if (/fail/i.test(file.name)) rej(new Error("server error"));
			else res({ id: counter++, name: file.name, url: "#" });
		}, 800)
	);

const message = ref("");
const items = [
	{ comp: "text", key: "name", label: "Name" },
	{
		comp: "files",
		key: "files",
		label: "Attachments",
		uploadURL,
		onaction: (ev) => (message.value = `${ev.action}: ${ev.file.name}`),
	},
];

const values = ref({
	id: 1,
	name: "Annual report",
	files: [
		{ id: 1, name: "report-2025.pdf", url: "#" },
		{ id: 2, name: "summary.xlsx", url: "#" },
	],
});

const refresh = ({ values: v }) => {
	values.value = { ...values.value, ...v };
};
</script>

<template>
	<div class="message">{{ message }}</div>

	<p class="hint">
		Files upload on select (mock server, ~1s); a file with "fail" in its
		name shows the error state. Add/delete signals appear above.
	</p>

	<Editor
		placement="sidebar"
		:auto-save="true"
		:items="items"
		:values="values"
		:onsave="refresh"
	/>
</template>

<style scoped>
.message {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
}
.hint {
	margin: 10px;
	max-width: 400px;
}
</style>
