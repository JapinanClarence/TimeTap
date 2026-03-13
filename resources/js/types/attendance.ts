type AttendanceType = {
    first_name: string;
    last_name: string;
    email:string;
    id?:string;
    check_in_at? :string;
    check_out_at?:string;
    type?: "check-in"|"check-out"
    time?:string;
}