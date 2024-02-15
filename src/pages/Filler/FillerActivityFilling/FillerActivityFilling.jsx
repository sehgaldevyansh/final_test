import { useEffect, useState } from "react";
import PropType from "prop-types";
import { Button, Chip } from "@mui/material";
import searchIcon from "../../../assets/Flaticons/searchIcon.svg";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import "./FillerActivityFilling.css";
import {
  useFetchBaseModelByModelIdQuery,
  useFetchBlockListsQuery,
  useUpdateCheckedBlockListMutation,
  useUpdateDraftBlockListMutation,
} from "../../../store";
import { produce } from "immer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SnackBarComponent from "../../../components/SnackBarComponent/SnackBarComponent";

const addModalData = [
  {
    baseModel: "123Y",
    variantName: "001",
    partNo: "123",
    level: "5",
    applicable: "true",
    BDMGname: "XYZ",
    block: "2",
    parentsPartNo: "RTY",
    DWGType: "S",
    partName: "XXXX-YYYY",
    qty: 21,
    sumQty: 12,
    "A/AR": "A",
  },
  {
    baseModel: "127Y",
    variantName: "001",
    partNo: "123",
    level: "8",
    applicable: "true",
    BDMGname: "RTG",
    block: "2",
    parentsPartNo: "RRE",
    DWGType: "S",
    partName: "AAAA-XXXX",
    qty: 21,
    sumQty: 12,
    "A/AR": "A",
  },
  {
    baseModel: "127Y",
    variantName: "101",
    partNo: "123",
    level: "8",
    applicable: "true",
    BDMGname: "QWE",
    block: "R",
    parentsPartNo: "TYUI",
    DWGType: "S",
    partName: "XXXX-YYYY-ZZZZ",
    qty: 21,
    sumQty: 12,
    "A/AR": "A",
  },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FillerActivityFilling = ({ handleNext, handlePrev }) => {
  const params = useParams();
  const { data, error, isLoading, refetch } = useFetchBlockListsQuery(
    params?.id
  );
  const [UpdateCheckedBlock, results] = useUpdateCheckedBlockListMutation();
  const [draftBlockList, resultDraft] = useUpdateDraftBlockListMutation();
  const { data: baseModelCount } = useFetchBaseModelByModelIdQuery(params?.id); // use everywhere
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [commonUncommonFilteredData, setCommonUncommonFilteredData] =
    useState();
  const [modelData, setModelData] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const searchOptions = [
    { name: "Blocks", value: "blockCode" },
    { name: "Base Model", value: "baseModel" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    searchOptions[0].value
  );
  const [selectedOptionName, setSelectedOptionName] = useState(
    searchOptions[0]?.name
  );

  const navigate = useNavigate();
  useEffect(() => {
    console.log("model details data", data?.data);
    setModelData(data?.data);
    setCommonUncommonFilteredData(data?.data);
  }, [isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const filteredArray = commonUncommonFilteredData?.filter(
      (data) => data.checkStatus === false
    );
    if (filteredArray?.length == 0) setDisableSubmit(false);
  }, [commonUncommonFilteredData]);

  const [snackBarState, setSnackBarState] = useState(false);

  const handleSnackbarClose = () => {
    setSnackBarState(false);
  };

  // const [blockVariantDetails, setBlockVariantDetails] = useState([])
  const handleSaveAsDraft = () => {
    console.log(
      "Model Data Draft",
      modelData,
      "--",
      commonUncommonFilteredData
    );
    const filteredArray = commonUncommonFilteredData.filter(
      (data) => data.checkStatus === false
    );
    if (filteredArray?.length == 0) setDisableSubmit(false);
    else {
      setDisableSubmit(true);
    }
    draftBlockList({ filteredArray: filteredArray, modelId: params?.id })
      .then(() => {
        //filteredArray

        refetch();
        // setSnackBarState(true)
      })
      .then(() => {
        toast.success("Draft Saved");
      })
      .catch((err) => {
        console.log("Internal server Error", err);
      });
  };

  const getChipStyle = (variantType) => {
    console.log("change me ", variantType);
    switch (variantType) {
      case 0:
        return { backgroundColor: "#e6e9f0", color: "#979ade" };
      case 1:
        return { backgroundColor: "#ffd2a8", color: "#171c8f" };
      case 2:
        return {
          backgroundColor: "var(--variant-gradient-color)",
          color: "#000",
        };
      case 3:
        return { backgroundColor: "#797eed", color: "#ffffff" };

      default:
        return { backgroundColor: "#e6e9f0", color: "#979ade" };
    }
  };

  const handleSearch = (term, option) => {
    console.log("Search Term:", term, typeof term);
    console.log("Selected Option:", option);
    // term = term.toString()
    const searchTermLowerCase = term?.toLowerCase();

    const filteredData = modelData.filter((model) => {
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
  };

  useEffect(() => {
    const filteredArray = commonUncommonFilteredData?.filter(
      (data) => data.checkStatus === false
    );
    if (filteredArray?.length == 0) setDisableSubmit(false);
    else {
      setDisableSubmit(true);
    }
  }, [commonUncommonFilteredData]);

  const handleSwitchChange = (row, currentState) => {
    console.log("rowHere", currentState);
    const activateValue = currentState ? true : false;
    console.log("activateValue", activateValue);
    setCommonUncommonFilteredData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.blockCode === row?.blockCode
          ? { ...item, checkStatus: activateValue }
          : item
      );
      return updatedData;
    });
    const updatedRow = { ...row, checkStatus: !row?.checkStatus };

    UpdateCheckedBlock({ updatedRow: updatedRow, modelId: params?.id })
      .then(() => {
        refetch();
      })
      .then(() => {
        toast.success("Status Updated");
      })
      .catch((err) => {
        console.log("Internal server Error", err);
      });

    console.log("maddy", commonUncommonFilteredData);
  };

  const [selectedVariant, setSelectedVariant] = useState("001");

  const handleVariantType = (reqBlockCode, variantName) => {
    const updatedObject = produce(commonUncommonFilteredData, (draft) => {
      const blockToUpdate = draft.find(
        (block) => block.blockCode == reqBlockCode
      );

      if (blockToUpdate && blockToUpdate.variant) {
        const variantToUpdate = blockToUpdate.variant.find(
          (variant) => variant.variantName === variantName
        );

        if (variantToUpdate) {
          let prevState = (variantToUpdate.commInd + 1) % 4;

          variantToUpdate.commInd = prevState;
        }
      }
    });
    setModelData(updatedObject);
    setCommonUncommonFilteredData(updatedObject);
  };

  const columns = [
    {
      name: "Blocks",
      selector: (row) => row["blockCode"],
      cell: (row) => (
        <div
          className=""
          style={{ color: "var(--base-text-color)", fontWeight: "400" }}
        >
          {row["blockCode"]}
        </div>
      ),
      sortable: true,
      grow: 0,
    },
    {
      name: "Base Model",
      selector: (row) => row["baseModel"],
      sortable: true,
      wrap: true,
      maxWidth: "20%",
    },
    {
      name: (
        <div className="" style={{ padding: "8px 12px" }}>
          Choose Variants
        </div>
      ),
      selector: (row) => row["variant"],
      cell: (row) => (
        <div className="flex justify-end">
          {row?.variant?.map((variant, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                display: "flex",
                justifyContent: "flex-start",
                minWidth: "72px",
              }}
            >
              <Chip
                label={variant?.variantName}
                onClick={() => {
                  !row?.checkStatus
                    ? handleVariantType(row?.blockCode, variant?.variantName)
                    : console.log("Not checked ");
                }}
                style={{
                  background: getChipStyle(variant.commInd).backgroundColor,
                  color: getChipStyle(variant.commInd).color,
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "400",
                  ":hover": {
                    backgroundColor: getChipStyle(variant.commInd)
                      .backgroundColor,
                    color: getChipStyle(variant.commInd).color,
                  },
                  "& .MuiChip-label": {
                    // paddingLeft: '0px',
                    padding: "0px",
                  },
                }}
                className={`chip-${variant.commInd}`}
              />
            </div>
          ))}
        </div>
      ),
    },

    {
      name: "Check",
      selector: (row) => row?.checkStatus,
      cell: (row) => (
        <Switch
          key={row?.checkStatus}
          onChange={(e) => {
            handleSwitchChange(row, e);
          }}
          checked={row?.checkStatus === true}
          // checked={toggleStates[row.index]}
          onColor="#E9FFEA"
          offColor="#FFf"
          onHandleColor="#00A607"
          offHandleColor="#171c8f"
          handleDiameter={12}
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 10,
                color: "#171c8f",
                marginLeft: -20,
                marginTop: -2,
                width: "175%",
              }}
            >
              Response
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 10,
                color: "#00A607",
                marginLeft: -3,
                marginTop: -2,
                width: "175%",
                flexWrap: "nowrap",
                wordWrap: "false",
              }}
            >
              Checked
            </div>
          }
          width={68}
          height={20}
          className="react-switch"
          id="material-switch"
        />
      ),
      center: "true",
      grow: 0,
    },
  ];

  const [newData, setNewData] = useState(addModalData);

  useEffect(() => {
    const initialFilteredData = newData.filter(
      (item) => item.variantName === selectedVariant
    );
    setFilteredData(initialFilteredData);
  }, [newData, selectedVariant]);

  return (
    <div
      className=" flex flex-col items-stretch h-full justify-between"
      style={{
        backgroundColor: "#f4f5f8",
        height: "83vh",
      }}
    >
      <ToastContainer />
      <div className="flex-col relative flex  w-full items-center max-md:max-w-full max-md:pl-5 h-full  modellist-container">
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
                {/* {baseModelCount?.data?.totalBlocks} */}
                {/* @Kaushik */}
              </div>
            </div>
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 pl-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 table-container">
              <i className="aspect-square object-contain object-center w-4 fill-zinc-400 overflow-hidden shrink-0 max-w-full">
                <img src={searchIcon} alt="Search Icon" />
              </i>
              <div
                className="text-neutral-500 text-sm leading-4 tracking-tight flex items-center gap-2"
                style={{ width: "80%" }}
              >
                <span style={{ fontWeight: "600" }}>Search:</span>

                <select
                  className="flex items-center text-zinc-400 text-sm  tracking-tight outline-none border-none focus:ring-0 focus:border-none"
                  value={selectedSearchOption}
                  onChange={(e) => {
                    console.log(
                      "Event **",
                      e.target.selectedIndex,
                      e.target.value
                    );
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
                  placeholder={`Enter value to search`}
                  value={searchTerm}
                  onChange={(e) => {
                    console.log("event!", e);
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
                // data={modelData}
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
      <div className="flex justify-between w-full">
        <div className="flex justify-start items-end self-end mt-2 mb-2 py-2">
          <LegendComponent
            mainText={"Toggle condition applicable on the Variant"}
            legendItems={[
              { color: "#e6e9f0", legendText: "NA" },
              { color: "#ffd2a8", legendText: "Common" },
              {
                color:
                  "linear-gradient(90deg, #FFD2A8 0%, rgba(255, 209, 167, 0.67) 43.87%, rgba(121, 126, 237, 0.79) 66%, #797EED 100%)",
                legendText: "Common/Monitoring Req",
              },
              { color: "#797eed", legendText: "Uncommon" },
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
            onClick={() => handlePrev(1)}
            className="dcms-btn-main dcms-save-as-draft-btn"
          >
            Prev
          </Button>
          <Button
            className={
              disableSubmit
                ? "dcms-btn-main dcms-disabled-btn"
                : "dcms-btn-main dcms-active-btn"
            }
            onClick={() => handleNext(1)}
            disabled={disableSubmit}
          >
            Next
          </Button>
        </div>
      </div>
      <SnackBarComponent
        isOpen={snackBarState}
        handleClose={handleSnackbarClose}
        msg={"Data Saved!"}
        position={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
};

FillerActivityFilling.propTypes = {
  handleNext: PropType.func,
  handlePrev: PropType.func,
};

export default FillerActivityFilling;
