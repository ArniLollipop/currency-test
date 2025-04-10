<template>
  <Component :is="route.meta.layout">
    <RouterView />
  </Component>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped></style>
