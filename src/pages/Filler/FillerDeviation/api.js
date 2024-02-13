import axios from "axios";
import { API_BASE_URL } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
const fetchDeviationListApi = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/get-deviation-list`,
              params: {
                  useremail:Cookies.get('email'),
                  block:dynamicParam?.blockName,
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

  const setBlockDeviatedState = async (props) => {
    console.log("setBlockDeviatedState",props);  
    try {
          const res = await axios({
              method: "PUT",
              url: `${API_BASE_URL}/dcms/filler/set-deviation-state`,
              data: {
                "modelId":props?.modelId,
                "systemName":props?.systemName,
                "blockName":props?.blockName,
                "isFilled":true
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


  const setDeviationState = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "POST",
              url: `${API_BASE_URL}/dcms/filler/set-deviation-state`,
              data:{
                milestoneName:dynamicParam?.milestoneName,
                modelId:dynamicParam?.modelId,
                blockName:dynamicParam?.blockName,
                activity:dynamicParam?.activity,
                // type:dynamicParam?.type,
                deviationType:dynamicParam?.deviationType,
                causeOfChange:dynamicParam?.causeOfChange,
                filePath:"NULL"
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
        //   throw error;
      }
  };



  export {setBlockDeviatedState,fetchDeviationListApi,setDeviationState};