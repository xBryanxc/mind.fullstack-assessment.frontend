interface IConfig {
    apiBaseUrl: string;
    endpoints: {
        getAllEmployees: string;
        deleteEmployee: string;
        createEmployee: string;
        getAllDepartments: string;
    }
}

export default IConfig;