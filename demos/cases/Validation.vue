<script setup>
defineOptions({ name: "EditorValidation" });

import { Editor } from "../../src";
import { getData } from "../data";

const { itemsValidation: items, valuesValidation: values } = getData();

const resetName = () => {
	// trigger validation
	setTimeout(() => {
		const input = document.querySelector(".wx-editor .wx-text input");

		input.value = "";
		input.dispatchEvent(
			new InputEvent("input", {
				inputType: "deleteContentBackward",
				bubbles: true,
			})
		);
		input.focus();
	}, 500);
};
resetName();
</script>

<template>
	<div style="padding: 10px;">
		<Editor :items="items" :values="values" :top-bar="false" />
	</div>
</template>
