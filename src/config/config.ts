import IConfig from "../interfaces/IConfig";

const config: IConfig = {
    apiBaseUrl: process.env.VUE_APP_MIND_API || '',
    endpoints: {
        getAllEmployees: '/Employee/GetEmployees',
        deleteEmployee: '/Employee/DeleteEmployee',
    }
}

export default config; 