<script setup>
import { ref } from 'vue';
import { getData } from '../data';
import { Editor, registerEditorItem } from '../../src';
import { RestURL } from '@svar-ui/lib-data-provider';

import { Tasklist } from '@svar-ui/vue-tasklist';
import { Comments } from '@svar-ui/vue-comments';

registerEditorItem('tasks', Tasklist);
registerEditorItem('comments', Comments);

const commentsURL = new RestURL(
	'https://master--svar-comments-go--dev.webix.io/comments'
);
const tasksURL = new RestURL(
	'https://master--svar-tasklist-go--dev.webix.io/tasks'
);

const { listData, users } = getData();
const message = ref('');
function handleClick({ item }) {
	message.value = 'click: ' + item.id;
	selected.value = null;
}

const selected = ref(null);

const config = {
	placement: 'modal',
	layout: 'columns',
	autoSave: true,
	items: [
		{ comp: 'text', key: 'label', label: 'Name', column: 'left' },
		{
			comp: 'tasks',
			key: 'id',
			label: 'Tasks',
			ondata: v => tasksURL.path(v).get(),
			onchange: ({ action, task, id, originalValue: v }) =>
				tasksURL.path(v).save(action, task, id),
		},
		{
			comp: 'comments',
			key: 'id',
			label: 'Comments',
			users,
			activeUser: 1,
			column: 'left',
			ondata: v => commentsURL.path(v).get(),
			onchange: ({ action, comment, id, originalValue: v }) =>
				commentsURL.path(v).save(action, comment, id),
		},
	],
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
			<p>{{ data.description || '' }}</p>
		</div>
	</div>

	<Editor
		v-if="selected"
		v-bind="config"
		:values="selected"
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
