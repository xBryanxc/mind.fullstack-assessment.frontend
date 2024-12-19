<template>
    <div class="container">
        <div v-if="employee" class="employee-detail">
            <div class="photo" :style="{ backgroundColor: '#B5EAE0' }"></div>
            <div class="info-section">
                <div class="detail-item">
                    <span class="label">Employee Name:</span>
                    <span class="value">{{ employee.firstName }} {{ employee.lastName }}</span>
                </div>

                <div class="detail-item">
                    <span class="label">Hire Date:</span>
                    <div class="value">
                        {{ employee.hireDate }}
                        <span>{{ employee.timeWorked }}</span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <span class="label">Employee ID:</span>
                    <span class="value">{{ employee.id }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="label">Department:</span>
                    <span class="value">{{ employee.department.name }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="label">Telephone:</span>
                    <span class="value">{{ employee.phone }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="label">Address:</span>
                    <span class="value">{{ employee.address }}</span>
                </div>

                <div class="detail-item">
                    <span class="label">Update Department</span>
                    <div class="value">
                        <select class="select" v-model="selectedDepartmentId">
                            <option v-for="dept in departments" 
                                    :key="dept.id" 
                                    :value="dept.id">
                                {{ dept.name }}
                            </option>
                        </select>
                        <BaseButton text="Update" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type Employee from '@/interfaces/IEmployee'
import EmployeeApiService from '@/services/EmployeeApiService'
import DepartmentApiService from '@/services/DepartmentApiService'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const employeeService = new EmployeeApiService()
const departmentService = new DepartmentApiService()
const employee = ref<Employee | null>(null)
const departments = departmentService.getDepartments()
const selectedDepartmentId = ref<number>(0)


watch(employee, (newEmployee) => {
    if (newEmployee) {
        selectedDepartmentId.value = newEmployee.departmentId
    }
})

onMounted(async () => {
    const id = Number(route.params.id)
    if (id) {
        await Promise.all([
            departmentService.fetchDepartments(),
            employeeService.getEmployeeById(id).then(data => {
                employee.value = data
            })
        ])
    }
})
</script>

<style scoped>
.container {
    padding: 2rem;
    display: flex;
    justify-content: center;
}

.employee-detail {
    display: flex;
    gap: 3rem;
}

.photo {
    width: 350px;
    height: 350px;
    border-radius: 4px;
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1rem;
}

.detail-item {
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
}

.label {
    color: #666;
    font-size: 1.1rem;
}

.value {
    color: #333;
    font-size: 1.1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    min-width: 100px;
}
</style>