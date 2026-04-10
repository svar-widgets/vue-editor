<script setup>
import { ref, inject } from 'vue';
import { Editor } from "../../src";

const helpers = inject('wx-helpers');

const items = [
	{
		comp: "text",
		key: "firstName",
		label: "First name",
		required: true,
		validationMessage: "Incorrect name!",
	},
	{
		comp: "text",
		key: "lastName",
		label: "Last name",
		required: true,
	},
	{
		comp: "text",
		key: "company",
		label: "Company name",
		required: true,
	},
	{
		comp: "text",
		key: "contact",
		label: "Contact number",
		required: true,
	},
	{
		comp: "text",
		key: "email",
		label: "Email",
		required: true,
	},
	{
		comp: "textarea",
		key: "additional",
		label: "Additional information",
	},
];

const getValues = () => {
	const out = {};
	items.forEach(item => (out[item.key] = ""));
	return out;
};

const values = ref(getValues());

function handleSave() {
	helpers.showNotice({ text: `Values was successfully saved` });
	setTimeout(() => {
		values.value = {};
	}, 0);
}
</script>

<template>
	<div style="padding: 10px;">
		<h3>Editor with required fields</h3>
		<div class="bg">
			<Editor
				:items="items"
				:values="values"
				:bottom-bar="{
					items: [
						{ comp: 'spacer' },
						{
							comp: 'button',
							type: 'primary',
							text: 'Save',
							id: 'save',
						},
					],
				}"
				:onsave="handleSave"
			/>
		</div>
	</div>
</template>

<style scoped>
.bg {
	border-top: 1px solid #ccc;
	padding: 10px;
	height: 100%;
	width: 600px;
}
</style>
