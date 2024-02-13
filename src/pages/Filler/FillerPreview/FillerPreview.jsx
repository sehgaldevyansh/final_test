
import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Sidebar from "../FillerSidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import sampleData from "../FillerSidebar/Sample.json";
import {
    CircularProgress,
    Button,
} from "@mui/material";
import '../FillerSidebar/FillerSidebar.css'
import './FillerPreview.css'
import { useFetchBaseModelByModelIdQuery,useFetchBlockListsQuery } from "../../../store";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import FillerPreviewDeviationComponent from "./FillerPreviewDeviationComponent";
import { fetchDeviatedMilestone } from "./api";
import csvDownloadIcon from '../../../assets/PreviewPage/csvDownloadIcon.png'
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL2 } from "../../../store/Apiconstants";


const FillerPreview = ({ handlePrev }) => {
    
    const searchOptions = ["System", "Variant", "Part"];
    const params = useParams();
    const [data, setData] = useState(sampleData.data);
    const nav = useNavigate();
    const [filteredData, setFilteredData] = useState(data);
    const [value, setValue] = useState(4)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(
        searchOptions[0]
    );
    const [deviatedData, setDeviatedData] = useState();
    const { data:blockLength} = useFetchBlockListsQuery(params?.id)
    const { data: baseModelCount } = useFetchBaseModelByModelIdQuery(params?.id)
    const navigate = useNavigate();
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


                return block.blockCode.toLowerCase().includes(term.toLowerCase()) || parts.length > 0;
            });

            return blocks.length > 0;
        });

        setFilteredData(filtered);
    };
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);

    const handlePartClick = (part) => {
        console.log('part', part)
        setSelectedPart(part);
        // setSelectedBlock(part.block);
        // setSelectedVariant(part.variant);
    };

    const handleSubmit = () => {
        nav(`/comment/${params?.id}`)
    }

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        // setSelectedBlock(variant.block);
        setSelectedPart(null);
    };

    const handleBlockClick = async (block) => {
        setSelectedBlock(block);
        setSelectedVariant(null);
        setSelectedPart(null);
        console.log("working nikhil");
        // const response  = await fetchDeviatedMilestone("")
        const responseData = await fetchDeviatedMilestone({
            // systemName:selectedSystem,
            blockName: block?.blockName,
            modelId: params?.id,
            // baseModel:baseModelCount?.data?.baseModel,
            useremail: Cookies.get('email')
        });
        console.log("response", responseData?.data);
        setDeviatedData(responseData?.data)
    };

    const handleSystemClick = (system) => {
        setSelectedSystem(system);
        setSelectedBlock(null);
        setSelectedVariant(null);
        setSelectedPart(null);
    };




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCSVDownload = () => {
        console.log('CSV Download Button Clicked')
        const useremail = Cookies.get('email')
        const file = `DCMS/${params?.id}/Download/${useremail}//tpl_${useremail}_.csv`
        console.log("file name", file);
        axios({
            method: 'GET',
            params: {
                useremail: Cookies.get('email'),
                fileName: file
            },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              },
            // withCredentials:true,
            url: `${API_BASE_URL2}/api/msil/generate-download-url`
        })
            .then((res) => {
                console.log("download link", res?.data?.data?.url);
                window.location.href = res?.data?.data?.url;
            })
    }

    return (
        <div className=" flex flex-col items-stretch h-full filler-preview-main-page-container" style={{
            backgroundColor: '#f4f5f8',
            height: '83vh',
            backgroundSize: 'cover',

        }}>

            <div className="flex-col relative flex h-full  w-full items-center max-md:max-w-full max-md:pl-5   modellist-container gap-6 overflow-auto filler-preview-content-container" style={{ scrollbarWidth: '0' }}>

                <div className="rounded shadow bg-white flex w-full flex-col justify-center pl-4 mt-4 pr-2 py-2 items-start max-md:max-w-full max-md:pr-5">
                    <div className="items-center justify-between w-full flex gap-6 max-md:max-w-full max-md:flex-wrap p-2">
                        <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 px-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 ">
                            <div className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-3" style={{ padding: '2px 12px' }}>
                                <div className="flex gap-2">
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>Model </span><span style={{ fontWeight: '400' }}>{baseModelCount?.data?.modelName}</span>
                                </div>
                                <div className="flex gap-2"> <span style={{ fontWeight: '600', fontSize: '14px' }}>Base Model </span><span style={{ fontWeight: '400' }}> {baseModelCount?.data?.baseModel}</span></div>
                                <div className="flex gap-2"> <span style={{ fontWeight: '600', fontSize: '14px' }}>Total Blocks </span><span style={{ fontWeight: '400' }}>
                                    {/* {baseModelCount?.data?.totalBlocks} */}
                                    {blockLength?.data?.length}
                                    </span></div>
                                {/* @Kaushik */}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer" onClick={handleCSVDownload}>
                            <div className=""><img src={csvDownloadIcon} /></div>
                            <div className="download-csv-text" >Download Part as CSV</div>
                        </div>

                    </div>
                </div>
                <div className="rounded  flex w-full justify-start   items-start max-md:max-w-full max-md:pr-5 gap-3"
                // style={{ display: "flex",alignItems:'center',justifyContent:'flex-start', backgroundColor: '#fff',width:'100vw',padding:'1 0px 32px',flexGrow:'1'}}
                >
                    <div className="bg-white shadow " style={{ borderRadius: '4px', overflow: "auto", width: "260px" }}>
                        <Sidebar
                            data={filteredData}
                            onPartClick={handlePartClick}
                            onVariantClick={handleVariantClick}
                            onBlockClick={handleBlockClick}
                            onSystemClick={handleSystemClick}
                            handleSearch={handleSearch} showVariantsAndParts={false} />

                    </div>
                    <div className="rounded shadow bg-white flex grow flex-col w-full p-4 overflow-auto gap-4" style={{ height: '90%' }}>

                        {deviatedData?.map((data, index) => (
                            <FillerPreviewDeviationComponent
                                key={index} // It's good practice to include a unique key when using map
                                system={data?.milestoneName}
                                block={selectedBlock?.blockName}
                                detailedData={data}
                            />
                        ))}
                        {/* // <FillerPreviewDeviationComponent system='Fender System' block={'CJ040'} />
                        // <FillerPreviewDeviationComponent system='Fender System' block='CJ040' />
                        // <FillerPreviewDeviationComponent system='Fender System' block='CJ040' /> */}

                    </div>


                </div>
                {/* <CssBaseline /> */}
            </div>
            {/* <div className="flex justify-end w-full"> */}
            <div className="flex items-center justify-end gap-2 mt-2 mb-2.5">
                <Button
                    className='dcms-btn-main dcms-cancel-btn'
                    onClick={() => navigate('/filler/modellist')}
                >
                    Cancel
                </Button>
                {/* <Button variant="outlined" color="primary" size="small" style={{ backgroundColor: "#fff", color: "var(--base-text-color)", borderColor: "var(--base-text-color)" }}>Save as Draft</Button> */}
                <Button onClick={() => handlePrev(4)} className='dcms-btn-main dcms-save-as-draft-btn'>Previous</Button>
                <Button onClick={handleSubmit} className="dcms-btn-main dcms-active-btn" >Next</Button>
            </div>
        </div>
        // </div>

    );
};

export default FillerPreview;