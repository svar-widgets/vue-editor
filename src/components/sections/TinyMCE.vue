<script setup>
/* global tinymce */
import {
	shallowRef,
	inject,
	watchEffect,
	onMounted,
	onBeforeUnmount,
} from "vue";
import { uid } from "@svar-ui/lib-dom";
import { loadJS } from "./loader";

const props = defineProps({
	licenseKey: { default: "gpl" },
	value: {},
	onchange: { type: Function },
	toolbar: { default: "undo redo | bold italic" },
	focus: { default: false },
	skin: { default: "" },
});

const tempID = `tinymce-${uid()}`;

const wxSkin = inject("wx-theme", "");
function detectSkin() {
	if (
		wxSkin === "willow-dark" ||
		(!wxSkin && document.body.classList.contains("wx-willow-dark-theme"))
	)
		return "oxide-dark";
	return "oxide";
}

// plain variable on purpose: it only guards against echoing our own change
// events back into the editor, nothing renders from it
let lastValue = "";

// shallowRef: the TinyMCE instance must not be wrapped in a reactive proxy
const editor = shallowRef(null);

onMounted(() => {
	loadJS(
		"https://cdnjs.cloudflare.com/ajax/libs/tinymce/8.5.1/tinymce.min.js"
	).then(() => {
		if (editor.value) return;

		const uiSkin = props.skin || detectSkin();
		tinymce.init({
			selector: `#${tempID}`,
			toolbar: props.toolbar,
			menubar: false,
			skin: uiSkin,
			content_css: uiSkin === "oxide-dark" ? "dark" : undefined,
			license_key: props.licenseKey,
			statusbar: false,
			init_instance_callback: v => {
				editor.value = v;
				v.on("change", () => {
					props.onchange?.({ value: v.getContent() });
					lastValue = v.getContent();
				});
			},
		});
	});
});

watchEffect(() => {
	if (editor.value && props.value !== lastValue) {
		editor.value.setContent(props.value);
		editor.value.undoManager.clear();
		if (props.focus) editor.value.focus();
		lastValue = props.value;
	}
});

onBeforeUnmount(() => {
	if (editor.value && (props.skin || detectSkin()) === "oxide-dark") {
		tinymce.DOM.styleSheetLoader.unload(
			`${tinymce.baseURL}/skins/ui/oxide-dark/skin.min.css`
		);
	}
	// NB: not calling editor.destroy() on purpose - TinyMCE's teardown
	// triggers handlers (e.g. blur) against an already-removed instance
	// and throws. The DOM node is gone with the component, so the JS
	// instance is left to the garbage collector.
	editor.value = null;
});
</script>

<template>
	<div class="wx-tinymce">
		<textarea :id="tempID"></textarea>
	</div>
</template>

<style scoped>
.wx-tinymce {
	height: 100%;
	width: var(--wx-field-width);
	max-width: 100%;
}
.wx-tinymce > textarea {
	height: 100%;
	width: 100%;
}
</style>
