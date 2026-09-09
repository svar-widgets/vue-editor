<script setup>
import { inject, computed } from "vue";
import { Field } from "@svar-ui/vue-core";
import { dateToString } from "@svar-ui/lib-dom";

const ctx = inject("wx-i18n");
const _ = ctx.getGroup("editor");
const { calendar, formats } = ctx.getRaw();

const props = defineProps({
	value: {},
	options: {},
	label: {},
	format: {},
});

const text = computed(() => {
	let text = props.value;
	if (typeof props.value === "boolean") {
		text = props.value ? _("Yes") : _("No");
	}

	if (props.value instanceof Date) {
		const f = props.format || formats.dateFormat;
		text = dateToString(f, calendar)(props.value);
	}

	if (props.options) {
		text = (Array.isArray(props.value) ? props.value : [props.value])
			.map(id => props.options.find(o => o.id === id)?.label)
			.filter(o => o !== undefined)
			.join(", ");
	}

	return text;
});
</script>

<template>
	<Field v-if="text || text === 0" :label="label">{{ text }}</Field>
</template>
