# Vue Conversion Validation Report

## src/components/FormEditor.vue

- **Line 38**: `inject("wx-i18n")` should use stripped key `inject("i18n")` — the `wx-` prefix should be removed per conversion rules.

## src/components/Values.vue

- **Line 12**: `inject("wx-i18n")` should use stripped key `inject("i18n")` — the `wx-` prefix should be removed per conversion rules.

## src/components/Panel.vue

- **Line 36**: `inject("wx-i18n")` should use stripped key `inject("i18n")` — the `wx-` prefix should be removed per conversion rules.

## src/components/sections/ReadOnly.vue

- **Line 5**: `inject('wx-i18n')` should use stripped key `inject('i18n')` — the `wx-` prefix should be removed per conversion rules.

## src/themes/Material.vue

- **Line 18**: `<style>` block is missing `scoped` attribute — should be `<style scoped>`.

## demos/common/Router.vue

- **Line 15**: Uses `defineEmits(["onnewpage"])` and `emit("onnewpage", ...)` — this follows Vue's emit pattern rather than callback props pattern. For consistency with the rest of the conversion (which uses callback props like `onclick`, `onchange`), consider using a callback prop `onnewpage: { type: Function }` and calling `props.onnewpage?.({...})` instead.

## demos/cases/RequiredFields.vue

- **Line 5**: `inject('wx-helpers')` should use stripped key `inject('helpers')` — the `wx-` prefix should be removed per conversion rules.

## demos/cases/Section.vue

- **Line 16**: Native `@click` event handler uses inline callback that calls `onclick` prop directly without optional chaining. Should use `onclick?.({...})` pattern for safety, e.g., `@click="() => onclick?.({ item: { id: 'toggle-section', key: activeSection ? null : sectionKey } })"`.

