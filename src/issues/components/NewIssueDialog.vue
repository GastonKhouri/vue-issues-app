<script setup lang="ts">
import { ref, watch } from 'vue';
import MdEditor from 'md-editor-v3';

import { useIssueMutation } from '../composables/useIssueMutation';

import 'md-editor-v3/lib/style.css';

interface Props {
  isOpen: boolean;
  labels: string[];
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isOpen = ref(false);
const title = ref('');
const body = ref('');
const labels = ref<string[]>([]);

watch(props, () => {
  isOpen.value = props.isOpen;
})

watch(() => issueMutation.isSuccess.value, () => {
  if (issueMutation.isSuccess.value) {
    title.value = '';
    body.value = '';
    labels.value = [];
    issueMutation.reset();
    emits('onClose');
  }
})

</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">

        <q-form @submit="issueMutation.mutate({ title, body, labels })">

          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue with labels</div>
            </div>

            <q-space />

            <div>
              <q-input
                  v-model="title"
                  :rules="[val => !!val || 'Field is required']"
                  class="q-mb-sm"
                  label="Title"
                  placeholder="Title"
                  dense
                  filled
              />

              <q-select
                  v-model="labels"
                  :options="props.labels"
                  class="q-mb-sm"
                  label="Multiple selection"
                  dense
                  filled
                  multiple
                  stack-label
                  use-chips
              />

              <!-- Markdown editor -->
              <md-editor v-model="body" placeholder="# Markdown" language="en-US" />

            </div>
          </q-card-section>

          <q-card-actions align="left">
            <q-btn
              v-close-popup
              :disable="issueMutation.isLoading.value"
              @click="emits('onClose')"
              color="dark"
              label="Cancel"
              flat
            />
            <q-space />
            <q-btn
              :disable="issueMutation.isLoading.value"
              color="dark"
              label="Add Issue"
              type="submit"
              flat
            />
          </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
