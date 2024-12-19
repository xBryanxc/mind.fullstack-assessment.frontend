import IConfig from "../interfaces/IConfig";

const config: IConfig = {
    apiBaseUrl: process.env.VUE_APP_MIND_API || '',
    endpoints: {
        getAllEmployees: '/Employee/GetEmployees',
        deleteEmployee: '/Employee/DeleteEmployee',
        createEmployee: '/Employee/CreateEmployee',
        getEmployeeById: '/Employee/GetEmployeeById',
        updateEmployee: '/Employee/UpdateEmployee',
        getAllDepartments: '/Department/GetDepartments',
    }
}

export default config; 