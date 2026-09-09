<script setup>
defineOptions({ name: "EditorComponentsLayout", inheritAttrs: false });

import { useAttrs } from "vue";
import { ModalArea, SideArea } from "@svar-ui/vue-core";
import Panel from "./Panel.vue";

// Layout is a thin placement wrapper, forwarding everything to Panel.
// `data` and `editors` are not declared as props on purpose - they are
// forwarded through `attrs` together with the rest of the caller's props.
const props = defineProps({
	css: {},
	placement: {},
	onclick: { type: Function },
});

const attrs = useAttrs();

function handleClose() {
	props.onclick?.({ item: { id: "close" } });
}
</script>

<template>
	<ModalArea v-if="placement === 'modal'">
		<Panel
			:css="`wx-editor wx-panel ${css}`"
			:onclick="onclick"
			:placement="placement"
			v-bind="attrs"
		>
			<slot v-if="$slots.default" />
		</Panel>
	</ModalArea>
	<div v-else-if="placement === 'fullscreen'" class="wx-editor-fullscreen">
		<Panel
			:css="`wx-editor wx-inline-form ${css}`"
			:onclick="onclick"
			:placement="placement"
			v-bind="attrs"
		>
			<slot v-if="$slots.default" />
		</Panel>
	</div>
	<SideArea v-else-if="placement === 'sidebar'" :oncancel="handleClose">
		<Panel
			:css="`wx-editor wx-panel ${css}`"
			:onclick="onclick"
			:placement="placement"
			v-bind="attrs"
		>
			<slot v-if="$slots.default" />
		</Panel>
	</SideArea>
	<Panel
		v-else
		:css="`wx-editor wx-inline-form ${css}`"
		:onclick="onclick"
		:placement="placement"
		v-bind="attrs"
	>
		<slot v-if="$slots.default" />
	</Panel>
</template>

<style scoped>
.wx-editor-fullscreen {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: var(--wx-background);
	overflow: auto;
	z-index: var(--wx-popup-z-index);
}
</style>
