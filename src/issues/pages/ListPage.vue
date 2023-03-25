<script setup lang="ts">
import { ref } from 'vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import FloatingButtons from '../components/FloatingButtons.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { useIssues } from '../composables/useIssues';
import { useLabels } from '../composables/useLabels';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref(false);

const openDialog = () => {
  isOpen.value = true;
};

</script>

<template>
	<div class="row q-mb-md">
		<div class="col-12">
			<span class="text-h4">Github Issues</span>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-12 col-md-4">
			<FilterSelector />
		</div>

		<div class="col-xs-12 col-md-8">
			<LoaderSpinner v-if="issuesQuery.isLoading.value" color="white" />
			<IssueList v-else />
		</div>
	</div>

  <!-- Floating buttons -->
  <FloatingButtons :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: 'lg',
        onClick: openDialog
      },
    ]"
  />

  <!-- Dialogo new issue -->
  <NewIssueDialog
    v-if="labelsQuery.data.value"
    :isOpen="isOpen"
    :labels="labelsQuery.data.value.map(label => label.name) || []"
    @onClose="isOpen = false"
  />

</template>

<style scoped></style>
