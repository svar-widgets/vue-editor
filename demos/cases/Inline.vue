<script setup>
defineOptions({ name: "EditorInline" });

import { getData } from "../data";
import { Editor } from "../../src";

const { items, values } = getData();
</script>

<template>
	<div class="variations">
		<div>
			<h3>Normal</h3>
			<div class="bg">
				<Editor :items="items" :values="values" :top-bar="false" />
			</div>
		</div>
		<div>
			<h3>Readonly</h3>
			<div class="bg">
				<Editor
					:items="items"
					:values="values"
					:readonly="true"
					:top-bar="false"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.variations {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.variations > div {
	margin: 0 20px 60px 20px;
	width: 400px;
}
.bg {
	border-top: 1px solid #ccc;
	padding: 10px;
	height: 100%;
}
</style>
