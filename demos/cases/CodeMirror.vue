<script setup>
defineOptions({ name: "EditorCodeMirror" });

import { ref, computed } from "vue";
import { Editor, registerEditorItem, CodeMirror } from "../../src";

registerEditorItem("code-mirror", CodeMirror);
registerEditorItem("code-mirror", CodeMirror, { readonly: true });

const records = [
	{
		id: 1,
		name: "app.js",
		language: "javascript",
		content: `import { createStore } from "./store.js";

const store = createStore({ todos: [], filter: "all" });

export function addTodo(text) {
    const todo = { id: Date.now(), text, done: false };
    store.update(state => ({ ...state, todos: [...state.todos, todo] }));
    return todo;
}

export function toggleTodo(id) {
    store.update(state => ({
        ...state,
        todos: state.todos.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ),
    }));
}

export function visibleTodos(state) {
    switch (state.filter) {
        case "active":
            return state.todos.filter(t => !t.done);
        case "done":
            return state.todos.filter(t => t.done);
        default:
            return state.todos;
    }
}`,
	},
	{
		id: 2,
		name: "spec.md",
		language: "markdown",
		content: `# Todo App Specification

A minimal task manager used as the reference demo for the code editor.

## Goals

- Add, toggle and remove tasks
- Persist tasks between sessions
- Filter by **all**, **active** or **done**

## Data model

| Field  | Type      | Description                |
| ------ | --------- | -------------------------- |
| id     | \`number\`  | Unique identifier          |
| text   | \`string\`  | Human readable description |
| done   | \`boolean\` | Completion flag            |

## Open questions

1. Should completed tasks auto-archive after 30 days?
2. Do we need multi-user support in v1?

> Note: keep the public API surface as small as possible.`,
	},
	{
		id: 3,
		name: "theme.css",
		language: "css",
		content: `:root {
    --color-bg: #ffffff;
    --color-surface: #f5f6f8;
    --color-text: #2a2a2a;
    --color-accent: #2196f3;
    --radius: 6px;
    --spacing: 8px;
}

.todo {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: calc(var(--spacing) * 1.5);
    background: var(--color-surface);
    border-radius: var(--radius);
    color: var(--color-text);
}

.todo--done {
    opacity: 0.5;
    text-decoration: line-through;
}

.todo button {
    margin-left: auto;
    border: none;
    border-radius: var(--radius);
    background: var(--color-accent);
    color: #fff;
    cursor: pointer;
}`,
	},
];

const selectedId = ref(records[0].id);
const selected = computed(() => records.find(r => r.id === selectedId.value));

const values = ref({ ...records[0] });

const items = computed(() => [
	{
		comp: "code-mirror",
		key: "content",
		label: "",
		fill: true,
		language: selected.value.language,
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
