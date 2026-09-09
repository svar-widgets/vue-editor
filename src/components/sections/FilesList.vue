<script setup>
import { ref, computed, inject, watch } from "vue";
import { Button } from "@svar-ui/vue-core";
import { uid } from "@svar-ui/lib-dom";

const props = defineProps({
	data: { default: () => [] },
	readonly: { default: false },
	uploadURL: { default: "" },
	accept: { default: "" },
	multiple: { default: true },
	disabled: { default: false },
	onchange: { type: Function },
	onaction: { type: Function },
});

const _ = inject("wx-i18n").getGroup("editor");

const input = ref();
// stored files; reassigned locally on add/delete, refreshed when the prop changes
const rawData = ref(props.data ?? []);
watch(
	() => props.data,
	v => (rawData.value = v ?? [])
);
// in-flight and failed uploads; local-only, never part of the editor value
const uploads = ref([]);
const list = computed(() => [...rawData.value, ...uploads.value]);

function selectFiles(ev) {
	const files = Array.from(ev.target.files ?? []);
	files.forEach(addFile);
	if (input.value) input.value.value = "";
}

function addFile(file) {
	const obj = {
		id: uid(),
		name: file.name,
		size: file.size,
		status: "client",
		file,
	};
	uploads.value = props.multiple ? [...uploads.value, obj] : [obj];
	upload(obj);
}

function defaultUploader(obj) {
	const body = new FormData();
	body.append("upload", obj.file);
	return fetch(props.uploadURL, { method: "POST", body }).then(res =>
		res.json()
	);
}

async function upload(obj) {
	try {
		const res =
			typeof props.uploadURL === "function"
				? await props.uploadURL(obj)
				: await defaultUploader(obj);
		if (!res || res.status === "error") fail(obj.id);
		else commit(obj, res);
	} catch {
		fail(obj.id);
	}
}

function fail(id) {
	uploads.value = uploads.value.map(u =>
		u.id === id ? { ...u, status: "error" } : u
	);
}

function commit(obj, res) {
	// stored object holds metadata only; server response (with permanent id) wins
	const stored = { ...obj, ...res };
	delete stored.file;
	delete stored.status;

	uploads.value = uploads.value.filter(u => u.id !== obj.id);
	const value = props.multiple ? [...rawData.value, stored] : [stored];
	rawData.value = value;
	props.onchange?.({ value, action: "add", file: stored });
	props.onaction?.({ action: "add-file", file: stored, value });
}

function remove(item) {
	if (uploads.value.some(u => u.id === item.id)) {
		// pending or failed upload - never entered the value, no events
		uploads.value = uploads.value.filter(u => u.id !== item.id);
		return;
	}
	const value = rawData.value.filter(f => f.id !== item.id);
	rawData.value = value;
	props.onchange?.({ value, action: "delete", file: item });
	props.onaction?.({ action: "delete-file", file: item, value });
}
</script>

<template>
	<div class="wx-files">
		<ul v-if="list.length" class="wx-list">
			<li
				v-for="f in list"
				:key="f.id"
				class="wx-file"
				:class="{
					'wx-uploading': f.status === 'client',
					'wx-failed': f.status === 'error',
				}"
			>
				<i class="wxi-file wx-file-icon"></i>
				<a
					v-if="f.url"
					class="wx-name"
					:href="f.url"
					target="_blank"
					rel="noreferrer"
					>{{ f.name }}</a>
				<span v-else class="wx-name">{{ f.name }}</span>
				<span v-if="f.status === 'client'" class="wx-status">{{
					_("Uploading...")
				}}</span>
				<span
					v-else-if="f.status === 'error'"
					class="wx-status wx-error"
				>
					{{ _("Upload failed") }}
				</span>
				<button
					v-if="!readonly"
					type="button"
					class="wx-remove"
					:title="_('Delete file')"
					@click="remove(f)"
				>
					<i class="wxi-delete-outline"></i>
				</button>
			</li>
		</ul>
		<template v-if="!readonly">
			<input
				ref="input"
				type="file"
				class="wx-input"
				:accept="accept"
				:multiple="multiple"
				:disabled="disabled"
				@change="selectFiles"
			/>
			<Button
				icon="wxi-plus"
				:disabled="disabled"
				:onclick="() => input && input.click()"
			>
				{{ _("Add file") }}
			</Button>
		</template>
	</div>
</template>

<style scoped>
.wx-files {
	width: var(--wx-field-width);
	max-width: 100%;
}
.wx-list {
	list-style: none;
	margin: 0 0 8px;
	padding: 0;
}
.wx-file {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 8px;
	border-radius: var(--wx-input-border-radius);
}
.wx-file:hover {
	background: var(--wx-background-alt);
}
.wx-file-icon {
	color: var(--wx-color-font-alt);
}
.wx-name {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: var(--wx-color-font);
}
a.wx-name {
	color: var(--wx-color-link);
	text-decoration: none;
}
a.wx-name:hover {
	text-decoration: underline;
}
.wx-uploading .wx-name,
.wx-failed .wx-name {
	color: var(--wx-color-font-alt);
}
.wx-status {
	font-size: 12px;
	color: var(--wx-color-font-alt);
}
.wx-status.wx-error {
	color: var(--wx-color-danger);
}
.wx-remove {
	display: flex;
	align-items: center;
	border: none;
	background: transparent;
	padding: 2px;
	cursor: pointer;
	color: var(--wx-color-font-alt);
	font-size: var(--wx-icon-size);
}
.wx-remove:hover {
	color: var(--wx-color-danger);
}
.wx-input {
	position: absolute;
	width: 0;
	height: 0;
	opacity: 0;
}
</style>
