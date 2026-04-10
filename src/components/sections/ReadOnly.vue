<script setup>
import { inject, computed } from 'vue';
import { Field } from '@svar-ui/vue-core';

const _ = inject('wx-i18n').getGroup('editor');

const props = defineProps({
	value: {},
	options: {},
	label: {},
});

const text = computed(() => {
	let text = props.value;
	if (typeof props.value === 'boolean') {
		text = props.value ? _('Yes') : _('No');
	}

	if (props.options) {
		const option = props.options.find(o => o.id === props.value);
		if (option) {
			text = option.label;
		}
	}

	return text;
});
</script>

<template>
	<Field v-if="text || text === 0" :label="label">{{ text }}</Field>
</template>
