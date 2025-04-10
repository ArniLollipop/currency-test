<template>
  <div class="select" ref="select">
    <button class="select-btn" :class="{ uppercase }" @click="isOpen = !isOpen">
      {{ selectedValue || props.label }}
      <TheIcon
        icon="chevron"
        class="rotate-90"
        :class="{
          'rotate-270': isOpen,
        }" />
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="select-options">
        <button
          v-for="option in props.options"
          :key="option"
          class="select-option"
          :class="{
            'select-option__active': selectedValue === option,
            uppercase,
          }"
          @click="
            selectedValue = option;
            isOpen = false;
          ">
          {{ option }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

import TheIcon from "./TheIcon.vue";

const props = defineProps<{
  options: string[];
  label: string;
  uppercase?: boolean;
}>();

const selectedValue = defineModel<string | null>("modelValue");

const isOpen = ref(false);
const select = useTemplateRef<HTMLElement>("select");

onClickOutside(select, () => {
  isOpen.value = false;
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  &-btn {
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    gap: 0.5rem;
    min-width: 80px;
  }

  &-options {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &-option {
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    background-color: transparent;
    cursor: pointer;
    gap: 0.5rem;
    color: black;
    padding: 0.5rem 1rem;
    text-align: left;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &-option__active {
    background-color: #e0e0e0;
  }
}

.append .select-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.uppercase {
  text-transform: uppercase;
}

.rotate-90 {
  transform: rotate(90deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

.rotate-270 {
  transform: rotate(270deg);
}
</style>
