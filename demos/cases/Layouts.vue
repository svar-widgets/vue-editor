<script setup>
defineOptions({ name: "EditorLayouts" });

import { ref } from "vue";
import { getData } from "../data";
import { Editor, registerEditorItem } from "../../src";
import { Button } from "@svar-ui/vue-core";

import { Tasklist } from "@svar-ui/vue-tasklist";
import { Comments } from "@svar-ui/vue-comments";
registerEditorItem("tasks", Tasklist);
registerEditorItem("comments", Comments);

const { listData, users } = getData();

const config1 = {
	placement: "modal",
	layout: "columns",
	autoSave: false,
	items: [
		{ comp: "text", key: "name", label: "Name", column: "left" },
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{ comp: "tasks", key: "task", label: "Tasks" },
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
			column: "left",
		},
	],
};

const config2 = {
	placement: "modal",
	layout: "columns",
	autoSave: false,
	items: [
		{ comp: "text", key: "name", label: "Name", column: "left" },
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{ comp: "tasks", key: "task", label: "Tasks", column: "left" },
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
		},
	],
};

const config3 = {
	placement: "sidebar",
	autoSave: true,
	items: [
		{ comp: "text", key: "name", label: "Name" },
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{ comp: "tasks", key: "task", label: "Tasks" },
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
		},
	],
};

const config4 = {
	placement: "modal",
	autoSave: true,
	items: [
		{ comp: "text", key: "name", label: "Name" },
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{ comp: "tasks", key: "task", label: "Tasks" },
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
		},
	],
};

const visible = ref(true);
const config = ref(config1);
</script>

<template>
	<div class="toolbar">
		<div class="item">
			<Button
				type="primary"
				text="Open: Comments | Tasks"
				:onclick="() => {
					config = config1;
					visible = true;
				}"
			/>
		</div>
		<div class="item">
			<Button
				text="Open: Tasks | Comments"
				:onclick="() => {
					config = config2;
					visible = true;
				}"
			/>
		</div>

		<div class="item">
			<Button
				text="Open: Sidebar with scroll"
				:onclick="() => {
					config = config3;
					visible = true;
				}"
			/>
		</div>

		<div class="item">
			<Button
				text="Open: Modal with scroll"
				:onclick="() => {
					config = config4;
					visible = true;
				}"
			/>
		</div>
	</div>

	<Editor
		v-if="visible"
		v-bind="config"
		:values="listData[0]"
		:onaction="() => (visible = false)"
	/>
</template>

<style scoped>
.toolbar {
	display: flex;
	flex-direction: row;
	padding: 10px;
}
.toolbar .item {
	margin-left: 20px;
}
</style>
