import BasicInit from "./cases/BasicInit.vue";
import ModalPanel from "./cases/ModalPanel.vue";
import ModalColumns from "./cases/ModalColumns.vue";
import SidebarPanel from "./cases/SidebarPanel.vue";
import Batches from "./cases/Batches.vue";
import SubPanels from "./cases/SubPanels.vue";
import ChangesAuto from "./cases/ChangesAuto.vue";
import ChangesConfirmed from "./cases/ChangesConfirmed.vue";
import CustomButtons from "./cases/CustomButtons.vue";
import ActionMenu from "./cases/ActionMenu.vue";
import ToolbarValues from "./cases/ToolbarValues.vue";
import Tasklist from "./cases/Tasklist.vue";
import Comments from "./cases/Comments.vue";
import Layouts from "./cases/Layouts.vue";
import BackendComplex from "./cases/BackendComplex.vue";
import MultipleCombos from "./cases/MultipleCombos.vue";
import Overflow from "./cases/Overflow.vue";
import SaveValidatedValues from "./cases/SaveValidatedValues.vue";
import Validation from "./cases/Validation.vue";
import RequiredFields from "./cases/RequiredFields.vue";
import Locales from "./cases/Locales.vue";
import Overlay from "./cases/Overlay.vue";
// import Gantt from "./cases/Gantt.vue";
// import Kanban from "./cases/Kanban.vue";
// import Scheduler from "./cases/Scheduler.vue";

export const links = [
	["/base/:skin", "Basic Form", BasicInit, "BasicInit"],
	["/modal/:skin", "Modal Editor", ModalPanel, "ModalPanel"],
	[
		"/columns/:skin",
		"Modal Editor with columns",
		ModalColumns,
		"ModalColumns",
	],
	["/sidebar/:skin", "Sidebar Editor", SidebarPanel, "SidebarPanel"],
	["/changes-auto/:skin", "Changes: auto mode", ChangesAuto, "ChangesAuto"],
	[
		"/changes-confirmed/:skin",
		"Changes: confirmation",
		ChangesConfirmed,
		"ChangesConfirmed",
	],
	["/batches/:skin", "Batches", Batches, "Batches"],
	["/subpanels/:skin", "Sub panels", SubPanels, "SubPanels"],
	["/actions/:skin", "Action menu", ActionMenu, "ActionMenu"],
	["/buttons/:skin", "Custom buttons", CustomButtons, "CustomButtons"],
	["/comments/:skin", "Comments", Comments, "Comments"],
	["/taslkist/:skin", "Tasklist", Tasklist, "Tasklist"],
	["/layouts/:skin", "Layouts", Layouts, "Layouts"],
	[
		"/backend-complex/:skin",
		"Separate backends",
		BackendComplex,
		"BackendComplex",
	],
	["/combos/:skin", "Multiple combos", MultipleCombos, "MultipleCombos"],
	["/overflow/:skin", "Overflow", Overflow, "Overflow"],
	["/toolbar/:skin", "Toolbar values", ToolbarValues, "ToolbarValues"],
	["/required/:skin", "Required fields", RequiredFields, "RequiredFields"],
	["/validation/:skin", "Validation", Validation, "Validation"],
	[
		"/validation-save/:skin",
		"Save validated values",
		SaveValidatedValues,
		"SaveValidatedValues",
	],
	["/locales/:skin", "Locales", Locales, "Locales"],
	["/overlay/:skin", "Overlay", Overlay, "Overlay"],
	// ["/gantt/:skin", "Gantt", Gantt, "Gantt"],
	// ["/kanban/:skin", "Kanban", Kanban, "Kanban"],
	// ["/scheduler/:skin", "Scheduler", Scheduler, "Scheduler"],
];
