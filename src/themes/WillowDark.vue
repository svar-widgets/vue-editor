<script setup>
import { WillowDark } from "@svar-ui/vue-core";

defineOptions({ name: "EditorWillowDark" });

const props = defineProps({
	fonts: { default: true },
});
</script>

<template>
  <WillowDark v-if="$slots.default" :fonts="props.fonts">
    <slot />
  </WillowDark>
  <WillowDark v-else :fonts="props.fonts" />
</template>

<style>
.wx-willow-dark-theme {
	/*PLACE HERE*/
}
</style>
