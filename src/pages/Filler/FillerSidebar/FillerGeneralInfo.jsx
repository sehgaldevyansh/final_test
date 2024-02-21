import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
// import Container from "@mui/material/Container";
import searchIcon from "../../../assets/Flaticons/searchIcon.svg";
import Sidebar from "./Sidebar";
import sampleData from "./Sample.json";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchBaseModelByModelIdQuery,
  useFetchBlockListsQuery,
} from "../../../store";
import {
  SavePartInformation,
  fetchCauseOfChange,
  fetchImportanceRank,
  fetchLevelOfChange,
  fetchPartDetailsByDynamicModel,
} from "./apis";
import {
  Box,
  Tab,
  Tabs,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import Header from "../../../components/Header/Header";
import "./FillerSidebar.css";
import FillerBreadCrump from "./FillerBreadCrump";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import SingleRowTable from "../../../components/SingleRowTable/SingleRowTable";
import axios from "axios";
import { API_BASE_URL2 } from "../../../store/Apiconstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const FillerGeneralInfo = ({ handleNext, handlePrev }) => {
  const params = useParams();

  const navigate = useNavigate();
  const { data: baseModelCount, refetch } = useFetchBaseModelByModelIdQuery(
    params?.id
  );
  const searchOptions = ["System", "Variant", "Part"];
  const [data, setData] = useState(sampleData.data);

  const [filteredData, setFilteredData] = useState(data);
  const [value, setValue] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    searchOptions[0]
  );
  const { data: blockLength } = useFetchBlockListsQuery(params?.id); //////////////////
  const handleSearch = (term, option) => {
    setSearchTerm(term);
    setSelectedSearchOption(option);
    const filtered = data.filter((system) => {
      const blocks = system.blocks.filter((block) => {
        const parts = block.variants.flatMap((variant) => {
          return variant.levels[0].parentPart.childParts.filter((part) => {
            return part.partNo.toLowerCase().includes(term.toLowerCase());
          });
        });
        return (
          block.blockCode.toLowerCase().includes(term.toLowerCase()) ||
          parts.length > 0
        );
      });
      return blocks.length > 0;
    });

    setFilteredData(filtered);
  };
  const [levelDropdown, setLevelDropdown] = useState();
  const [causeDropdown, setCauseDropdown] = useState();
  const [rankDropdown, setRankDropdown] = useState();
  const [draftStatus, setDraftStatus] = useState({}); ////////////new

  useEffect(() => {
    async function fetchData() {
      const D1 = await fetchLevelOfChange(params?.id);
      setLevelDropdown(D1?.data);
      const D2 = await fetchCauseOfChange(params?.id);
      setCauseDropdown(D2?.data);
      const D3 = await fetchImportanceRank(params?.id);
      setRankDropdown(D3?.data);
    }
    fetchData();
  }, []);

  const handleSaveAsDraftButton = async () => {
    const data = await SavePartInformation({
      body: {
        sdm: SDM,
        specNonSpec: specNonspec ? specNonspec : "",
        changeDescription: causeOfChange ? causeOfChange : "",
        levelOfChange: levelOfChange ? levelOfChange : "",
        causeOfModification: causeOfModification ? causeOfModification : "",
        importanceRank: importanceRank ? importanceRank : "",
        newRmUsage: newRmUsage ? newRmUsage : "",
        maruApplicability: maruApplicability ? maruApplicability : "",
        selectedSystem: selectedSystem ? selectedSystem : "",
        selectedBlock: selectedBlock.blockName ? selectedBlock.blockName : "",
        selectedVariant: selectedVariant.variantName
          ? selectedVariant.variantName
          : "",
        selectedPart: selectedPart ? selectedPart : "",
        isFilled:
          SDM &&
          specNonspec &&
          causeOfChange &&
          levelOfChange &&
          causeOfModification &&
          importanceRank &&
          newRmUsage &&
          maruApplicability &&
          selectedSystem &&
          selectedBlock &&
          selectedVariant &&
          selectedPart
            ? true
            : false,
        rowStateFlag: 1,
      },
      params: {
        partNumber: selectedPart ? selectedPart : "",
        baseModel: baseModelCount?.data?.baseModel,
        block: selectedBlock.blockName ? selectedBlock.blockName : "",
        variant: selectedVariant.variantName ? selectedVariant.variantName : "",
        modelId: params?.id,
      },
    })
      .then((res) => {
        toast.success("Part Details Saved");
        refetch();
      })
      .catch((err) => {
        console.log("Internal server Error", err);
      });
    setDraftStatus((prevDraftStatus) => ({
      ...prevDraftStatus,
      [selectedPart]: true,
    }));
    // setIsDraftSaved(true);
    console.log("handleSaveAsDraftButton", data);
  }; //handleSaveButton

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  //user-info
  const [SDM, setSDM] = useState();
  const [specNonspec, setSpecNonspec] = useState();
  const [causeOfChange, setCauseOfChange] = useState();
  const [levelOfChange, setLevelOfChange] = useState();
  const [causeOfModification, setCauseOfModification] = useState();
  const [importanceRank, setImportanceRank] = useState();
  const [newRmUsage, setNewRmUsage] = useState();
  const [maruApplicability, setMaruApplicability] = useState();
  const [singleRowData, setSingleRowData] = useState();
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const resetOptions = async () => {
    setSingleRowData(null);
    setCauseOfChange(null);
  };

  const handlePartClick = async (part) => {
    console.log("part", selectedBlock);
    const result = await resetOptions();
    const data = await fetchPartDetailsByDynamicModel({
      baseModel: baseModelCount,
      systemName: selectedSystem,
      blockName: selectedBlock?.blockName,
      variantName: selectedVariant?.variantName,
      partNumber: part,
      modelId: params?.id,
    });
    console.log("data--", data);
    setSingleRowData(data?.data);
    setLevelOfChange(data?.data?.levelOfChange);
    setSDM(data?.data?.sdm);
    setImportanceRank(data?.data?.importanceRank);
    setCauseOfChange(data?.data?.changeDescription);
    setCauseOfModification(data?.data?.causeOfModification);
    setSpecNonspec(data?.data?.specNonSpec);
    setNewRmUsage(data?.data?.newRmUsage);
    setMaruApplicability(data?.data?.maruApplicability);
    console.log("datadata", data?.data);
    setSelectedPart(part);
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    setSelectedPart(null);
  };

  const handleBlockClick = (block) => {
    console.log("block", block);
    setSelectedBlock(block);
    setSelectedVariant(null);
    setSelectedPart(null);
  };

  const handleSystemClick = (system) => {
    setSelectedSystem(system);
    setSelectedBlock(null);
    setSelectedVariant(null);
    setSelectedPart(null);
  };

  // const handleNext=()=>{
  //   // /api/msil/generate-TPL/%7BmodelId%7D
  //   const res = axios({
  //     method: "GET",
  //     url: `${API_BASE_URL2}/api/msil/generate-TPL/${params?.id}`,
  //     params:{
  //       // modelId:params?.id,
  //     },

  // })
  // .then((res)=>{
  //     console.log(res);
  // })
  // .then((res)=>{
  //   // nav('/filler/modellist')
  // })
  // }

  return (
    <div
      className=" flex flex-col items-stretch h-full"
      style={{
        backgroundColor: "#f4f5f8",
        height: "83vh",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <div className="flex-col relative flex  w-full items-center max-md:max-w-full max-md:pl-5  h-full modellist-container gap-6">
        <div className="rounded shadow bg-white flex w-full flex-col justify-center pl-4 mt-4 pr-16 py-2 items-start max-md:max-w-full max-md:pr-5">
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
                {/* <div className="flex gap-2"> <span style={{ fontWeight: '600', fontSize: '14px' }}>Base Model </span><span style={{ fontWeight: '400' }}> {baseModelCount?.data?.baseModel}</span></div> */}
                <div className="flex gap-2">
                  {" "}
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>
                    Total Blocks{" "}
                  </span>
                  <span style={{ fontWeight: "400" }}>
                    {/* {baseModelCount?.data?.totalBlocks}*/}
                    {blockLength?.data?.length}
                  </span>
                </div>
                <div
                  className="flex gap-2 items-center"
                  style={{ fontWeight: "600" }}
                >
                  Blocks Filled{" "}
                  <span style={{ fontWeight: "400" }}>
                    {(
                      (baseModelCount?.data?.totalBlocksFilled /
                        baseModelCount?.data?.totalBlocks) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                  <CircularProgress
                    variant="determinate"
                    value={(
                      (baseModelCount?.data?.totalBlocksFilled /
                        baseModelCount?.data?.totalBlocks) *
                      100
                    ).toFixed(0)}
                    thickness={22}
                    size="1rem"
                    sx={{
                      backgroundColor: "#ECECEC",
                      borderRadius: "50%",
                      color: "#FF7C02",
                    }}
                  />
                </div>
                {/* @Kaushik */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded  flex w-full justify-start   items-start max-md:max-w-full max-md:pr-5 gap-3"
          // style={{ display: "flex",alignItems:'center',justifyContent:'flex-start', backgroundColor: '#fff',width:'100vw',padding:'1 0px 32px',flexGrow:'1'}}
        >
          <div
            className="bg-white shadow h-full"
            style={{
              borderRadius: "4px",
              maxHeight: "550px",
              overflow: "auto",
              width: "260px",
            }}
          >
            <Sidebar
              data={filteredData}
              onPartClick={handlePartClick}
              onVariantClick={handleVariantClick}
              onBlockClick={handleBlockClick}
              onSystemClick={handleSystemClick}
              handleSearch={handleSearch}
              draftStatus={draftStatus}
            />
          </div>
          {selectedPart !== null ? (
            <div className="rounded shadow bg-white flex grow flex-col w-full p-4 h-full">
              <div className="flex flex-col border rounded w-full">
                <div
                  className="w-full px-3 py-2"
                  style={{
                    backgroundColor: "#e6e9f0",
                    color: "var(--base-text-color)",
                  }}
                >
                  {selectedPart && (
                    <FillerBreadCrump
                      system={selectedSystem}
                      block={selectedBlock}
                      variant={selectedVariant}
                      part={selectedPart}
                    />
                  )}
                </div>
                <div className="">
                  {singleRowData && (
                    <SingleRowTable
                      dataDetails={singleRowData}
                      headings={[
                        "Base Model",
                        "Block",
                        "Level",
                        "Parents Part No",
                        "DWG Type",
                        "Part Name",
                        "QTY",
                        "Sum QTY",
                        "A/AR",
                      ]}
                      data={[
                        "Y0M11",
                        "CS510-",
                        "01",
                        "Y0M11CS510-001",
                        "S",
                        "LATCH ASSY,FRONT DOOR,R",
                        "001",
                        "001",
                        "A",
                      ]}
                    />
                  )}
                </div>
              </div>

              <div className="flex">
                <Container
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    padding: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    maxWidth: "100%",
                    gap: "20px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: "14px",
                        color: "#171c8f",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      A: General Information
                    </Typography>
                    <div className="items-stretch self-stretch rounded border border-[color:var(--Grey-20,#E6E9F0)] bg-white flex  flex-col justify-center p-4 border-solid gap-4">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          SDM:
                        </span>
                        <Select
                          onChange={(e) => {
                            setSDM(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.sdm !== null ? singleRowData?.sdm : "Select"}
                          value={SDM}
                          labelId="sdm-label"
                          id="sdm"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                        >
                          <MenuItem value="Select">Select</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          Spec/Non Spec.:
                        </span>
                        <Select
                          onChange={(e) => {
                            setSpecNonspec(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.specNonSpec !== null ? singleRowData?.specNonSpec : "Select"}
                          value={specNonspec}
                          labelId="spec-label"
                          id="spec"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                        >
                          <MenuItem value="Select">Select</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "space-between",
                          marginTop: "10px",
                          height: "162px",
                        }}
                      >
                        <div className="">
                          <span
                            className="h6-text"
                            style={{ marginRight: "10px" }}
                          >
                            What is changed, and how it's changed:
                          </span>
                          <p style={{ fontSize: "12px", color: "#bbb" }}>
                            (Max 500 characters)
                          </p>
                        </div>
                        <TextField
                          id="change-description"
                          // label="What is changed, and how it's changed."
                          multiline
                          rows={4}
                          onChange={(e) => {
                            setCauseOfChange(e?.target?.value);
                          }}
                          variant="outlined"
                          style={{ minWidth: "50%", borderRadius: "4px" }}
                          // defaultValue={singleRowData?.changeDescription !== null ? singleRowData?.changeDescription : ""}
                          value={causeOfChange !== null ? causeOfChange : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: "14px",
                        color: "#171c8f",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      B: Other Information
                    </Typography>
                    <div className="items-stretch self-stretch rounded border border-[color:var(--Grey-20,#E6E9F0)] bg-white flex  flex-col justify-center p-4 border-solid gap-4">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          Level of the change, modification:
                        </span>
                        <Select
                          onChange={(e) => {
                            setLevelOfChange(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.levelOfChange !== null ? singleRowData?.levelOfChange : ""}
                          value={levelOfChange}
                          labelId="level-label"
                          id="level"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                // bgcolor: 'pink',
                                "& .MuiMenuItem-root": {
                                  // padding: 2,
                                  wordWrap: "true",
                                },
                                "& .MuiSelect-select": {
                                  width: "300px ",
                                },
                                input: {
                                  width: "300px ",
                                },
                                height: "150px",
                                width: "150px",
                                overflowY: "scroll",
                              },
                            },
                          }}
                          sx={{
                            "& .MuiSelect-select": {
                              maxWidth: "300px ",
                            },
                          }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {levelDropdown?.map((optionValue, index) => {
                            console.log(
                              "check if match",
                              optionValue === singleRowData?.levelOfChange
                            );
                            console.log(
                              "optionss",
                              optionValue,
                              singleRowData?.levelOfChange
                            );
                            return (
                              <MenuItem
                                key={index}
                                value={optionValue}
                                style={{ whiteSpace: "normal" }}
                              >
                                {optionValue}
                              </MenuItem>
                            );
                          })}
                          {/* <MenuItem value="Same part(same usage enviroment and condition)">
                              Same part(same usage enviroment and condition)
                            </MenuItem> */}
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          Cause of the change, modification:
                        </span>
                        <Select
                          onChange={(e) => {
                            setCauseOfModification(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.causeOfModification !== null ? singleRowData?.causeOfModification : ""}
                          value={causeOfModification}
                          labelId="cause-label"
                          id="cause"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                // bgcolor: 'pink',
                                "& .MuiMenuItem-root": {
                                  // padding: 2,
                                  wordWrap: "true",
                                },
                                height: "150px",
                                width: "150px",
                                overflowY: "scroll",
                              },
                            },
                          }}
                          sx={{
                            "& .MuiSelect-select": {
                              maxWidth: "300px ",
                            },
                          }}
                        >
                          <MenuItem value="" style={{ whiteSpace: "normal" }}>
                            Select
                          </MenuItem>
                          {causeDropdown?.map((optionValue) => (
                            <MenuItem key={optionValue} value={optionValue}>
                              {optionValue}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          Importance rank:
                        </span>
                        <Select
                          onChange={(e) => {
                            setImportanceRank(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.importanceRank !== null ? singleRowData?.importanceRank : ""}
                          value={importanceRank}
                          labelId="importance-label"
                          id="importance"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                // bgcolor: 'pink',
                                "& .MuiMenuItem-root": {
                                  // padding: 2,
                                  wordWrap: "true",
                                },
                                height: "150px",
                                width: "150px",
                                overflowY: "scroll",
                              },
                            },
                          }}
                          sx={{
                            "& .MuiSelect-select": {
                              maxWidth: "300px ",
                            },
                          }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          {rankDropdown?.map((optionValue) => (
                            <MenuItem
                              key={optionValue}
                              value={optionValue}
                              style={{ whiteSpace: "normal" }}
                            >
                              {optionValue}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          New RM usage agreement with concern agencies example
                          :PSE/SC/QA-MA:
                        </span>
                        <Select
                          onChange={(e) => {
                            setNewRmUsage(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.newRmUsage !== null ? singleRowData?.newRmUsage : ""}
                          labelId="agreement-label"
                          id="agreement"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                          value={newRmUsage}
                        >
                          {/* <MenuItem value="">Select</MenuItem> */}
                          <MenuItem value="Necessary">Necessary</MenuItem>
                          <MenuItem value="Unnecessary">Unnecessary</MenuItem>
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span
                          className="h6-text"
                          style={{ marginRight: "10px" }}
                        >
                          Maru-A applicability:
                        </span>
                        <Select
                          onChange={(e) => {
                            setMaruApplicability(e?.target?.value);
                          }}
                          // defaultValue={singleRowData?.maruApplicability !== null ? singleRowData?.maruApplicability : ""}
                          labelId="maruA-label"
                          id="maruA"
                          style={{
                            minWidth: "50%",
                            height: "32px",
                            borderRadius: "4px",
                          }}
                          value={maruApplicability}
                        >
                          {/* <MenuItem value="">Select</MenuItem> */}
                          <MenuItem value="applicable">Applicable</MenuItem>
                          <MenuItem value="nonApplicable">
                            Non Applicable
                          </MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ) : (
            <div
              className="rounded shadow bg-white flex grow flex-col w-full p-4 h-full"
              style={{ color: "var(--base-text-color)", fontWeight: "600" }}
            >
              Please Choose a Part To Continue
            </div>
          )}
        </div>

        {/* <CssBaseline /> */}
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
            onClick={handleSaveAsDraftButton}
            className="dcms-btn-main dcms-save-as-draft-btn"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handlePrev(2)}
            className="dcms-btn-main dcms-save-as-draft-btn"
          >
            Prev
          </Button>
          <Button
            onClick={() => handleNext(2)}
            disabled={
              parseInt(
                (
                  (baseModelCount?.data?.totalBlocksFilled /
                    blockLength?.data?.length) *
                  100
                ).toFixed(0)
              ) != 100
            }
            className={
              parseInt(
                (
                  (baseModelCount?.data?.totalBlocksFilled /
                    blockLength?.data?.length) *
                  100
                ).toFixed(0)
              ) != 100
                ? "dcms-btn-main dcms-disabled-btn"
                : "dcms-btn-main dcms-active-btn"
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FillerGeneralInfo;
