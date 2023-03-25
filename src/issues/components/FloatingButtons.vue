<script setup lang="ts">
import { toRefs } from 'vue';

interface FabButton {
  icon: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick: () => void;
}

interface Props {
  buttons: FabButton[]
}

const props = defineProps<Props>();

const { buttons } = toRefs(props)

</script>

<template>
  <div class="fab">
    <q-btn
        v-for="button of buttons"
        class="q-mr-sm"
        :color="button.color || 'primary'"
        :icon="button.icon || undefined"
        :size="button.size || 'md'"
        :key="button.icon"
        @click="button.onClick"
        round
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
