import { useFetchModelListsQuery, useAddModelListsMutation } from "../../../store";
import { useMemo, useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Header from "../../../components/Header/Header";
import { Link } from 'react-router-dom';
import './FillerModellist.css'
import ActivationModal from "../../../components/Modals/toggleModal";
import searchIcon from '../../../assets/Flaticons/searchIcon.svg';
import { useNavigate } from "react-router-dom";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import { useFetchBaseModelListsQuery } from "../../../store";


const tabs = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Models", path: "models" },
];
const searchOptions = ["Name", 'Edited By', "Level"];


import React from 'react'
import { ThreeDRotation } from "@mui/icons-material";

const FillerModellist = () => {
    const [addModelList, results] = useAddModelListsMutation();
    const { data, error, isLoading } = useFetchBaseModelListsQuery();

    const [modelData, setModelData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(
        searchOptions[0]
    );
    const [toggleStates, setToggleStates] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('/src/pages/Creator/ModelList/ModelList.json');
                // const jsonData = await response.json();
                console.log('Fetched JSON data:', data?.data);

                const toggleStates = data?.data?.map((model) => model.Active == true);
                console.log("toggleStates", toggleStates);
                setToggleStates(toggleStates);
                setModelData(data?.data);
                setFilteredData(data?.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [isLoading]);
    const handleSearch = (term, option) => {

        console.log("Search Term:", term);
        console.log("Selected Option:", option);
        term = term?.toString()
        const searchTermLowerCase = term?.toLowerCase();

        const filteredData = modelData.filter((model) => {
            console.log('model object', model, option)
            if (option === 'Name') {
                option = 'name'
            }
            else if (option === 'Level') {
                option = 'type'
            }
            else if (option === 'Edited By') {
                option = 'editedBy'
            }

            console.log('model[option?.toLowerCase()]?.toString()', model[option]?.toString())
            const propertyValue = option === 'editedBy' ? model[option]?.toString() : model[option?.toLowerCase()]?.toString();
            // const propertyValue = model[option?.toLowerCase()]?.toString();

            console.log("Property Value:", propertyValue);
            return propertyValue && propertyValue.toLowerCase().includes(searchTermLowerCase);
        });

        console.log("Filtered Data:", filteredData);

        setFilteredData(filteredData);
        setToggleStates(modelData.map((model) => model.Active === "true"));
    };




    const handleDownloadPDF = (status) => {
        if (status === "published") {
            const dummyPDFContent = '<pdf>...</pdf>';
            const blob = new Blob([dummyPDFContent], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'dummy-file.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("PDF download is disabled for drafts and in-progress models.");
        }
    };
    const [pendingActivation, setPendingActivation] = useState(null);




    const handleConfirmActivation = (confirmed) => {
        setIsModalOpen(false);

        if (confirmed && pendingActivation) {
            const { row, currentState } = pendingActivation;
            const activateValue = currentState ? true : false;
            const updatedData = filteredData.map((item) =>
                item.Name === row.Name ? { ...item, Active: activateValue } : item

            );
            addModelList({
                "modelNumber": row?.Name,
                "action": activateValue
            })
            setFilteredData(updatedData);
        }

        setPendingActivation(null);

    };





    const handleEdit = (index) => {
        alert(`Editing model ${modelData[index]?.Name}`);
    };

    // 1 - 
    // 2 - send to Filler
    // 3- send to checker one
    // 4- send to checker two
    // 5 - send to checker three 


    const statusMap = [
        {
            statusId: 1,
            statusText: ''
        },
        {
            statusId: 2,
            statusText: 'Sent to Filler'
        },
        {
            statusId: 3,
            statusText: 'Sent to checker one'
        },
    ]

    const columns = useMemo(
        () => [
            {
                name: "Model Name", selector: (row) => row.name, sortable: true, cell: (row) => (
                    <Link to={{ pathname: `/filler/${row?.name}` }} className="model-name-link">
                        <span style={{ color: "#171C8F" }}>{row?.name}</span>
                    </Link>
                ),
            },
            { name: "Edited By", selector: (row) => row["editedBy"], sortable: true },
            { name: "Edited On", selector: (row) => row["editedOn"], grow: 0.5 },
            { name: "# of Blocks", selector: (row) => row["totalBlocks"], sortable: true, grow: 0.5 },
            { name: "Level", selector: (row) => row?.type, sortable: true, grow: 0 },
            { name: "PMG Name", selector: (row) => row["sentToFillBy"], compact: 'false', },
            { name: "Sent On", selector: (row) => row["sentOn"], sortable: true, grow: 0 },
            {
                name: "Schedule",
                selector: (row) => row.chart,
                cell: (row) => (
                    <>
                        {
                        // row.Status != "" ? 
                        // (
                        //     <div
                        //         className="cursor-pointer w-4 h-4 flex items-center justify-center"
                        //         onClick={() => handleDownloadPDF(row.Status)}
                        //     >
                        //         <img
                        //             loading="lazy"
                        //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e447261ae51e05387a06b45793394e7a5bdc63ba2ec236b890de4cc2a01900e?"
                        //             className="aspect-[0.71] object-contain object-center w-full overflow-hidden"
                        //         />
                        //     </div>
                        // ) : 
                        (
                            <div className="w-4 h-4 flex items-center justify-center opacity-50">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b534af3e29e5484cd6d54970e52ad6eff064973298035dbfcc98cb08c91d3cad?"
                                    className="aspect-[0.71] object-contain object-center w-full overflow-hidden"
                                />
                            </div>
                        )
                        }
                    </>
                ),
                grow: 1,
                center: 'true',
            },

            // { name: "Description", selector: (row) => row?.description },
            {
                name: "Status", selector: (row) => row?.rowStateFlag,
                cell: (row) => (
                    <>
                        {statusMap.find(item => item.statusId === row?.rowStateFlag)?.statusText}
                    </>
                ),
                sortable: true,
                grow: 0.5
                // cell: (row) => {
                //     let statusStyle = "";
                //     let statusText = "";
                //     switch (row.Status) {
                //         case "Draft":
                //             statusStyle = " font-semibold w-17 h-5 bg-gray-200 text-neutral-500";
                //             statusText = "In Draft";
                //             break;
                //         case "inProgress":
                //             statusStyle = " font-semibold w-21 h-5 bg-lime-100 text-green-700";
                //             statusText = "In Progress";
                //             break;
                //         case "published":
                //             statusStyle = " font-semibold w-19 h-5 bg-rose-200 text-orange-700";
                //             statusText = "Published";
                //             break;
                //         default:
                //             break;
                //     }
                //     return (
                //         <div
                //             className={`text-xs leading-3 tracking-tight whitespace-nowrap items-stretch justify-center px-3 py-1 rounded-xl ${statusStyle}`}
                //         >
                //             {statusText}
                //         </div>
                //     );
                // },

            },

        ],
        [filteredData]
    );
    return (
        <div className=" flex flex-col items-stretch h-full" style={{
            backgroundColor: '#f4f5f8'
        }}>
            {/* Header */}
            <Header className='header-model-list' />
            <div className="modal-list-main-container">
                <NavigationPathComponent paths={[{ name: 'DCMS Models', path: '/filler/modellist' }]} current='DCMS Activity Filling' />
            </div>
            <div className="flex-col   relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container">

                <div className="justify-between items-center flex w-full gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-neutral-700 text-2xl font-semibold tracking-tight grow whitespace-nowrap my-auto">
                        DCMS Cover
                    </div>
                    {/* <div className="items-stretch self-stretch flex justify-between gap-2 py-px">
                        <div
                            className="text-white text-center text-sm leading-4 tracking-tight justify-center items-stretch rounded bg-blue-900 grow px-6 py-2 max-md:px-5 cursor-pointer"
                            onClick={handleCreateClick}
                        >
                            Create
                        </div>

                    </div> */}
                </div>
                <div className="rounded shadow bg-white flex w-full flex-col justify-center mt-4 pl-4 pr-16 py-4 items-start max-md:max-w-full max-md:pr-5">
                    <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap">
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
                                    {searchOptions.map((option, index) => (
                                        <option key={index} value={option}>
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

                <div className="items-stretch rounded shadow bg-white flex w-full flex-col h-full mt-6 px-4 py-5 max-md:max-w-full">
                    <div className="items-stretch rounded border border-[color:var(--grey-20,#E6E9F0)] bg-white flex flex-col pt-0.5 pb-2 px-3 border-solid max-md:max-w-full">
                        <div className=" items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:justify-center"  >
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                keyField="Schedule"
                                customStyles={{
                                    overflowY: 'scroll',
                                    headRow: {
                                        style: {
                                            color: "#171C8F",
                                            fontWeight: 600,
                                            fontSize: '14px',
                                        },
                                    },
                                }}
                                responsive
                            // subHeaderWrap={true}
                            // dense={true}
                            />
                        </div>
                    </div>

                    <ActivationModal
                        isOpen={isModalOpen}
                        message={modalMessage}
                        handleConfirmActivation={handleConfirmActivation}
                        handleClose={() => setIsModalOpen(false)}
                        pendingActivation={pendingActivation}
                    />
                </div>
            </div>
        </div>
    );
}

export default FillerModellist
