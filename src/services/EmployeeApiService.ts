import { ref, Ref } from 'vue'
import IEmployee from '../interfaces/IEmployee';
import IBaseApiResponse from '../interfaces/IBaseApiResponse';
import { ICreateEmployee } from '../interfaces/ICreateEmployee';
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
            return true;
        } catch (error) {
            console.error('Error deleting employee:', error);
            return false;
        }
    }

    async createEmployee(employee: ICreateEmployee): Promise<boolean> {
        try {
            const URL = `${this.baseUrl}${config.endpoints.createEmployee}`;

            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            const data: IBaseApiResponse = await response.json();
            await this.fetchEmployees();
            
            return true;
        } catch (error) {
            console.error('Error creating employee:', error);
            return false;
        }
    }

    async getEmployeeById(id: number): Promise<IEmployee | null> {
        try {
            const URL = `${this.baseUrl}${config.endpoints.getEmployeeById}/${id}`;

            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: IBaseApiResponse = await response.json();
            return data.result as IEmployee;
        } catch (error) {
            console.error('Error fetching employee:', error);
            return null;
        }
    }
}
export default EmployeeApiService;