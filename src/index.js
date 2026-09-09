import { registerEditorItem } from "./helpers/handlers.js";
import Form from "./components/Form.vue";
import Editor from "./components/Editor.vue";

import { Willow, WillowDark } from "@svar-ui/vue-core";

import ReadOnly from "./components/sections/ReadOnly.vue";
import Section from "./components/sections/Section.vue";
import Attachments from "./components/sections/Files.vue";
import CodeMirror from "./components/sections/CodeMirror.vue";
import TinyMCE from "./components/sections/TinyMCE.vue";
import { Text } from "@svar-ui/vue-core";
import { TextArea } from "@svar-ui/vue-core";
import { Checkbox } from "@svar-ui/vue-core";

registerEditorItem("text", Text);
registerEditorItem("textarea", TextArea);
registerEditorItem("checkbox", Checkbox);

registerEditorItem("readonly", ReadOnly);
registerEditorItem("section", Section);

import { setEnv, env } from "@svar-ui/lib-dom";
setEnv(env);

export {
	registerEditorItem,
	Form,
	Editor,
	Willow,
	WillowDark,
	Attachments,
	CodeMirror,
	TinyMCE,
};
