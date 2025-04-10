import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useFetch } from "@vueuse/core";

// usually set in .env, but i have only one url
const url = "https://status.neuralgeneration.com/api/currency";

export const useCurrencyStore = defineStore(
  "currency",
  () => {
    const selectedCurrency = ref("usd");
    const currencies = ref<Currency[]>([]);
    const currencyLabels = ref<string[]>([]);

    watch(currencies, () => {
      currencyLabels.value = [];
      currencies.value.forEach((currency) => {
        const main = currency.label.split("-")[0];
        if (currencyLabels.value.includes(main.toLowerCase())) return;
        currencyLabels.value.push(main);
      });
    });

    const fetchCarrency = async () => {
      const { data } = await useFetch(url).json();

      if (data.value) {
        currencies.value = Object.entries(data.value).map(([key, value]) => {
          return {
            label: key as string,
            value: value as number,
          };
        });
      }
    };

    return { selectedCurrency, currencies, currencyLabels, fetchCarrency };
  },
  {
    persist: true,
  }
);
