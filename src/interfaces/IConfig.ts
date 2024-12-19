interface IConfig {
    apiBaseUrl: string;
    endpoints: {
        getAllEmployees: string;
        deleteEmployee: string;
    }
}

export default IConfig;