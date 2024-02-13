
import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
// import Container from "@mui/material/Container";
import searchIcon from '../../../assets/Flaticons/searchIcon.svg';
import Sidebar from "./Sidebar";
import sampleData from "./Sample.json";
import {
  Box, Tab, Tabs, TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import Header from "../../../components/Header/Header";
import './FillerSidebar.css'
import FillerBreadCrump from "./FillerBreadCrump";
import LegendComponent from "../../../components/LegendComponent/LegendComponent";
import SingleRowTable from "../../../components/SingleRowTable/SingleRowTable";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const FillerSidebar = () => {
  const searchOptions = ["System", "Variant", "Part"];
  const [data, setData] = useState(sampleData.data);

  const [filteredData, setFilteredData] = useState(data);
  const [value, setValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    searchOptions[0]
  );

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

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    // setSelectedBlock(variant.block);
    setSelectedPart(null);
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    setSelectedVariant(null);
    setSelectedPart(null);
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


  const containerStyle = {
    display: "flex",
  };

  const contentStyle = {

    flexGrow: 1,
    padding: 16,
  };

  return (
    <div className=" flex flex-col items-stretch h-full" style={{
      backgroundColor: '#f4f5f8',
      // height: '100vh',
      backgroundSize: 'cover',

    }}>
      {/* Header */}
      <Header className='header-model-list' />
      <div className="modal-list-main-container">
        <NavigationPathComponent path={['']} /></div>
      <div className="flex-col relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container gap-6">
        <div className="items-center flex w-full gap-10 max-md:max-w-full max-md:flex-wrap">
          <div className="text-neutral-700 text-2xl font-semibold tracking-tight  whitespace-nowrap my-auto">
            DCMS Activity Filling
          </div>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                <Tab label="Step 1: BLOCK MAPPING" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                <Tab label="Step 2: GENERAL INFO" {...a11yProps(1)} />
                <Tab label="Step 3: FILL DEVIATION" {...a11yProps(2)} />
                <Tab label="Step 4: PREVIEW" {...a11yProps(3)} />
              </Tabs>
            </Box>

          </Box>
        </div>
        <div className="rounded shadow bg-white flex w-full flex-col justify-center pl-4 pr-16 py-2 items-start max-md:max-w-full max-md:pr-5">
          <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap p-2">
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 px-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 ">
              <div className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-2">
                <div className="">Model YY16</div>
                <div className="">Base Model YY17</div>
                <div className="">Total Blocks 16</div>
              </div>
            </div>
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 pl-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 table-container">
              <i className="aspect-square object-contain object-center w-4 fill-zinc-400 overflow-hidden shrink-0 max-w-full">
                <img src={searchIcon} alt="Pencil Icon" />
              </i>
              <div className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-2" style={{ width: '80%' }}>
                Search:

                <select
                  className="text-zinc-400 text-sm leading-4 tracking-tight outline-none border-none focus:ring-0 focus:border-none"
                  value={selectedSearchOption}
                  onChange={(e) => {
                    setSelectedSearchOption(e.target.value);
                    handleSearch(searchTerm, e.target.value);
                  }}
                >
                  {searchOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="text-zinc-400 text-sm  leading-4 pr-80 tracking-tight outline-none border-none focus:ring-0 focus:border-none"
                  placeholder={`Enter Here`}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value, selectedSearchOption);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  flex w-full justify-start   items-start max-md:max-w-full max-md:pr-5 gap-3"
        // style={{ display: "flex",alignItems:'center',justifyContent:'flex-start', backgroundColor: '#fff',width:'100vw',padding:'1 0px 32px',flexGrow:'1'}}
        >
          <div className="bg-white shadow h-full" style={{ borderRadius: '4px', maxHeight: '79.5vh' }}>
            <Sidebar
              data={filteredData}
              onPartClick={handlePartClick}
              onVariantClick={handleVariantClick}
              onBlockClick={handleBlockClick}
              onSystemClick={handleSystemClick}
              handleSearch={handleSearch} />

          </div>
          <div className="rounded shadow bg-white flex grow flex-col w-full p-4 h-full">
            <div className="flex flex-col border rounded w-full">

              <div className="w-full px-3 py-2" style={{ backgroundColor: '#e6e9f0', color: 'var(--base-text-color)' }}>
                {selectedPart && (
                  <FillerBreadCrump
                    system={selectedSystem}
                    block={selectedBlock}
                    variant={selectedVariant}
                    part={selectedPart}
                  />

                )}
              </div>
              <div className="">
                <SingleRowTable headings={['Base Model', 'Block', 'Level', 'Parents Part No', 'DWG Type', 'Part Name', 'QTY', 'Sum QTY', 'A/AR']} data={['Y0M11', 'CS510-', '01', 'Y0M11CS510-001', 'S', 'LATCH ASSY,FRONT DOOR,R', '001', '001', 'A']} />
              </div>

            </div>

            <div className="flex">
              <Container style={{ marginTop: '20px', display: 'flex', padding: 0, marginLeft: 0, marginRight: 0, maxWidth: "100%", gap: "20px" }}>

                <div style={{ flex: 1 }}>

                  <Typography variant="h6" style={{ fontSize: '14px', color: '#171c8f', fontWeight: '700', marginBottom: "8px" }}>
                    A: General Information
                  </Typography>
                  <div className="items-stretch self-stretch rounded border border-[color:var(--Grey-20,#E6E9F0)] bg-white flex  flex-col justify-center p-4 border-solid gap-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>SDM:</span>
                      <Select labelId="sdm-label" id="sdm" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }} >
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>Spec/Non Spec.:</span>
                      <Select labelId="spec-label" id="spec" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}>
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: "space-between", marginTop: '10px', height: "162px" }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>What is changed, and how it's changed:</span>
                      <TextField
                        id="change-description"
                        label="What is changed, and how it's changed."
                        multiline
                        rows={4}

                        variant="outlined"
                        style={{ minWidth: "50%", borderRadius: "4px" }}
                      />
                    </div>

                  </div>
                </div>



                <div style={{ flex: 1 }}>

                  <Typography variant="h6" style={{ fontSize: '14px', color: '#171c8f', fontWeight: '700', marginBottom: "8px" }}>
                    B: Other Information
                  </Typography>
                  <div className="items-stretch self-stretch rounded border border-[color:var(--Grey-20,#E6E9F0)] bg-white flex  flex-col justify-center p-4 border-solid gap-4">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>Level of the change, modification:</span>
                      <Select labelId="level-label" id="level" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}  >
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>Cause of the change, modification:</span>
                      <Select labelId="cause-label" id="cause" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}>
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>Importance rank:</span>
                      <Select labelId="importance-label" id="importance" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}>
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>New RM usage agreement with concern agencies example :PSE/SC/QA-MA:</span>
                      <Select labelId="agreement-label" id="agreement" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}>
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                      <span className="h6-text" style={{ marginRight: '10px' }}>Maru-A applicability:</span>
                      <Select labelId="maruA-label" id="maruA" style={{ minWidth: "50%", height: "32px", borderRadius: "4px" }}>
                        <MenuItem value="">Select</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>


        </div>

        <div className="flex justify-start items-end self-end w-full mt-2 mb-2 py-2">
          <LegendComponent mainText={'Toggle condition applicable on the Variant'} legendItems={[
            { color: '#e6e9f0', legendText: 'NA' },
            { color: '#ffd2a8', legendText: 'Common' },
            { color: '#797eed', legendText: 'Uncommon' }
          ]} />
        </div>






        {/* <CssBaseline /> */}
      </div>
    </div>

  );
};

export default FillerSidebar;
