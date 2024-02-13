import { useEffect, useState,useRef } from 'react';
import { Button, Typography, Box, Skeleton, LinearProgress } from '@mui/material';
import Papa from 'papaparse';
import FileSummaryComponent from './FileSummaryComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL2 } from '../../../store/Apiconstants';
import { useFetchFileDetailsUploadQuery, useFetchBaseModelListByTPLUploadQuery } from "../../../store";
const MAX_FILE_SIZE_MB = 200;
import Cookies from 'js-cookie';
// const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const ALLOWED_FILE_TYPES = ['text/csv'];

const FileUploader = ({ uploadHeading, isFileLoading, fileType, baseModel, refetchFileDetails, refetchBaseModelList }) => {
  const params = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [showFileSummaryComponent, setShowFileSummaryComponent] = useState(false);
  const [uploadedURL, setUploadedURL] = useState();
  const [uploadFilePath, setUploadFilePath] = useState();
  const [uploadedFileData, setUploadedFileData] = useState({})
  const [uploadLoader, setUploadLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const fileInputRef = useRef(null);

  var getUploadStatusId="";

  function fetchUploadStatusPolling(){
    axios({
      method:"GET",
      url:`${API_BASE_URL2}/nitish`
    }).then((res)=>{
      if(res?.data?.messgae==="success" || res?.data?.messgae==="fail"){
        clearInterval(getUploadStatusId);
        console.log("set status here");
      }
    })
    .catch((err)=>{
      console.log("error",err);
      clearInterval(getUploadStatusId);
    })
  }

  // const {  data: data2, isLoading: isLoading2, error: error2,refetch: refetchBaseModelList,}=useFetchBaseModelListByTPLUploadQuery(params?.id)
  // const { data: fileDetailsApi, isLoading: isLoadingFile, error: fileFetchError,refetch: refetchFileDetails  } = useFetchFileDetailsUploadQuery({
  //   "modelNumber": params?.id,
  //   "uploadedBy": "tom@maruti.co.in"
  // })

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File change working", file?.name);
    axios({
      method: "GET",
      params: {
        fileName: file?.name,
        useremail:Cookies.get('email')
      },
      headers:{
        "token":Cookies.get('jwtToken'),
        "user":Cookies.get('email'),
      },
      url: `${API_BASE_URL2}/api/msil/generate-upload-url/${baseModel}/${fileType}`,// dynamic
    })
      .then((res) => {
        console.log("s3 url data", res?.data?.data);
        setUploadedURL(res?.data?.data?.url);
        setUploadFilePath(res?.data?.data?.key);
      });
    setSelectedFile(file);
    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }
    setError(null);
  };

  const handleBrowseButtonClick = () =>{
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }

  

  const handleUpload = async () => {
    setError(null) //Added to flush data
    setErrorMessage('') //Added to flush data
    setShowFileSummaryComponent(true);
    setUploadLoader(true);
    console.log('Till here working', selectedFile);
    console.log('Till here working');
    try {
      let uploadResponse = await fetch(uploadedURL, {
        method: "PUT",
        body: selectedFile,
      });

      if (uploadResponse.ok) {

        console.log("File uploaded successfully");
        let APIPostfixUrl = '';
        if (fileType === "TPL") APIPostfixUrl = "total-part-list"
        else if (fileType === "PM") APIPostfixUrl = "people-master"
        else if (fileType = "uncommon-activity-master") APIPostfixUrl = "uncommon-activity-master";
        axios({
          method: 'POST',
          data: {
            "modelNumber": baseModel,//model_id || params?.id,
            "key": uploadFilePath,
            "uploadedBy": Cookies.get('email')
          },
          headers:{
            "token":Cookies.get('jwtToken'),
            "user":Cookies.get('email'),
          },
          // withCredentials:true,
          url: `${API_BASE_URL2}/api/msil/fileUpload/${APIPostfixUrl}`
        })
          .then((res) => {
            setUploadedFileData(res.data);
            console.log("after upload", res.data);
            setShowFileSummaryComponent(true);
            refetchFileDetails();
            refetchBaseModelList();
            getUploadStatusId = setInterval(fetchUploadStatusPolling, 5000);
          })
          .then((res) => {
            setUploadLoader(false)
          }).catch((err) => {
            setErrorMessage(err.response.data.msg)
            setUploadLoader(false)
            console.log('Error occured during uploading', err, err.response.data.msg)
          })
        //loader here
        // .then((res) => {
        //   setIsFileLoading(false)  
        // })

      } else {
        console.log("Error uploading file:", uploadResponse.statusText);
        setErrorMessage(uploadResponse.statusText)
        setUploadLoader(false)
      }
    } catch (error) {
      console.error("Error:", error);
    }
    if (selectedFile) {
      if (selectedFile && selectedFile?.length > 0) {
        let extension = selectedFile[0].name.split(".").pop()
        console.log('Till here working');
        if (extension != null) {
         
        }
      }
      // await setUploadedFiles(selectedFile);
      console.log('Uploaded files', selectedFile, uploadHeading)
      //handleParse();
      //await handleFilesUpload({ uploadedFile: selectedFile, uploadedAt: uploadHeading });
      // const [response] = useUploadS3(file);

      //response.error ? setError(response) : setError(null);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className='flex flex-col items-stretch gap-2.5' style={{ backgroundColor: '#f4f4f4' }}>
      <Box
        borderRadius={4}
        textAlign='center'
        display={'flex'}
        alignItems={'center'}
        justifyContent=''
        gap='32px'
      >
        <div className=''>
          {/* Upload People Master (CSV File) */}
          {uploadHeading}
        </div>
        <div className='flex flex-grow'>
          <input
            type='file'
            onChange={handleFileChange}
            // onClick={handleFileChange}
            style={{ display: 'none' }}
            accept={'text/csv'}
            id={uploadHeading}
            ref={fileInputRef}
          />

          <div
            style={{
              backgroundColor: 'var(--backgound-plain-color)',
              minHeight: '28px',
              width: '250px',
              flexGrow: '1',
              display: 'flex',
              paddingLeft: '2px'
            }}
          >
            <Typography
              variant='subtitle1'
              noWrap
              textOverflow={'ellipsis'}
              overflow='hidden'
              minWidth='60px'
              // width={'160px'}
              style={{ backgroundColor: 'var(--backgound-plain-color)' }}
            >
              {selectedFile?.name}
            </Typography>
          </div>
          <div className=''>
            <label htmlFor={uploadHeading}>
              <Button
                disabled={uploadLoader}
                onClick={handleBrowseButtonClick}
                variant='contained'
                component='span'
                size='small'
                className='text-neutral-700 text-sm leading-4 tracking-tight whitespace-nowrap items-stretch bg-slate-200 justify-center p-2 rounded-none hover:background-transparent'
                style={{
                  borderRadius: '0px 4px 4px 0px'
                }}
                sx={{
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--base-text-color)', // Change background color on hover
                    color: '#fff'
                  },
                }}
              >
                Browse
              </Button>
            </label>
          </div>
          <Button
            disabled={uploadLoader}
            // variant='contained'
            // color="primary"
            onClick={handleUpload}
            size='small'
            style={{
              // backgroundColor: 'var(--backgound-plain-color)',
              // color: 'var(--base-text-color)',
              border: '1px solid var(--foreground-text-color-dark)',
              boxShadow: 'none',

            }}
            sx={{
              backgroundColor: '#fff',
              color: 'var(--base-text-color)',
              marginLeft: '0.5rem',
              textTransform: 'none',
              padding: '2px 24px',
              borderRadius: '4px',
              '&:hover': {
                textTransform: 'none',
                backgroundColor: 'var(--base-text-color)', // Change background color on hover
                color: '#fff',
                flexShrink: 'none',
                marginLeft: '0.5rem',
                // textTransform: 'none',
                padding: '2px 24px',
                borderRadius: '4px',
              },
              // '&.MuiButton-root':{
              //   backgroundColor:'#fff'
              // }
            }}
          >
            Upload
          </Button>

          {error && (
            <Typography variant='body2' color='error' mt={2}>
              {error}
            </Typography>
          )}
        </div>
      </Box>

      {(showFileSummaryComponent && !isFileLoading) ? (

        <div className=''>

          {uploadLoader ? (<div className="mt-2"><LinearProgress /></div>) : <FileSummaryComponent
            heading={uploadedFileData?.heading}
            validationMessage='Upload Successful!'
            noOfRows={uploadedFileData?.data?.totalNumberOfRows}
            fileProperty={uploadedFileData?.heading?.includes('People') ? 'Engineers' : 'Unique Blocks'}
            noOfBlocks={uploadedFileData?.heading?.includes('People') ? uploadedFileData?.data?.numberOfEngineers : uploadedFileData?.data?.numberOfUniqueBlocksAdded}
            issuesIdentified='No issues found.'
            errorDataInfo={uploadedFileData?.data?.errorDataInfo}
            errorMessage={errorMessage}
          />}

        </div>
      ) : null}
    </div>
  );
};

export default FileUploader;
