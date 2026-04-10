<script setup>
defineOptions({ name: 'EditorSectionsSection' });

const props = defineProps({
  sectionKey: {},
  label: {},
  activeSection: {},
  onclick: { type: Function },
});
</script>

<template>
  <div
    class="wx-section"
    :class="{ 'wx-section-active': activeSection }"
    @click="onclick && onclick({ item: { id: 'toggle-section', key: activeSection ? null : sectionKey } })"
  >
    <h3>{{ label }}</h3>
    <i :class="`wxi-angle-${activeSection ? 'down' : 'right'} wx-icon`"></i>
  </div>
</template>

<style scoped>
.wx-section {
  position: relative;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  padding: 6px;
}
.wx-section-active {
  background-color: var(--wx-background-alt);
  padding-bottom: 0px;
  margin-bottom: 10px;
}
.wx-section .wx-icon {
  position: absolute;
  right: 10px;
  top: 20px;
  font-size: 25px;
}
</style>
