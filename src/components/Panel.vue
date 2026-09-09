<script setup>
defineOptions({ name: "EditorFormPanel" });

import { inject, ref, computed, watchEffect } from "vue";
import { hotkeys as libHotkeys } from "@svar-ui/lib-dom";
import { subscribe } from "@svar-ui/lib-vue";

import Columns from "./Columns.vue";
import Toolbar from "./buttons/Toolbar.vue";

import { SaveButton, CancelButton, CloseIcon, Spacer } from "./buttons/buttons";

const props = defineProps({
	data: {},
	editors: {},
	focus: {},
	css: {},
	topBar: {},
	bottomBar: {},
	layout: {},
	placement: {},
	errors: {},
	readonly: {},
	autoSave: {},
	onclick: { type: Function },
	onkeydown: { type: Function },
	onchange: { type: Function },
	hotkeys: {},
});

const _ = inject("wx-i18n").getGroup("editor");

const autoBars = computed(
	() => props.topBar === true && props.bottomBar === true
);

const tbar = computed(() => {
	let bar =
		props.topBar && typeof props.topBar === "object" && props.topBar.items
			? props.topBar.items.map(b => ({ ...b }))
			: [];

	if (autoBars.value) {
		if (!props.readonly) {
			if (props.autoSave) bar = [Spacer(), CloseIcon()];
			else if (props.placement !== "modal")
				bar = [Spacer(), CancelButton(_), SaveButton(_)];

			if (props.layout === "columns" && !bar.length)
				bar = [Spacer(), SaveButton(_), CancelButton(_)];
		} else {
			bar = [Spacer(), CloseIcon()];
		}
	}

	return bar;
});

const bbar = computed(() => {
	let bar =
		props.bottomBar &&
		typeof props.bottomBar === "object" &&
		props.bottomBar.items
			? props.bottomBar.items.map(b => ({ ...b }))
			: [];

	if (autoBars.value) {
		if (!props.readonly) {
			if (props.placement === "modal" && !props.autoSave)
				bar = [Spacer(), SaveButton(_), CancelButton(_)];
			if (props.layout === "columns" && tbar.value.length) bar = [];
		}
	}

	return bar;
});

const getHotkeyHandler = item => {
	if (!item) return false;
	return event => {
		if (!event) return;
		const target = event.target;

		if (
			event.key == "Escape" &&
			(target.closest(".wx-combo") ||
				target.closest(".wx-multicombo") ||
				target.closest(".wx-richselect"))
		)
			return;

		if (
			event.key == "Delete" &&
			(target.tagName === "INPUT" || target.tagName === "TEXTAREA")
		)
			return;

		event.preventDefault();
		props.onkeydown?.({ item });
	};
};

const node = ref(null);
const buttons = computed(() => [...tbar.value, ...bbar.value]);

// pass-through bar config (everything except `items`, which is computed)
const topBarProps = computed(() =>
	props.topBar && typeof props.topBar === "object" ? props.topBar : {}
);
const bottomBarProps = computed(() =>
	props.bottomBar && typeof props.bottomBar === "object" ? props.bottomBar : {}
);

const hk = subscribe(libHotkeys);

watchEffect(() => {
	if (props.hotkeys === false) return;
	const defaultHotkeys = {
		"ctrl+s": getHotkeyHandler(buttons.value.find(t => t.id === "save")),
		escape: getHotkeyHandler(
			buttons.value.find(t => t.id === "cancel" || t.id === "close")
		),
		delete: getHotkeyHandler(buttons.value.find(t => t.id === "delete")),
	};
	const config = { ...defaultHotkeys, ...props.hotkeys };
	if (node.value) hk.value.configure(config, node.value);
});
</script>

<template>
	<div :class="props.css" ref="node" tabindex="-1" style="outline: none">
		<Toolbar
			v-bind="topBarProps"
			:items="tbar"
			:values="props.data"
			:onclick="props.onclick"
		/>
		<div
			class="wx-content"
			:class="{ 'wx-layout-columns': props.layout === 'columns' }"
		>
			<slot v-if="$slots.default" />
			<Columns
				:editors="props.editors"
				:layout="props.layout"
				:data="props.data"
				:focus="props.focus"
				:errors="props.errors"
				:readonly="props.readonly"
				:onclick="props.onclick"
				:onchange="props.onchange"
			/>
			<Toolbar
				v-bind="bottomBarProps"
				:items="bbar"
				:values="props.data"
				:top="false"
				:onclick="props.onclick"
			/>
		</div>
	</div>
</template>

<style scoped>
.wx-panel {
	padding: 16px 0;
	max-height: 100vh;
	display: grid;
	height: 100%;
	grid-template-rows: auto 1fr;
}

.wx-content {
	height: 100%;
	overflow-y: auto;
}

.wx-inline-form,
.wx-inline-form .wx-content {
	overflow: visible;
}

.wx-content.wx-layout-columns {
	overflow-y: hidden;
	/* grid needs for layout columns with bottom bar */
	display: grid;
	grid-template-rows: minmax(0, auto) 1fr;
}
</style>
