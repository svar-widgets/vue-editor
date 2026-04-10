<script setup>
import { Willow } from '@svar-ui/vue-core';

defineOptions({ name: "EditorWillow" });

const props = defineProps({
	fonts: { default: true },
});
</script>

<template>
	<Willow v-if="$slots.default" :fonts="props.fonts">
		<slot />
	</Willow>
	<Willow v-else :fonts="props.fonts" />
</template>

<style>
.wx-willow-theme {
	/*PLACE HERE*/
}
</style>
