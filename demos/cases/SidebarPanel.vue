<script setup>
import { getData } from "../data";
import { Editor } from "../../src";
import { Button } from "@svar-ui/vue-core";
import { ref } from "vue";

const { items, values } = getData();

const message = ref("");
const visible = ref(true);

function handleClick({ item }) {
	message.value = "click: " + item.id;
	visible.value = false;
}

const placement = ref("sidebar");
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
					placement = 'sidebar';
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
					placement = 'sidebar';
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
					placement = 'sidebar';
					readonly = true;

					visible = true;
				}"
			/>
		</div>
	</div>

	<Editor
		v-if="visible"
		:placement="placement"
		:auto-save="autoSave"
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
