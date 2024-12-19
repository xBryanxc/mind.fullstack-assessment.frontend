import { ref, Ref } from 'vue'
import IEmployee from '../interfaces/IEmployee';
import IBaseApiResponse from '../interfaces/IBaseApiResponse';
import config from '../config/config';

class EmployeeApiService {
    private employees:Ref<Array<IEmployee>>
    private baseUrl: string

    constructor() {
        this.employees = ref<Array<IEmployee>>([]);
        this.baseUrl = config.apiBaseUrl
    }

    getEmployees():Ref<Array<IEmployee>>{
        return this.employees
    }

    async fetchEmployees():Promise<void>{
        try {
            const URL = `${this.baseUrl}${config.endpoints.getAllEmployees}`;

            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: IBaseApiResponse = await response.json();

            this.employees.value = data.result  as IEmployee[];
        } catch (error) {
            console.error('Error fetching employees:', error);
            this.employees.value = [];
        }
    }

    async deleteEmployee(id: number): Promise<boolean> {
        try {
            const URL = `${this.baseUrl}${config.endpoints.deleteEmployee}/${id}`;

            const response = await fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: IBaseApiResponse = await response.json();
            this.employees.value = this.employees.value.filter(emp => emp.id !== id);
            return true;
        } catch (error) {
            console.error('Error deleting employee:', error);
            return false;
        }
    }
}
export default EmployeeApiService;