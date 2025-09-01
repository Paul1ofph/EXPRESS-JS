export const BASE_URL = "http://localhost:3000"

export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/login`,
        REGISTER: `${BASE_URL}/register`,
        LOGINASADMIN: `${BASE_URL}/loginadmin`,
        REGISTERASADMIN: `${BASE_URL}/registeradmin`,
        LOGINASSUPERADMIN: `${BASE_URL}/loginsuperadmin`,
        REGISTERASSUPERADMIN: `${BASE_URL}/registersuperadmin`
    },
    STUDENTS: {
        FETCHALLSTUDENTS: `${BASE_URL}/students`,
        EDITSTUDENTSBYID: `${BASE_URL}/students`,
        EDITADMINSBYID: `${BASE_URL}/admins`,
        EDITSUPERADMINSBYID: `${BASE_URL}/superadmins`,
        DELETESTUDENT: `${BASE_URL}/students`,
        DELETEADMIN: `${BASE_URL}/admins`,
        DELETESUPERADMIN: `${BASE_URL}/superadmins`,
    }
}