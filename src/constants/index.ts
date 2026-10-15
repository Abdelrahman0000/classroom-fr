export const Departments = ['Cs','English','Math'];
export const Department_Options=Departments.map((dept:string):{value:string , label:string}=>({
    value:dept,
    label:dept,
}))