<script setup>
defineOptions({ name: "EditorForm" });

import { useAttrs } from 'vue';
import { Locale } from "@svar-ui/vue-core";
import en from "../en.js";

import Editor from "./FormEditor.vue";
import Values from "./Values.vue";

const props = defineProps({
	values: { default: () => ({}) },
	items: { default: () => [] },
	css: { default: '' },
	activeBatch: { default: null },
	focus: { default: false },
	autoSave: { default: true },
	readonly: { default: false },
});

const attrs = useAttrs();
</script>

<template>
	<Locale :words="en" :optional="true">
		<div class="wx-content">
			<Values
				:view="Editor"
				:values="props.values"
				:items="props.items"
				:css="props.css"
				:focus="props.focus"
				:active-batch="props.activeBatch"
				:auto-save="props.autoSave"
				:readonly="props.readonly"
				v-bind="attrs"
			>
				<slot v-if="$slots.default" />
			</Values>
		</div>
	</Locale>
</template>

<style scoped>
.wx-content {
	height: 100%;
	overflow-y: auto;
}
</style>
