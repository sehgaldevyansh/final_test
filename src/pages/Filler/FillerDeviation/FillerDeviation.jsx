/* v8 ignore start */

import { useEffect, useState } from "react";
import Sidebar from "../FillerSidebar/Sidebar";
import sampleData from "../FillerSidebar/Sample.json";
import {
    CircularProgress,
    Button,
    Modal,
    Box,
    TextareaAutosize,
} from "@mui/material";
import '../FillerSidebar/FillerSidebar.css'
import './FillerDeviation.css'
import { useNavigate, useParams } from "react-router-dom";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import FillerDeviationMilestone from "./FillerDeviationMilestone";
import { fetchDeviationListApi, setBlockDeviatedState, setDeviationState } from "./api";
import { useFetchBaseModelByModelIdQuery,useFetchBlockListsQuery } from "../../../store";
import Cookies from "js-cookie";
const FillerDeviation = ({ handleNext, handlePrev }) => {
    const params = useParams();
    const navigate = useNavigate();
    const searchOptions = ["System", "Variant", "Part"];
    const [data, setData] = useState(sampleData.data);

    const [filteredData, setFilteredData] = useState(data);
    const [value, setValue] = useState(4)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(
        searchOptions[0]
    );
    const { data: baseModelCount } = useFetchBaseModelByModelIdQuery(params?.id)
    // console.log(devaitionData);
    const [selectedDeviationBlock, setSelectedDeviationBlock] = useState('CJ040')
    const { data:blockLength} = useFetchBlockListsQuery(params?.id)
    const [deviationList, setDeviationList] = useState(
        // [
        //     {
        //         milestoneName:'KickOff',
        //         {
        //             [{
        //                 name:'Activity 1',
        //                 type:'necessary'
        //             }]
        //         }
        //     }
        // ]
        [
            // {
            //     milestoneName: 'KickOff',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         }, {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         }
            //     ]
            // },
            // {
            //     milestoneName: 'Concept',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //     ]
            // },
            // {
            //     milestoneName: 'Sketch Final',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //     ]
            // },
            // {
            //     milestoneName: 'CAD',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Design Check Sheet 1',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //     ]
            // },
            // {
            //     milestoneName: 'DWG Rel',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'unecessary'
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //     ]
            // },
            // {
            //     milestoneName: 'Sketch Final',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'unecessary'
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'unecessary'
            //         },
            //     ]
            // },
            // {
            //     milestoneName: 'Sketch Final',
            //     activityList: [
            //         {
            //             activityName: 'Activity 1',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 2',
            //             type: 'unnecessary',
            //             deviationReason: 'mera mann'
            //         },
            //         {
            //             activityName: 'Activity 3',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //         {
            //             activityName: 'Activity 4',
            //             type: 'necessary',
            //             deviationReason: ''
            //         },
            //     ]
            // }
        ]
    )

    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const [deviationReasonMilestoneName, setDeviationReasonMilestoneName] = useState('CAD');
    const [deviationActivity, setDeviationActivity] = useState('Activity 1')
    const [deviationReason, setDeviationReason] = useState('')
    const [deviationChange, setDeviationChange] = useState(false);
    const [deviationActivityType, setDeviationActivityType] = useState('')
    const [deviationType, setDeviationType] = useState(0)


    const handlePartClick = (part) => {
        console.log('part', part)
        setSelectedPart(part);
        // setSelectedBlock(part.block);
        // setSelectedVariant(part.variant);
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        // setSelectedBlock(variant.block);
        setSelectedPart(null);
    };

    const handleBlockClick = async (block) => {
        setSelectedBlock(block);
        setSelectedVariant(null);
        setSelectedPart(null);
        console.log("selectedSystem", selectedSystem);
        console.log("selectedBlock", block);
        const deviationData = await fetchDeviationListApi({
            systemName: selectedSystem,
            blockName: block?.blockName,
            modelId: params?.id,
            baseModel: baseModelCount?.data?.baseModel,
            useremail: Cookies.get('email')
        });
        setDeviationList(deviationData?.data)
        const setBlockDeviation = await setBlockDeviatedState({
            "modelId":params?.id,
            "systemName":selectedSystem,
            "blockName":block?.blockName,
            "isFilled":true
        }).then();
        
        
    };

    const handleSystemClick = (system) => {
        setSelectedSystem(system);
        setSelectedBlock(null);
        setSelectedVariant(null);
        setSelectedPart(null);
    };


    const handleDeviationReasonSubmission = (causeOfChange) => {
        console.log("causeofchange", causeOfChange);
        // setDeviationReason(causeOfChange)
        // setDeviationChange(true)
        setDeviationState({
            milestoneName: deviationReasonMilestoneName,
            modelId: params?.id,
            blockName: selectedBlock?.blockName,
            activity: deviationActivity,
            deviationType: deviationType,
            causeOfChange: deviationReason
        })

            .then((res) => {

                setOpen(false);
                handleBlockClick(selectedBlock);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleDeviationActivityClick = (milestoneName, changeActivity, type) => {
        const updateDeviationList = deviationList.map(milestoneItem => {
            if (milestoneItem.milestoneName === milestoneName) {
                const updatedActivities = milestoneItem.activityList.map(activity => {
                    if (activity.activityName === changeActivity.activityName) {
                        if (activity.type === 'necessary') {
                            setDeviationReasonMilestoneName(milestoneName)
                            setDeviationActivity(changeActivity.activityName)
                            // setDeviationActivityType(activity.type)
                            setDeviationType(1)
                            setDeviationReason('')
                            setOpen(true)
                            // if (deviationChange) {
                            //     console.log('deviation change', deviationChange)
                            //     setDeviationChange(false)
                            //     return {
                            //         ...activity, type: 'unnecessary'
                            //     }
                            // }
                            // else {
                            //     return {
                            //         ...activity, type: 'unnecessary'
                            //     }
                            // }
                        }
                        else {
                            return { ...activity, type: 'necessary' }
                        }
                    }
                    return activity
                })
                return { ...milestoneItem, activityList: updatedActivities }
            }
            return milestoneItem
        })
        console.log('Updated deviation list', updateDeviationList)
        setDeviationList(updateDeviationList)
    }


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '55vw',
        // height: '65vh',
        bgcolor: '#f4f5f8',
        border: '1px solid #171c8f',
        boxShadow: 24,
        padding: '16px 26px 16px 26px',
    };

    return (
        <div className=" flex flex-col items-stretch h-full" style={{
            backgroundColor: '#f4f5f8',
            height: '83vh',
            backgroundSize: 'cover',

        }}>
            {/* Header */}
            {/* <Header className='header-model-list' /> */}
            {/* <div className="modal-list-main-container">
                <NavigationPathComponent paths={[{ name: 'DCMS Models', path: '/filler/modellist' }]} current='DCMS Activity Filling' />
            </div> */}
            <div className="flex-col relative flex  w-full items-center max-md:max-w-full max-md:pl-5 h-full  modellist-container gap-6">
                <div className="rounded shadow bg-white flex w-full flex-col justify-center mt-4 pl-4 pr-16 py-2 items-start max-md:max-w-full max-md:pr-5">
                    <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap p-2">
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
                    </div>
                </div>
                <div className="rounded  flex w-full justify-start   items-start max-md:max-w-full max-md:pr-5 gap-3"
                // style={{ display: "flex",alignItems:'center',justifyContent:'flex-start', backgroundColor: '#fff',width:'100vw',padding:'1 0px 32px',flexGrow:'1'}}
                >
                    <div className="bg-white shadow h-full" style={{ borderRadius: '4px', maxHeight: '60vh', overflow: "auto", width: "260px" }}>
                        <Sidebar
                            data={filteredData}
                            onPartClick={handlePartClick}
                            onVariantClick={handleVariantClick}
                            onBlockClick={handleBlockClick}
                            onSystemClick={handleSystemClick}
                            handleSearch={handleSearch}
                            showVariantsAndParts={false}
                        />

                    </div>
                    <div className="rounded shadow bg-white flex grow flex-col w-full p-4 h-full gap-4" style={{ maxHeight: '60vh', overflow: 'auto' }}>
                        <div className="deviation-block-heading">{selectedBlock?.blockName ? (`Deviation for Block ${selectedBlock?.blockName}`) : 'Please select a block '}</div>
                        <div className="deviation-list-container">
                            {deviationList?.map((milestoneItem, index) => {
                                return (
                                    <FillerDeviationMilestone key={index} milestoneName={milestoneItem.milestoneName} activityList={milestoneItem.activityList}
                                        handleDeviationActivityClick={handleDeviationActivityClick} />
                                )
                            })}

                        </div>

                    </div>


                </div>



            </div>
            <div className="flex justify-between w-full">
                <div className="flex justify-start items-end self-end mt-2 mb-2 py-2">
                    <LegendComponent mainText={'Toggle condition applicable on the Variant'} legendItems={[
                        { color: '#e6e9f0', legendText: 'Unnecessary' },
                        { color: '#94d5f1', legendText: 'Necessary' },
                        { color: '#BB973B', legendText: 'Necessary to Unnecessary Changed' },
                    ]} />
                </div>
                <div className="flex items-center justify-between gap-2 mt-2 mb-2">
                    <Button
                        className='dcms-btn-main dcms-cancel-btn'
                        onClick={() => navigate('/filler/modellist')}
                    >
                        Cancel
                    </Button>
                    {/* <Button variant="outlined" color="primary" size="small" style={{ backgroundColor: "#fff", color: "var(--base-text-color)", borderColor: "var(--base-text-color)" }}>Save as Draft</Button> */}
                    <Button onClick={() => handlePrev(3)} className='dcms-btn-main dcms-save-as-draft-btn'>Previous</Button>
                    <Button onClick={() => handleNext(3)} className="dcms-btn-main dcms-active-btn">Next</Button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose()
                    }
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    <div className="flex flex-col gap-2">
                        <div className="flex" style={{ color: 'var(--base-text-color)', fontWeight: '700' }}>Reason for Deviation</div>
                        <div className="flex flex-col border w-full gap-2 p-4">

                            <div className="flex w-full justify-start">
                                <div className="" style={{ minWidth: '150px' }}>Milestone</div>
                                <div className="" style={{}}>{deviationReasonMilestoneName}</div>
                            </div>
                            <div className="flex w-full">
                                <div className="" style={{ minWidth: '150px' }}>Activity</div>
                                <div className="" style={{}}>{deviationActivity}</div>
                            </div>
                            <div className="flex w-full">
                                <div className="" style={{ minWidth: '150px' }}>
                                    <div className="">Your Response</div>
                                    <div className=""><p style={{ fontSize: '12px', color: '#bbb' }}>(Max 500 characters)</p></div>
                                </div>
                                <div className="grow">
                                    <TextareaAutosize minRows={7} maxlength={500} style={{ width: '100%', borderRadius: '4px', border: 'var(--general-border', resize: 'none', padding: '0px 12px' }} onChange={(e) => { setDeviationReason(e.target.value) }} />
                                </div>
                            </div>
                            {/* <div className=""></div> */}
                            <div className="flex justify-end">
                                <Button
                                    className="text-blue-900 text-center text-sm leading-4 tracking-tight my-auto"
                                    variant="body1"
                                    size="small"
                                    onClick={handleClose}
                                    style={{ textTransform: 'none' }}
                                >
                                    Cancel
                                </Button>
                                {/* <Button variant="outlined" color="primary" style={{ backgroundColor: "#fff", color: "var(--base-text-color)", borderColor: "var(--base-text-color)" }}>Previous</Button> */}
                                <Button variant="outlined" size="small" style={{ backgroundColor: "var(--base-text-color)", color: "#fff", borderColor: "var(--base-text-color)", textTransform: 'none' }} disabled={deviationReason === '' ? true : false} onClick={handleDeviationReasonSubmission}>OK</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>

    );
};
export default FillerDeviation;


/* v8 ignore stop */
