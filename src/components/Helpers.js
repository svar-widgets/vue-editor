import { ref, computed } from "vue";

export function link(getValue) {
	const localState = ref(undefined);
	const linkedDerived = computed(() => {
		const linkedValue = getValue();
		return typeof localState.value !== "undefined"
			? localState.value
			: linkedValue;
	});

	return [
		() => linkedDerived.value,
		v => {
			localState.value = v;
		},
	];
}

export function dataLink(getValue) {
	const [getErrors, setErrors] = link(getValue);

	return {
		get errors() {
			return getErrors();
		},
		set errors(value) {
			setErrors(value);
		},
	};
}
