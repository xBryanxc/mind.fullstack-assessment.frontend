<template>
  <div>
    <EmployeeCard 
      v-for="employee in employees" 
      :key="employee.id" 
      :employee="employee"
      @employee-deleted="handleEmployeeDeleted"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import EmployeeApiService from '@/services/EmployeeApiService'
import EmployeeCard from '@/components/EmployeeCard.vue'

const service = new EmployeeApiService()
const employees = service.getEmployees()

const handleEmployeeDeleted = (id: number) => {
    console.log('Employee deleted:', id)
    service.fetchEmployees()
}

onMounted(() => {
    service.fetchEmployees()
})
</script>
