<script setup>
defineOptions({ name: "EditorEditor" });

import { useAttrs } from "vue";
import { Locale } from "@svar-ui/vue-core";
import { en } from "@svar-ui/editor-locales";

import Layout from "./Layout.vue";
import Values from "./Values.vue";

// incoming parameters
const props = defineProps({
	values: { default: () => ({}) },
	items: { default: () => [] },
	css: { default: "" },
	activeBatch: { default: null },
	topBar: { default: true },
	bottomBar: { default: true },
	focus: { default: false },
	autoSave: { default: false },
	layout: { default: "default" },
	readonly: { default: false },
	placement: { default: "inline" },
});

const attrs = useAttrs();
</script>

<template>
	<Locale :words="en" :optional="true">
		<Values
			:view="Layout"
			:values="props.values"
			:items="props.items"
			:css="props.css"
			:active-batch="props.activeBatch"
			:top-bar="props.topBar"
			:bottom-bar="props.bottomBar"
			:focus="props.focus"
			:auto-save="props.autoSave"
			:layout="props.layout"
			:readonly="props.readonly"
			:placement="props.placement"
			v-bind="attrs"
		>
			<slot v-if="$slots.default" />
		</Values>
	</Locale>
</template>
