<script setup>
import { ref } from "vue";
import { getData } from "../data";
import { Editor } from "../../src";

const { items, values } = getData();

const message = ref("");

function handleClick({ item }) {
	message.value = "click: " + item.id;
}
</script>

<template>
	<div class="message">{{ message }}</div>
	<div class="variations">
		<div>
			<h3>None</h3>
			<div class="bg">
				<Editor :top-bar="false" :items="items" :values="values" />
			</div>
		</div>
		<div>
			<h3>Top Bar</h3>
			<div class="bg">
				<Editor :items="items" :values="values" :onaction="handleClick" />
			</div>
		</div>
		<div>
			<h3>Top Bar, Right</h3>
			<div class="bg">
				<Editor
					:top-bar="{
						items: [
							{ comp: 'spacer' },
							{ comp: 'button', text: 'Save', id: 'save' },
						],
					}"
					:items="items"
					:values="values"
					:onaction="handleClick"
				/>
			</div>
		</div>
		<div>
			<h3>Top Bar, Left</h3>
			<div class="bg">
				<Editor
					:top-bar="{
						items: [
							{
								comp: 'button',
								type: 'primary',
								text: 'Save',
								id: 'save',
							},
						],
					}"
					:items="items"
					:values="values"
					:onaction="handleClick"
				/>
			</div>
		</div>
		<div>
			<h3>Top Bar, Mixed</h3>
			<div class="bg">
				<Editor
					:top-bar="{
						items: [
							{
								comp: 'button',
								type: 'primary',
								text: 'Save',
								id: 'save',
							},
							{ comp: 'spacer' },
							{ comp: 'icon', icon: 'wxi-refresh', id: 'refresh' },
							{ comp: 'icon', icon: 'wxi-delete', id: 'delete' },
						],
					}"
					:items="items"
					:values="values"
					:onaction="handleClick"
				/>
			</div>
		</div>
		<div>
			<h3>Bottom Bar</h3>
			<div class="bg">
				<Editor
					:bottom-bar="{
						items: [
							{
								comp: 'button',
								type: 'primary',
								text: 'Save',
								id: 'save',
							},
							{ comp: 'button', text: 'Cancel', id: 'cancel' },
						],
					}"
					:items="items"
					:values="values"
					:onaction="handleClick"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.message {
	padding: 5px 10px;
	background-color: #eee;
	color: #444;
	line-height: 33px;
	height: 40px;
}
.variations {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.variations > div {
	margin: 0 10px 60px 20px;
	width: 400px;
}
.bg {
	border: 1px solid #ccc;
	box-shadow: 0 0 5px #ccc;
	padding: 10px;
	height: 100%;
}
</style>
