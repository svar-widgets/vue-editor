<script setup>
defineOptions({ name: "EditorMultiField" });

import { ref } from "vue";
import { Editor, registerEditorItem } from "../../src";
import EventDates from "../custom/EventDates.vue";

registerEditorItem("event-dates", EventDates);

const items = [
	{ comp: "text", key: "name", label: "Name" },
	{
		comp: "event-dates",
		key: "dates",
		keys: ["start", "end", "isFullDay"],
		label: "Event dates",
		validation: v => !v.start || !v.end || v.end >= v.start,
		validationMessage: "End date must be after the start date",
	},
	{ comp: "textarea", key: "descr", label: "Description" },
];

const values = ref({
	name: "Project kickoff",
	start: new Date(2026, 5, 10, 9),
	end: new Date(2026, 5, 10, 11),
	isFullDay: false,
	descr: "Initial planning meeting",
});

const message = ref("");
function handleSave({ changes, values: next }) {
	message.value = `saved fields: ${changes.join(", ")}`;
	values.value = { ...values.value, ...next };
}
</script>

<template>
	<div style="padding: 10px; max-width: 700px;">
		<Editor
			:items="items"
			:values="values"
			:top-bar="false"
			:auto-save="true"
			:onsave="handleSave"
		/>
		<div v-if="message" class="status">{{ message }}</div>
	</div>
</template>

<style scoped>
.status {
	margin: 10px 20px;
	font-size: 14px;
	color: var(--wx-color-primary);
}
</style>
