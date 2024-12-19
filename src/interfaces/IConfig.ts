interface IConfig {
    apiBaseUrl: string;
    endpoints: {
        getAllEmployees: string;
        deleteEmployee: string;
        createEmployee: string;
        getEmployeeById: string;
        updateEmployee: string;
        getAllDepartments: string;
    }
}

export default IConfig;