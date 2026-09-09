<script setup>
defineOptions({ name: "EditorLocales" });

import { ref } from "vue";
import { Locale, Segmented } from "@svar-ui/vue-core";
import { Editor } from "../../src";

import { de, cn, en } from "@svar-ui/editor-locales";
import {
	de as deCore,
	cn as cnCore,
	en as enCore,
	es as esCore,
	fr as frCore,
	it as itCore,
	ja as jaCore,
	pt as ptCore,
	ru as ruCore,
} from "@svar-ui/core-locales";

const items = [
	{
		comp: "text",
		key: "firstName",
		label: "First name",
		required: true,
	},
	{
		comp: "text",
		key: "lastName",
		label: "Last name",
		required: true,
	},
	{ comp: "checkbox", key: "admin", label: "Is Admin" },
	{ comp: "checkbox", key: "guest", label: "Is Guest" },
	{ comp: "textarea", key: "description", label: "Description" },
];

const vcb = {
	en: {},
	de: {
		"Is Admin": "Ist Admin",
		"Is Guest": "Ist Gast",
		"First name": "Vorname",
		"Last name": "Nachname",
		Description: "Beschreibung",
	},
	cn: {
		"Is Admin": "是管理员",
		"Is Guest": "是访客",
		"First name": "名字",
		"Last name": "姓氏",
		Description: "描述",
	},
	es: {
		"Is Admin": "Es administrador",
		"Is Guest": "Es invitado",
		"First name": "Nombre",
		"Last name": "Apellido",
		Description: "Descripción",
	},
	fr: {
		"Is Admin": "Est administrateur",
		"Is Guest": "Est invité",
		"First name": "Prénom",
		"Last name": "Nom",
		Description: "Description",
	},
	it: {
		"Is Admin": "È amministratore",
		"Is Guest": "È ospite",
		"First name": "Nome",
		"Last name": "Cognome",
		Description: "Descrizione",
	},
	jp: {
		"Is Admin": "管理者です",
		"Is Guest": "ゲストです",
		"First name": "名",
		"Last name": "姓",
		Description: "説明",
	},
	pt: {
		"Is Admin": "É administrador",
		"Is Guest": "É convidado",
		"First name": "Nome",
		"Last name": "Sobrenome",
		Description: "Descrição",
	},
	ru: {
		"Is Admin": "Администратор",
		"Is Guest": "Гость",
		"First name": "Имя",
		"Last name": "Фамилия",
		Description: "Описание",
	},
};
const translateItems = (items) => {
	return items.map(item => {
		return {
			...item,
			label: vcb[lang.value][item.label] || item.label,
		};
	});
};

const values = {
	firstName: "John",
	lastName: "Doe",
	admin: false,
	guest: true,
};

const langs = [
	{ id: "en", label: "EN" },
	{ id: "de", label: "DE" },
	{ id: "cn", label: "CN" },
	{ id: "es", label: "ES" },
	{ id: "fr", label: "FR" },
	{ id: "it", label: "IT" },
	{ id: "jp", label: "JP" },
	{ id: "pt", label: "PT" },
	{ id: "ru", label: "RU" },
];
const lang = ref("de");

// @svar/editor-locales currently ships en/cn/de only; the other languages get
// core terms translated and fall back to English for the editor's own strings
const getWords = (lang) => {
	if (lang == "en") return { ...enCore, ...en };
	if (lang == "cn") return { ...cnCore, ...cn };
	if (lang == "de") return { ...deCore, ...de };
	if (lang == "es") return { ...esCore };
	if (lang == "fr") return { ...frCore };
	if (lang == "it") return { ...itCore };
	if (lang == "jp") return { ...jaCore };
	if (lang == "pt") return { ...ptCore };
	if (lang == "ru") return { ...ruCore };
};

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
	}, 500);
};
resetName();
</script>

<template>
	<div class="toolbar">
		<Segmented :options="langs" v-model:value="lang" :onchange="resetName" />
	</div>
	<div style="margin: auto; max-width: 700px; margin-top: 40px;">
		<Locale :key="lang" :words="getWords(lang)">
			<Editor
				:values="values"
				:auto-save="true"
				placement="sidebar"
				:items="translateItems(items)"
			/>
		</Locale>
	</div>
</template>

<style scoped>
.toolbar {
	display: flex;
	flex-direction: row;
	padding: 10px;
}
.toolbar :deep(.item) {
	margin-left: 20px;
}
</style>
