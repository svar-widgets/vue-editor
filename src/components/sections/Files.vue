<script setup>
defineOptions({ name: "EditorSectionsFiles", inheritAttrs: false });

import { ref, computed, watchEffect, useAttrs } from "vue";
import FilesList from "./FilesList.vue";

// control-specific props (readonly, uploadURL, accept, ...) are not declared
// on purpose - they are forwarded to FilesList through `attrs`
const props = defineProps({
	value: {},
	// resolves the display list when value is a master record id
	ondata: { type: Function },
	onchange: { type: Function },
});

const attrs = useAttrs();

const finalData = computed(() =>
	props.ondata && props.value ? props.ondata(props.value) : props.value
);

// Svelte's {#await} equivalent: an empty list while the promise is pending,
// the resolved list afterwards; a plain value is applied synchronously
const data = ref([]);
let token = 0;
watchEffect(() => {
	const raw = finalData.value;
	const current = ++token;
	if (raw && typeof raw.then === "function") {
		data.value = [];
		raw.then(res => {
			if (current === token) data.value = res ?? [];
		});
	} else {
		data.value = raw ?? [];
	}
});

const handleOnchange = e => {
	e.originalValue = props.value;
	return props.onchange && props.onchange(e);
};
</script>

<template>
	<FilesList :data="data" :onchange="handleOnchange" v-bind="attrs" />
</template>
