<script setup>
defineOptions({ name: "EditorComponentsValues" });

import { ref, computed, watch, inject } from "vue";

import { itemsToEditors } from "../helpers/editor";
import { dataLink } from "./Helpers";

// core widgets lib
import { deepCopy, isSame } from "@svar-ui/lib-state";

// i18n context
const _ = inject("wx-i18n").getGroup("editor");

// incoming parameters
const props = defineProps({
	values: {},
	items: {},
	css: {},
	activeBatch: {},
	autoSave: {},
	focus: {},
	readonly: {},
	topBar: { default: true },
	bottomBar: { default: true },
	layout: { default: "default" },
	placement: { default: "inline" },
	view: {},
	onchange: { type: Function },
	onsave: { type: Function },
	onaction: { type: Function },
	onvalidation: { type: Function },
	hotkeys: {},
});

// mark hidden items
const activatedSection = ref(null);

const editors = computed(() => {
	const editorResult = itemsToEditors(props.items ?? []);

	if (activatedSection.value) {
		editorResult.config.forEach(x => {
			if (x.comp === "section") {
				if (x.key === activatedSection.value) {
					if (x.sectionMode === "accordion") {
						if (!x.activeSection) {
							editorResult.config.forEach(y => {
								if (y.comp === "section" && y.key !== x.key) {
									y.activeSection = false;
								}
							});
							x.activeSection = true;
						}
					} else {
						x.activeSection = !x.activeSection;
					}
				}
			}
		});
	}

	let sections = new Set(),
		exclusive = null;

	editorResult.config.forEach(x => {
		if (x.sectionMode === "exclusive" && x.activeSection)
			exclusive = x.key;
		if (x.activeSection) sections.add(x.key);
	});

	editorResult.config.forEach(x => {
		x.hidden = !!(
			x.hidden ||
			(props.activeBatch && props.activeBatch !== x.batch) ||
			(exclusive && x.key != exclusive && x.section !== exclusive) ||
			(x.section && !sections.has(x.section))
		);
	});

	if (props.readonly) {
		return {
			...editorResult,
			diff: () => [],
		};
	}
	return editorResult;
});

const actualValues = ref({});
const data = ref({});

const d = dataLink(() => props.values && null);

// $effect.pre equivalent - watch with flush: 'pre' for values changes
watch(
	() => props.values,
	nextValues => {
		// store the current d.errors state before resetting, to use untrack-like behavior
		const currentErrors = d.errors;
		actualValues.value = deepCopy(nextValues);
		data.value = deepCopy(nextValues);
		// multi-field items keep a composite object under the item key,
		// which does not exist in the raw values shape
		if (data.value) {
			editors.value.config.forEach(ed => {
				if (ed.keys?.length) data.value[ed.key] = ed.getter(data.value);
			});
		}
		if (currentErrors) {
			d.errors = runValidation([]);
		}
	},
	{ flush: "pre", immediate: true }
);

const notSaved = ref([]);

// reset notSaved when values are changed
watch(
	() => props.values,
	values => {
		if (values) notSaved.value = [];
	}
);

function handleChanges({ value, key, input }) {
	// vue can define onclick to html elements which normally need not support it
	if (typeof key === "undefined") return;

	data.value[key] = value;
	const event = {
		key,
		value,
		update: data.value,
	};
	if (input) event.input = input;
	props.onchange?.(event);

	if (!props.values) return;

	data.value = event.update;

	const changes = editors.value.diff(props.values, data.value);

	actualValues.value = editors.value.setValues(
		{ ...actualValues.value },
		data.value,
		getUniqueFields([...changes, key])
	);

	if (changes.length) {
		const fieldsToValidate = props.autoSave
			? []
			: getUniqueFields([
					...changes,
					...Object.keys(d.errors ?? {}),
					key,
				]);
		d.errors = runValidation(fieldsToValidate);
		handleUpdate(changes);
	} else {
		const errorsFields = Object.keys(d.errors ?? {});
		// if there are errors, we have to support validation of the fields that have errors
		if (errorsFields.length) d.errors = runValidation(errorsFields);
		notSaved.value = [];
	}
}

// when data is changed we send the "change" event outside
// if autoSave is on and values are validated we save the changes and send the "save" event
// otherwise we keep the changes in `notSaved` array
function handleUpdate(changes) {
	if (props.autoSave && !d.errors) {
		editors.value.setValues(props.values, data.value, changes);
		props.onsave?.({ changes, values: actualValues.value });
	} else {
		notSaved.value = changes;
	}
}

function getUniqueFields(arr) {
	return [...new Set(arr)];
}

function runValidation(changes) {
	const check = editors.value.validateValues(
		actualValues.value,
		changes,
		_
	);

	if (!isSame(check, d.errors)) {
		props.onvalidation?.({ errors: check, values: actualValues.value });
	}

	return check;
}

function handleAction({ item }) {
	// vue can define onclick to html elements which normally need not support it
	if (typeof item === "undefined" || typeof item.id === "undefined") return;

	if (item.id === "save") {
		saveAction();
	} else if (item.id === "toggle-section") {
		activatedSection.value = item.key;
	}
	props.onaction?.({
		item,
		values: actualValues.value,
		changes: notSaved.value,
	});
}

function saveAction() {
	if (!notSaved.value.length) return;
	if (!props.autoSave) d.errors = runValidation();
	if (!d.errors) {
		props.onsave?.({
			changes: notSaved.value,
			values: actualValues.value,
		});
		editors.value.setValues(props.values, data.value, notSaved.value);
		notSaved.value = [];
	}
}
</script>

<template>
	<component
		:is="props.view"
		:top-bar="props.topBar"
		:bottom-bar="props.bottomBar"
		:placement="props.placement"
		:layout="props.layout"
		:readonly="props.readonly"
		:auto-save="props.autoSave"
		:css="props.css"
		:data="data"
		:editors="editors"
		:focus="props.focus"
		:hotkeys="props.hotkeys"
		:errors="d.errors"
		:onclick="handleAction"
		:onkeydown="handleAction"
		:onchange="handleChanges"
	>
		<slot v-if="$slots.default" />
	</component>
</template>
