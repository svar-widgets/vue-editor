<script setup>
defineOptions({ name: "EditorComments" });

import { ref } from 'vue';
import { getData } from "../data";
import { Editor, registerEditorItem } from "../../src";

import { Comments } from "@svar-ui/vue-comments";
registerEditorItem("comments", Comments);

const { listItems, listData, users } = getData();
const listDataRef = ref(listData);

const demoItems = [
	listItems[0],
	{
		comp: "comments",
		key: "comments",
		label: "Comments",
		users,
		activeUser: 1,
	},
];

const message = ref("");
function handleClick({ item }) {
	message.value = "click: " + item.id;
	selected.value = null;
}

const selected = ref(listDataRef.value[0]);
const refresh = ({ values }) => {
	message.value = "update";

	// update data
	const ind = listDataRef.value.findIndex(d => d.id === values.id);
	listDataRef.value[ind] = values;
};

const select = id => {
	setTimeout(() => {
		selected.value = listDataRef.value.find(d => d.id === id);
	}, 100);
};
</script>

<template>
	<div class="message">{{ message }}</div>

	<div class="list">
		<div
			v-for="data in listDataRef"
			:key="data.id"
			class="item"
			:class="{ active: selected?.id === data.id }"
			@click="select(data.id)"
		>
			<h4>{{ data.label }}</h4>
			<p>{{ data.description || "" }}</p>
			<sub>starts on: {{ data.start_date.toLocaleDateString() }}</sub>
		</div>
	</div>

	<Editor
		v-if="selected"
		placement="sidebar"
		:auto-save="true"
		:items="demoItems"
		:values="selected"
		:focus="true"
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
