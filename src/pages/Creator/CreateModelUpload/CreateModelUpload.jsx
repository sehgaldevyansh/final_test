import { useMemo, useRef, useState, useEffect } from "react";
import { useFetchModelDetailsQuery, useFetchFileDetailsUploadQuery, useFetchBaseModelListByTPLUploadQuery, useFetchBaseModelByModelIdQuery } from "../../../store";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Select,
  MenuItem,
  Autocomplete,
  Popper,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../../components/Header/Header";
import UploadedFiles from "./UploadedFiles";
import FileUploader from "./FileUploader";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import './CreateModelUpload.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { API_BASE_URL2 } from "../../../store/Apiconstants";
import Cookies from "js-cookie";


const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

////////////////////////////////////////

const CreateModalUpload = (props) => {
  const params = useParams()
  const location = useLocation();
  const { model_id } = location.state || params?.id || {};

  console.log("model_id-->", params?.id, "->", params?.type);

  console.log("yourProps", model_id);
  const [baseModels, setbaseModels] = useState(['No Data']);

  const navigate = useNavigate();
  const [tplFile, setTplFile] = useState(null);
  const [peopleFile, setPeopleFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedTplFileName, setUploadedTplFileName] = useState(null);
  const [uploadedPeopleFileName, setUploadedPeopleFileName] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileUploadResponse, setFileUploadResponse] = useState({});
  const [uploadedFileData, setUploadedFileData] = useState({})
  const handleCancelClick = () => {


    // Navigate to /creator/modellist when Cancel is clicked
    navigate('/creator/modellist');
  };


  const { data, isLoading, Error } = useFetchModelDetailsQuery(model_id || params?.id)
  const { data: data2, isLoading: isLoading2, error: error2, refetch: refetchBaseModelList } = useFetchBaseModelListByTPLUploadQuery(params?.id)
  const { data: fileDetailsApi, isLoading: isLoadingFile, error: fileFetchError, refetch: refetchFileDetails } = useFetchFileDetailsUploadQuery({
    "modelNumber": params?.id,
    "uploadedBy": Cookies.get('email')
  })

  const { data: baseModelCount, isLoading: isSelectedBaseModelLoading } = useFetchBaseModelByModelIdQuery(params?.id)
  const [selectedBaseModel, setSelectedBaseModel] = useState(baseModelCount?.data?.baseModel ? baseModelCount?.data?.baseModel : '');


  const handleCallRefetch = () => {
    refetchFileDetails()
  }




  const [fileUploadResponseTPL, setFileUploadResponseTPL] = useState({});
  const [fileUploadResponsePM, setFileUploadResponsePM] = useState({});
  const [fileUploadResponseUC, setFileUploadResponseUC] = useState({});


  const [isFileLoading, setIsFileLoading] = useState(false)

  

  const [expandedAcc, setExpandedAcc] = useState(null);
  useEffect(() => {
    console.log("herefetch", data);
    if (data2?.data) setbaseModels(data2?.data);
    console.log("data2", data2);
    setUploadedFileData(fileDetailsApi)
    console.log("fileDetailsApi", fileDetailsApi);
  }, [isLoading, isLoading2, isLoadingFile, isFileLoading]);


  const handleSubmitButton = () => {
    console.log("Hitted me");
    axios({
      method: 'POST',
      url: `${API_BASE_URL2}/api/msil/select-base-model`,
      data: {
        "modelName": model_id || params?.id,
        "baseModel": selectedBaseModel,
        "rowState": 1,
        "email": Cookies.get('email')
      },
      headers:{
        "token":Cookies.get('jwtToken'),
        "user":Cookies.get('email'),
      }
    }).then((res) => {
      console.log(res?.data);
    })
    // Navigate to /creator/modellist when Cancel is clicked
    navigate('/dcms', { state: { model_id: model_id || params?.id } })
    // navigate('/dcms');
  };
  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
  };
  //Jugad///////////////////////////////

  const [expand, setExpand] = useState((params?.type === 'viewprogress' || params?.type === 'viewfull') ? true : false);

  const toggleAcordion = () => {
    setExpand((prev) => { console.log('state changed'); return !prev });
  };

  const [uploadedFilesExpand, setUploadedFilesExpand] = useState((params?.type === 'viewprogress' || params?.type === 'viewfull') ? true : false);

  const toggleUploadedFilesAcordion = () => {
    setUploadedFilesExpand((prev) => { console.log('state changed'); return !prev });
  };

  const [baseModelExpand, setBaseModelExpand] = useState((params?.type === 'viewprogress' || params?.type === 'viewfull') ? true : false);

  const toggleBaseModalAcordion = () => {
    setBaseModelExpand((prev) => { console.log('state changed'); return !prev });
  };

  const handleUpload = () => {//////////////////////////////////handle this/////////////
    if (tplFile) {
      const tplFormData = new FormData();
      tplFormData.append("file", tplFile);

      fetch("your_upload_api_url", {
        method: "POST",
        body: tplFormData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {

          console.error("Error uploading file:", error);
        });
    }
    setTplFile(null);
    setPeopleFile(null);
    setUploadedTplFileName(null);
    setUploadedPeopleFileName(null);
  };

  const handleFilesUpload = ({ uploadedFile, uploadedAt }) => {
    console.log('files**', uploadedFile?.name, "->", uploadedAt)
    let APIPostfixUrl = '';
    if (uploadedAt === "Upload TPL (CSV File)") APIPostfixUrl = "total-part-list"
    else if (uploadedAt === "Upload People Master (CSV File)") APIPostfixUrl = "people-master"
    else APIPostfixUrl = "uncommon-activity-master";

    setIsFileLoading(true);
    axios({
      method: 'POST',
      data: {
        "modelNumber": 'YY22',//model_id || params?.id,
        "key": uploadedFile?.name,
        "uploadedBy": Cookies.get('email')
      },
      headers:{
        "token":Cookies.get('jwtToken'),
        "user":Cookies.get('email')
      },
      // withCredentials:true,
      url: `${API_BASE_URL2}/api/msil/fileUpload/${APIPostfixUrl}`
    })
      .then((res) => {
        console.log("resdata", res?.data);
        let heading = res?.data?.heading;
        if (heading === 'TPL File Summary') {
          setFileUploadResponseTPL(res?.data)

        }
        else if (heading === 'People Master File Summary') { setFileUploadResponsePM(res?.data); }
        else if (heading === 'Uncommon Activity Master File Summary') {
          setFileUploadResponseUC(res?.data);
        }
        return true
      }).then((res) => {
        setIsFileLoading(false)
      })
  }

  useEffect(() => {
    setSelectedBaseModel(baseModelCount?.data?.baseModel ? baseModelCount?.data?.baseModel : '')
  }, [isSelectedBaseModelLoading])

  // useEffect(() => {
  //   axios({
  //     method: 'POST',
  //     url: `${API_BASE_URL2}/api/getFileDetails`,
  //     data: {
  //       "modelNumber": model_id || params?.id,
  //       "uploadedBy": "tom@maruti.co.in"
  //     }
  //   }).then((res) => {
  //     console.log('fileDetailsApi', res?.data);

  //     setUploadedFileData(res?.data)
  //   })
  // }, [fileUploadResponse]);

  const handleDraftClick = () => {
    axios({
      method: 'POST',
      url: `${API_BASE_URL2}/api/msil/select-base-model`,
      data: {
        "modelName": model_id || params?.id,
        "baseModel": selectedBaseModel,
        "rowState": 1,
        "email": Cookies.get('email')
      },
      headers:{
        "token":Cookies.get('jwtToken'),
        "user":Cookies.get('email')
      }
    }).then((res) => {
      console.log(res?.data);
    })
    navigate('/creator/modellist');
  }
  console.log('base model current', baseModelCount?.data?.baseModel, data2?.data[0])
  return (
    <div
      className="bg-gray-100 flex flex-col items-stretch pb-8 gap-4"
      style={{ height: "100vh" }}
    >
      <Header className="header-model-list" />
      <div className="px-5">
        {/* <p>{fileUploadResponse?.msg}</p> */}
        <NavigationPathComponent paths={[{ name: 'MSIL R&D', path: '/creator/modellist' }, { name: `Models ${params?.id}`, path: `/model/view/${params?.id}` }]} current={params?.type === 'viewprogress' || params?.type === 'viewfull' ? 'View DCMS' : 'Initiate DCMS'} />
      </div>
      <div className="flex-col  relative flex  w-full  max-md:max-w-full max-md:pl-5">
        <div className="flex flex-col px-5 items-end">
          <div className="text-neutral-600 text-2xl tracking-tight self-stretch w-full max-md:max-w-full" style={{ fontWeight: '600' }}>
            {params?.type === 'viewprogress' || params?.type === 'viewfull' ? 'View Uploaded Files' : 'Initiate DCMS'}
          </div>
          <div className="items-stretch self-stretch rounded shadow bg-white flex w-full flex-col mt-6 px-4 py-4 max-md:max-w-full">
            {/* <Accordion> */}
            {/* <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1a-content"
                        // id="panel1a-header"

                        > */}
            <Typography className=" text-base font-bold max-md:max-w-full flex" style={{ fontWeight: '700', color: 'var(--base-text-color)', fontSize: '16px' }}>
              Files for the DCMS
            </Typography>
            {/* </AccordionSummary> */}
            {/* <AccordionDetails sx={{ padding: "16px" }}> */}

            <div className="flex justify-start gap-2 w-full mt-4">
              <div className="">
                <div className="">Model Name</div>
                <TextField
                  // label={data?.Model_data?.General_info?.Model_Name ? "Model Name" : ""}
                  variant="outlined"
                  disabled={true}
                  margin="normal"
                  value={data?.modelData?.General_info?.Model_Name}
                  size="small"
                  style={{
                    backgroundColor: '#f4f4f4',
                    borderRadius: '4px',
                  }}
                  sx={{
                    input: {
                      border: '1px solid #e6e9f0',
                    }
                  }}
                />
              </div>
              <div className="">
                <div className="">Type</div>
                <TextField
                  // label="Type"
                  // label={data?.Model_data?.General_info?.Type ? "Type" : ""}
                  disabled={true}
                  variant="outlined"
                  margin="normal"
                  value={data?.modelData?.General_info?.Type}
                  size="small"
                  style={{
                    backgroundColor: '#f4f4f4',
                    borderRadius: '4px',
                  }}
                  sx={{
                    input: {
                      border: '1px solid #e6e9f0',
                    }
                  }}
                />
              </div>
              <div className="grow">
                <div className="">Description</div>
                <TextField
                  // label="Description"
                  // label={data?.Model_data?.General_info?.Description ? "Description" : ""}
                  variant="outlined"
                  disabled={true}
                  margin="normal"
                  // multiline
                  fullWidth
                  value={data?.modelData?.General_info?.Description} // Set your default value here
                  size="small"
                  style={{
                    backgroundColor: '#f4f4f4',
                    borderRadius: '4px',
                  }}
                  sx={{
                    input: {
                      border: '1px solid #e6e9f0',
                    }
                  }}
                />
              </div>
            </div>
            {/* </AccordionDetails> */}
            {/* </Accordion> */}

            <div
              className="flex flex-col gap-2 px-2 py-2 h-full"
              style={{
                border: "1px solid var(--Grey-20, #E6E9F0)",
                borderRadius: "4px",
              }}
            >
              {(params?.type !== 'viewprogress' && params?.type !== 'viewfull') ? <Accordion
                className="items-stretch self-stretch bg-gray-100 flex flex-col justify-center"
                expanded={expand}
                style={{
                  width: "100%",
                  backgroundColor: expand ? "#e6eaf4" : "#fff",
                  borderRadius: "4px",
                  border: "1px solid #e6e9f0",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
                }}
              >
                <AccordionSummary
                  onClick={toggleAcordion}
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        backgroundColor: expand ? "var(--base-text-color)" : "#fff",
                        borderRadius: "50%",
                        color: expand ? "#fff" : "#000",
                        fontSize: "20px",
                      }}
                    />
                  }
                >
                  <Typography className="text-blue-900 text-sm font-semibold leading-4 tracking-tight grow shrink basis-auto my-auto max-md:max-w-full">
                    Upload File & Upload Summary
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  className=" grid grid-cols-2 gap-6 px-4 py-4"
                  sx={{
                    backgroundColor: "#f4f5f8",
                  }}
                >
                  {/* Upload TPL (CSV File) */}
                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      backgroundColor: "#f4f5f8",
                    }}
                  >
                    <div className="">
                      <FileUploader
                        uploadHeading="Upload TPL (CSV File)"
                        handleFilesUpload={handleFilesUpload}
                        // fileUploadResponse={fileUploadResponse?.heading=='TPL File Summary' ? fileUploadResponse : {}}
                        fileUploadResponse={fileUploadResponseTPL}
                        isFileLoading={isFileLoading}
                        fileType='TPL'
                        baseModel={data?.modelData?.General_info?.Model_Name}
                        refetchFileDetails={refetchFileDetails}
                        refetchBaseModelList={refetchBaseModelList}
                      />
                      {/* <SummaryComponent/> */}
                      {/* Uploaded Files {uploadedFiles} */}
                    </div>
                  </div>

                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      backgroundColor: "#f4f5f8",
                    }}
                  >
                    <div className="">
                      <FileUploader
                        uploadHeading="Upload People Master (CSV File)"
                        handleFilesUpload={handleFilesUpload}
                        // fileUploadResponse={fileUploadResponse?.heading==='People Master File Summary'? fileUploadResponse : {}}
                        fileUploadResponse={fileUploadResponsePM}
                        isFileLoading={isFileLoading}
                        fileType='PM'
                        baseModel={data?.modelData?.General_info?.Model_Name}
                        refetchFileDetails={refetchFileDetails}
                        refetchBaseModelList={refetchBaseModelList}
                      />
                    </div>
                  </div>

                  <div
                    className=""
                    style={{ fontSize: "14px", fontWeight: "700" }}
                  >
                    <div className="">
                      <FileUploader
                        uploadHeading="Uncommon Activity Master (CSV File)"
                        handleFilesUpload={handleFilesUpload}
                        fileUploadResponse={fileUploadResponseUC}
                        isFileLoading={isFileLoading}
                        fileType='UAM'
                        baseModel={data?.modelData?.General_info?.Model_Name}
                        refetchFileDetails={refetchFileDetails}
                        refetchBaseModelList={refetchBaseModelList}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion> : null}
              {error && (
                <Alert severity="error" sx={{ marginBottom: "16px" }}>
                  {error}
                </Alert>
              )}
              <Accordion
                expanded={uploadedFilesExpand}
                style={{
                  width: "100%",
                  backgroundColor: (uploadedFilesExpand) ? "#e6eaf4" : "#fff",
                  borderRadius: "4px",
                  border: "1px solid #e6e9f0",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
                }}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  onClick={toggleUploadedFilesAcordion}
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        backgroundColor: (uploadedFilesExpand)
                          ? "var(--base-text-color)"
                          : "#fff",
                        borderRadius: "50%",
                        color: (uploadedFilesExpand) ? "#fff" : "#000",
                        fontSize: "20px",
                      }}
                    />
                  }
                >
                  <Typography className="text-blue-900 text-sm font-semibold leading-4 tracking-tight grow shrink basis-auto my-auto">
                    Uploaded Files
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f4f5f8",
                  }}
                >
                  {/* Content for Uploaded Files */}
                  <UploadedFiles files={uploadedFiles} data={fileDetailsApi} />
                </AccordionDetails>
              </Accordion>
              {/* toggleBaseModalAcordion */}
              <Accordion
                expanded={baseModelExpand}
                style={{
                  width: "100%",
                  backgroundColor: baseModelExpand ? "#e6eaf4" : "#fff",
                  borderRadius: "4px",
                  border: "1px solid #e6e9f0",
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
                }}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  onClick={toggleBaseModalAcordion}
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        backgroundColor: baseModelExpand ? "var(--base-text-color)" : "#fff",
                        borderRadius: "50%",
                        color: baseModelExpand ? "#fff" : "#000",
                        fontSize: "20px",
                      }}
                    />
                  }
                >
                  <Typography className="text-blue-900 text-sm font-semibold leading-4 tracking-tight basis-auto my-auto max-md:max-w-full">
                    Select Base Model
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{ backgroundColor: "#f4f5f8", padding: "8px 12px 12px" }}
                  className="flex items-center"
                  style={{ gap: "100px" }}
                >
                  {/* Content for Select Base Model */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '32px 8px' }}>
                    <p style={{ fontSize: "14px", fontWeight: "700" }}>
                      Base Model Name
                    </p>
                    {/* <Select
                      // labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedBaseModel}
                      // label="Base"
                      onChange={(e) => setSelectedBaseModel(e.target.value)}
                      // size="small"
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {baseModels?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select> */}
                    <Autocomplete
                      disabled={(!uploadedFileData) || (!uploadedFileData?.totalPartsList?.length === 0) || (!uploadedFileData?.peopleMaster?.length === 0) || (!uploadedFileData?.uncommonActivityMaster?.length === 0)
                        || (params?.type === 'viewprogress' || params?.type === 'viewfull')
                      }
                      disablePortal
                      // defaultValue={baseModelCount?.data?.baseModel}
                      onChange={(e, newValue) => { console.log('e', e?.target?.value, newValue); setSelectedBaseModel(newValue) }}
                      value={selectedBaseModel}
                      // value={data2?.data[0]}
                      getOptionLabel={option => option}
                      id="combo-box-demo"
                      options={data2?.data?.length > 0 ? data2?.data : ['No Data']}
                      size='small' //@changed here
                      sx={{
                        width: 256,
                        // minHeight: '10px',
                        svg: {
                          padding: 0,
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Select Base Model"
                      // InputProps={{ sx: { height: '40px', display: 'flex', alignItems: 'center', padding: '0' } }} 
                      />}
                      // getOptionSelected={(option, value) => option === value}
                      ListboxProps={{ style: { maxHeight: 150, overflow: 'auto' } }}
                      componentsProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'flip',
                              enabled: false
                            },
                            {
                              name: 'preventOverflow',
                              enabled: false
                            }
                          ]
                        }
                      }}
                    // PopperComponent={({ children, ...other }) => (
                    //   <Popper {...other} placement="bottom-start">
                    //     <Paper>{children}</Paper>
                    //   </Popper>
                    // )}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-end gap-4 py-2 pr-2">
        <Button
          onClick={handleCancelClick}
          className="text-blue-900 text-center text-sm leading-4 tracking-tight my-auto"
          variant="body1"
          style={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        {(params?.type !== 'viewprogress' && params?.type !== 'viewfull') ? (<Button onClick={handleDraftClick} className="dcms-btn-main dcms-save-as-draft-btn">Save as Draft</Button>) : null}
        {(params?.type !== 'viewprogress' && params?.type !== 'viewfull') ? (<Button
          onClick={handleSubmitButton}
          disabled={(!uploadedFileData?.totalPartsList?.length === 0) || (!uploadedFileData?.peopleMaster?.length === 0) || (!uploadedFileData?.uncommonActivityMaster?.length === 0) || (selectedBaseModel == '')}
          className={((!uploadedFileData?.totalPartsList?.length === 0) || (!uploadedFileData?.peopleMaster?.length === 0) || (!uploadedFileData?.uncommonActivityMaster?.length === 0) || (selectedBaseModel == '')) ? 'dcms-btn-main dcms-disabled-btn' : 'dcms-btn-main dcms-active-btn'}
        >
          Submit
        </Button>) : null}

        {(params?.type === 'viewfull') ? <Button onClick={() => navigate(`/dcms/${params?.type}`, { state: { model_id: model_id || params?.id } })} className='dcms-btn-main dcms-active-btn'>View DCMS</Button> : null}
      </div>
    </div>
  );
};

export default CreateModalUpload;