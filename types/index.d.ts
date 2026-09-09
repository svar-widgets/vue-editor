import type { Component, DefineComponent } from "vue";
import type { IToolbarItem } from "@svar-ui/vue-toolbar";

/** Identifier used for fields, items and toolbar entries. */
export type TID = string | number;

/** A bag of editor values keyed by field name. */
export type TValues = Record<string, any>;

/** Validation errors keyed by field name, or `null` when everything is valid. */
export type TErrors = Record<string, { errorType: "validation" | "required" }> | null;

/** A single field/control configuration as supplied by the user in `items`. */
export interface IItemConfig {
	comp?: string | Component;
	key?: TID;
	/** multi-field item: the comp receives a composite object keyed by these field names */
	keys?: TID[];
	id?: TID;
	label?: string;
	labelTemplate?: (value: any) => string;
	column?: "left" | "right";
	batch?: TID;
	section?: string;
	sectionMode?: "exclusive" | "accordion";
	activeSection?: boolean;
	hidden?: boolean;
	required?: boolean;
	validation?: (value: any) => boolean;
	validationMessage?: string;
	options?: {
		id?: TID;
		label?: string;
		[key: string]: any;
	}[];
	config?: Record<string, any>;
	getter?: (obj: any) => any;
	setter?: (obj: any, value: any) => void;
	css?: string;
	type?: string;
	text?: string;
	icon?: string;
	[key: string]: any;
}

/** Top/bottom bar configuration, or `false`/`true` to hide/auto-fill it. */
export interface IBarConfig {
	items?: IToolbarItem[];
	layout?: "row" | "column";
	[key: string]: any;
}
export type TBar = boolean | IBarConfig;

/** Hotkey map (or `false` to disable the default hotkeys). */
export type THotkeys =
	| false
	| Record<string, ((e?: KeyboardEvent) => void) | boolean>;

/** A single attached-file descriptor stored in the editor value. */
export interface IUploadedFile {
	id: TID;
	name: string;
	url?: string;
	size?: number;
	status?: "client" | "server" | "error";
	file?: File;
	[key: string]: any;
}

/** Files item value: inline array of files or a master record id for `ondata`. */
export type TFilesValue = IUploadedFile[] | TID;

/** Upload target: REST endpoint string or custom uploader function. */
export type TUploadURL =
	| string
	| ((file: IUploadedFile) => Promise<Record<string, any>>);

export interface IFilesChangeEvent {
	value: IUploadedFile[];
	action: "add" | "delete";
	file: IUploadedFile;
	originalValue?: TFilesValue;
}

declare const EditorProps: {
	values?: TValues;
	items?: IItemConfig[];
	css?: string;
	activeBatch?: TID | null;
	topBar?: TBar;
	bottomBar?: TBar;
	autoSave?: boolean;
	layout?: "default" | "columns";
	placement?: "inline" | "sidebar" | "modal" | "fullscreen";
	readonly?: boolean;
	focus?: boolean;
	hotkeys?: THotkeys;
	onchange?: (ev: {
		key: TID;
		value: any;
		update?: TValues;
		input?: boolean;
	}) => void;
	onsave?: (ev: { changes: TID[]; values: TValues }) => void;
	onaction?: (ev: {
		item: IToolbarItem;
		values: TValues;
		changes: TID[];
	}) => void;
	onvalidation?: (ev: { errors: TErrors; values: TValues }) => void;
};

export declare const Editor: DefineComponent<typeof EditorProps>;

export declare const Form: DefineComponent<{
	values?: TValues;
	items?: IItemConfig[];
	css?: string;
	activeBatch?: TID | null;
	autoSave?: boolean;
	readonly?: boolean;
	focus?: boolean;
	hotkeys?: THotkeys;
	onchange?: (ev: {
		key: TID;
		value: any;
		update?: TValues;
		input?: boolean;
	}) => void;
	onsave?: (ev: { changes: TID[]; values: TValues }) => void;
	onaction?: (ev: {
		item: IToolbarItem;
		values: TValues;
		changes: TID[];
	}) => void;
	onvalidation?: (ev: { errors: TErrors; values: TValues }) => void;
}>;

/** Attachments section item (the `Files` component). */
export declare const Attachments: DefineComponent<{
	value?: TFilesValue;
	/** resolves the display list when `value` is a master record id */
	ondata?: (value: TFilesValue) => Promise<IUploadedFile[]> | IUploadedFile[];
	onchange?: (ev: IFilesChangeEvent) => void;
	readonly?: boolean;
	uploadURL?: TUploadURL;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	onaction?: (ev: {
		action: "add-file" | "delete-file";
		file: IUploadedFile;
		value: IUploadedFile[];
	}) => void;
}>;

/** CodeMirror-backed section item; loads the library from a CDN. */
export declare const CodeMirror: DefineComponent<{
	value: string;
	onchange?: (ev: { value: string }) => void;
	focus?: boolean;
	theme?: string;
	language?: string;
	readonly?: boolean;
}>;

/** TinyMCE-backed rich-text section item; loads the library from a CDN. */
export declare const TinyMCE: DefineComponent<{
	value: string;
	onchange?: (ev: { value: string }) => void;
	licenseKey?: string;
	toolbar?: string;
	focus?: boolean;
	skin?: string;
}>;

export declare function registerEditorItem(
	type: string,
	handler: Component,
	config?: { readonly?: boolean } | null
): void;

export declare const Willow: DefineComponent<{
	fonts?: boolean;
}>;

export declare const WillowDark: DefineComponent<{
	fonts?: boolean;
}>;
