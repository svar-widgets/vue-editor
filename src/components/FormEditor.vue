<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { Field } from "@svar-ui/vue-core";

import { getItemHandler } from "../helpers";

const props = defineProps({
	editors: {},
	data: {},
	css: { default: "" },
	errors: {},
	focus: { default: false },
	onclick: { type: Function },
	onchange: { type: Function },
});

const root = ref(null);

onMounted(() => {
	if (props.focus) {
		// if the focus is already inside the root, don't do anything
		const focused = document.activeElement;
		if (focused && root.value.contains(focused)) return;

		// get the first input, textarea or select element and focus it
		const input = root.value.querySelector(
			"input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
		);
		if (input) {
			setTimeout(() => {
				input.select();
				input.focus();
			}, 300);
		}
	}
});

const _ = inject("wx-i18n").getGroup("editor");

const overlay = computed(
	() =>
		props.editors.config[0].comp === "readonly" &&
		props.editors.config.every(
			editor => !Object.keys(props.data).includes(editor.key)
		)
);
</script>

<template>
	<div :class="['wx-sections', css]" ref="root">
		<slot v-if="$slots.default" />
		<div v-if="overlay" class="wx-overlay">{{ _("No data") }}</div>
		<template v-for="editor in editors.config" :key="editor.key">
			<template v-if="!editor.hidden">
				<template v-if="editor.comp === 'readonly' || editor.comp === 'section'">
					<component
						:is="getItemHandler(editor.comp)"
						:label="editor.label"
						:value="data[editor.key]"
						v-bind="editor"
						:section-key="editor.key"
						:onclick="onclick"
					/>
				</template>
				<template v-else>
					<div>
						<Field
							:label="editor.labelTemplate
								? editor.labelTemplate(data[editor.key])
								: (editor.label ?? '')"
							:required="editor.required"
						>
							<component
								:is="getItemHandler(editor.comp)"
								:onchange="(ev) => {
									onchange &&
										onchange({
											value: ev.value,
											key: editor.key,
											input: ev.input,
										});
								}"
								v-bind="editor"
								:label="undefined"
								:error="errors && errors[editor.key]"
								:value="data[editor.key]"
							/>
						</Field>
						<div v-if="errors && errors[editor.key] && editor.validationMessage" class="wx-message">
							{{ editor.validationMessage }}
						</div>
					</div>
				</template>
			</template>
		</template>
	</div>
</template>

<style scoped>
.wx-sections {
	text-align: left;
	--wx-field-width: 600px;
	margin: 12px 20px 0;
}
.wx-message {
	margin-top: calc(var(--wx-field-gutter) * -1);
	font-size: 12px;
	line-height: var(--wx-field-gutter);
	color: var(--wx-color-danger);
	width: inherit;
}
.wx-overlay {
	font-weight: 600;
}
</style>
