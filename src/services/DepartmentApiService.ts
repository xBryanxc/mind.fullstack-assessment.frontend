import { ref, Ref } from 'vue'
import IDepartment from '../interfaces/IDepartment';
import config from '../config/config';
import IBaseApiResponse from '@/interfaces/IBaseApiResponse';

class DepartmentApiService {
    private departments:Ref<Array<IDepartment>>
    private baseUrl: string

    constructor() {
        this.departments = ref<Array<IDepartment>>([]);
        this.baseUrl = config.apiBaseUrl
    }

    getDepartments():Ref<Array<IDepartment>>{
        return this.departments
    }

    async fetchDepartments():Promise<void>{
        try {
            const URL = `${this.baseUrl}${config.endpoints.getAllDepartments}`;

            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: IBaseApiResponse = await response.json();

            this.departments.value = data.result  as IDepartment[];
        } catch (error) {
            console.error('Error fetching employees:', error);
            this.departments.value = [];
        }
    }
}

export default DepartmentApiService;