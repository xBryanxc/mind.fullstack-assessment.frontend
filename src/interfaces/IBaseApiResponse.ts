import IDepartment from "./IDepartment";
import IEmployee from "./IEmployee";

interface IBaseApiResponse {
    statusCode: number;
    errorMessages: string[] | null;
    result: string | IEmployee[] | IDepartment[] | IEmployee;
}

export default IBaseApiResponse;