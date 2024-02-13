import { produce } from 'immer';
import set from 'lodash/set'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Button, MenuItem, Select, Skeleton, TextField, TextareaAutosize } from "@mui/material";
import { useAddModelDetailsMutation, useFetchModelDetailsQuery } from "../../../store/apis/createrApi/ModelDetailApi";
import { useFetchUsersQuery } from '../../../store';
import Header from "../../../components/Header/Header"
import '../CreateModel/CreateModel.css'
import '../ViewDcms/ViewTimeLine.css'
// import '../CreateModel/CreateMilestoneItem'
import MilestoneItem from "./MilestoneItem"
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import SnackBarComponent from '../../../components/SnackBarComponent/SnackBarComponent';
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkSubmitModelData } from '../CreateModel/handleSubmit';
import { API_BASE_URL, CALCULATE_MILESTONE_PATH } from '../../../store/Apiconstants';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const ViewModal = () => {
  const params = useParams()
  const navigate = useNavigate();
  const { data, Error, isLoading, refetch } = useFetchModelDetailsQuery(params?.id); // view k liye
  const [addModel, results] = useAddModelDetailsMutation();
  const location = useLocation();
  const [fetchedData, setFetchedData] = useState(data);
  const customProp = location.state?.additionalProp;
  const [expand, setExpand] = useState(false);
  const [childRefresh, setChildRefresh] = useState()
  const [snackBarState, setSnackBarState] = useState(false)


  const handleSnackbarClose = () => {
    setSnackBarState(false)
  }

  const handleCancelClick = () => {
    // Navigate to /creator/modellist when Cancel is clicked
    navigate('/creator/modellist');
  };
  const handelModelNameChange = (e, tar) => {
    const { name, value } = e.target;
    setFetchedData((prevData) =>
      produce(prevData, (draft) => {
        set(draft, tar, value);
        // draft.modelData.General_info['user_email'] = 'raghuveervairaghi@maruti.co.in';
        // prevData.modelData.General_info.push({user_email: 'raghuveervairaghi@maruti.co.in'})
        // set(draft,'modelData.General_info.user_email','raghuveervairaghi@maruti.co.in')
        // draft.modelData.General_info.user_email = 'raghuveervairaghi@maruti.co.in';
      })

      // let p = {...prevData};
      // p[tar] = value;
      // p.modelData.General_info.user_email = 'raghuveervairaghi@maruti.co.in';

      // return p

    );
  };
  function isValidDateFormat(input) {
    console.log('input regex', input)
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    console.log('regex.test(input)', regex.test(input))
    return regex.test(input);
  }
  const handleonEditDeadline = (path, value) => {
    console.log('enter ho raha path', path)
    console.log('enter ho raha value!', value)
    if (isValidDateFormat(value)) {
      console.log("error found", path, "-", value);
      const pathArray = path?.split(".");
      console.log("Data called from view model", path, "->", value);
      setFetchedData((prevData) =>
        produce({ ...prevData }, (draft) => {
          set(draft, path, value);
          // draft.modelData.General_info.push({ user_email: 'raghuveervairaghi@maruti.co.in' });
        })
      );
      console.log("error found 76", pathArray[1], "-", value);
      if (path !== 'modelData') {
        console.log('modelData ke baraber hai')
        axios({
          method: "POST",
          data: {
            milestonName: pathArray[pathArray.length - 2],
            endDate: value,
          },
          headers:{
            "token":Cookies.get('jwtToken'),
            "user":Cookies.get('email'),
          },
          // withCredentials:true,
          url: `${API_BASE_URL}${CALCULATE_MILESTONE_PATH}`,
        })
          .then((res) => {
            //  console.log("hehe", res?.data?.results?.result.subtask);
            const newPath = path.replace('.Deadline', '.subTask');

            console.log("onetime changing", value, "->", newPath, "->", res.data.results.result.subtask);
            setFetchedData((prevData) =>
              produce(prevData, (draft) => {
                set(draft, newPath, res.data.results.result.subtask);
              })
            );
            setChildRefresh(value)
          });
      }
    }
    else if (path === 'modelData') {
      console.log('setFetchedData trigger ho raha')
      setFetchedData((prevData) =>
        produce(prevData, (draft) => {
          console.log("logger", path, "->", value);
          set(draft, path, value);
        })
      );

    }
  };
  useEffect(() => {
    setFetchedData(data)
  }, [isLoading])


  const handleSubmitButton = (value) => {
    console.log("fetchedData", fetchedData);
    let fd = _.cloneDeep(fetchedData);
    console.log("fd.modelData", fd);
    fd.modelData.General_info["user_email"] = Cookies.get('email');
    fd.modelData.General_info["status"] = 1; // 0 for draft and 1 for submit
    console.log('SubmitData', fd);
    const { check, message } = checkSubmitModelData(fd)
    if (check) {
      addModel({ "modelData": fd?.modelData })
        .then((res) => {
          refetch();
          // navigate(`/upload/${params?.id}`,{ state: { model_id: params?.id} })
          navigate('/creator/modellist')
        })
        .catch(err => {
          console.log('Error', err)
        });
    } else {
      toast.error(message);
    }


  }

  const handleDraftButton = () => {
    console.log("fetchedData", fetchedData);
    let fd = _.cloneDeep(fetchedData);
    console.log("fd.modelData", fd);
    fd.modelData.General_info["user_email"] = Cookies.get('email');
    fd.modelData.General_info["status"] = 0; // 0 for draft and 1 for submit
    console.log('SubmitData', fd);
    // fetchedData.modelData.General_info.user_email='raghuveervairaghi@maruti.co.in'
    addModel({ "modelData": fd?.modelData }).then(res => {
      setSnackBarState(true)
    }).catch(err => {
      console.log('Error', err)
    });
    // navigate('/upload',{ state: { model_id: params?.id } }) 
  }



  const headingText = (params?.type === "view" || params?.type === 'viewfull' || params?.type === 'viewprogress') ? "View Model" : "Edit Model";


  // console.log(milestone);

  // if (milestone.hasOwnProperty('subTask')) {
  //   iterateSubTasks(milestone.Milestone_subTask);
  // }
  // iterateMilestones(fetchedData?.modelData?.Milestones);

  // const toggleAccordian=(mn)=>{
  //   setExpand(mn)
  // }
  // useEffect(()=>{
  //   // produce(prevData, (draft) => {
  //   //   draft.modelData.General_info.user_email = 'raghuveervairaghi@maruti.co.in';
  //   // })
  //   // setFetchedData((prevData) =>
  //   //   produce(prevData, (draft) => {
  //   //     draft.modelData.General_info.user_email = 'raghuveervairaghi@maruti.co.in';
  //   //   })
  //   // );
  // },[]) 
  const [expandedItems, setExpandedItems] = useState({});

  const toggleAccordian = (milestoneName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [milestoneName]: !prev[milestoneName],
    }));
    console.log('milestone', milestoneName)
    // setExpand(milestoneName)
  };
  return (
    <div className="create-model-page-container">
      <Header />
      <ToastContainer />
      <div className="create-modal-main-container">
        <NavigationPathComponent paths={[{ name: 'MSIL R&D', path: '/creator/modellist' }]} current='Models' />
        <h2 className="create-model-page-heading">{headingText} </h2>
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
                    // name="Model_Name"
                    id="outlined-error-helper-text"
                    // label="Model Name"
                    disabled={true}
                    value={fetchedData?.modelData?.General_info?.Model_Name}
                    onChange={(e) =>
                      handelModelNameChange(
                        e,
                        "modelData.General_info.Model_Name"
                      )
                    }
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
                    id="demo-simple-select"
                    disabled={params?.type == "view" || params?.type == 'viewprogress' || params?.type == 'viewfull'}
                    // label="Age"
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) =>
                      handelModelNameChange(e, "modelData.General_info.Type")
                    }
                    // defaultValue={fetchedData?.modelData?.General_info?.Type}
                    value={fetchedData?.modelData?.General_info?.Type}
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {/* {fetchedData && (
                        <MenuItem
                          value={fetchedData?.modelData?.General_info?.Type}
                          selected
                        >
                          {fetchedData?.modelData?.General_info?.Type}
                        </MenuItem>
                      )} */}


                    {Array.from(new Set([fetchedData?.modelData?.General_info?.Type, "0", "1-1", "1-2", "2-1", "2-2", "3", "4"])).sort().map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    {/* <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem> */}
                  </Select>
                )}
              </div>

              <div className="flex items-start gap-2">
                <p className="create-model-general-info-label">
                  Design Responsibility
                </p>
                {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={40} />) : (
                  <Select
                    // labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={
                      fetchedData?.modelData?.General_info
                        ?.Design_Responsibility
                    }
                    onChange={(e) =>
                      handelModelNameChange(
                        e,
                        "modelData.General_info.Design_Responsibility"
                      )
                    }
                    disabled={params?.type == "view" || params?.type == 'viewprogress' || params?.type == 'viewfull'}
                    // defaultValue={data?.modelData?.General_info?.Design_Responsibility || ''}
                    // label="Design Responsibility"
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {/* {!fetchedData?(<Skeleton variant='rectangular' width='100%' height={40}/>) : (
                        <MenuItem
                          value={
                            fetchedData?.modelData?.General_info
                              ?.Design_Responsibility
                          }
                        >
                          {
                            fetchedData?.modelData?.General_info
                              ?.Design_Responsibility
                          }
                        </MenuItem>
                      )} */}
                    <MenuItem value={"Maruti"}>MSIL</MenuItem>
                    <MenuItem value={"Suzuki"}>MSIL & SMC</MenuItem>
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
                    id="demo-simple-select"
                    value={
                      fetchedData?.modelData?.General_info
                        ?.Development_Responsibility
                    }
                    onChange={(e) =>
                      handelModelNameChange(
                        e,
                        "modelData.General_info.Development_Responsibility"
                      )
                    }
                    disabled={params?.type == "view" || params?.type == 'viewprogress' || params?.type == 'viewfull'}
                    // label="Development Responsibility"
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {/* {!fetchedData?(<Skeleton variant='rectangular' width='100%' height={40}/>) : (
                        <MenuItem
                          value={
                            fetchedData?.modelData?.General_info
                              ?.Development_Responsibility
                          }
                        >
                          {
                            fetchedData?.modelData?.General_info
                              ?.Development_Responsibility
                          }
                        </MenuItem>
                      )} */}
                    <MenuItem value={"Maruti"}>MSIL</MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
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
                <TextareaAutosize
                  aria-label="maximum height"
                  // placeholder="Maximum 4 rows"
                  disabled={params?.type == "view" || params?.type == 'viewprogress' || params?.type == 'viewfull'}
                  rowsmin={5}
                  maxlength={500}
                  placeholder="500 character limit"
                  onChange={(e) =>
                    handelModelNameChange(
                      e,
                      "modelData.General_info.Description"
                    )
                  }
                  value={
                    fetchedData?.modelData?.General_info?.Description || ""
                  }
                  //       defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  // ut labore et dolore magna aliqua."
                  style={{
                    flexGrow: "1",
                    border: "1px solid var(--foreground-text-color)",
                    borderRadius: "4px",
                    height: "100%",
                    padding: '0.5rem',
                    ...((params?.type == "view" || params?.type == 'viewprogress' || params?.type == 'viewfull') && { color: '#b3b3b3' }),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="milestones-container">
            <p className="milestone-header-label">Milestones</p>
            {!fetchedData ? (<Skeleton variant='rectangular' width='100%' height={380} />) : (
              <div className="milestones-item-container flex gap-2 flex-col">
                {Object.keys(fetchedData?.modelData?.Milestones).map(
                  (milestoneKey, index) => {
                    const milestone = fetchedData?.modelData?.Milestones[milestoneKey];
                    // const modelData=fetchedData?.modelData
                    return (
                      <MilestoneItem
                        key={index}
                        milestoneName={milestoneKey}
                        milestoneDetails={milestone}
                        sx={{ width: "100%" }}
                        onEditDeadline={handleonEditDeadline}
                        toggleAccordian={toggleAccordian}
                        expand={expandedItems[milestoneKey]}
                        paramsType={params?.type}
                        keyRefresh={childRefresh}
                        modelData={fetchedData?.modelData}
                      // expand={expand}

                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
        <div className="create-model-button-container flex gap-2 justify-end">

          <Button data-testid="cancel-button"  variant="text" onClick={handleCancelClick} style={{ backgroundColor: "#fff", color: "var(--base-text-color)", borderColor: "var(--base-text-color)", textTransform: 'none' }}>{(params?.type === "edit") ? 'Cancel' : 'Back'}</Button>
          {(params?.type === "viewprogress" || params?.type === 'viewfull') ? (<Button
            className='dcms-btn-main dcms-active-btn'
            onClick={() => navigate(`/upload/${params?.type}/${params?.id}`)}
          >
            View Uploaded Files
          </Button>) : null}
          {(params?.type !== "view" && params?.type !== "viewprogress" && params?.type !== 'viewfull') ? (<Button data-testid="draft-button" onClick={handleDraftButton} className='dcms-btn-main dcms-save-as-draft-btn'>Save as Draft</Button>) : null}
          {(params?.type !== "view" && params?.type !== "viewprogress" && params?.type !== 'viewfull') ? (<Button
              data-testid="submit-button"
            className='dcms-btn-main dcms-active-btn'
            onClick={handleSubmitButton}
          >
            Submit
          </Button>) : null}
        </div>
      </div>
      <SnackBarComponent isOpen={snackBarState} handleClose={handleSnackbarClose} msg={'Data Saved!'} position={{ vertical: 'bottom', horizontal: 'left' }} />
    </div>
  );
}

export default ViewModal