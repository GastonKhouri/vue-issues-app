import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { Label } from '../interfaces/label';
import { githubApi } from '../../api/githubApi';
import { useIssuesStore } from 'src/stores/issues';

const getLabels = async (): Promise<Label[]> => {

  const { data } = await githubApi.get<Label[]>( '/labels?per_page=100' );

  return data;

};

export const useLabels = () => {

  const issuesStore = useIssuesStore();
  const { labels } = storeToRefs( issuesStore );

  const labelsQuery = useQuery(
    [ 'labels' ],
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return {
    labelsQuery,

    //* Getters
    // Ambas sirven para obtener el valor de la propiedad labels
    // selectedLabels: computed( () => issuesStore.labels ),
    selectedLabels: labels,

    //* Methods
    toggleLabel: issuesStore.toggleLabel,
  };

};
