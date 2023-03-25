<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import { useIssue } from '../composables/useIssue';

const route = useRoute();

const { id = '' } = route.params as { id: string };

const { issueQuery, issueCommentsQuery } = useIssue(+id);

</script>

<template>

  <RouterLink class="text-white" to="/">Go back</RouterLink>

  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    :show-text="false"
    :thickness="1"
    color="white"
    size="1.5rem"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>Issue with ID {{ id }} not found</p>

  <!-- Comentarios -->
  <LoaderSpinner
      v-if="issueCommentsQuery.isLoading.value"
      :show-text="false"
      :thickness="1"
      size="1.5rem"
  />

  <div class="column" v-else-if="issueCommentsQuery.data.value?.length !== 0">
    <div class="text-h3 q-mb-md">Comments ({{ issueCommentsQuery.data.value?.length }})</div>
    <IssueCard v-for="comment of issueCommentsQuery.data.value" :key="comment.id" :issue="comment" />
  </div>

  <p v-else>No comments found</p>

</template>

<style scoped></style>
