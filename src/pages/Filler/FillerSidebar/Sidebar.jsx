import React, { useState, useEffect } from "react";
import { Drawer, Divider, List, ListItem, ListItemText, Collapse, Badge, Box } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import './FillerSidebar.css'
import DoneIcon from '@mui/icons-material/Done';
import { useFetchBaseModelByModelIdQuery } from "../../../store";
import { fetchPartByDynamicModel, fetchBlocksByDynamicModel, fetchVariantByDynamicModel, fetchSystemByDynamicModel } from "./apis";
import { useParams } from "react-router-dom";

const Sidebar = ({ data, onPartClick, onVariantClick, onBlockClick, onSystemClick, handleSearch, showVariantsAndParts = true, draftStatus }) => {
    // console.log("sidebardata",data);
    const params = useParams();
    const { data: baseModelInformation } = useFetchBaseModelByModelIdQuery(params?.id)
    const [open, setOpen] = useState(true);

    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedSystemList, setSelectedSystemList] = useState(null);

    const [selectedBlockList, setSelectedBlockList] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);

    const [selectedVariantList, setSelectedVariantList] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [selectedTab, setSelectedTab] = useState(null);
    const [selectedTabList, setSelectedTabList] = useState(null);

    const [initialSelectionDone, setInitialSelectionDone] = useState(false);

    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedPartList, setSelectedPartList] = useState(null);

    const [apiData, setApidata] = useState({ data: [] });


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await fetchBlocksByDynamicModel(params?.id);
            setSelectedSystemList(response?.data);

            console.log("apidata", response?.data);
            const myObjectArray = response?.data?.map((systemName) => {
                return { systemName }; // Only include the "systemName" property
            });

            console.log("apidata", myObjectArray);
            setSelectedSystemList(myObjectArray);
            if(myObjectArray){ handleSystemClick(myObjectArray[0]?.systemName)}
            //done
        }
        fetchData();
    }, [])
    // useEffect(() => {
    //     if (!initialSelectionDone && data && data.length > 0) {
    //         // const firstSystem = data[0];
    //         // const firstBlock = firstSystem.blocks[0];
    //         // const firstVariant = firstBlock.variants[0];
    //         // const firstPart = firstVariant.levels[0].parentPart.childParts[0];

    //         setSelectedSystem(firstSystem.systemName);
    //         // setSelectedBlock(firstBlock);
    //         // setSelectedVariant(firstVariant);
    //         // setSelectedTab(firstVariant.variant);
    //         // onSystemClick(firstSystem);
    //         // onBlockClick(firstBlock);
    //         // onVariantClick(firstVariant);
    //         // onPartClick(firstPart);
    //         // setInitialSelectionDone(true);
    //         // const data = await fetchBlocksByDynamicModel(params.id);

    //     }
    // }, [data, initialSelectionDone, onSystemClick, onBlockClick, onVariantClick, onPartClick]);
    const handleSystemClick = async (systemName) => {
        //hit api
        setSelectedPartList(null)
        const response = await fetchSystemByDynamicModel({ systemName: systemName, modelId: params?.id })
        console.log("systemName", systemName);
        setSelectedBlockList(response?.data);
        console.log("response", selectedBlockList);
        setSelectedSystem(systemName);
        onSystemClick(systemName);
        handleBlockClick(response?.data[0]); // done
    }

    const handleBlockClick = async (block) => {
        setSelectedPartList(null)
        setSelectedBlock(selectedBlock === block ? null : block);
        // const firstVariant = block?.variants[0];
        // setSelectedVariant(firstVariant);
        // setSelectedTab(firstVariant ? firstVariant.variant : null);
        const response = await fetchVariantByDynamicModel({ baseModel: baseModelInformation, systemName: selectedSystem, modelId: params?.id, blockName: block?.blockName });
        setSelectedVariantList(response?.data)
        console.log("apidata", apiData);
        onBlockClick(block);
        // handleVariantClick(response?.data[0])  //done
        // const firstPart = firstVariant?.levels[0]?.parentPart?.childParts[0];
        // onPartClick(firstPart);
    };

    // const handleVariantClick = (variant) => {
    //     setSelectedVariant(selectedVariant === variant ? null : variant);
    //     setSelectedTab(variant ? variant.variant : null);
    //     onVariantClick(variant);
    // };
    const handleVariantClick = async (variant) => {
        // console.log("selectedTab", selectedTab);
        // console.log("variant.variantName", variant.variantName);

        setSelectedVariant(selectedVariant === variant ? null : variant);
        setSelectedTab(variant ? variant : null);
        console.log("selectedTab", selectedTab);
        onVariantClick(variant);
        const response = await fetchPartByDynamicModel({ baseModel: baseModelInformation, systemName: selectedSystem, modelId: params?.id, blockName: selectedBlock?.blockName, variantName: variant })
        setSelectedPartList(response?.data);
        handlePartClick(response?.data[0])// done
        // const firstPart = variant?.levels[0]?.parentPart?.childParts[0];
        // onPartClick();
    };

    const handlePartClick = (part) => {
        setSelectedPart(part);
        onPartClick(part);

    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const groupColors = {
        1: { bg: "#ffd2a8", text: "#171c8f" },
        2: { bg: "#797eed", text: "#ffffff" },
        0: { bg: "#e6e9f0", text: "#979ade" },
        3: { bg: 'var(--variant-gradient-color)', text: '#000' }
    };
    // case 0:
    //     return { backgroundColor: "#e6e9f0", color: "#979ade" };
    //   case 1:
    //     return { backgroundColor: "#ffd2a8", color: "#171c8f" };
    //   case 2:
    //     return { backgroundColor: "#797eed", color: "#ffffff" };
    //   case 3:
    //     return { backgroundColor: 'var(--variant-gradient-color)', color: '#000' }

    //   default:
    //     return { backgroundColor: "#e6e9f0", color: "#979ade" };

    return (

        // <Drawer variant="permanent" sx={{  flexShrink: 0,position:"absolute",top:"100%", [`& .MuiDrawer-paper`]: {width:"260px",  boxSizing: 'border-box',top:"auto",overflowY: 'auto',height: '55vh',left:"32px",borderRadius:"4px",boxShadow:"0px 1.6px 3.6px 0px rgba(0, 0, 0, 0.13), 0px 0.3px 0.9px 0px rgba(0, 0, 0, 0.10)" } }} open={open}>

        <List style={{ paddingTop: 0, borderRadius: '4px' }}>
            <ListItem className="sidebar-list-item-header" style={{ backgroundColor: "#171c8f", color: "#fff", borderRadius: '4px 4px 0px 0px  ' }}>
                <ListItemText primary={<span className="custom-system-name">BLOCKS</span>} />
            </ListItem>
            {selectedSystemList?.map((system, index) => (
                <div key={index}>
                    <ListItem className="sidebar-list-item" style={{ backgroundColor: "#515151", color: "#fff", borderBottom: '1px solid #fff' }} onClick={() => handleSystemClick(system?.systemName)}>
                        <ListItemText primary={<span className="custom-system-name">{system?.systemName}</span>} />
                        {selectedSystem === system?.systemName ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={selectedSystem === system?.systemName}>
                        {/* <Divider sx={{ backgroundColor: '#171c8f' }} /> */}
                        <List style={{
                            padding: '0px'
                        }}>

                            {selectedBlockList?.map((block, index) => (
                                <div key={block?.blockName}>
                                    {/* {block.blocks.map((blockItem) => (
                      <div key={blockItem.blockCode}> */}
                                    <Divider sx={{ backgroundColor: 'grey' }} />
                                    <ListItem className="sidebar-list-item" style={{ color: "#171c8f" }} onClick={() => handleBlockClick(block)}>

                                        {showVariantsAndParts && ( // Check if variants and parts are shown
                                            <ListItemText primary={<span className="sidebar-list-item-child">{block.blockName}</span>} />
                                        )}
                                        {!showVariantsAndParts && ( // If not showing variants and parts, display tick icon
                                            <>
                                                {block?.isFilled && ( // If not showing variants and parts, display tick icon
                                                    <>
                                                        <DoneIcon style={{ marginLeft: "5px", color: (block?.isFilled) ? "#219c27" : "#171c8f", marginRight: "5px" }} />


                                                    </>
                                                )}

                                                {/* <DoneIcon style={{ marginLeft: "5px",  color: (block?.isFilled ) ? "#219c27" : "#171c8f", marginRight: "5px" }} /> */}
                                                <ListItemText primary={<span className="sidebar-list-item-child">{block.blockName}</span>} />

                                            </>
                                        )}

                                    </ListItem>


                                    {<Collapse in={selectedBlock === block} timeout="auto" unmountOnExit>
                                        <List style={{ display: "flex", flexDirection: "column", paddingTop: "0px", paddingBottom: "0px" }}>
                                            <Tabs
                                                value={selectedTab}
                                                onChange={(event, newValue) => setSelectedTab(newValue)}
                                                variant="scrollable"
                                                scrollButtons
                                                aria-label="visible arrows tabs example"
                                                TabIndicatorProps={{ hidden: true }}

                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    minHeight: 0,
                                                    // flexWrap: "wrap",     
                                                    "& .MuiTabs-root": {
                                                        justifyContent: "space-between",
                                                    }

                                                }}
                                            >
                                                {selectedVariantList?.map((variant, index) => (
                                                    <Tab
                                                        disabled={!showVariantsAndParts}
                                                        key={index}
                                                        label={variant.variantName}
                                                        value={variant.variantName}
                                                        onClick={() => handleVariantClick(variant)}
                                                        style={{
                                                            minWidth: 0,
                                                            background: groupColors[variant.commInd]?.bg,
                                                            color: groupColors[variant.commInd]?.text,
                                                            border: selectedTab === variant ? `2px solid #171c8f` : "none",
                                                            borderBottom: selectedTab === variant ? "none" : "0px solid #e0e0e0",
                                                            borderRadius: "12px 12px 0 0",
                                                            marginRight: "5px",
                                                            minHeight: 0,
                                                            padding: "8px 8px"
                                                        }}
                                                    />
                                                ))}
                                            </Tabs>
                                            <Divider sx={{ backgroundColor: '#171c8f' }} />
                                        </List>
                                        <Collapse in={showVariantsAndParts && selectedVariant !== null} timeout="auto" unmountOnExit>
                                            <List style={{ paddingTop: '0px' }}>
                                                {showVariantsAndParts && selectedVariant &&
                                                    selectedPartList?.map((part, index) => {
                                                        console.log("part", part);
                                                        console.log("part", part?.partNumber);
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ListItem
                                                                    disabled={!showVariantsAndParts}
                                                                    className={`sidebar-list-item-part ${selectedPart === part?.partNumber ? "selected" : ""}`}
                                                                    style={{ fontSize: "14px", textAlign: "right", justifyContent: "flex-end", cursor: "pointer" }} onClick={() => { handlePartClick(part?.partNumber); setIsDraftSaved(false); }}>
                                                                    {(part?.isFilled || selectedPart == part?.partNumber || draftStatus[part?.partNumber]) && (
                                                                        <>
                                                                            <DoneIcon
                                                                                style={{
                                                                                    marginRight: "5px",
                                                                                    color: (part?.isFilled || draftStatus[part?.partNumber]) ? "#219c27" : "#171c8f",
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}

                                                                    {part?.partNumber}
                                                                </ListItem>
                                                                {index < selectedPartList.length - 1 && <Divider />}

                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </List>
                                            <Divider sx={{ backgroundColor: '#171c8f' }} />
                                        </Collapse>
                                    </Collapse>}
                                </div>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ))}
        </List>

        // </Drawer>

    );
};

export default Sidebar;