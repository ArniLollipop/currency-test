<template>
  <div
    v-if="iconHtml"
    :class="['icon', `icon-${icon}`]"
    v-html="iconHtml"></div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  icon: string;
}>();

const icons = import.meta.glob("/src/icons/*.svg", { as: "raw" });

const iconHtml = ref<string | null>(null);

const loadIcon = async (iconName: string): Promise<string | null> => {
  const iconPath = `/src/icons/${iconName}.svg`;
  if (icons[iconPath]) {
    return await icons[iconPath]();
  } else {
    console.error(`Icon not found: ${iconName}`);
    return null;
  }
};

watch(
  () => props.icon,
  async (newIcon) => {
    iconHtml.value = (await loadIcon(newIcon)) || null;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.icon {
  stroke: currentColor;
  transition: all 0.2s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>
