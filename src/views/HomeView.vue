<template>
  <div class="container">
    <div class="header">
      <BaseButton text="New Employee" @click="showModal = true" />
    </div>
    
    <div v-if="employees.length === 0" class="no-employees">
      No employees found
    </div>
    
    <template v-else>
      <EmployeeCard 
        v-for="employee in employees" 
        :key="employee.id" 
        :employee="employee"
        @employee-deleted="handleEmployeeDeleted"
      />
    </template>

    <BaseModal 
      :show="showModal" 
      title="New Employee"
      @close="showModal = false"
    >
      <form class="employee-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" v-model="newEmployee.firstName" required />
        </div>
        
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" v-model="newEmployee.lastName" required />
        </div>
        
        <div class="form-group">
          <label>Hire Date</label>
          <input type="date" class="form-control" v-model="newEmployee.hireDate" required />
        </div>
        
        <div class="form-group">
          <label>Department</label>
          <select class="form-control" v-model="newEmployee.departmentId" required>
            <option v-for="dept in departments" 
                    :key="dept.id" 
                    :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" class="form-control" v-model="newEmployee.phone" required />
        </div>
        
        <div class="form-group">
          <label>Address</label>
          <textarea class="form-control" v-model="newEmployee.address" required></textarea>
        </div>

        <div class="form-actions">
          <BaseButton text="Save" />
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import EmployeeApiService from '@/services/EmployeeApiService'
import DepartmentApiService from '@/services/DepartmentApiService'
import EmployeeCard from '@/components/EmployeeCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import type { ICreateEmployee } from '@/interfaces/ICreateEmployee'

const employeeService = new EmployeeApiService()
const departmentService = new DepartmentApiService()

const employees = employeeService.getEmployees()
const departments = departmentService.getDepartments()

const showModal = ref(false)

const newEmployee = ref<ICreateEmployee>({
    firstName: '',
    lastName: '',
    hireDate: '',
    departmentId: 0,
    phone: '',
    address: ''
})

const handleSubmit = async () => {
    const created = await employeeService.createEmployee(newEmployee.value)
    if (created) {
        showModal.value = false
        newEmployee.value = {
            firstName: '',
            lastName: '',
            departmentId: 0,
            hireDate: '',
            phone: '',
            address: ''
        }
    } else {
        alert('Error creating employee')
    }
}

const handleEmployeeDeleted = (id: number) => {
    console.log('Employee deleted:', id)
    employeeService.fetchEmployees()
}

onMounted(async () => {
    await Promise.all([
        employeeService.fetchEmployees(),
        departmentService.fetchDepartments()
    ])
})
</script>

<style scoped>
.container {
  padding: 0 1rem;
}

.header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}

.employee-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-control {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #9ED5A0;
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.no-employees {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}
</style>
