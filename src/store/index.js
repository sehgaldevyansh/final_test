import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { modelListApi } from "./apis/createrApi/modelListApi";
import { modelDetailsApi } from "./apis/createrApi/ModelDetailApi";
import { createModelApi } from "./apis/createrApi/createModelApi";
import { baseModelListApi } from "./apis/FillerApis/baseModelListApi"
import { blockListApi } from "./apis/FillerApis/blockListApi";
import { variantDetailsApi } from "./apis/FillerApis/variantDetailsApi";
import { devaitionlListApi} from "./apis/FillerApis/deviationApi"
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    [modelListApi.reducerPath]: modelListApi.reducer,
    [modelDetailsApi.reducerPath]: modelDetailsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [createModelApi.reducerPath]: createModelApi.reducer,
    [baseModelListApi.reducerPath]: baseModelListApi.reducer,
    [blockListApi.reducerPath]: blockListApi.reducer,
    [variantDetailsApi.reducerPath]: variantDetailsApi.reducer,
    [devaitionlListApi.reducerPath]:devaitionlListApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(modelListApi.middleware)
      .concat(modelDetailsApi.middleware)
      .concat(userApi.middleware)
      .concat(createModelApi.middleware)
      .concat(baseModelListApi.middleware)
      .concat(blockListApi.middleware)
      .concat(variantDetailsApi.middleware)
      .concat(devaitionlListApi.middleware)
  }
});



setupListeners(store.dispatch);

/////Creator APIS//////
export {
  useFetchModelListsQuery,
  useAddModelListsMutation,
  useDeleteModelListMutation,
} from "./apis/createrApi/modelListApi";
export {
  useFetchCreateModelTemplateQuery,
  useAddModelCreateTemplateMutation,
} from "./apis/createrApi/createModelApi";
export {
  useFetchModelDetailsQuery,
  useAddModelDetailsMutation,
  useFetchBaseModelListByTPLUploadQuery,
  useFetchFileDetailsUploadQuery
} from "./apis/createrApi/ModelDetailApi";
/////Filler APIS///////
export { useFetchBaseModelListsQuery,useFetchBaseModelByModelIdQuery } from "./apis/FillerApis/baseModelListApi";
export {
  useFetchBlockListsQuery,
  useUpdateCheckedBlockListMutation,
  useUpdateDraftBlockListMutation,
} from "./apis/FillerApis/blockListApi";
export { useFetchUsersQuery } from "./apis/userApi";

export {
  useFetchBaseModelListByBlockQuery,
  useFetchVariantsByBaseModelQuery,
} from "./apis/FillerApis/variantDetailsApi";

export {
  useFetchDeviationListsQuery
} from "./apis/FillerApis/deviationApi"

