<template>
  <div class="layout">
    <TheHeader />
    <main>
      <slot />
    </main>
    <!-- <TheFooter /> -->
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

footer {
  flex-shrink: 0;
}
</style>
