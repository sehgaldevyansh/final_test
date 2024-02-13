
/* v8 ignore start */

// axios file

import axios from "axios";
import { API_BASE_URL } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
const fetchVariantsByDynamicModel = async (dynamicParam) => {
  console.log("dynamicParam",dynamicParam?.varientBaseList[0]  );  
  try {
        const res = await axios({
            method: "GET",
            url: `${API_BASE_URL}/dcms/filler/variant/${dynamicParam?.varientBaseList[0]?.variantName}`,
            params: {
                useremail:Cookies.get('email'),
                block: dynamicParam?.row?.blockCode || dynamicParam?.block,
                variant: dynamicParam?.varientBaseList[0]?.variantName,
                baseModel: dynamicParam?.row?.baseModel || dynamicParam?.baseModel,
                modelId:dynamicParam?.modelId
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
const fetchVariantsByBaseModel = async ({variant,queryObject,modelId}) => {
    console.log("dynamicParam",queryObject,"->",variant);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/variant/${variant}`,
              params: {
                  useremail:Cookies.get('email'),
                  block: queryObject?.blockCode,
                  variant: variant,
                  baseModel: queryObject?.baseModel,
                  modelId: modelId
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
const fetchVariantBaseList = async (dynamicParam) => {
    console.log("dynamicParam",dynamicParam);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/block/${dynamicParam?.row?.blockCode || dynamicParam?.block}/all-variants`,
              params: {
                  useremail:Cookies.get('email'),
                  block: dynamicParam?.row?.blockCode || dynamicParam?.block,
                  baseModel: dynamicParam?.row?.baseModel || dynamicParam?.baseModel,
                  modelId: dynamicParam?.modelId
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

  const fetchBaseModelListByBlock = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/basemodel-list`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
              
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
  const fetchVariantListByBaseAndBlock = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/variant-list`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
                  baseModel:props?.baseModel
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
  const fetchPartListByBaseAndBlockAndVariant = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/part-list`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
                  baseModel:props?.baseModel,
                  variantName:props?.variantName
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
  const fetchLevelListByBaseAndBlockAndVariant = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/all-level`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
                  baseModel:props?.baseModel,
                  variantName:props?.variantName,
                  partName:props?.partName
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
  const fetchPartDetails = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
              url: `${API_BASE_URL}/dcms/filler/part-details`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
                  baseModel:props?.baseModel,
                  variantName:props?.variantName,
                  partName:props?.partName,
                  level:props?.level
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
  const changeVariantName = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "PUT",
              url: `${API_BASE_URL}/dcms/filler/update-variant`,
              data:   {
                "baseModel":"127Y",
                "modelId":"123",
                "variantName":"2RL4",
                "newVariantName":"XX1"     
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
  const savePartLists = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "POST",
              url: `${API_BASE_URL}/dcms/filler/save-parts`,
              data:  props?.data,
              params:props?.params,
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

  const saveSinglePartLists = async (props) => {
    console.log("dynamicParam", props);
    try {
        const res = await axios({
            method: "POST",
            url: `${API_BASE_URL}/dcms/filler/create-part`,
            data: props?.data,
            params: props?.params,
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

  const allPartDetails = async (props) => {
    console.log("dynamicParam",props);  
    try {
          const res = await axios({
              method: "GET",
            //   http://localhost:8091/dcms/filler/get-deviation-list
              url: `${API_BASE_URL}/dcms/filler/all-parts-detail`,
              params: {
                  useremail:Cookies.get('email'),
                  block: props?.blockCode,
                  modelId: props?.modelId,
                  baseModel:props?.baseModel,
                  variantName:props?.variantName,
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

  const handleReplaceVariantName = async (props) => {
    console.log("handleReplaceVariantName",props);  
    try {
          const res = await axios({
              method: "PUT",
              url: `${API_BASE_URL}/dcms/filler/update-variant`,
              params: {
                  useremail:Cookies.get('email'),   
              },
              data:{
                  "baseModel":props?.baseModel,
			      "modelId":props?.modelId,
                  "variantName":props?.variantName,
			      "newVariantName":props?.newVariantName,
                  "block":props?.blockCode
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
  const handleDeletePartList = async (props) => {
    console.log("handleDeletePartList",props?.body);  
    try {
          const res = await axios({
              method: "DELETE",
              url: `${API_BASE_URL}/dcms/filler/remove-part`,
              params: {
                  useremail:Cookies.get('email'),  
                  modelId:props?.modelId 
              },
              data:props?.body,
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



export  {handleDeletePartList,handleReplaceVariantName,savePartLists,fetchPartDetails,fetchLevelListByBaseAndBlockAndVariant,fetchPartListByBaseAndBlockAndVariant,fetchVariantListByBaseAndBlock,fetchVariantsByDynamicModel,fetchVariantBaseList,fetchVariantsByBaseModel,fetchBaseModelListByBlock,allPartDetails,saveSinglePartLists};

/* v8 ignore stop */
