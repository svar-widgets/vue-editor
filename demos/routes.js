import Inline from "./cases/Inline.vue";
import BasicInit from "./cases/BasicInit.vue";
import Modal from "./cases/Modal.vue";
import Sidebar from "./cases/Sidebar.vue";
import Tabs from "./cases/Tabs.vue";
import Sections from "./cases/Sections.vue";
import Buttons from "./cases/Buttons.vue";
import Tasklist from "./cases/Tasklist.vue";
import Comments from "./cases/Comments.vue";
import MultipleCombos from "./cases/MultipleCombos.vue";
import Fullscreen from "./cases/Fullscreen.vue";
import Validation from "./cases/Validation.vue";
import Locales from "./cases/Locales.vue";
import MultiField from "./cases/MultiField.vue";
import Uploads from "./cases/Uploads.vue";
import CodeMirror from "./cases/CodeMirror.vue";
import TinyMCE from "./cases/TinyMCE.vue";

export const links = [
	{
		group: "",
		items: [["/base/:skin", "Basic Editor", BasicInit, { file: "BasicInit" }]],
	},
	{
		group: "Layout",
		items: [
			["/modal/:skin", "As Modal", Modal, { file: "Modal" }],
			["/sidebar/:skin", "As Sidebar", Sidebar, { file: "Sidebar" }],
			["/inline/:skin", "Inline", Inline, { file: "Inline" }],
			["/fullscreen/:skin", "Fullscreen", Fullscreen, { file: "Fullscreen" }],
			["/tabs/:skin", "With Tabs", Tabs, { file: "Tabs" }],
			["/sections/:skin", "With Sections", Sections, { file: "Sections" }],
		],
	},
	{
		group: "Items",
		items: [
			["/comments/:skin", "Comments", Comments, { file: "Comments" }],
			["/files/:skin", "Attachments", Uploads, { file: "Uploads" }],
			["/taslkist/:skin", "Tasklist", Tasklist, { file: "Tasklist" }],
			[
				"/combos/:skin",
				"Linked lists",
				MultipleCombos,
				{ file: "MultipleCombos" },
			],
			["/buttons/:skin", "Buttons", Buttons, { file: "Buttons" }],
			[
				"/multifield/:skin",
				"Custom controls",
				MultiField,
				{ file: "MultiField" },
			],
			["/tinymce/:skin", "Rich Text", TinyMCE, { file: "TinyMCE" }],
			["/code-mirror/:skin", "Code Mirror", CodeMirror, { file: "CodeMirror" }],
		],
	},
	{
		group: "Features",
		items: [
			["/validation/:skin", "Validation", Validation, { file: "Validation" }],
			["/locales/:skin", "Locales", Locales, { file: "Locales" }],
		],
	},
];
