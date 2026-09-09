<script setup>
defineOptions({ name: "EditorTinyMCE" });

import { ref, computed } from "vue";
import { Editor, registerEditorItem, TinyMCE } from "../../src";

registerEditorItem("tinymce", TinyMCE);

const records = [
	{
		id: 1,
		name: "welcome.html",
		content: `<h2>Welcome aboard!</h2>
<p>We are <strong>thrilled</strong> to have you join the team. Over the next few days you will meet your colleagues, set up your tools, and get a feel for how we work.</p>
<p>Take your time to settle in - and remember, <em>there are no silly questions</em>. Reach out whenever you need a hand.</p>
<p>Warm regards,<br /><strong>The People Team</strong></p>`,
	},
	{
		id: 2,
		name: "newsletter.html",
		content: `<h2>Monthly Update</h2>
<p>Here is a quick look at what shipped this month and what is coming next.</p>
<ul>
    <li><strong>New dashboard:</strong> a faster, cleaner overview of your projects.</li>
    <li><strong>Dark mode:</strong> now available in <em>Settings &rarr; Appearance</em>.</li>
    <li><strong>Bug fixes:</strong> dozens of small improvements across the app.</li>
</ul>
<p>As always, we would <em>love</em> to hear your feedback. Just hit reply and let us know what you think.</p>`,
	},
	{
		id: 3,
		name: "about.html",
		content: `<h2>About Us</h2>
<p>We build <strong>simple, reliable tools</strong> that help teams do their best work. Founded in a tiny garage, we now serve customers in <em>over forty countries</em>.</p>
<p>Our philosophy is straightforward: listen carefully, ship often, and always put the <strong>user first</strong>.</p>
<p><em>Thanks for being part of the journey.</em></p>`,
	},
];

const selectedId = ref(records[0].id);
const selected = computed(() => records.find(r => r.id === selectedId.value));

const values = ref({ ...records[0] });

const items = computed(() => [
	{
		comp: "tinymce",
		key: "content",
		label: "Content",
		fill: true,
	},
]);

function selectFile(record) {
	if (record.id === selectedId.value) return;
	selectedId.value = record.id;
	values.value = { ...record };
}

const refresh = ({ values: v }) => {
	values.value = { ...values.value, ...v };
	// keep the edited content so switching files preserves changes
	const record = records.find(r => r.id === selectedId.value);
	if (record) record.content = v.content;
};

const prevent = (e) => {
	e.stopPropagation();
	e.preventDefault();
};
</script>

<template>
	<div class="message">
		<template v-if="selected">{{ selected.name }} - {{ values.content.length }} chars</template>
	</div>

	<div class="files" @click="prevent">
		<button
			v-for="record in records"
			:key="record.id"
			class="demo-file"
			:class="{ active: record.id === selectedId }"
			@click="selectFile(record)"
		>
			{{ record.name }}
		</button>
	</div>

	<Editor
		v-if="selectedId"
		placement="sidebar"
		:auto-save="false"
		:items="items"
		:values="values"
		:onaction="() => (selectedId = 0)"
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

.files {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 20px;
	border-right: 1px solid #ddd;
}

.demo-file {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
	width: 200px;
	text-align: left;
	border: 1px solid transparent;
	border-radius: 4px;
	cursor: pointer;
	font: inherit;
}

.demo-file:hover {
	background-color: #e2e2e2;
}

.demo-file.active {
	background-color: #2196f3;
	color: #fff;
	font-weight: 600;
}
</style>
