/* v8 ignore start */

import axios from "axios";
import { FILLER_BASE_URL } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
// fetchAllBaseModelByEmail

const fetchAllBaseModelByEmail = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${FILLER_BASE_URL}/dcms/filler/get-all-models`,
              params: {
                useremail: Cookies.get('email'),// to be updated
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


  const fetchAllSystemByEmailAndBase = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${FILLER_BASE_URL}/dcms/filler/get-all-systems`,
              params: {
                useremail:Cookies.get('email'),// to be updated
                modelId:dynamicParam?.modelName,
            
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
  const fetchAllBlockByEmailAndBaseSystem = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${FILLER_BASE_URL}/dcms/filler/get-all-blocks`,
              params: {
                useremail: Cookies.get('email'),// to be updated
                modelId:dynamicParam?.modelName,
                system:dynamicParam?.systemName,
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

  const fetchAllCommonUncommList = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${FILLER_BASE_URL}/dcms/filler/get-all-com-uncom`,
              params: {
                useremail:Cookies.get('email'),// to be updated
                modelId:dynamicParam?.modelName,
                system:dynamicParam?.systemName,
                block:dynamicParam?.block
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



  export {fetchAllBaseModelByEmail,fetchAllSystemByEmailAndBase,fetchAllBlockByEmailAndBaseSystem,fetchAllCommonUncommList}

/* v8 ignore stop */
