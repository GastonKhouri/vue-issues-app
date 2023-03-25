import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

interface Args {
  title: string;
  body?: string;
  labels?: string[];
}

const addIssue = async ( { title, body = '', labels = [] }: Args ): Promise<Issue> => {

  const newIssueData = {
    title,
    body,
    labels
  };

  const { data } = await githubApi.post<Issue>( '/issues', newIssueData );

  return data;

};

export const useIssueMutation = () => {

  const queryClient = useQueryClient();

  const issueMutation = useMutation( addIssue, {
    onSuccess: ( data ) => {
      queryClient.invalidateQueries( {
        queryKey: [ 'issues' ],
        exact: false
      } );

      queryClient.refetchQueries(
        [ 'issues' ],
        {
          exact: false,
        }
      );

      queryClient.setQueryData(
        [ 'issues', data.number ],
        data
      );

    },
    onSettled: ( _, error ) => {
      if ( error ) {
        console.log( 'Error adding issue', error );
      }
    }
  } );

  return {
    //* Props
    issueMutation,

    //* Getters

    //* Actions

  };

};
