<template>
  <div class="employee-card">
    <div class="employee-info">
      <div class="avatar" :style="{ backgroundColor: '#B5EAE0' }"></div>
      <div class="details">
        <h3 class="name">
          {{ props.employee.firstName }} {{ props.employee.lastName }}
          <span class="department">({{ props.employee.department.name }})</span>
        </h3>
        <div class="hire-date">
          <div>Hire Date</div>
          <div class="date">
            {{ props.employee.hireDate }}
            {{ props.employee.timeWorked }}
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="view-details">View Details</button>
      <button class="close-button" @click="handleDelete">✕</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'
import type Employee from '@/interfaces/IEmployee'
import EmployeeApiService from '@/services/EmployeeApiService'

const props = defineProps({
    employee: {
        type: Object as PropType<Employee>,
        required: true
    }
})

const employeeService = new EmployeeApiService()

const handleDelete = async () => {
    const deleted = await employeeService.deleteEmployee(props.employee.id)
    if (deleted) {
        emitEmployeeDeleted(props.employee.id)
    } else {
        alert('No se pudo eliminar el empleado')
    }
}

const emit = defineEmits(['employeeDeleted']);

const emitEmployeeDeleted = (id: number) => {
    emit('employeeDeleted', id);
};
</script>

<style scoped>
.employee-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 1rem;
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.department {
  color: #666;
  font-weight: normal;
}

.hire-date {
  color: #666;
  font-size: 0.9rem;
}

.date {
  color: #333;
  margin-top: 0.2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.view-details {
  background-color: #9ED5A0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.close-button {
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.view-details:hover {
  background-color: #8BC68D;
}

.close-button:hover {
  color: #333;
}
</style> 