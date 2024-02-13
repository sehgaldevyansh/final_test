// axios file

import axios from "axios";
import { API_BASE_URL } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
const fetchBlocksByDynamicModel = async (dynamicParam) => {
  console.log("dynamicParam",dynamicParam);  
  try {
        const res = await axios({
            method: "GET",
            url: `${API_BASE_URL}/dcms/filler/system-list`,
            params: {
                useremail:Cookies.get('email'),
                block:'MK021',
                modelId:dynamicParam,
                variant:'011'
            },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
        });
        return res?.data;
    } catch (error) {
        console.error("Error fetching variants:", error);
        throw error;
    }
};
const fetchSystemByDynamicModel = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/block-list`,
              params: {
                  useremail:Cookies.get('email'),
                  systemName:props?.systemName,
                  modelId:props?.modelId,
                  variant:'011'
              
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  const fetchVariantByDynamicModel = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/variant-list-tpl`,
              params: {
                  useremail: Cookies.get('email'),
                  systemName:props?.systemName,
                //   blockName:props?.blockName,
                  blockCode:props?.blockName,
                  modelId:props?.modelId,
                  baseModelId:props?.baseModel?.data?.baseModel
                  
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  const fetchPartByDynamicModel = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/part-list-tpl`,
              params: {
                useremail:Cookies.get('email'),
                systemName:props?.systemName,
                blockName:props?.blockName,
                variant:props?.variantName.variantName,
                blockCode:props?.blockName,
                modelId:props?.modelId,
                baseModelId:props?.baseModel?.data?.baseModel
              
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };

  const fetchPartDetailsByDynamicModel = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/part-details`,
              params: {
                useremail:Cookies.get('email'),
                systemName:props?.systemName,
                // blockName:props?.blockName,
                variantName:props?.variantName,
                block:props?.blockName,
                modelId:props?.modelId,
                baseModel:props?.baseModel?.data?.baseModel,
                partName:props?.partNumber,
                modelId:props?.modelId
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  const SavePartInformation = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "POST",
              url: `${API_BASE_URL}/dcms/filler/submit-part-details`,
              data:props?.body,
              params:props?.params,
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  
  const fetchLevelOfChange = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/level-of-change`,
              params: {
                useremail:Cookies.get('email'),
                modelId:props
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  const fetchCauseOfChange = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/cause-of-change`,
              params: {
                useremail:Cookies.get('email'),
                modelId:props
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
  
  const fetchImportanceRank = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/importance-rank`,
              params: {
                useremail:Cookies.get('email'),
                modelId:props
              },
              headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
          });
          return res?.data;
      } catch (error) {
          console.error("Error fetching variants:", error);
          throw error;
      }
  };
   
export  {fetchCauseOfChange,fetchImportanceRank,fetchLevelOfChange,fetchPartDetailsByDynamicModel,SavePartInformation,fetchPartByDynamicModel,fetchVariantByDynamicModel,fetchBlocksByDynamicModel,fetchSystemByDynamicModel};

