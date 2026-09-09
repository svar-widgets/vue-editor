<script setup>
defineOptions({ name: "EditorTabs" });

import { ref, computed } from "vue";
import { getData } from "../data";
import { Editor } from "../../src";
import { Segmented, Tabs } from "@svar-ui/vue-core";

import { registerToolbarItem, Toolbar } from "@svar-ui/vue-toolbar";
registerToolbarItem("segmented", Segmented);

const { batchItems, values } = getData();

let options = [
	{
		id: "main",
		label: "Personal",
	},
	{
		id: "cfg",
		label: "Settings",
	},
];

const activeBatch = ref("main");
const toolbarValues = computed(() => ({ batch: activeBatch.value }));

function handleToolbarChange({ value, item }) {
	if (item.key === "batch") activeBatch.value = value;
}
</script>

<template>
	<div class="variations">
		<div class="bg-top">
			<h3>Segmented</h3>
			<Editor
				:top-bar="false"
				:items="batchItems"
				:values="values"
				:active-batch="activeBatch"
			>
				<div class="top" style="margin-left: 20px">
					<Segmented :options="options" v-model:value="activeBatch" />
				</div>
			</Editor>
		</div>
		<div class="bg-top">
			<h3>Tabbar</h3>
			<div class="bg" style="height: 400px">
				<Editor
					:top-bar="false"
					:items="batchItems"
					:values="values"
					:active-batch="activeBatch"
				>
					<div class="top">
						<Tabs :options="options" v-model:value="activeBatch" />
					</div>
				</Editor>
			</div>
		</div>
		<div class="bg-top">
			<h3>Toolbar</h3>
			<Editor
				:items="batchItems"
				:values="values"
				:active-batch="activeBatch"
				:top-bar="false"
			>
				<Toolbar
					:values="toolbarValues"
					:items="[
						{ comp: 'icon', icon: 'wxi-refresh' },
						{ comp: 'spacer' },
						{ key: 'batch', comp: 'segmented', options },
					]"
					:onchange="handleToolbarChange"
				/>
			</Editor>
		</div>
	</div>
</template>

<style scoped>
.top {
	margin-bottom: 10px;
}
.variations {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.variations > div {
	margin: 0 20px 60px 20px;
	width: 400px;
}
h3 {
	margin-bottom: 10px;
	margin-left: 22px;
}
</style>
