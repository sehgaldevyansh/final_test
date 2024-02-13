import moment from "moment";
import { useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import downloadIcon from '../../../assets/Flaticons/downloadIcon.svg'
import trashIcon from '../../../assets/Flaticons/trashIcon.svg'
import './UploadedFile.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFetchFileDetailsUploadQuery } from "../../../store";
import { Skeleton } from "@mui/material";
import { API_BASE_URL2 } from "../../../store/Apiconstants";
import Cookies from "js-cookie";
const UploadedFile = ({ files, uploadHeading, uploadedFiledata }) => {
    const params = useParams();
    let type = ''
    const { data: fileDetails, isLoading, Error,refetch } = useFetchFileDetailsUploadQuery({
        modelNumber: params?.id,
        uploadedBy: Cookies.get('email')
    })
    const handleDownloadButton = (file) =>{
       console.log("file name",file);
       axios({
        method: 'GET',
        params:{
           useremail:Cookies.get('email'),
           fileName:file
        },
        headers:{
            "token":Cookies.get('jwtToken'),
            "user":Cookies.get('email'),
          },
        // withCredentials:true,
        url: `${API_BASE_URL2}/api/msil/generate-download-url`
      })
        .then((res) => {
           console.log("download link",res?.data?.data?.url);
           window.location.href = res?.data?.data?.url;
        })
            .then((res) => {
                console.log("download link", res?.data?.data?.url);
                window.location.href = res?.data?.data?.url;
            })
    }
    useEffect(()=>{
      console.log("files--",fileDetails);
    },[isLoading])

    const handleDeleteButton = (file) => {
        // generate-delete-url
        console.log('delete button ', file, type)
        axios({
            method: 'DELETE',
            params:{
               useremail:Cookies.get('email'),
               fileName:file,
               fileType:type
            },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              },
            // withCredentials:true,
            url: `${API_BASE_URL2}/api/msil/generate-delete-url`
        })
        .then((res)=>{
            refetch();
        })
            // .then((res) => {
            //     console.log('delete res', res)
            //     window.location.href = res?.data?.data?.url;
            // })
    }


    console.log('files--', fileDetails)

    let data = []
    let table = 'totalPartsList'
    if (uploadHeading?.includes('TPL')) {
        table = 'totalPartsList'
        console.log("table", data)
        type = 'TPL'
    }
    else if (uploadHeading?.includes('People')) {
        table = 'peopleMaster'
        type = 'PM'
    }
    else {
        table = 'uncommonActivityMaster'
        type = 'UAM'
    }

    if (table !== '' && fileDetails?.data
    ) {

        // console.log('file uploaded in tpl', uploadedFiledata.data, uploadedFiledata.data[table], table)

        data = fileDetails?.data[table]?.map(file => {

            console.log('file mapping', file)
            console.log('block check', uploadHeading, file.uploadedAt)

            return (
                {
                    "Name": file.fileName,
                    "Uploaded By": file.uploadedBy,
                    "Uploaded On": file.uploadedOn,
                    "# of rows": file.noOfRowsAdded,
                    "Description": file.modelNumber.description,
                }
            )

        })
    }



    const columns = useMemo(
        () => [
            {
                name: "Name", selector: (row) => row.Name, sortable: true, cell: (row) => (

                    <span style={{ color: "#171C8F" }}>{row.Name.substring(row.Name.lastIndexOf('_') + 1)}</span>
                    // <span style={{ color: "#171C8F" }}>{row.Name}</span>

                ),
            },
            { name: "Uploaded By", selector: (row) => row["Uploaded By"], wrap: true },
            { name: "Uploaded On", selector: (row) => row["Uploaded On"], sortable: true },
            {
                name: "# of rows", selector: (row) => row["# of rows"], sortable: true
                // ,cell:(row)=>(
                //     <div>
                //         {row.noOfRowsAdded}
                //     </div>    
                // )
            },
            {
                name: "Action", selector: (row) => row.Type, sortable: true, cell: (row) => (
                    <div className="flex items-center gap-2">
                        <div
                            className={`cursor-pointer flex gap-3 items-start`}
                        // onClick={() => handleDownloadButton(row.Name)}
                        >

                            {(params?.type !== 'viewprogress' && params?.type !== 'viewfull') ? (<i className="" onClick={() => handleDeleteButton(row.Name)}>
                                <img src={trashIcon} />
                            </i>) : null}
                            <i className="" onClick={() => handleDownloadButton(row.Name)}>
                                <img src={downloadIcon} />
                            </i>

                        </div>
                    </div>
                ),
            },
        ],
        []
    );
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }} >
            {/* <p>{heading}</p> */}
            <p style={{ fontSize: '14px', color: '#343536' }}>{uploadHeading}</p>
            <div className="" style={{
                border: 'var(--general-border)'
            }}>
                {!isLoading && <DataTable
                    columns={columns}
                    data={data}
                    keyField="Uploaded By"
                    className="customDataTable"
                    style={{ width: '100%' }}
                    customStyles={{

                        headRow: {
                            style: {
                                color: "#171C8F",
                                fontWeight: 600,
                                fontSize: '14px',
                                // whiteSpace: 'wrap',
                                // overflow: 'scroll'
                                textOverflow: 'hidden'

                            },
                        },
                        headCells: {
                            style: {
                                whiteSpace: 'normal',
                                textOverflow: 'hidden'
                            },
                            className: 'wrapper',
                        },

                    }}

                />}
                {isLoading && <Skeleton variant='rectangular' width='100%' height={30} />}
                {/* {
                    files && (<div className="">
                        {files?.map(file => {
                            console.log('file details', file?.name)
                            return (
                                <p>{file?.name}</p>
                            )
                        })}
                    </div>)
                } */}
            </div>
        </div>
    )
}

export default UploadedFile