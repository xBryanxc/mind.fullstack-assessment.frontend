import Department from "./IDepartment";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    hireDate: string; 
    departmentId: number;
    phone: string;
    address: string;
    department: Department;
    timeWorked: string;
  }

export default Employee;