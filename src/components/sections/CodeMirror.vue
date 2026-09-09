<script setup>
/* global codemirror */
import { ref, inject, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { loadJS } from "./loader";
import { uid } from "@svar-ui/lib-dom";

const props = defineProps({
	value: {},
	onchange: { type: Function },
	focus: { default: false },
	theme: { default: "" },
	language: { default: "javascript" },
	readonly: { default: false },
});

const tempID = `cm-${uid()}`;

const wxSkin = inject("wx-theme", "");
const detectTheme = () => {
	if (
		wxSkin === "willow-dark" ||
		(!wxSkin && document.body.classList.contains("wx-willow-dark-theme"))
	)
		return "dark";
	return "light";
};

const lastValue = ref("");

const editor = ref(null);
// set once the component is torn down, so a late CDN load does not create
// an editor inside a node which is no longer in the document
let destroyed = false;

onMounted(() => {
	loadJS("https://cdn.svar.dev/libs/custom/codemirror6/cm.js?v=4").then(() => {
		if (destroyed || editor.value) return;

		editor.value = codemirror.create(`#${tempID}`, {
			value: "",
			theme: props.theme || detectTheme(),
			language: props.language,
			lineNumbers: false,
			readOnly: props.readonly,
			onChange: v => {
				lastValue.value = v;
				props.onchange?.({ value: editor.value.getValue() });
			},
		});
	});
});

onBeforeUnmount(() => {
	destroyed = true;
	editor.value?.destroy?.();
	editor.value = null;
});

watchEffect(() => {
	if (editor.value) {
		editor.value.setLanguage(props.language);
	}
});
watchEffect(() => {
	if (editor.value && props.value !== lastValue.value) {
		editor.value.setValue(props.value, { resetHistory: true });
		if (props.focus) editor.value.focus();
		lastValue.value = props.value;
	}
});
</script>

<template>
	<div class="wx-codemirror" :id="tempID"></div>
</template>

<style scoped>
.wx-codemirror {
	height: 100%;
	width: var(--wx-field-width);
	max-width: 100%;
}
.wx-codemirror > :deep(.cm-editor) {
	height: 100%;
}
.wx-codemirror > :deep(.cm-focused) {
	outline: none;
}
.wx-field-control .wx-codemirror :deep(.cm-editor) {
	height: 200px;
}
</style>
