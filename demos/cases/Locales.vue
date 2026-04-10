<script setup>
defineOptions({ name: "EditorLocales" });

import { ref } from 'vue';
import { Locale, Segmented, Button } from '@svar-ui/vue-core';
import { Editor } from '../../src';

import { de, cn, en } from '@svar-ui/editor-locales';
import { de as deCore, cn as cnCore, en as enCore } from '@svar-ui/core-locales';

const items = [
	{
		comp: 'text',
		key: 'firstName',
		label: 'First name',
		required: true,
	},
	{
		comp: 'text',
		key: 'lastName',
		label: 'Last name',
		required: true,
	},
	{ comp: 'checkbox', key: 'admin', label: 'Is Admin' },
	{ comp: 'checkbox', key: 'guest', label: 'Is Guest' },
	{ comp: 'textarea', key: 'description', label: 'Description' },
];

const values = {
	firstName: 'John',
	lastName: 'Doe',
	admin: false,
	guest: true,
};

const langs = [
	{ id: 'en', label: 'EN' },
	{ id: 'de', label: 'DE' },
	{ id: 'cn', label: 'CN' },
];
const lang = ref('en');
const readonly = ref(undefined);
const visible = ref(undefined);

const getWords = lang => {
	if (lang == 'en') return { ...enCore, ...en };
	if (lang == 'cn') return { ...cnCore, ...cn };
	if (lang == 'de') return { ...deCore, ...de };
};

function handleClick() {
	visible.value = false;
}
</script>

<template>
	<div class="toolbar">
		<Segmented :options="langs" v-model:value="lang" />
		&nbsp;
		<Button
			css="item"
			type="primary"
			text="Open sidebar: Manual save"
			:onclick="() => {
				readonly = false;
				visible = true;
			}"
		/>
		&nbsp;
		<Button
			css="item"
			type="secondary"
			text="Open sidebar: Readonly"
			:onclick="() => {
				readonly = true;
				visible = true;
			}"
		/>
	</div>
	<div style="margin: auto; max-width: 700px; margin-top: 40px;">
		<Locale :words="getWords(lang)" :key="lang">
			<Editor :items="items" :values="values" :top-bar="false" />
			<Editor
				v-if="visible"
				placement="sidebar"
				:readonly="readonly"
				:items="items"
				:values="values"
				:onaction="handleClick"
			/>
		</Locale>
	</div>
</template>

<style scoped>
.toolbar {
	display: flex;
	flex-direction: row;
	padding: 10px;
}
:deep(.toolbar .item) {
	margin-left: 20px;
}
</style>
