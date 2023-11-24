<script lang="ts" setup>
import SubmissionCardComponent from '@/components/AssignmentDetail/SubmissionCardComponent.vue'

const props = defineProps<{ user: User, submissionList?: Submission[] }>()
</script>

<template>
  <el-divider></el-divider>
  <div class="submission-list-header-container">
    <el-text class="submission-list-header">{{user.isTeacher ? 'All Submissions' : 'Your Submissions'}}</el-text>
  </div>
  <el-scrollbar class="submission-list-container" max-height="400px">
    <el-empty v-if="submissionList == undefined || submissionList!.length == 0"></el-empty>
    <SubmissionCardComponent
      v-for="submission in submissionList"
      :submission="submission"
      :user="user"
      class="submission-card"
    />
  </el-scrollbar>
</template>

<style scoped>
.submission-list-header {
  font-size: 18px;
  font-weight: bolder;
  text-align: start;
}

.submission-list-header-container {
  margin-bottom: 20px;
}

.submission-list-container {
  padding: 20px;
  border: 2px solid var(--el-border-color);
  border-radius: 18px;
}

.submission-card {
  margin-bottom: 20px;
}
</style>