/* v8 ignore start */

import axios from "axios";
import { API_BASE_URL,FILLER_BASE_URL } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
const fetchDeviatedMilestone = async (dynamicParam) => {
  console.log("dynamicParam",dynamicParam);  
  try {
        const res = await axios({
            method: "GET",
            url: `${FILLER_BASE_URL}/dcms/filler/get-deviated-milestones`,
            params: {
                useremail:Cookies.get('email'),
                blockName:dynamicParam?.blockName,
                system:dynamicParam?.systemName,
                modelId:dynamicParam?.modelId,
                baseModel:dynamicParam?.baseModel
            },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching variants:", error);
        throw error;
    }
};

export {fetchDeviatedMilestone};

/* v8 ignore stop */
