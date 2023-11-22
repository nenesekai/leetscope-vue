<template>
    <div class="edit-assignment-container">
      <el-page-header @back="router.back()">
        <template #content>
          <span>Edit Assignment</span>
        </template>
      </el-page-header>
  
      <el-form v-model="assignment" ref="form" label-position="top" @submit.prevent="updateAssignment">
        <el-form-item label="Title">
          <el-input v-model="assignment.title" placeholder="Enter assignment title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="assignment.description" placeholder="Enter assignment description"></el-input>
        </el-form-item>
        <el-form-item label="Deadline">
          <el-date-picker v-model="assignment.deadline" type="datetime" placeholder="Select deadline"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Update Assignment</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import api from "@/api";
  import { ElMessage } from 'element-plus';
  
  const route = useRoute();
  const router = useRouter();
  const rawAssignmentId = route.params.id;
  const assignmentId = typeof rawAssignmentId === 'string' ? parseInt(rawAssignmentId) : null;
  const assignment = ref({ title: '', description: '', deadline: null });
  
  if (assignmentId === null || isNaN(assignmentId)) {
    ElMessage.error('Invalid assignment ID');
    router.push('/assignments');
  }
  
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      ElMessage.error(err.message);
    } else {
      ElMessage.error('An unexpected error occurred.');
    }
  };
  
  onMounted(async () => {
    if (assignmentId !== null) {
      try {
        const response = await api.getAssignmentById(assignmentId);
        assignment.value = response.data.data;
      } catch (err) {
        handleError(err);
      }
    }
  });
  
  const updateAssignment = async () => {
    if (assignmentId !== null) {
      try {
        await api.updateAssignment(assignmentId, assignment.value);
        ElMessage.success('Assignment updated successfully');
        router.push('/assignments');
      } catch (err) {
        handleError(err);
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-assignment-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
  
  .el-page-header {
    margin-bottom: 30px;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-button {
    margin-top: 10px;
  }
  </style>
  
