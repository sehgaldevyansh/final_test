import { useState } from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header/Header";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import { Tab, Tabs, Typography } from "@mui/material";
import FillerBlockVariantMapping from "../FillerBlockVariantMapping/FillerBlockVariantMapping";
import FillerActivityFilling from "../FillerActivityFilling/FillerActivityFilling";
import FillerGeneralInfo from "../FillerSidebar/FillerGeneralInfo";
import FillerPreview from "../FillerPreview/FillerPreview";
import FillerDeviation from "../FillerDeviation/FillerDeviation";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL2 } from "../../../store/Apiconstants";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.string,
  value: PropTypes.number,
  index: PropTypes.number,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabList = [
  "Step 1: CREATE PARTLIST",
  "Step 2: COMMON/UN-COMMON MAPPING",
  "Step 3: GENERAL INFO",
  "Step 4: FILL DEVIATION",
  "Step 5: PREVIEW",
];

const FillerMain = () => {
  const params = useParams();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = (stepNo) => {
    console.log("step no coming in next", stepNo);

    if (stepNo === 3) {
      // /api/msil/generate-TPL/%7BmodelId%7D
      console.log("generating url");
      const res = axios({
        method: "GET",
        url: `${API_BASE_URL2}/api/msil/generate-TPL/${params?.id}`,
        params: {
          user: Cookies.get("email"),
          // modelId:params?.id,
        },
        headers: {
          token: Cookies.get("jwtToken"),
          user: Cookies.get("email"),
        },
      })
        .then((res) => {
          console.log(res);
        })
        .then((res) => {
          // nav('/filler/modellist')
        });
    }
    setValue(stepNo === 4 ? stepNo : stepNo + 1);
  };

  const handlePrev = (stepNo) => {
    console.log(
      "step no coming in prev",
      stepNo,
      stepNo === 0 ? stepNo : stepNo - 1
    );
    setValue(stepNo === 0 ? stepNo : stepNo - 1);
  };

  const fillerPages = [
    <FillerBlockVariantMapping key={0} handleNext={handleNext} />,
    <FillerActivityFilling
      key={1}
      handleNext={handleNext}
      handlePrev={handlePrev}
    />,
    <FillerGeneralInfo
      key={2}
      handleNext={handleNext}
      handlePrev={handlePrev}
    />,
    <FillerDeviation key={3} handleNext={handleNext} handlePrev={handlePrev} />,
    <FillerPreview key={4} handlePrev={handlePrev} />,
  ];

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
          current="DCMS Activity Filling"
        />
      </div>
      <div className="flex-col relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container">
        <div className="items-center flex w-full gap-10 mt-1 max-md:max-w-full max-md:flex-wrap">
          <div
            className="text-neutral-700 font-semibold tracking-tight  whitespace-nowrap my-auto"
            style={{ fontSize: "24px" }}
          >
            DCMS Activity Filling
          </div>
          <div>
            <div style={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                sx={{
                  "& .Mui-selected": {
                    color: "#171c8f !important",
                    fontWeight: "600 !important",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#FF5733",
                  },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {tabList?.map((tab, index) => {
                  return (
                    <Tab
                      key={index}
                      label={tab}
                      {...a11yProps(index)}
                      disabled={value !== index}
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: "400",
                      }}
                    />
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
        <div className="w-full">
          {fillerPages?.map((page, index) => {
            return (
              <CustomTabPanel key={index} value={value} index={index}>
                {page}
              </CustomTabPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FillerMain;
