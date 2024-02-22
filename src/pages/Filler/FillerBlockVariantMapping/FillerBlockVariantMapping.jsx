import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import searchIcon from "../../../assets/Flaticons/searchIcon.svg";
import pencilIcon from "../../../assets/Flaticons/fi-sr-pencil.svg";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import "../FillerActivityFilling/FillerActivityFilling.css";
import SingleRowTable from "../../../components/SingleRowTable/SingleRowTable";
import StepperComponent from "../../../components/StepperComponent/StepperComponent";
import {
  useFetchBlockListsQuery,
  useUpdateDraftBlockListMutation,
  useFetchBaseModelByModelIdQuery,
} from "../../../store";
import {
  fetchVariantsByDynamicModel,
  fetchVariantBaseList,
  fetchVariantsByBaseModel,
  fetchVariantListByBaseAndBlock,
  fetchBaseModelListByBlock,
  fetchPartDetails,
  fetchPartListByBaseAndBlockAndVariant,
  fetchLevelListByBaseAndBlockAndVariant,
  handleReplaceVariantName,
  savePartLists,
  allPartDetails,
  saveSinglePartLists,
  handleDeletePartList,
} from "./dynamicApi";
import trashIcon from "../../../assets/Flaticons/trashIcon.svg";
import checkIcon from "../../../assets/Flaticons/checkIcon.svg";
import addIcon from "../../../assets/Flaticons/addIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import addIconWhite from "../../../assets/Flaticons/addIconWhite.svg";
import saveIcon from "../../../assets/Flaticons/saveIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const FillerBlockVariantMapping = ({ handleNext }) => {
  const searchOptions = [
    { name: "Blocks", value: "blockCode" },
    { name: "Base Model", value: "baseModel" },
  ];
  const navigate = useNavigate();
  const params = useParams();
  const { data, error, isLoading, refetch } = useFetchBlockListsQuery(
    params?.id
  );
  const [draftBlockList, resultDraft] = useUpdateDraftBlockListMutation();

  const [queryObject, setQueryObject] = useState();
  const [baseModelList, setBaseModelList] = useState(); // contain base options
  const [userBaseModelList, setUserBaseModelList] = useState();
  const [variantList, setVariantList] = useState(); // conatain variant list
  const [userVariantList, setuserVariantList] = useState();
  const [partNumberList, setPartNumberList] = useState(); // contain variant list
  const [userPartNumberList, setuserPartNumberList] = useState();
  const [levelList, setLevelList] = useState(); // contain level list
  const [userLevelList, setUserLevelList] = useState();
  const [newPartList, setNewPartList] = useState({});
  const [createNewPartParent, setCreateNewPartParent] = useState({});
  const [handleNewVariantAddName, setHandleNewVariantAddName] = useState("**");
  const [variantBaseList, setVariantBaseList] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modelData, setModelData] = useState(data?.data);
  const [commonUncommonFilteredData, setCommonUncommonFilteredData] = useState(
    data?.data
  );
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    searchOptions[0].value
  );
  const [selectedOptionName, setSelectedOptionName] = useState(
    searchOptions[0].name
  );
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("001");
  const [selectedBaseModel, setSelectedBaseModel] = useState("");
  const [newData, setNewData] = useState(); //addModalData
  const [newPartCreationMethod, setNewPartCreationMethod] = useState("");
  const [disableNewRowAdd, setDisableNewRowAdd] = useState(false);
  const [newVariantName, setNewVariantName] = useState("");
  const [anchorVariantEl, setAnchorVariantEl] = useState(null);
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [handlingNewVarientToggleSelect, sethandlingNewVarientToggleSelect] =
    useState();
  const [handleReplaceVariant, sethandleReplaceVariant] = useState();
  const [prevStarState, setPrevStarState] = useState("**");

  useEffect(() => {
    console.log("model details data", data?.data);
    setModelData(data?.data);
    setCommonUncommonFilteredData(data?.data);
  }, [isLoading]);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMenuClose = () => {
  //     setAnchorEl(null);
  // };
  const { data: baseModelCount } = useFetchBaseModelByModelIdQuery(params?.id);
  //    const baseModelCount='YY17'
  const handleAddRowFromMenu = async (method) => {
    setNewPartCreationMethod(method);
    handleAddRow(method);
    if (method === "tpl") {
      const data = await fetchBaseModelListByBlock({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
      });
      console.log("base dropdown", data);
      setBaseModelList(data?.data);
    }
    console.log("base dropdown", data);
    //api hit for dropdown base model
  };
  //////adding new part functions
  const handleBaseModelChange = async (e, createType) => {
    setUserBaseModelList(e.target.value);
    console.log("check change", e.target.value);
    if (createType === "tpl") {
      const data = await fetchVariantListByBaseAndBlock({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        baseModel: e?.target?.value,
      });
      setVariantList(data?.data);
    }
    setuserVariantList();
    setPartNumberList();
    setuserPartNumberList();
  };
  const handleVariantChanges = async (e, createType) => {
    setuserVariantList(e.target.value);
    if (createType === "tpl") {
      const data = await fetchPartListByBaseAndBlockAndVariant({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        baseModel: userBaseModelList,
        variantName: e?.target?.value,
      });
      setPartNumberList(data?.data);
    }
    /// handling variant jugad
    setuserPartNumberList();
    if (
      handlingNewVarientToggleSelect !== undefined &&
      newPartCreationMethod === "tpl"
    ) {
      const allparts = await allPartDetails({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        baseModel: userBaseModelList,
        variantName: e?.target?.value,
      });
      console.log("handleNewVariantAddName", handleNewVariantAddName);
      const updatedData = allparts?.data.map((item) => ({
        ...item,
        variantName: handleNewVariantAddName,
        referredVariantName: e?.target?.value,
        baseModel: baseModelCount?.data?.baseModel,
        referedBaseModel: userBaseModelList,
        applicable: false,
        //add base model as referred here
      }));
      // setNewData(allparts?.data)
      setNewData(updatedData);
    }
  };
  const handlePartChanges = async (e, createType) => {
    setuserPartNumberList(e.target.value);
    // if(createType==='tpl'){
    //     const data = await fetchLevelListByBaseAndBlockAndVariant({blockCode:queryObject?.blockCode, modelId:params?.id, baseModel:userBaseModelList, partName:e?.target?.value, variantName:userVariantList})
    //     setLevelList(data?.data)
    // }
    if (createType === "tpl") {
      const data = await fetchPartDetails({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        baseModel: userBaseModelList,
        level: 1,
        variantName: userVariantList,
        partName: e?.target?.value,
      });
      data.data.applicable = true;
      setNewPartList(data?.data);
      console.log("newData", data?.data);
    }
  };
  const handleLevelChanges = async (e, createType) => {
    setUserLevelList(e.target.value);
    if (createType === "tpl") {
      const data = await fetchPartDetails({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        baseModel: userBaseModelList,
        level: e?.target?.value,
        variantName: userVariantList,
        partName: userPartNumberList,
      });

      data.data.applicable = true;
      setNewPartList(data?.data);
      console.log("newData", data?.data);
      console.log("newData", data?.data?.applicable);
    }
  };

  const handleSaveAsDraft = () => {
    console.log("Model Data Draft", modelData);
    const filteredArray = modelData.filter(
      (data) => data.checkStatus === false
    );
    draftBlockList({ useremail: "example@example.com", data: filteredArray });
  };

  const handleOpen = async (row) => {
    setOpen(true);
    const varientBaseList = await fetchVariantBaseList({
      row: row,
      modelId: params?.id,
    });
    const data = await fetchVariantsByDynamicModel({
      row: row,
      modelId: params?.id,
      varientBaseList: varientBaseList?.data,
    });
    setQueryObject(row);
    console.log("varianttesting", varientBaseList?.data[0]?.variantName);
    // setSelectedVariant(row?.variant[0]?.variantName)
    setSelectedVariant(varientBaseList?.data[0]?.variantName);
    setNewData(data?.data);
    // console.log("got data",data?.data);
    // console.log("got data", data?.data);
    // console.log("got variant", varientBaseList?.data);

    setVariantBaseList(varientBaseList?.data);
  };
  const createNewRef = useRef(null);

  const handleCreateNewFunction = (n) => {
    // console.log("Input handle", e?.target?.value, "-", key);
    // setCreateNewPartParent(n);
    createNewRef.current = n;
    console.log("createnew", n);
    // Do whatever you need to do with the input change in the parent component
  };

  const handleClose = async () => {
    const res = await refetch();
    console.log("badhiyamsg", res);
    setCommonUncommonFilteredData(res?.data?.data);
    setModelData(res?.data?.data);

    setOpen(false);
    sethandlingNewVarientToggleSelect(undefined);
    setBaseModelList();
    setUserBaseModelList();
    setVariantList();
    setuserVariantList();
    setPartNumberList();
    setuserPartNumberList();
    setNewPartList();
  };

  const handleSearch = (term, option) => {
    console.log("Search Term:", term, typeof term);
    console.log("Selected Option:", option);
    // term = term.toString()
    const searchTermLowerCase = term.toLowerCase();

    const filteredData = data?.data?.filter((model) => {
      console.log("filtered data function", model);
      // option == 'Blocks' ? option = 'blockCode' : option
      const propertyValue = model[option];
      console.log(
        "Property Value:",
        propertyValue,
        searchTermLowerCase,
        propertyValue.toLowerCase().includes(searchTermLowerCase)
      );
      return (
        propertyValue &&
        propertyValue.toLowerCase().includes(searchTermLowerCase)
      );
    });

    console.log("Filtered Data:", filteredData);
    setCommonUncommonFilteredData(filteredData);
    // setToggleStates(modelData.map((model) => model.Active === "true"));
  };

  const handleVariantChange = async (variant) => {
    console.log("variant", variant);
    const data = await fetchVariantsByBaseModel({
      variant,
      queryObject,
      modelId: params?.id,
    }); //queryObject
    setNewData(data?.data);
    setSelectedVariant(variant);
  };

  const columns = [
    {
      name: "Blocks",
      selector: (row) => row["blockCode"],
      cell: (row) => (
        <div
          className=""
          style={{ fontWeight: "400", color: "var(--base-text-color)" }}
        >
          {row["blockCode"]}
        </div>
      ),
      sortable: true,
      grow: 0,
    },
    // { name: 'Block Name', selector: (row) => row['blockName'], sortable: true, wrap: true, maxWidth: '20%' },
    {
      name: "Base Model",
      selector: (row) => row["baseModel"],
      sortable: true,
      wrap: true,
      maxWidth: "15%",
      fontSize: "14px",
    },
    {
      name: (
        <div className="" style={{ padding: "8px 12px" }}>
          Variants
        </div>
      ),
      selector: (row) => row["variant"],
      cell: (row) => (
        <div className="flex flex-wrap">
          {row?.variant?.map((variant, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                display: "flex",
                justifyContent: "flex-start",
                minWidth: "75px",
              }}
            >
              <Chip
                label={variant?.variantName}
                // onClick={() => handleVariantType(row?.blockCode, variant?.variantName)}
                sx={{
                  // backgroundColor: getChipStyle(variant.commInd).backgroundColor,
                  backgroundColor: "#fff",
                  color: "#979ade",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "flex-end",

                  "& .MuiChip-label": {
                    // paddingLeft: '0px',
                    padding: "0px",
                  },
                }}
                className={
                  variant?.isModified ? `chip-modified` : "chip-not-modified"
                }
              />
            </div>
          ))}
        </div>
      ),
      grow: 1,
    },
    {
      name: <div style={{}}>Create Partlist</div>,
      selector: (row) => row.action,
      cell: (row) => (
        <div className="flex items-center gap-2 ">
          <div
            className={`cursor-pointer flex flex-col items-start w-full`}
            // onClick={() => handleEdit(row.index)}
          >
            {/* <Router>  */}
            <Link className="model-name-link">
              <i className="fi fi-rr-user">
                <img
                  src={pencilIcon}
                  onClick={() => {
                    handleOpen(row);
                  }}
                  alt="Pencil Icon"
                />
              </i>
            </Link>
            {/* </Router> */}
          </div>
        </div>
      ),
      center: "true",
      grow: 0.15,
    },
  ];

  const modalColumns = [
    {
      name: "Base Model",
      selector: (row) => row["referredBaseModel"],
      sortable: true,
      cell: (row) =>
        row["baseModel"] === "" ? (
          newPartCreationMethod === "tpl" ? (
            <select
              onChange={(e) => handleBaseModelChange(e, "tpl")}
              className="dropdown-table"
              disabled={
                selectedVariant === "**" ||
                selectedVariant === "" ||
                selectedVariant === "*"
              }
            >
              {baseModelList?.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
              <option key={"sadd"} value={"sdad"}>
                Select Base Model
              </option>
            </select>
          ) : (
            <input
              disabled={
                selectedVariant === "**" ||
                selectedVariant === "" ||
                selectedVariant === "*"
              }
              onChange={(e) => handleBaseModelChange(e, "newPart")}
              className="dropdown-table"
            />
          )
        ) : (
          row["referredBaseModel"]
        ),
    },
    {
      //variantList
      name: "Variant Name",
      selector: (row) => row["variantName"],
      sortable: true,
      wrap: true,
      maxWidth: "20%",
      cell: (row) =>
        row["variantName"] === "" ? (
          newPartCreationMethod === "tpl" ? (
            <select
              onChange={(e) => handleVariantChanges(e, "tpl")}
              className="dropdown-table"
              disabled={
                selectedVariant === "**" ||
                selectedVariant === "" ||
                selectedVariant === "*"
              }
            >
              {variantList?.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
              <option key={"sadd"} value={"sdad"}>
                Select Variant Name
              </option>
            </select>
          ) : (
            <input
              defaultValue={selectedVariant}
              disabled={
                selectedVariant === "**" ||
                selectedVariant === "" ||
                selectedVariant === "*" ||
                newPartCreationMethod === "new"
              }
              onChange={(e) => handleVariantChanges(e, "newPart")}
              className="dropdown-table"
            />
          )
        ) : (
          row["variantName"]
        ),
    },
    {
      //partNumberList
      name: "Part Number",
      selector: (row) => row["partNo"],
      sortable: true,
      wrap: true,
      maxWidth: "20%",
      cell: (row) =>
        row["partNo"] === "" ? (
          newPartCreationMethod === "tpl" ? (
            <select
              onChange={(e) => handlePartChanges(e, "tpl")}
              className="dropdown-table"
            >
              {partNumberList?.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
              <option key={"sadd"} value={"sdad"}>
                Select Part No.
              </option>
            </select>
          ) : (
            <input
              onChange={(e) => handlePartChanges(e, "newPart")}
              className="dropdown-table"
            />
          )
        ) : (
          row["partNo"]
        ),
    },
    {
      //levelList
      name: "Level",
      selector: (row) => row["level"],
      // sortable: true,
      wrap: true,
      maxWidth: "20%",
      cell: (row) =>
        row["level"] === "" ? (
          newPartCreationMethod === "tpl" ? (
            <select
              onChange={(e) => handleLevelChanges(e, "tpl")}
              className="dropdown-table"
            >
              {levelList?.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
              <option key={"sadd"} value={"sdad"}>
                Select
              </option>
            </select>
          ) : (
            <input
              onChange={(e) => handleLevelChanges(e, "newPart")}
              className="dropdown-table"
            />
          )
        ) : (
          row["level"]
        ),
    },
    {
      name: "Applicability",
      maxWidth: "20%",
      selector: (row) => row["applicable"],
      // sortable: true,
      wrap: true,
      cell: (row) => (
        <div className="flex justify-end w-full">
          <input
            type="checkbox"
            checked={row["applicable"]}
            onChange={() => handleCheckboxChange(row)}
            style={{ accentColor: "var(--base-text-color)" }}
          />
        </div>
      ),
      grow: "0.24",
    },
    {
      name: "",
      maxWidth: "20%",
      wrap: false,
      grow: "0",
      cell: (row) =>
        row["level"] === "_" || newPartList ? (
          <div
            className="flex w-full py-2 gap-2 items-center justify-end"
            style={{}}
          >
            <div
              className=""
              style={{
                borderRadius: "50%",
                border: "1px solid var(--base-text-color)",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center                                                                     ",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log("new part button");
                return handleNewRowSave();
              }}
            >
              <i className="flex items-center justify-center">
                <img src={checkIcon} />
              </i>
            </div>
            <div
              className=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleDeleteRow(row.uniqueKey, row);
              }}
            >
              <i className="">
                <img
                  src={trashIcon}
                  onClick={() => {
                    handleDeleteRow(row.uniqueKey, row);
                  }}
                />
              </i>
            </div>
          </div>
        ) : row["createFrom"] !== "TPL LOAD" ? (
          <i className="">
            <img
              src={trashIcon}
              onClick={() => {
                handleDeleteRow(row.uniqueKey, row);
              }}
            />
          </i>
        ) : null,
    },
  ];
  useEffect(() => {
    console.log("line447", newData);
    const initialFilteredData = newData?.filter(
      (item) =>
        item?.variantName === selectedVariant || item?.variantName === ""
    );
    setFilteredData(initialFilteredData);
  }, [newData, selectedVariant, isLoading]);

  const handleCheckboxChange = (row) => {
    // console.log('applicable change',newData)
    const updatedData = newData.map((item) =>
      item === row ? { ...item, applicable: !item.applicable } : item
    );
    setNewData(updatedData);
  };
  const handleNewRowSave = async () => {
    sethandlingNewVarientToggleSelect(undefined);
    console.log("checknewdata", createNewRef.current);
    console.log("checknewdata", newPartList);
    // const { variantName, baseModel } = newPartList;
    let secondToLastElement = "";
    if (newData.length >= 2) {
      secondToLastElement = newData[newData.length - 2];
    }
    if (!createNewRef?.current?.block) {
      console.log("variant add debug", secondToLastElement?.variantName);
      const swappedNewPartList = {
        ...newPartList,
        variantName: secondToLastElement?.variantName
          ? secondToLastElement?.variantName
          : newVariantName,
        referredVariant: userVariantList,
        baseModel: secondToLastElement?.baseModel
          ? secondToLastElement?.baseModel
          : baseModelCount?.data?.baseModel,
        referredBaseModel: userBaseModelList,
        partNo: userPartNumberList,
      };
      console.log("swappedNewPartList", swappedNewPartList);
      const newArray = [...newData.slice(0, -1), swappedNewPartList];
      setNewPartList({});
      console.log("newArray", newArray);
      const responsePost = await saveSinglePartLists({
        data: [swappedNewPartList],
        params: {
          useremail: Cookies.get("email"),
          blockCode: queryObject?.blockCode,
          modelId: params?.id,
          variantName: secondToLastElement?.variantName
            ? secondToLastElement?.variantName
            : newVariantName,
          baseModel: secondToLastElement?.baseModel
            ? secondToLastElement?.baseModel
            : baseModelCount?.data?.baseModel,
          isModified: true,
          applicable: true,
        },
      })
        .then((res) => {
          toast.success("Part Added Successfully", {
            position: "top-right",
            autoClose: 500,
          });
        })
        .catch((err) => {
          console.log("Internal server Error");
        });
      setNewData(newArray);
      setBaseModelList();
      setUserBaseModelList();
      setVariantList();
      setuserVariantList();
      setPartNumberList();
      setuserPartNumberList();
      setNewPartList();
    } else {
      const createObj = createNewRef.current;
      const swappedNewPartList = {
        ...createObj,
        variantName: selectedVariant ? selectedVariant : newVariantName,
        referredVariant: selectedVariant ? selectedVariant : userVariantList,
        baseModel: secondToLastElement?.baseModel
          ? secondToLastElement?.baseModel
          : baseModelCount?.data?.baseModel,
        referredBaseModel: userBaseModelList,
        partNo: userPartNumberList,
        // level: 1,
        applicable: true,
      };
      console.log("checknewdata", createNewRef.current);
      //    console.log("checknewdata",userBaseModelList,userVariantList,userPartNumberList);
      console.log("checknewdata", swappedNewPartList);
      const responsePost = await saveSinglePartLists({
        data: [swappedNewPartList],
        params: {
          useremail: Cookies.get("email"),
          blockCode: queryObject?.blockCode,
          modelId: params?.id,
          variantName: secondToLastElement?.variantName
            ? secondToLastElement?.variantName
            : newVariantName,
          baseModel: secondToLastElement?.baseModel
            ? secondToLastElement?.baseModel
            : baseModelCount?.data?.baseModel,
          isModified: true,
        },
      })
        .then((res) => {
          toast.success("Part Added Successfully", {
            position: "top-right",
            autoClose: 500,
          });
        })
        .catch((err) => {
          console.log("Internal server Error");
        });
      const newArray = [...newData.slice(0, -1), swappedNewPartList];
      setNewData(newArray);
      setBaseModelList();
      setUserBaseModelList();
      setVariantList();
      setuserVariantList();
      setPartNumberList();
      setuserPartNumberList();
      setNewPartList();
    }
    setDisableNewRowAdd(false);
  };
  const handleAddRow = (method) => {
    console.log("disabling");
    setDisableNewRowAdd(true);

    // Find index of an existing row with the same creation method
    const existingRowIndex = newData.findIndex((row) => row.baseModel == "");

    // If an existing row is found, update it
    if (existingRowIndex !== -1) {
      const updatedData = [...newData];
      updatedData[existingRowIndex] = {
        ...updatedData[existingRowIndex],
        variantName: "",
        // Update other properties as needed
      };
      setNewData(updatedData);
    } else {
      console.log("newPartCreationMethod", method);
      // If no row with the same creation method exists, add a new row
      const newRow = {
        uniqueKey: Date.now(),
        baseModel: "",
        variantName: method !== "tpl" ? selectedVariant : "",
        partNo: "",
        level: "_",
        applicable: true,
        newPartCreationMethod: newPartCreationMethod,
        bdmgName: "",
        block: "",
        parentsPartNo: "",
        dwgType: "",
        partName: "",
        qty: "",
        sumQty: "",
        aar: "",
        referedBaseModel: "",
        referedVariant: "",
      };

      setNewData((prevData) => [...prevData, newRow]); // Keep existing data and add the new row
    }

    const updatedFilteredData = newData?.filter(
      (item) => item.variantName === selectedVariant || item.variantName === ""
    );

    setFilteredData(updatedFilteredData);
  };
  const handleDeleteRow = async (uniqueKey, row) => {
    console.log("Hitting this only", uniqueKey, "-", row);
    if (uniqueKey) {
      const updatedData = newData.filter((row) => row.uniqueKey !== uniqueKey);
      setNewData(updatedData);
    } else {
      const updatedData = newData.filter(
        (rowList) =>
          rowList.baseModel === row.baseModel &&
          rowList.block === row.block &&
          rowList.variantName === row.variantName &&
          rowList.partName !== row.partName
      );
      setNewData(updatedData);
      const res = await handleDeletePartList({
        body: row,
        modelId: params?.id,
      });
      res.then(() => {
        toast.success("Part Deleted Success", {
          position: "top-right",
          autoClose: 500,
        });
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    height: "85vh",
    bgcolor: "#f4f5f8",
    border: "1px solid #171c8f",
    boxShadow: 24,
    padding: "50px 26px 65px 26px",
  };

  const ExpandandedRowsComponent = (suppData) => {
    console.log("hitted", suppData?.data?.baseModel);
    const flag = suppData?.data.baseModel.length === 0;
    const headings = [
      "Base Model",
      "Block",
      "Level",
      "Parents Part No",
      "DWG Type",
      "Part Name",
      "QTY",
      "Sum QTY",
      "A/AR",
    ];
    return flag ? (
      <>
        {newPartList && (
          <SingleRowTable
            baseModel={baseModelCount?.data?.baseModel}
            block={queryObject?.blockCode}
            dataDetails={newPartList}
            headings={headings}
            handleInputChange={handleCreateNewFunction}
          />
        )}
        {!newPartList && (
          <SingleRowTable
            baseModel={baseModelCount?.data?.baseModel}
            block={queryObject?.blockCode}
            headings={headings}
            handleInputChange={handleCreateNewFunction}
            data={["", "", "", "", "", "", "", "", ""]}
            type={newPartCreationMethod}
          />
        )}
      </>
    ) : (
      <>
        <SingleRowTable
          baseModel={baseModelCount?.data?.baseModel}
          block={queryObject?.blockCode}
          dataDetails={suppData?.data}
          headings={headings}
          handleInputChange={handleCreateNewFunction}
        />
      </>
    );
  };

  const handleVariantDropdownOpen = () => {
    setIsVariantDropdownOpen(true);
  };

  const handleVariantDropdownClose = () => {
    setIsVariantDropdownOpen(false);
  };
  const handleVariantMenuClick = (event) => {
    setAnchorVariantEl(event.currentTarget);
  };
  let newRowAddedForCurrentVariant = false;
  const handleAddRowVariant = (method) => {
    console.log("called");
    const existingRowIndex = newData.findIndex((row) => row.baseModel == "");
    if (existingRowIndex !== -1) {
      const updatedData = [...newData];
      updatedData[existingRowIndex] = {
        ...updatedData[existingRowIndex],
        variantName: "",
      };
      setNewData(updatedData);
    } else {
      const newRow = {
        uniqueKey: Date.now(),
        baseModel: "",
        variantName: "",
        partNo: method === "tpl" ? "_" : "",
        level: "_",
        applicable: false,
        newPartCreationMethod: newPartCreationMethod,
        bdmgName: "",
        block: "",
        parentsPartNo: "",
        dwgType: "",
        partName: "",
        qty: "",
        sumQty: "",
        aar: "",
        referedBaseModel: "",
        referedVariant: "",
      };

      setNewData([newRow]);
      newRowAddedForCurrentVariant = true;
    }
    const updatedFilteredData = newData?.filter(
      (item) =>
        item?.variantName === selectedVariant || item?.variantName === ""
    );
    setFilteredData(updatedFilteredData);
  };

  const handleAddRowFromMenuVariant = async (method) => {
    console.log("handleAddRowFromMenuVariant called");
    setNewPartCreationMethod(method);
    console.log("handleAddRowFromMenuVariant called2");
    handleAddVariant();
    handleAddRowVariant(method);
    if (method === "tpl") {
      const data = await fetchBaseModelListByBlock({
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
      });
      console.log("base dropdown", data);
      setBaseModelList(data?.data);
    }
  };

  const handleAddVariant = () => {
    console.log("array length", newData);
    sethandlingNewVarientToggleSelect(variantBaseList.length); // make it zero
    // sethandlingNewVarientToggleSelect(0)
    // setSelectedVariant("003")
    console.log("step 1");
    const variantExists = variantBaseList?.some(
      (variant) => variant?.variantName === handleNewVariantAddName
    );
    console.log("variant exists ?", variantExists);
    console.log("step 2");
    if (!variantExists && prevStarState === "**") {
      console.log("step 3");
      const newVariantData = {
        variantName: "**",
        baseModel: userBaseModelList,
        // referredBaseModel:userBaseModelList
      };
      console.log("new variant data", newVariantData);
      // setFilteredData([])
      console.log("step 4");
      setVariantBaseList((prevList) => [...prevList, newVariantData]);
      console.log("step 5");
      setSelectedVariant(newVariantData?.variantName);
      console.log("step 6");
      setSelectedBaseModel(newVariantData?.baseModel);
      console.log("step 7");
    }
  };

  const handlePageSave = async () => {
    console.log("thispoint", newData);
    const res = await savePartLists({
      data: newData,
      params: {
        useremail: Cookies.get("email"),
        blockCode: queryObject?.blockCode,
        modelId: params?.id,
        variantName: userVariantList,
        baseModel: baseModelCount?.data?.baseModel,
        isModified: true,
      },
    })
      .then((res) => {
        toast.success("All Parts Saved Successfully", {
          position: "top-right",
          autoClose: 500,
        });
        setHandleNewVariantAddName("**");
      })
      .catch((err) => {
        console.log("Internal server Error");
      });

    sethandlingNewVarientToggleSelect(undefined);
    if (!handleReplaceVariant) {
      const varientBaseList = await fetchVariantBaseList({
        baseModel: baseModelCount?.data?.baseModel,
        block: queryObject?.blockCode,
        modelId: params?.id,
      });
      setVariantBaseList(varientBaseList?.data);
      sethandlingNewVarientToggleSelect(0);
      const data = await fetchVariantsByDynamicModel({
        baseModel: baseModelCount?.data?.baseModel,
        block: queryObject?.blockCode,
        modelId: params?.id,
        varientBaseList: varientBaseList?.data,
      });

      setSelectedVariant(varientBaseList?.data[0]?.variantName);
      setNewData(data?.data);
      sethandlingNewVarientToggleSelect(undefined);
    }

    if (handleReplaceVariant) {
      const response = await handleReplaceVariantName({
        modelId: params?.id,
        blockCode: queryObject?.blockCode,
        variantName: selectedVariant,
        newVariantName: handleReplaceVariant,
        baseModel: baseModelCount?.data?.baseModel,
      }).then(
        toast.success("Name changed successfully", {
          position: "top-right",
          autoClose: 500,
        })
      );

      sethandleReplaceVariant("");

      const varientBaseList = await fetchVariantBaseList({
        baseModel: baseModelCount?.data?.baseModel,
        block: queryObject?.blockCode,
        modelId: params?.id,
      });

      console.log("updated list", varientBaseList);

      setVariantBaseList(varientBaseList?.data);
      sethandlingNewVarientToggleSelect(0);
      const data = await fetchVariantsByDynamicModel({
        baseModel: baseModelCount?.data?.baseModel,
        block: queryObject?.blockCode,
        modelId: params?.id,
        varientBaseList: varientBaseList?.data,
      });
      setSelectedVariant(varientBaseList?.data[0]?.variantName);
      setNewData(data?.data);
      sethandlingNewVarientToggleSelect(undefined);
    }
  };

  return (
    <div
      className=" flex flex-col w-full items-stretch h-full"
      style={{
        backgroundColor: "#f4f5f8",
        height: "83vh",
      }}
    >
      <ToastContainer />
      <div className="flex-col relative flex  w-full items-center h-full modellist-container">
        <div className="rounded shadow bg-white flex w-full flex-col justify-center mt-4 pl-4 pr-16 py-2 items-start max-md:max-w-full max-md:pr-5">
          <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap p-2">
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 px-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 ">
              <div
                className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-3"
                style={{ padding: "2px 12px" }}
              >
                <div className="flex gap-2">
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>
                    Model{" "}
                  </span>
                  <span style={{ fontWeight: "400" }}>
                    {baseModelCount?.data?.modelName}
                  </span>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>
                    Base Model{" "}
                  </span>
                  <span style={{ fontWeight: "400" }}>
                    {" "}
                    {baseModelCount?.data?.baseModel}
                  </span>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>
                    Total Blocks{" "}
                  </span>
                  <span style={{ fontWeight: "400" }}>
                    {data?.data?.length}
                  </span>
                </div>
                {/* @Kaushik */}
              </div>
            </div>
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 pl-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 table-container">
              <i className="aspect-square object-contain object-center w-4 fill-zinc-400 overflow-hidden shrink-0 max-w-full">
                <img src={searchIcon} alt="Search Icon" />
              </i>
              <div
                className="text-neutral-400 text-sm leading-4 tracking-tight flex items-center gap-2"
                style={{ width: "80%" }}
              >
                <span style={{ fontWeight: "600" }}>Search:</span>

                <select
                  className="text-zinc-400 text-sm leading-4 tracking-tight outline-none border-none focus:ring-0 focus:border-none"
                  value={selectedSearchOption}
                  onChange={(e) => {
                    setSelectedSearchOption(e.target.value);
                    setSelectedOptionName(
                      searchOptions[e.target.selectedIndex].name
                    );
                    handleSearch(searchTerm, e.target.value);
                  }}
                >
                  {searchOptions?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="text-zinc-400 text-sm  leading-4 pr-80 tracking-tight outline-none border-none focus:ring-0 focus:border-none"
                  placeholder={"Enter value to search"}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value, selectedSearchOption);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="items-stretch rounded shadow bg-white flex w-full flex-col h-full mt-6 px-4 py-5 max-md:max-w-full">
          <div
            className="items-stretch rounded border border-[color:var(--grey-20,#E6E9F0)] bg-white flex flex-col pt-0.5 pb-2 px-3 border-solid max-md:max-w-full"
            style={{ height: "60vh", overflow: "auto" }}
          >
            <div className=" items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <DataTable
                columns={columns}
                data={commonUncommonFilteredData}
                keyField="Name"
                customStyles={{
                  overflowY: "auto",
                  headRow: {
                    style: {
                      color: "#171C8F",
                      fontWeight: 600,
                      fontSize: "14px",
                      minHeight: "40px",
                    },
                  },
                }}
                responsive
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full ">
        <div className="flex justify-start items-end self-end mt-2 mb-2 py-2 ">
          <LegendComponent
            mainText={"Toggle condition applicable on the Variant"}
            legendItems={[
              {
                color: "#fff",
                border: "2px solid var(--base-text-color)",
                legendText: "Modified Variant",
              },
            ]}
          />
        </div>
        <div className="flex items-center justify-between gap-2 mt-2 mb-2">
          <Button
            className="dcms-btn-main dcms-cancel-btn"
            onClick={() => navigate("/filler/modellist")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveAsDraft}
            className="dcms-btn-main dcms-save-as-draft-btn"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleNext(0)}
            className="dcms-btn-main dcms-active-btn"
          >
            Next
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            className="flex gap-7"
            style={{ fontSize: "14px", marginBottom: "14px" }}
          >
            <div className="">
              <p>
                <span
                  style={{ color: "var(--base-text-color)", fontWeight: "500" }}
                >
                  Block :{" "}
                </span>
                <span>{queryObject?.blockCode}</span>
              </p>
            </div>
            <div className="">
              <p>
                <span
                  style={{ color: "var(--base-text-color)", fontWeight: "500" }}
                >
                  Base Model :{" "}
                </span>
                <span>{queryObject?.baseModel}</span>
              </p>
            </div>
            <div className=""></div>
          </div>
          <div
            className="flex flex-col  items-center justify-start border"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              minHeight: "95%",
              width: "100%",
            }}
          >
            <div className="mt-4 flex flex-row w-full px-8 ">
              <div className="flex  justify-end w-full items-center">
                <StepperComponent
                  variantList={variantBaseList?.map(
                    (data) => data?.variantName
                  )}
                  baseModelList={variantBaseList?.map((data) =>
                    data?.referredBaseModel && data?.referredBaseModel != "null"
                      ? data?.referredBaseModel
                      : data?.baseModel
                  )}
                  onChange={handleVariantChange}
                  keyRefresh={handlingNewVarientToggleSelect}
                />
              </div>
              {/* ///// add variant */}
              <div
                className="flex items-center  justify-end gap-2"
                style={{ width: "25%" }}
              >
                <FormControl>
                  <Select
                    value=""
                    displayEmpty
                    renderValue={() => (
                      <div
                        className="flex gap-2 items-center"
                        style={{
                          color: isVariantDropdownOpen ? "#fff" : "inherit",
                        }}
                        title={
                          selectedVariant === "**"
                            ? "Name the variant first"
                            : ""
                        }
                      >
                        <div className="flex">
                          <i className="">
                            <img
                              src={
                                isVariantDropdownOpen ? addIconWhite : addIcon
                              }
                              alt="Add Icon"
                            />
                          </i>
                        </div>
                        <div
                          className=""
                          style={{
                            color: isVariantDropdownOpen ? "#fff" : "#171c8f",
                          }}
                        >
                          {selectedVariant === "**"
                            ? "Variant Locked"
                            : "Add Variant"}
                        </div>
                      </div>
                    )}
                    onClick={handleVariantMenuClick}
                    onOpen={handleVariantDropdownOpen}
                    onClose={handleVariantDropdownClose}
                    disabled={
                      selectedVariant === "**" ||
                      selectedVariant === "" ||
                      selectedVariant === "*"
                    } // Disable the dropdown if the selected variant is '**'
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isVariantDropdownOpen
                        ? "#171c8f"
                        : "inherit",

                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: isVariantDropdownOpen ? "#fff" : "#171c8f",
                      },

                      // padding:'7px 12px',
                      borderRadius: "4px",
                      border: "1px solid #171C8F",
                      height: "32px",
                      fontSize: "14px",
                    }}
                    size="small"
                  >
                    <MenuItem
                      sx={{
                        color: "#66696B",
                        "&:hover": {
                          borderRadius: "6px",
                          backgroundColor: "#A7A7A7",
                          color: "#fff",
                        },
                      }}
                      onClick={() => {
                        console.log("yahan aaya");
                        return handleAddRowFromMenuVariant("tpl");
                      }}
                    >
                      Create From TPL
                    </MenuItem>
                    {/* <MenuItem sx={{ color: "#66696B", '&:hover': { borderRadius: "6px", backgroundColor: '#A7A7A7', color: '#fff' } }} onClick={() => handleAddRowFromMenuVariant('new')}>
                                            Create New
                                        </MenuItem> */}
                  </Select>
                </FormControl>
                <div className="">
                  <Button
                    onClick={handlePageSave}
                    disabled={
                      selectedVariant === "**" ||
                      selectedVariant === "" ||
                      selectedVariant === "*"
                    }
                    size="small"
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isVariantDropdownOpen
                        ? "#171c8f"
                        : "inherit",

                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: isVariantDropdownOpen ? "#fff" : "#171c8f",
                      },

                      paddingLeft: "12px",
                      paddingRight: "12px",
                      borderRadius: "4px",
                      border: "1px solid #171C8F",
                    }}
                  >
                    <div
                      className="flex gap-2 items-center"
                      style={{
                        color: isVariantDropdownOpen ? "#fff" : "inherit",
                      }}
                    >
                      <div className="flex">
                        <i className="">
                          <img src={saveIcon} alt="Save Icon" />
                        </i>
                      </div>
                      <div
                        className=""
                        style={{ color: "#171c8f", textTransform: "none" }}
                      >
                        Save
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className=""
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                padding: "0px 32px",
                height: "60vh",
              }}
            >
              <div
                className="flex items-center justify-between w-full gap-4 border shadow"
                style={{
                  padding: "16px 22px",
                  borderTop: "3px solid #171c8f",
                  marginTop: "0px",
                }}
              >
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <p style={{ fontSize: "14px" }}>
                      {handlingNewVarientToggleSelect
                        ? "Variant Name"
                        : "Change Variant Name"}
                    </p>
                    {handlingNewVarientToggleSelect && (
                      <TextField
                        size="small"
                        value={selectedVariant}
                        onChange={(e) => {
                          const inputVariantName = e.target.value.trim();
                          console.log("andr ka data", inputVariantName);
                          setNewPartList((prevState) => ({
                            ...prevState,
                            variantName: inputVariantName,
                          }));
                          // Check if the input variant name is empty or not already present
                          const isVariantNameUnique =
                            inputVariantName === "" ||
                            !variantBaseList.some(
                              (variant) =>
                                variant?.variantName === inputVariantName
                            );
                          if (isVariantNameUnique) {
                            setHandleNewVariantAddName(inputVariantName);
                            const updatedVariantList = variantBaseList?.map(
                              (variant) => {
                                return variant?.variantName === selectedVariant
                                  ? {
                                      ...variant,
                                      variantName: inputVariantName,
                                    }
                                  : variant;
                              }
                            );

                            setVariantBaseList(updatedVariantList);
                            setSelectedVariant(inputVariantName);
                            setNewVariantName(inputVariantName);
                            // newPartList
                            setErrorMessage("");
                          } else {
                            setErrorMessage(
                              "Please select unique and valid variant name"
                            ); //////////////
                          }
                        }}
                      />
                    )}
                    {!handlingNewVarientToggleSelect && (
                      <TextField
                        size="small"
                        value={handleReplaceVariant}
                        onChange={(e) => {
                          const inputVariantName = e.target.value.trim();
                          console.log("andr ka data", inputVariantName);

                          // Check if the input variant name is empty or not already present
                          const isVariantNameUnique =
                            inputVariantName === "" ||
                            !variantBaseList.some(
                              (variant) =>
                                variant?.variantName === inputVariantName
                            );
                          if (isVariantNameUnique) {
                            sethandleReplaceVariant(inputVariantName);

                            setErrorMessage("");
                          } else {
                            setErrorMessage(
                              "Please select unique and valid variant name"
                            ); //////////////
                          }
                        }}
                      />
                    )}
                    {(selectedVariant === "**" ||
                      selectedVariant === "" ||
                      selectedVariant === "*") && (
                      <p className="text-red-700">
                        Please type a valid variant name
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-red-700">{errorMessage}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Select
                      value=""
                      displayEmpty
                      renderValue={() => (
                        <div
                          className="flex gap-2 items-center"
                          style={{ color: isDropdownOpen ? "#fff" : "inherit" }}
                        >
                          <div className="flex">
                            <i className="">
                              {/* <img src={isDropdownOpen ? addIconWhite : addIcon} alt="Add Icon" /> */}
                              <img src={addIconWhite} alt="Add Icon" />
                            </i>
                          </div>
                          {/* <div className="" style={{ color: isDropdownOpen ? '#fff' : '#171c8f' }}>Add Part</div> */}
                          <div className="" style={{ color: "#fff" }}>
                            Add Part
                          </div>
                        </div>
                      )}
                      onClick={handleMenuClick}
                      onOpen={handleDropdownOpen}
                      onClose={handleDropdownClose}
                      sx={{
                        cursor: "pointer",
                        // backgroundColor: isDropdownOpen ? '#171c8f' : 'inherit',
                        backgroundColor: "#171c8f",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "& .MuiSvgIcon-root": {
                          // color: isDropdownOpen ? '#fff' : '#171c8f'
                          color: "#fff",
                        },

                        paddingLeft: "12px",
                        paddingRight: "12px",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        height: "32px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        // border: "1px solid #171C8F",
                      }}
                      size="small"
                    >
                      <MenuItem
                        sx={{
                          color: "#66696B",
                          "&:hover": {
                            borderRadius: "6px",
                            backgroundColor: "#A7A7A7",
                            color: "#fff",
                          },
                        }}
                        onClick={() => handleAddRowFromMenu("tpl")}
                      >
                        Create From TPL
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "#66696B",
                          "&:hover": {
                            borderRadius: "6px",
                            backgroundColor: "#A7A7A7",
                            color: "#fff",
                          },
                        }}
                        onClick={() => handleAddRowFromMenu("new")}
                      >
                        Create New
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div
                className="w-full border"
                style={{ overflow: "auto", height: "45vh" }}
              >
                <DataTable
                  columns={modalColumns}
                  data={filteredData}
                  // keyField="baseModel"
                  customStyles={{
                    overflowY: "auto",
                    rows: {
                      style: {
                        backgroundColor: "#f4f5f8",
                      },
                    },
                    headRow: {
                      style: {
                        color: "#171C8F",
                        fontWeight: 600,
                        fontSize: "14px",
                        minHeight: "40px",
                      },
                    },
                  }}
                  responsive
                  expandableRows
                  expandableRowsComponent={ExpandandedRowsComponent}
                  // subHeaderWrap={true}
                  // dense={true}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FillerBlockVariantMapping;
