<script setup>
defineOptions({ name: "EditorValidation" });

import { Editor } from "../../src";
import { getData } from "../data";

const { itemsValidation: items, valuesValidation: values } = getData();
</script>

<template>
	<div style="padding: 10px;">
		<h3>Editor with validation and error messages</h3>
		<div class="bg">
			<Editor :items="items" :values="values" :top-bar="false" />
		</div>
	</div>
</template>

<style scoped>
.bg {
	border-top: 1px solid #ccc;
	padding: 10px;
	height: 100%;
}
</style>
