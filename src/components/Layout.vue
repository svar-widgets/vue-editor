<script setup>
defineOptions({ name: "EditorComponentsLayout" });

import { useAttrs } from "vue";
import { ModalArea, SideArea } from "@svar-ui/vue-core";
import Panel from "./Panel.vue";

const props = defineProps({
	css: {},
	onclick: { type: Function },
	placement: {},
});

const attrs = useAttrs();

function handleClose() {
	props.onclick?.({ item: { id: "close" } });
}
</script>

<template>
	<ModalArea v-if="placement === 'modal'">
		<Panel :css="`wx-panel ${css}`" :onclick="onclick" :placement="placement" v-bind="attrs" />
	</ModalArea>
	<SideArea v-else-if="placement === 'sidebar'" :oncancel="handleClose">
		<Panel :css="`wx-panel ${css}`" :onclick="onclick" :placement="placement" v-bind="attrs" />
	</SideArea>
	<Panel v-else :css="`wx-inline-form ${css}`" :onclick="onclick" :placement="placement" v-bind="attrs" />
</template>
