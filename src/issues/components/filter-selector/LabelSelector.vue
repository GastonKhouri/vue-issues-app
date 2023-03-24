<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useLabels } from '../../composables/useLabels';

const { labelsQuery, toggleLabel, selectedLabels } = useLabels();

const { data, isLoading } = labelsQuery;

</script>

<template>

  <div class="q-mt-md">

    <LoaderSpinner v-if="isLoading" size="50px" :thickness="1" :show-text="false" />

    <q-chip
      v-else
      v-for="label of data"
      :key="label.id"
      :style="{color: `#${label.color}`}"
      clickable
      :outline="!selectedLabels.includes(label.name)"
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>

  </div>

</template>

<style scoped>

</style>
