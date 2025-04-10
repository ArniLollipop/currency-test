<template>
  <section class="container home">
    <div>
      <h1>Home</h1>
      <div v-if="currencies.length > 0" class="home-currency">
        <div v-for="currency in filteredCurrencies" :key="currency.label">
          <div class="home-currency__item">
            <span class="home-currency__label">
              1 {{ selectedCurrency }}
              =
              {{ currency.value }}
              {{ currency.label.split("-")[1] }}
            </span>
          </div>
        </div>
      </div>
      <div class="home-currency" v-else>loading...</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";

const { fetchCarrency } = useCurrencyStore();

const { selectedCurrency, currencies } = storeToRefs(useCurrencyStore());

const filteredCurrencies = ref<Currency[]>([]);

const filterCurrencies = () => {
  if (currencies.value.length > 0)
    return currencies.value.filter(
      (currency) =>
        currency.label.split("-")[0] === selectedCurrency.value.toLowerCase()
    );
  return [];
};

onBeforeMount(async () => {
  await fetchCarrency();
  filteredCurrencies.value = filterCurrencies();
});

watch(
  selectedCurrency,
  () => {
    filteredCurrencies.value = filterCurrencies();
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
.home {
  &-currency {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    &__item {
      width: fit-content;
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      gap: 0.5rem;
      background-color: #f9f9f9;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    &__label {
      font-weight: 500;
      color: #333;
      text-transform: uppercase;
    }

    &__value {
      color: #666;
    }
  }
}
</style>
