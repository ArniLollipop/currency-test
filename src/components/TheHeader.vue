<template>
  <header class="header container">
    <div class="header-routes">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/conversion" replace> Conversion </RouterLink>
    </div>
    <TheSelect
      :options="currencyLabels"
      label="Currency"
      uppercase
      v-model="selectedCurrency" />
  </header>
</template>

<script setup lang="ts">
import TheSelect from "./TheSelect.vue";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";

const { selectedCurrency, currencyLabels } = storeToRefs(useCurrencyStore());
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &-routes {
    display: flex;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;

    a {
      text-decoration: none;
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
