import { current, produce } from 'immer';
// import { retrieveToken } from '../../LandingPage/LandingPage';
import set from 'lodash/set'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Button, MenuItem, Select, Skeleton, TextField, TextareaAutosize } from "@mui/material";
import { useFetchModelListsQuery } from '../../../store';
import Header from "../../../components/Header/Header"
import '../CreateModel/CreateModel.css'
import { useFetchCreateModelTemplateQuery, useAddModelCreateTemplateMutation } from '../../../store/apis/createModelApi';
// import '../CreateModel/CreateMilestoneItem'
import MilestoneItem from "./MilestoneItem"
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import SnackBarComponent from '../../../components/SnackBarComponent/SnackBarComponent';
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, CALCULATE_MILESTONE_PATH, CREATE_TEMPLATE_PATH } from '../../../store/Apiconstants';
import _ from 'lodash';
import axios from 'axios';
import SubmitConfirmComponent from '../../../components/SubmitConfirmComponent/SubmitConfirmComponent';
import { checkSubmitModelData } from "./handleSubmit"
import '../ViewDcms/ViewTimeLine.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const ViewModal = () => {
  const params = useParams()
  const navigate = useNavigate();
  // const { data, Error, isLoading } = useFetchModelDetailsQuery(params?.id); // view k liye
  // const [addModel, results] = useAddModelDetailsMutation();
  const [createModel, results] = useAddModelCreateTemplateMutation()
  const { data, error, isLoading } = useFetchCreateModelTemplateQuery();
  const { refetch } = useFetchModelListsQuery();
  const location = useLocation();
  const [fetchedData, setFetchedData] = useState();
  const [generalInfo, setGeneratlInfo] = useState();
  const [optionSelection, setOptionSelection] = useState({});
  const customProp = location.state?.additionalProp;
  const [childRefresh, setChildRefresh] = useState()

  const [snackBarState, setSnackBarState] = useState(false)
  const handleSnackbarClose = () => {
    setSnackBarState(false)
  }
  const [filledStatus, setFilledStatus] = useState({
    modelName: false,
    type: false,
    designResponsibility: false,
    developmentResponsibility: false,
    description: false,
  });

  const [openConfirmModel, setOpenConfirmModel] = useState(false)


  const handleConfirmSubmit = () => {
    let fd = _.cloneDeep(fetchedData);
    fd.modelData.General_info["status"] = 1;

    createModel({ modelData: fd?.modelData })
      .then((data) => {
        console.log("newdata", data);
        refetch();
        // navigate('/creator/modellist')
      })
      .then(res => {
        navigate('/creator/modellist')
      })
      .catch((err) => {
        console.log("newdata", err);
      })
    console.log("resultss", results);
  }

  const handleCancelClick = () => {
    // Navigate to /creator/modellist when Cancel is clicked

    navigate('/creator/modellist');
  };
  // useEffect(()=>{
  //   produce(prevData, (draft) => {
  //     draft.modelData.General_info.Design_Responsibility = e.target.value;
  //   })
  // },[])
  const handelModelNameChange = (e, tar) => {
    setOptionSelection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        draft.modelData.General_info.Model_Name = e.target.value;
        draft.modelData.General_info.user_email = Cookies.get('email');
      })
    );
    setFilledStatus((prevStatus) => ({
      ...prevStatus,
      modelName: e.target.value.trim() !== '',
    }));
  };
  const handelTypeChange = (e, tar) => {
    setOptionSelection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        draft.modelData.General_info.Type = e.target.value;
      })
    );
    setFilledStatus((prevStatus) => ({
      ...prevStatus,
      type: e.target.value.trim() !== '',
    }));
  };
  const handelDesignChange = (e, tar) => {
    setOptionSelection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        draft.modelData.General_info.Design_Responsibility = e.target.value;
      })
    );
    setFilledStatus((prevStatus) => ({
      ...prevStatus,
      designResponsibility: e.target.value.trim() !== '',
    }));
  };
  const handelDevelopmentChange = (e, tar) => {
    setOptionSelection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        draft.modelData.General_info.Development_Responsibility = e.target.value;
      })
    );
    setFilledStatus((prevStatus) => ({
      ...prevStatus,
      developmentResponsibility: e.target.value.trim() !== '',
    }));
  };
  const handelDescriptionChange = (e) => {

    setOptionSelection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        // draft.modelData.General_info.Type = e.target.value;
        // draft.modelData.General_info.Design_Responsibility = e.target.value;
        // draft.modelData.General_info.Development_Responsibility = e.target.value;
        // draft.modelData.General_info.Model_Name = e.target.value;
        draft.modelData.General_info.Description = e.target.value;
      })
    );
    setFilledStatus((prevStatus) => ({
      ...prevStatus,
      description: e.target.value.trim() !== '',
    }));

    // console.log("optionSelection",optionSelection,"->",e.target.name,"->",e.target.value);
  }

  const [milestoneFilledTrack, setMilestoneFilledTrack] = useState([])
  const [submitDisable, setSubmitDisable] = useState(true);
  useEffect(() => {
    let currentDisable = false;
    if (milestoneFilledTrack?.length > 0) {
      console.log('check milestone track', milestoneFilledTrack)
      milestoneFilledTrack.forEach((obj) => {
        console.log('loop obj', obj)
        currentDisable = !obj?.filled || currentDisable
      })
    }
    console.log('current disable status', currentDisable, milestoneFilledTrack, milestoneFilledTrack.filter(obj => !obj?.filled)?.length)
    setSubmitDisable(currentDisable)
  }, [milestoneFilledTrack])


  function isValidDateFormat(input) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(input);
  }

  const handleonEditDeadline = (path, value) => {
    console.log("error found", path, "-", value);

    if (isValidDateFormat(value)) {
      console.log("Data called from view model", path, "->", value);
      const modelNameKey = path?.split('.')[2]


      console.log('modelNameKey', modelNameKey)

      const pathArray = path?.split(".");
      setFetchedData((prevData) =>
        produce(prevData, (draft) => {
          set(draft, `${path}`, value);
        })
      );

      setMilestoneFilledTrack((prevData) => {
        return prevData.map((obj) => {
          console.log('intehan', obj.mname, modelNameKey, obj.mname === modelNameKey);
          return obj.mname === modelNameKey
            ? {
              ...obj,
              filled: true,
            }
            : obj;
        });
      });

      axios({
        method: "POST",
        data: {
          // milestonName: 'Sketch Final',//pathArray[pathArray.length-2],
          milestonName: pathArray[pathArray.length - 2],
          endDate: value,
        },
        headers:{
          "token":Cookies.get('jwtToken'),
          "user":Cookies.get('email')
        },
        // withCredentials:true,
        url: `${API_BASE_URL}${CALCULATE_MILESTONE_PATH}`,
      }).then((res) => {
        //  console.log("hehe", res?.data?.results?.result.subtask);
        const newPath = path.replace('.Deadline', '.subTask');
        //  if(isValidDateFormat(value)){
        console.log("onetime", value);
        setFetchedData((prevData) =>
          produce(prevData, (draft) => {
            set(draft, newPath, res.data.results.result.subtask);
          })
        );
        setChildRefresh(value)
        //  }
      }).then;
    }
    else if (path === 'modelData') {
      setFetchedData((prevData) =>
        produce(prevData, (draft) => {
          console.log("creater logger", path, "->", value);
          set(draft, path, value);
        })
      );
    }
  };

  useEffect(() => {
    // console.log("checking first",data);
    setFetchedData(data);
    // const newData = JSON?.parse(JSON?.stringify(data));

   
  }, [isLoading]);


  const handleConfirmSubmitClose = () => {
    setOpenConfirmModel(false)
  }



  const [okProceed, setOkProceed] = useState(false);

  const handleProceed = (val) => {
    navigate('/creator/modellist')
  }


  const handleSubmitButton = () => {
    //  let fd = _.cloneDeep(fetchedData);
    //   fd.modelData.General_info["status"] = 0;
    // console.log(fetchedData?.modelData);
    // console.log(optionSelection);
    let fd = _.cloneDeep(fetchedData);
    console.log("hereoutput", fd);
    fd.modelData.General_info["status"] = 1;

    const { check, message } = checkSubmitModelData(fd)
    if (check) {

      createModel({ modelData: fd?.modelData })
        .then((data) => {
          console.log("newdata", data);
          refetch();
          // navigate('/creator/modellist')
        })
        .then(res => {
          setOpenConfirmModel(true)
        })
        .catch((err) => {
          console.log("newdata", err);
        })
    } else {
      toast.error(message);
    }
    console.log("resultss", message);
  }
  const handleDraftButton = () => {
    let fd = _.cloneDeep(fetchedData);
    fd.modelData.General_info["status"] = 0;
    console.log("current output", fd);

    createModel({ modelData: fd?.modelData })
      .then((data) => {
        console.log("newdata", data);
        refetch();
        // navigate('/creator/modellist')
      })
      .then(res => {
        setSnackBarState(true)
      })
      .catch((err) => {
        console.log("newdata", err);
      })
    console.log("resultss", results);
    // navigate('/creator/modellist')
  }



  const headingText = params?.type === "view" ? "View Model" : "Edit Model";


  // console.log(milestone);

  // if (milestone.hasOwnProperty('subTask')) {
  //   iterateSubTasks(milestone.Milestone_subTask);
  // }
  // iterateMilestones(fetchedData?.modelData?.Milestones);

  useEffect(() => {
    if (fetchedData) {
      console.log('object keys', Object?.keys(fetchedData?.modelData?.Milestones))
      setMilestoneFilledTrack(Object?.keys(fetchedData?.modelData?.Milestones).map(key => {
        return {
          "mname": key,
          "filled": false
        }
      }
      ))
    }
  }, [fetchedData])

  return (
    <div className="create-model-page-container">
      <Header />
      <ToastContainer />
      <div className="create-modal-main-container">
        <NavigationPathComponent paths={[{ name: 'MSIL R&D', path: '/creator/modellist' }]} current='Models' />
        <h2 className="create-model-page-heading">Create Model</h2>
        <div className="create-model-form gap-2">
          <div className="general-information-container">
            <p className="general-information-label">General Information</p>
            {/* {data && <p>{data?.result}</p>} */}
            <div className="general-information-input-container flex flex-col gap-2">
              <div className="flex items-start gap-2 justify-evenly flex-grow-1 ">
                <p className="create-model-general-info-label">Model Name</p>
                {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={40} />) : (
                  <TextField
                    error={false}
                    name="Model Name"
                    id="outlined-error-helper-text"
                    // label="Model Name"
                    disabled={params?.type == "view"}
                    // value={ _.isUndefined(fetchedData?.modelData?.General_info?.Model_Name)?'':fetchedData?.modelData?.General_info?.Model_Name}
                    // onChange={(e) =>
                    //   handelModelNameChange(
                    //     e,
                    //     "modelData.General_info.Model_Name"
                    //   )
                    // }
                    onChange={handelModelNameChange}
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  />
                )}
              </div>

              <div className="flex items-start gap-2 justify-evenly flex-grow-1">
                <p className="create-model-general-info-label">Level</p>
                {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={40} />) : (
                  <Select
                    labelId="demo-simple-select-label"
                    name='Type'
                    id="demo-simple-select"
                    disabled={params?.type == "view"}
                    // label="Type"
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handelTypeChange}
                    value={optionSelection['Type']}
                    size="small"
                    sx={{
                      flexGrow: "1",
                      "& label": {
                        "&.Mui-focused": {
                          color: '#000'
                        }
                      }
                    }}
                  >

                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1-1"}>1-1</MenuItem>
                    <MenuItem value={"1-2"}>1-2</MenuItem>
                    <MenuItem value={"2-1"}>2-1</MenuItem>
                    <MenuItem value={"2-2"}>2-2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    {/* <MenuItem value={"3"}>3</MenuItem> */}
                  </Select>
                )}
              </div>

              <div className="flex items-start gap-2">
                <p className="create-model-general-info-label">
                  Design Responsibility
                </p>
                {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={40} />) : (
                  <Select
                    labelId="demo-simple-select-label"
                    value={optionSelection['Design Responsibility']}
                    id="demo-simple-select"
                    name='Design Responsibility'
                    onChange={handelDesignChange}
                    // value={"Maruti"}
                    disabled={params?.type == "view"}
                    // label="Design Responsibility"
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    <MenuItem value={"Maruti"}>MSIL</MenuItem>
                    <MenuItem value={"Suzuki"}>MSIL & SMC</MenuItem>
                    {/* <MenuItem value={"Arena"}>Arena</MenuItem> */}
                  </Select>
                )}
              </div>

              <div className="flex items-start gap-2">
                <p className="create-model-general-info-label">
                  Development Responsibility
                </p>

                {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={40} />) : (
                  <Select
                    labelId="demo-simple-select-label"
                    name='Development Responsibility'
                    id="demo-simple-select"
                    value={optionSelection['Development Responsibility']}
                    onChange={handelDevelopmentChange}
                    //  defaultValue={"MSIL"}
                    disabled={params?.type == "view"}
                    // label="Development Responsibility"
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  >

                    <MenuItem value={"Maruti"}>MSIL</MenuItem>
                    {/* <MenuItem value={"Suzuki"}>Suzuki</MenuItem> 
                    <MenuItem value={"Arena"}>Arena</MenuItem> */}
                  </Select>
                )}
              </div>
              <div
                className="flex gap-2 flex-grow-1"
                style={{ flexGrow: "1" }}
              >
                <div className="">
                  <p className="create-model-general-info-label">Description</p>
                  <p style={{ fontSize: '12px', color: '#bbb' }}>(Max 500 characters)</p>
                </div>
                {
                  // !fetchedData?(<Skeleton variant='rectangular' width='100%' height={40}/>) :
                  (<TextareaAutosize
                    aria-label="maximum height"
                    // placeholder=""
                    disabled={params?.type == "view"}
                    name='Description'
                    // onChange={(e) =>
                    //   handelModelNameChange(
                    //     e,
                    //     "modelData.General_info.Description"
                    //   )
                    // }
                    onChange={handelDescriptionChange}
                    rowsmin={5}
                    maxlength={500}
                    placeholder=" 500 characters limit"
                    // value={
                    //   fetchedData?.modelData?.General_info?.Description || ""
                    // }
                    //       defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    // ut labore et dolore magna aliqua."
                    style={{
                      flexGrow: "1",
                      border: "1px solid var(--foreground-text-color)",
                      borderRadius: "4px",
                      height: "100%",
                    }}
                  />)}
              </div>
            </div>
          </div>
          {/* ret.modelData.General_info.Type = optionSelection['Type'];
    ret.modelData.General_info.Design_Responsibility=optionSelection['Design Responsibility']
    ret.modelData.General_info.Development_Responsibility=optionSelection['Development Responsibility'] */}

          <div className="milestones-container">
            <p className="milestone-header-label">Milestones</p>

            {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={380} />) : (
              <div className="milestones-item-container flex gap-2 flex-col">
                {Object?.keys(fetchedData?.modelData?.Milestones)?.map(
                  (milestoneKey, index) => {
                    const milestone = fetchedData?.modelData?.Milestones[milestoneKey];
                    const modelData = fetchedData?.modelData
                    return (
                      <MilestoneItem
                        key={index}
                        milestoneName={milestoneKey}
                        milestoneDetails={milestone}
                        sx={{}}
                        onEditDeadline={handleonEditDeadline}
                        modelData={fetchedData?.modelData}
                        keyRefresh={childRefresh}
                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
        <div className="create-model-button-container flex gap-2 justify-end">
          <Button onClick={handleCancelClick} className='dcms-btn-main dcms-cancel-btn'>Cancel</Button>
          <Button onClick={handleDraftButton} className='dcms-btn-main dcms-save-as-draft-btn'>Save as Draft</Button>
          <Button
            className='dcms-btn-main dcms-active-btn'
            onClick={handleSubmitButton}
          >
            Submit
          </Button>
        </div>
      </div>
      <SnackBarComponent isOpen={snackBarState} handleClose={handleSnackbarClose} msg={'Data Saved!'} position={{ vertical: 'bottom', horizontal: 'left' }} />
      <SubmitConfirmComponent isOpen={openConfirmModel} handleClose={handleConfirmSubmitClose} handleProceed={handleProceed} />
    </div>
  );
}

export default ViewModal