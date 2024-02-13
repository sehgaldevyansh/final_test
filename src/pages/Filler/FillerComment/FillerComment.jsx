import { useState } from "react";
import Sidebar from "../FillerSidebar/Sidebar";
import sampleData from "../FillerSidebar/Sample.json";
import {
    Box, Tab, Tabs,
    CircularProgress,
    Button,
    TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../../store/Apiconstants";
import { useNavigate, useParams } from "react-router-dom";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import Header from "../../../components/Header/Header";
import '../FillerSidebar/FillerSidebar.css'
import '../FillerPreview/FillerPreview.css'
import './FillerComment.css'
import Cookies from "js-cookie";
import { useFetchBaseModelByModelIdQuery } from "../../../store";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FillerComment = () => {


    const params = useParams()
    const nav = useNavigate()
    const handleSubmit = () => {

        const res = axios({
            method: "PUT",
            url: `${API_BASE_URL}/dcms/filler/send-for-approval`,
            data: {
                useremail: Cookies.get('email'),
                modelId: params?.id,
                comments: comment
            },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
        })
            .then((res) => {
                console.log(res);
            })
            .then((res) => {
                nav('/filler/modellist')
            })
    };




    const searchOptions = ["System", "Variant", "Part"];
    const [data, setData] = useState(sampleData.data);
 
    const [filteredData, setFilteredData] = useState(data);
    const [value, setValue] = useState(4)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(
        searchOptions[0]
    );
    const [comment, setComment] = useState();
    const { data: baseModelCount } = useFetchBaseModelByModelIdQuery(params?.id)
 
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
 
 
 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 
 
 
    return (
        <div className=" flex flex-col items-stretch h-full" style={{
            backgroundColor: '#f4f5f8',
            height: '100vh',
            backgroundSize: 'cover',
 
        }}>
            {/* Header */}
            <Header className='header-model-list' />
            <div className="modal-list-main-container">
                <NavigationPathComponent paths={[{ name: 'DCMS Models', path: '/filler/modellist' }]} current='DCMS Activity Filling' />
            </div>
            <div className="flex-col relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container gap-6">
                <div className="items-center flex w-full gap-10 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-neutral-700 text-2xl font-semibold tracking-tight  whitespace-nowrap my-auto">
                        Initiate DCMS (Model)
                    </div>
                    <Box>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs sx={{
                                "& .Mui-selected": {
                                    color: '#171c8f !important',
                                    fontWeight: '600 !important' // Change to your desired hex color for the selected tab text
                                },
                                "& .MuiTabs-indicator": {
                                    backgroundColor: '#FF5733', // Change to the same or another color for the indicator
                                },
                            }} value={value} onChange={handleChange} aria-label="basic tabs example" >
                                <Tab disabled label="Step 1: BLOCK MAPPING" {...a11yProps(0)} sx={{ textTransform: 'none', fontSize: '12px', fontWeight: "400" }} />
                                <Tab disabled label="Step 2: COMMON/UN-COMMON MAPPING" {...a11yProps(0)} sx={{ textTransform: 'none', fontSize: '12px', fontWeight: "400" }} />
                                <Tab disabled label="Step 3: GENERAL INFO" {...a11yProps(1)} sx={{ textTransform: 'none', fontSize: '12px', fontWeight: "400" }} />
                                <Tab disabled label="Step 4: FILL DEVIATION" {...a11yProps(2)} sx={{ textTransform: 'none', fontSize: '12px', fontWeight: "400" }} />
                                <Tab label="Step 5: PREVIEW" {...a11yProps(3)} sx={{ textTransform: 'none', fontSize: '12px', fontWeight: "400" }} />
                            </Tabs>
                        </Box>
 
                    </Box>
                </div>
                <div className="rounded shadow bg-white flex w-full flex-col justify-center pl-4 pr-16 py-1 items-start max-md:max-w-full max-md:pr-5">
                    <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap p-2">
                        <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 px-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 ">
                            <div className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-3" style={{ padding: '2px 12px' }}>
                                <div className="flex gap-2">
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>Model </span><span style={{ fontWeight: '400' }}>{baseModelCount?.data?.modelName}</span>
                                </div>
                                <div className="flex gap-2"> <span style={{ fontWeight: '600', fontSize: '14px' }}>Base Model </span><span style={{ fontWeight: '400' }}> {baseModelCount?.data?.baseModel}</span></div>
                                <div className="flex gap-2"> <span style={{ fontWeight: '600', fontSize: '14px' }}>Total Blocks </span><span style={{ fontWeight: '400' }}>{baseModelCount?.data?.totalBlocks}</span></div>
                                {/* @Kaushik */}
                            </div>
                        </div>
 
                    </div>
                </div>
                <div className="rounded  flex w-full justify-start  h-full items-start max-md:max-w-full max-md:pr-5 gap-3"
                // style={{ display: "flex",alignItems:'center',justifyContent:'flex-start', backgroundColor: '#fff',width:'100vw',padding:'1 0px 32px',flexGrow:'1'}}
                >
                    {/* <div className="bg-white shadow h-full" style={{ borderRadius: '4px', maxHeight: '53vh', overflow: "auto", width: "260px" }}>
                        <Sidebar
                            data={filteredData}
                            onPartClick={handlePartClick}
                            onVariantClick={handleVariantClick}
                            onBlockClick={handleBlockClick}
                            onSystemClick={handleSystemClick}
                            handleSearch={handleSearch} />
 
                    </div> */}
                    <div className="rounded shadow bg-white flex grow flex-col w-full p-4 h-full gap-4">
                        <div className="filler-comments-for-checker-heading ">Comments for Checker</div>
                        <div className="flex justify-between border p-4 gap-4 filler-comments-div " style={{ height: '55vh' }}>
                            <div className="">
                                <div className="">Comments</div>
                                <div className="" style={{ fontSize: '12px', color: '#bbb' }}>(Max 500 Characters)</div>
                            </div>
                            <div className="grow w-full">
                                <TextareaAutosize
                                    aria-expanded={true}
                                    aria-label="maximum height"
                                    onChange={(e) => { setComment(e?.target?.value) }}
                                    value={comment}
                                    placeholder=" Max 500 Characters"
                                    name='Comments'
                                    maxLength={500}
                                    style={{
                                        flexGrow: "1",
                                        border: "1px solid var(--foreground-text-color)",
                                        borderRadius: "4px",
                                        height: "40vh",
                                        width: '100%',
                                        minHeight: '20vh',
                                        maxHeight: '50vh',
                                        padding: '0.5rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
 
 
                </div>


            </div>
            <div className="flex justify-between w-full px-8">
                {/* <div className="flex justify-start items-end self-end mt-2 mb-2 py-2">
                        <LegendComponent mainText={'Toggle condition applicable on the Variant'} legendItems={[
                            { color: '#e6e9f0', legendText: 'NA' },
                            { color: '#ffd2a8', legendText: 'Common' },
                            { color: 'linear-gradient(90deg, #FFD2A8 0%, rgba(255, 209, 167, 0.67) 43.87%, rgba(121, 126, 237, 0.79) 66%, #797EED 100%)', legendText: 'Common/Monitoring Req' },
                            { color: '#797eed', legendText: 'Uncommon' },
                        ]} />
                    </div> */}
                <div className="flex items-center  w-full justify-end gap-3 mt-2 mb-2 py-2">
                    <Button
                        className='dcms-btn-main dcms-cancel-btn'
                        onClick={() => nav('/filler/modellist')}
                    >
                        Cancel
                    </Button>
                    <Button className='dcms-btn-main dcms-save-as-draft-btn' onClick={() => { nav(`/filler/${params?.id}`) }}>Previous</Button>
                    <Button onClick={handleSubmit} className={!comment?.length ? 'dcms-btn-main dcms-disabled-btn' : 'dcms-btn-main dcms-active-btn'} disabled={!comment?.length}>Send for Approval</Button>
                </div>
            </div>
        </div>
 
    );
};
export default FillerComment;