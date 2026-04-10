<script setup>
import { ref } from 'vue';
import { getData } from "../data";
import { Editor } from "../../src";

import { registerEditorItem } from "../../src";
import {
	Combo,
	ColorPicker,
	DatePicker,
	Slider,
	MultiCombo,
} from "@svar-ui/vue-core";

registerEditorItem("combo", Combo);
registerEditorItem("color", ColorPicker);
registerEditorItem("date", DatePicker);
registerEditorItem("slider", Slider);
registerEditorItem("multiselect", MultiCombo);

const { listItems, listData } = getData();

const message = ref("");
function handleClick({ item }) {
	message.value = "click: " + item.id;
	selected.value = null;
}

const selected = ref(listData[0]);
const refresh = ({ values }) => {
	message.value = "update";

	// update data
	const ind = listData.findIndex(d => d.id === values.id);
	listData[ind] = values;
};
</script>

<template>
	<div class="message">{{ message }}</div>

	<div class="list">
		<div
			v-for="data in listData"
			:key="data.id"
			class="item"
			:class="{ active: selected?.id === data.id }"
			@click="selected = data"
		>
			<h4>{{ data.label }}</h4>
			<p>{{ data.description || "" }}</p>
			<sub>starts on: {{ data.start_date?.toLocaleDateString() || "" }}</sub>
		</div>
	</div>

	<Editor
		v-if="selected"
		placement="sidebar"
		:auto-save="false"
		:items="listItems"
		:values="selected"
		:onaction="handleClick"
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
.list {
	margin: 10px;
}
.item {
	margin: 10px;
	width: 360px;
	border: 1px solid #ccc;
	box-shadow: 0 0 5px #eee;
	padding: 0px 15px 10px 15px;
}
.item.active {
	border-left: 3px solid #2e51ff;
	box-shadow: 0 0 5px #aaa;
	padding-left: 13px;
}
</style>
