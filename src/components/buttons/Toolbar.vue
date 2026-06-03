<script setup>
import { Toolbar } from "@svar-ui/vue-toolbar";
import { toRaw } from "vue";

defineOptions({ name: "EditorToolbar" });

const props = defineProps({
	items: {},
	values: { default: null },
	top: { default: true },
	onclick: { type: Function },
	onchange: { type: Function },
	css: { default: "" },
	layout: { default: "row" },
});

const onchange = ({ item, value }) => {
	props.onchange?.({ key: item.key, value });
};
</script>

<template>
	<div
		v-if="items.length"
		class="wx-editor-toolbar"
		:class="[css, { 'wx-topbar': top, 'wx-bottom': !top }]"
	>
		<Toolbar
			:items="items"
			:values="toRaw(values)"
			:onclick="onclick"
			:onchange="onchange"
			:layout="layout"
		/>
	</div>
</template>

<style scoped>
.wx-editor-toolbar {
	padding: 0 20px;
}

.wx-editor-toolbar :deep(.toolbar) {
	padding: 0;
	gap: 4px;
}

.wx-editor-toolbar :deep(.toolbar .tb-element) {
	padding: 0;
}

.wx-topbar {
	margin-bottom: 10px;
}
.wx-bottom {
	margin-top: 10px;
}
</style>
