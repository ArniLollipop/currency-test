<template>
  <section class="container conversion">
    <h1>Conversion</h1>
    <div class="exchange">
      <label for="exchange1" class="exchange-label">
        <input
          id="exchange1"
          class="exchange-input"
          type="number"
          placeholder="First currency"
          :value="firstValue"
          @input="($e: Event) => handleChangeValue($e, 1)" />
        <TheSelect
          label="USD"
          :options="currencyLabels"
          uppercase
          class="append"
          :model-value="firstSelect"
          @update:model-value="($e) => handleChangeSelect($e, 1)" />
      </label>
      <label for="exchange2" class="exchange-label">
        <input
          id="exchange2"
          class="exchange-input"
          type="number"
          placeholder="Second currency"
          :value="secondValue"
          @input="($e: Event) => handleChangeValue($e, 2)" />
        <TheSelect
          label="USD"
          :options="currencyLabels"
          uppercase
          class="append"
          :model-value="secondSelect"
          @update:model-value="($e) => handleChangeSelect($e, 2)" />
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";

import TheSelect from "@/components/TheSelect.vue";

const { fetchCarrency } = useCurrencyStore();
const { selectedCurrency, currencies, currencyLabels } = storeToRefs(
  useCurrencyStore()
);

const firstSelect = ref<string | null>(selectedCurrency.value);
const secondSelect = ref<string | null>(currencyLabels.value[1]);
const firstValue = ref<number | null>(null);
const secondValue = ref<number | null>(null);

const resetValues = () => {
  firstValue.value = 1;

  const currency = currencies.value.find(
    (currency) =>
      currency.label.split("-")[0] === firstSelect.value &&
      currency.label.split("-")[1] === secondSelect.value
  )?.value;

  if (currency) {
    secondValue.value = parseFloat((firstValue.value * currency).toFixed(2));
  }
};

const handleChangeValue = (event: Event, type: number) => {
  const target = event.target as HTMLInputElement;
  if (!parseFloat(target.value)) {
    firstValue.value = null;
    secondValue.value = null;
    return;
  }

  if (type == 1) {
    firstValue.value = parseFloat(target.value);
    const currency = currencies.value.find(
      (currency) =>
        currency.label.split("-")[0] === firstSelect.value &&
        currency.label.split("-")[1] === secondSelect.value
    )?.value;

    if (currency) {
      secondValue.value = parseFloat((firstValue.value * currency).toFixed(2));
    }
  }

  if (type == 2) {
    secondValue.value = parseFloat(target.value);
    const currency = currencies.value.find(
      (currency) =>
        currency.label.split("-")[0] === secondSelect.value &&
        currency.label.split("-")[1] === firstSelect.value
    )?.value;

    if (currency) {
      firstValue.value = parseFloat((secondValue.value * currency).toFixed(2));
    }
  }
};

const handleChangeSelect = (event: string | null, type: number) => {
  if (event == null) {
    return;
  }

  if (type == 1 && event == secondSelect.value && firstSelect.value) {
    secondSelect.value = firstSelect.value;
    firstSelect.value = event;
  } else if (type == 1) {
    firstSelect.value = event;
  }

  if (type == 2 && event == firstSelect.value && secondSelect.value) {
    firstSelect.value = secondSelect.value;
    secondSelect.value = event;
  } else if (type == 2) {
    secondSelect.value = event;
  }

  resetValues();
};

onBeforeMount(async () => {
  await fetchCarrency();

  const temp = currencyLabels.value.find(
    (label) => label !== firstSelect.value
  );

  if (temp) {
    secondSelect.value = temp;
  }
  resetValues();
});
</script>

<style scoped lang="scss">
.exchange {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &-label {
    display: flex;
  }
  &-input {
    border: 1px solid #ccc;
    border-radius: 12px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: 0px;
    padding: 0.5rem 1rem;
  }
}
</style>
