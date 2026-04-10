<script setup>
import { ref } from "vue";
import { getData } from "../data";
import { Editor } from "../../src";

const { itemsValidation: items, valuesValidation } = getData();

const visible = ref(true);
const values = ref(valuesValidation);

function handleClick({ item, changes }) {
	// need to check that there are changes and close editor after successful validation
	// otherwise, even if "save" event is not triggered, editor will be closed anyway
	// but we still can close editor if there are not any changes
	if (item.id === "save" && changes.length) return;
	visible.value = false;
}

function handleSave(ev) {
	values.value = ev.values;
	visible.value = false;
}
</script>

<template>
	<div class="data" @click="visible = true" :class="{ active: visible }">
		<span v-for="value in Object.values(values)" :key="value">{{ value }}</span>
	</div>

	<Editor
		v-if="visible"
		placement="sidebar"
		:auto-save="false"
		:items="items"
		:values="values"
		:onaction="handleClick"
		:onsave="handleSave"
	/>
</template>

<style scoped>
.data {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-left: 20px;
	width: 400px;
	border: var(--wx-border);
	border-radius: 3px;
	padding: 10px;
	margin: 20px;
}

.data.active {
	border: 1px solid var(--wx-color-primary);
}
</style>
