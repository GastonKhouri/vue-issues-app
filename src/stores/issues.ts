import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIssuesStore = defineStore( 'issues', () => {

  const state = ref( '' );
  const labels = ref<string[]>( [] );

  const toggleLabel = ( label: string ) => {

    if ( labels.value.includes( label ) ) {
      labels.value = labels.value.filter( ( l ) => l !== label );
      return;
    }

    labels.value = [ ...labels.value, label ];

  };

  return {
    //* Props
    state,
    labels,

    //* Getters

    //* Actions
    toggleLabel,
  };

} );
