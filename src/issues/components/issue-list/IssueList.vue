<script setup lang='ts'>
import { useIssues } from 'src/issues/composables/useIssues';
import IssueCard from './IssueCard.vue';

const { issuesQuery } = useIssues();

</script>

<template>
    <div class="row">
      <IssueCard
          v-for="issue of issuesQuery.data.value || []"
          :key="issue.id"
          :issue="issue"
      />
    </div>
</template>

<style scoped>

</style>
