<script setup>
defineOptions({ name: "EditorFullscreen" });

import { ref } from "vue";
import { getData } from "../data";
import { Editor, registerEditorItem } from "../../src";

import { Comments } from "@svar-ui/vue-comments";
import {
	Combo,
	ColorPicker,
	DatePicker,
	Slider,
	Button,
	MultiCombo,
} from "@svar-ui/vue-core";

registerEditorItem("combo", Combo);
registerEditorItem("color", ColorPicker);
registerEditorItem("date", DatePicker);
registerEditorItem("slider", Slider);
registerEditorItem("multiselect", MultiCombo);

registerEditorItem("comments", Comments);
registerEditorItem("comments", Comments, { readonly: true });

const { listItems, listData, users } = getData();
const items = [
	{
		comp: "comments",
		key: "comments",
		label: "Comments",
		users,
		activeUser: 1,
		column: "left",
	},
	...listItems,
];
const values = listData[0];

const message = ref("");
const visible = ref(true);

function handleClick({ item }) {
	message.value = "click: " + item.id;
	visible.value = false;
}

const placement = ref("fullscreen");
const layout = ref("columns");
const autoSave = ref(false);
const readonly = ref(false);
</script>

<template>
	<div class="message">{{ message }}</div>

	<div class="toolbar">
		<div class="item">
			<Button
				type="primary"
				text="Open editor: Manual save"
				:onclick="() => {
					placement = 'fullscreen';
					layout = 'columns';
					autoSave = false;
					readonly = false;

					visible = true;
				}"
			/>
		</div>
		<div class="item">
			<Button
				type=""
				text="Open editor: Auto-save"
				:onclick="() => {
					placement = 'fullscreen';
					layout = 'columns';
					autoSave = true;
					readonly = false;

					visible = true;
				}"
			/>
		</div>
		<div class="item">
			<Button
				type=""
				text="Open editor: Readonly"
				:onclick="() => {
					placement = 'fullscreen';
					layout = 'columns';
					readonly = true;

					visible = true;
				}"
			/>
		</div>
	</div>

	<Editor
		v-if="visible"
		:auto-save="autoSave"
		:placement="placement"
		:layout="layout"
		:readonly="readonly"
		:items="items"
		:values="values"
		:onaction="handleClick"
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
.toolbar {
	display: flex;
	flex-direction: row;
	padding: 10px;
}
.toolbar .item {
	margin-left: 20px;
}
</style>
