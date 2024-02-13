// export const API_BASE_URL = 'http://localhost:8091';
// export const API_BASE_URL2 = 'http://localhost:8092';
// export const FILLER_BASE_URL = 'http://localhost:8091';

// export const API_BASE_URL = 'https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms'


console.log('env variable', import.meta.env.VITE_BACKEND_URL)
const ECS_URL=import.meta.env.VITE_BACKEND_URL;
// const ECS_URL="https://13nw2rzoe8.execute-api.ap-south-1.amazonaws.com"
export const API_BASE_URL = `${ECS_URL}/msil-dcms/dcms`
export const API_BASE_URL2 = `${ECS_URL}/msil-utility-app/upload-utility`
export const FILLER_BASE_URL = `${ECS_URL}/msil-dcms/dcms`

export const GET_MODEL_PATH = '/editmodel';
export const GET_USERDATA_PATH = '/employee/details'
export const GET_MODELLIST_PATH = '/dcms/allmodel';
export const CALCULATE_MILESTONE_PATH = '/milestone/calculate';
export const CREATE_TEMPLATE_PATH = '/createtemplate'



// [3:21 PM] Tiwari, Garvit
// Upload Utility --- https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-utility-app/upload-utility/
 
// DCMS App - https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/