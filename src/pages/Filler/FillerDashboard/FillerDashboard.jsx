import Header from "../../../components/Header/Header";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import "./FillerDashboard.css";

import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  fetchAllBaseModelByEmail,
  fetchAllBlockByEmailAndBaseSystem,
  fetchAllCommonUncommList,
  fetchAllSystemByEmailAndBase,
} from "./api";
// import ReportType2 from './ReportType2';
const FillerDashboard = () => {
  // var data = [{
  //     "common": 34,
  //     "uncommon": 54
  // }];

  const [modelDataList, setModelDataList] = useState();
  const [userSelectedModel, setUserSelectedModel] = useState();

  const [systemDataList, setSystemDataList] = useState();
  const [userSelectedSystem, setUserSelectedSystem] = useState();

  const [bloclList, setBlockList] = useState();
  const [userSelectedBlock, setUserSelectedBlock] = useState();

  const [data, setApiData] = useState(); // data krte hi it should work work

  async function handleModelChange(e) {
    setUserSelectedModel(e?.target?.value);
    const response = await fetchAllSystemByEmailAndBase({
      modelName: e?.target?.value,
    });
    setSystemDataList(response?.data);
    const responseData = await fetchAllCommonUncommList({
      modelName: e?.target?.value,
      systemName: "*",
      block: "*",
    });
    setApiData(responseData?.data);
  }
  async function handleSystemChange(e) {
    setUserSelectedSystem(e?.target?.value);
    const response = await fetchAllBlockByEmailAndBaseSystem({
      modelName: userSelectedModel,
      systemName: e?.target?.value,
    });
    setBlockList(response?.data);
    const responseData = await fetchAllCommonUncommList({
      modelName: userSelectedModel,
      systemName: e?.target?.value,
      block: "*",
    });
    setApiData(responseData?.data);
  }

  async function handleBlockChange(e) {
    setUserSelectedBlock(e?.target?.value);
    const response = await fetchAllCommonUncommList({
      modelName: userSelectedModel,
      systemName: userSelectedSystem,
      block: e?.target?.value,
    });
    setApiData(response?.data);
  }

  useEffect(() => {
    async function fetch() {
      const response = await fetchAllBaseModelByEmail();
      setModelDataList(response?.data);
    }
    fetch();
  }, []);

  // Extracting values from data
  var commonValue = data?.common;
  var uncommonValue = data?.uncommon;
  var nAValue = data?.nA;
  var necessaryValue = data?.necessary;
  var commonMonitoringReqValue = data?.commonMonitoringReq;
  const graphData = {
    // Only show the currently selected milestone
    datasets: [
      {
        data: [
          commonValue,
          uncommonValue,
          nAValue,
          necessaryValue,
          commonMonitoringReqValue,
        ],
        backgroundColor: [
          "#118DFF", // Common color
          "#12239E",
          "#c3c3c3",
          "orange",
          "green",
        ],
      },
    ],
    labels: ["Common", "Uncommon", "NA", "Necessary", "Monitor"],
  };
  const options = {
    layout: {
      padding: {
        top: 20,
        // left:100,
        // right:100,
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "right",
        labels: {
          boxWidth: 20,
          // color:"#fff",
        },
      },
      datalabels: {
        labels: {
          index: {
            offset: true,
            // beginAtZero:false,
            display: (context) => context.dataset.data[context.dataIndex] >= 1,

            anchor: "middle",
            align: "middle",
            font: {
              family: "Arial, sans-serif",
              size: 14,
            },
            color: "#fff",
          },
        },
      },
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [value, setValue] = useState(0);
  // ... rest of your code

  const openModal = (chartType) => {
    setIsModalOpen(true);
    setSelectedChart(chartType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChart(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getTabStyle = (index) => {
    return {
      color: value === index ? "#171c8f" : "#66696B",
      padding: "10px",
      fontSize: "12px",
      fontWeight: value === index ? "500" : "normal",
      marginRight: "30px",
    };
  };

  const milestonesData = {
    "Sketch Final": {
      Deadline: "15/01/2025",
      subTask: {
        "Development DR": {
          necessary: 34,
          unnecessary: 22,
        },
        "Appearance proto DR": {
          necessary: 36,
          unnecessary: 42,
        },
        "Structure Briefing DR": {
          necessary: 44,
          unnecessary: 62,
        },
        "Kickoff / Strategy DR": {
          necessary: 24,
          unnecessary: 22,
        },
        "Condensation DR-1": {
          necessary: 14,
          unnecessary: 62,
        },
      },
    },
    "Rough CAD": {
      Deadline: "30/01/2025",
      subTask: {
        "ControlConcept DR": {
          necessary: 32,
          unnecessary: 42,
        },
        "ISO 26262 verification review": {
          necessary: 54,
          unnecessary: 22,
        },
        "Aerodynamics DR-1": {
          necessary: 2,
          unnecessary: 3,
        },
        "Merchantability DR": {
          necessary: 34,
          unnecessary: 22,
        },
      },
    },
    SOP: {
      Deadline: "30/01/2024",
      subTask: {
        "Review DR": {
          necessary: 34,
          unnecessary: 22,
        },
      },
    },
  };
  return (
    <div
      className=" flex flex-col items-stretch h-full"
      style={{
        backgroundColor: "#f4f5f8",
      }}
    >
      <Header className="header-model-list" />
      <div className="modal-list-main-container">
        <NavigationPathComponent
          paths={[{ name: "DCMS Models", path: "/filler/modellist" }]}
          current="Dashboard"
        />
      </div>
      <div className="flex-col relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container">
        <div className="items-stretch flex flex-col w-full  max-md:max-w-full max-md:flex-wrap">
          <div
            className="text-neutral-700 font-semibold tracking-tight  whitespace-nowrap my-auto mt-2"
            style={{ fontSize: "24px" }}
          >
            Dashboard
          </div>
          <div>
            <div style={{ borderBottom: 1, borderColor: "divider" }}></div>
          </div>

          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="model tabs"
            >
              <Tab label="Report type 1" style={getTabStyle(0)} />
              <Tab label="Report type 2" style={getTabStyle(1)} />
              <Tab label="Report type 3" style={getTabStyle(2)} />
            </Tabs>
            <div role="tabpanel" hidden={value !== 1}>
              {/* Use the ReportType2 component for the Report type 2 tab with provided data */}
              {/* <ReportType2 milestones={milestonesData} /> */}
            </div>

            <div role="tabpanel" hidden={value !== 0}>
              {/* Your existing code goes here */}
              <div className="">
                <div className="flex-col relative flex  w-full mt-5 max-md:max-w-full max-md:pl-5  modellist-container">
                  {/* <div className="rounded shadow bg-white flex w-full flex-col justify-center mt-4 pl-4 pr-4 py-2 items-start max-md:max-w-full max-md:pr-5"> */}
                  <div
                    className=" flex items-start gap-9 max-md:max-w-full max-md:flex-wrap p-2"
                    style={{ width: "40%", justifyContent: "space-evenly" }}
                  >
                    <FormControl
                      size="small"
                      style={{ minWidth: "30%", borderRadius: "4px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select Model
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Model"
                        onChange={(e) => handleModelChange(e)}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {modelDataList?.map((optionValue) => (
                          <MenuItem key={optionValue} value={optionValue}>
                            {optionValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      size="small"
                      style={{ minWidth: "30%", borderRadius: "4px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select System
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Model"
                        onChange={(e) => {
                          handleSystemChange(e);
                        }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {systemDataList?.map((optionValue) => (
                          <MenuItem key={optionValue} value={optionValue}>
                            {optionValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      size="small"
                      style={{ minWidth: "30%", borderRadius: "4px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select Block
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Model"
                        onChange={(e) => handleBlockChange(e)}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {bloclList?.map((optionValue) => (
                          <MenuItem key={optionValue} value={optionValue}>
                            {optionValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {/* </div> */}
                </div>

                <div className="grid grid-cols-2 gap-6 w-full h-full pt-2">
                  <div
                    data-testid="pie"
                    className=""
                    onClick={() => openModal("Pie")}
                  >
                    <div className="heading-all">Common/Uncommon</div>
                    <div className="content" style={{ background: "#fff" }}>
                      <Pie data={graphData} options={options}></Pie>
                    </div>
                  </div>
                  <div className="" onClick={() => openModal("Bar")}>
                    <div className="heading-all">
                      Level Of Change (Representational Data)
                    </div>
                    <div className="content">
                      <Bar data={graphData} options={options}></Bar>
                    </div>
                  </div>
                  <div className="" onClick={() => openModal("Doughnut")}>
                    <div className="heading-all">
                      General Details (Representational Data)
                    </div>
                    <div className="content">
                      <Doughnut data={graphData} options={options}></Doughnut>
                    </div>
                  </div>
                  <div className="" onClick={() => openModal("Line")}>
                    <div className="heading-all">
                      Purpose of Change (Representational Data)
                    </div>
                    <div className="content">
                      <Line data={graphData} options={options}></Line>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more tab panels as needed */}
          </Box>
        </div>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "none",
              boxShadow: 24,
              p: 4,
              borderRadius: "4px",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={closeModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box>
              {selectedChart === "Pie" && (
                <Pie
                  data={graphData}
                  options={options}
                  width="200"
                  height="200"
                ></Pie>
              )}
              {selectedChart === "Bar" && (
                <Bar
                  data={graphData}
                  options={options}
                  width="200"
                  height="200"
                ></Bar>
              )}
              {selectedChart === "Doughnut" && (
                <Doughnut
                  data={graphData}
                  options={options}
                  width="200"
                  height="200"
                ></Doughnut>
              )}
              {selectedChart === "Line" && (
                <Line
                  data={graphData}
                  options={options}
                  width="200"
                  height="200"
                ></Line>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
      <div>
        <iframe
          title="Maruti Dashboard_V2"
          width="1750"
          height="700.25"
          src="https://app.powerbi.com/reportEmbed?reportId=a85feb6a-51c5-433a-9aaa-0db8c2008565&autoAuth=true&ctid=d78a8218-4135-4026-a3a8-1cdd7223b4d5"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default FillerDashboard;
