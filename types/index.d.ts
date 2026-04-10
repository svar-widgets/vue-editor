import type { DefineComponent } from "vue";
import type { IToolbarItem } from "@svar-ui/vue-toolbar";

export declare const Editor: DefineComponent<{
	values?: Record<string, any>;
	items?: {
		comp?: string | DefineComponent;
		key?: string;
		label?: string;
		labelTemplate?: (value: any) => string;
		column?: "right" | "left";
		batch?: string | number;
		hidden?: boolean;
		section?: string;
		sectionMode?: "accordion" | "exclusive";
		activeSection?: boolean;
		options?: {
			id?: string | number;
			label?: string;
			[key: string]: any;
		}[];
		required?: boolean;
		validation?: (value: any) => boolean;
		validationMessage?: string;
		config?: {
			[key: string]: any;
		};
		[key: string]: any;
	}[];
	css?: string;
	activeBatch?: string | number;
	topBar?: boolean | { items: IToolbarItem[] };
	bottomBar?: boolean | { items: IToolbarItem[] };
	autoSave?: boolean;
	layout?: "default" | "columns";
	placement?: "inline" | "sidebar" | "modal";
	readonly?: boolean;
	focus?: boolean;
	onchange?: (ev: {
		key: string;
		value: any;
		update: Record<string, any>;
		input?: boolean;
	}) => void;
	onsave?: (ev: {
		changes: Record<string, any>;
		values: Record<string, any>;
	}) => void;
	onaction?: (ev: {
		item: IToolbarItem;
		values: Record<string, any>;
		changes: Record<string, any>;
	}) => void;
	onvalidation?: (ev: {
		errors: {
			[key: string]: {
				errorType: "validation" | "required";
			};
		};
		values: Record<string, any>;
	}) => void;
	hotkeys?:
		| false
		| { [key: string]: ((e?: KeyboardEvent) => void) | boolean };
}>;

export declare function registerEditorItem(
	type: string,
	handler: DefineComponent<any>
): void;

export declare const Willow: DefineComponent<{
	fonts?: boolean;
}>;

export declare const WillowDark: DefineComponent<{
	fonts?: boolean;
}>;

export declare const Material: DefineComponent<{
	fonts?: boolean;
}>;
