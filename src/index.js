import { registerEditorItem } from "./helpers";
import Form from "./components/Form.vue";
import Editor from "./components/Editor.vue";

import Willow from "./themes/Willow.vue";
import WillowDark from "./themes/WillowDark.vue";

import ReadOnly from "./components/sections/ReadOnly.vue";
import Section from "./components/sections/Section.vue";
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

export { registerEditorItem, Form, Editor, Willow, WillowDark };
