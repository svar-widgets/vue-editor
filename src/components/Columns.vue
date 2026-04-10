<script setup>
defineOptions({ name: 'EditorColumnsColumns' });

import { computed } from 'vue';
import Editor from './FormEditor.vue';

const props = defineProps({
	editors: {},
	data: {},
	layout: {},
	errors: {},
	focus: {},
	onclick: { type: Function },
	onchange: { type: Function },
});

const columns = computed(() => {
	let cols = [];
	if (props.layout === 'columns') {
		cols = [
			{ ...props.editors, config: [] },
			{ ...props.editors, config: [] },
		];
		props.editors.config.forEach(field => {
			const index = field.column === 'left' ? 0 : 1;
			cols[index].config.push(field);
		});

		if (cols[0].config.length) {
			const obj = cols[0].config[0];
			if (obj.comp === 'text') {
				cols[0][0] = {
					...obj,
					css: 'title',
					label: '',
				};
			}
		}
	}
	return cols;
});
</script>

<template>
	<div v-if="props.layout === 'columns'" class="wx-cols">
		<div class="wx-left">
			<Editor
				:editors="columns[0]"
				:data="props.data"
				:errors="props.errors"
				:onclick="props.onclick"
				:onchange="props.onchange"
			/>
		</div>
		<div class="wx-right">
			<Editor
				:editors="columns[1]"
				:data="props.data"
				:focus="props.focus"
				:errors="props.errors"
				:onclick="props.onclick"
				:onchange="props.onchange"
			/>
		</div>
	</div>
	<Editor
		v-else
		:editors="props.editors"
		:data="props.data"
		:focus="props.focus"
		:errors="props.errors"
		:onclick="props.onclick"
		:onchange="props.onchange"
	/>
</template>

<style scoped>
.wx-cols {
	max-height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.wx-left {
	min-width: 640px;
	overflow-y: auto;
}
.wx-right {
	width: 364px;
	min-height: 400px;
	margin-left: 30px;
	background: var(--wx-background-alt);
	overflow-y: auto;
}
</style>
