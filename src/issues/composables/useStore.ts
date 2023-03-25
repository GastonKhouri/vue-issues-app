import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues';

export const useStore = () => {

  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs( issuesStore );

  return {
    //* Props
    labels,
    state,

    //* Getters

    //* Actions

  };

};
