import IEmployee from "./IEmployee";

interface IBaseApiResponse {
    statusCode: number;
    errorMessages: string[] | null;
    result: string | IEmployee[];
}

export default IBaseApiResponse;