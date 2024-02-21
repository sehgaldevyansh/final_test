import {
  useFetchModelListsQuery,
  useAddModelListsMutation,
} from "../../../store";
import { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import "./ModelList.css";
import ActivationModal from "../../../components/Modals/toggleModal";
import pencilIcon from "../../../assets/Flaticons/fi-sr-pencil.svg";
import searchIcon from "../../../assets/Flaticons/searchIcon.svg";
import { useNavigate } from "react-router-dom";
import NavigationPathComponent from "../../../components/NavigationPathComponent/NavigationPathComponent";
import { Button } from "@mui/material";

const searchOptions = ["Name", "Level", "Status"];
function App() {
  const [addModelList, results] = useAddModelListsMutation();
  const { data, error, isLoading } = useFetchModelListsQuery();
  // const res=useFetchModelListsQuery("");
  // console.log(res);
  // console.log("Actual Data", data);

  // const [removeModel,results]=useDeleteModelListMutation();
  // removeModel("model_name"); // Delete function

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
        // console.log('Fetched JSON data:', jsonData);

        const toggleStates = data?.results?.map(
          (model) => model.Active == true
        );
        console.log("toggleStates", toggleStates);
        setToggleStates(toggleStates);
        setModelData(data?.results);
        setFilteredData(data?.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isLoading]);
  const handleCreateClick = () => {
    console.log("Create button clicked!");
    navigate("/creator/createmodel");
  };
  // const handleAskQueryClick = () => {
  //   alert("Ask Query button clicked!");
  // };
  const handleSearch = (term, option) => {
    console.log("Search Term:", term);
    console.log("Selected Option:", option);
    term = term.toString();
    const searchTermLowerCase = term.toLowerCase();

    const filteredData = modelData.filter((model) => {
      option = option === "Level" ? "Type" : option;
      const propertyValue = model[option].toString();
      console.log("Property Value:", propertyValue);

      const searchPropertyValue =
        propertyValue === "Completed" ? "published" : propertyValue;
      console.log("Property Value2:", searchPropertyValue);
      return (
        searchPropertyValue &&
        searchPropertyValue.toLowerCase().includes(searchTermLowerCase)
      );
    });

    console.log("Filtered Data:", filteredData);

    setFilteredData(filteredData);
    setToggleStates(modelData.map((model) => model.Active === "true"));
  };

  const handleDownloadPDF = (status) => {
    if (status === "Completed") {
      const dummyPDFContent = "<pdf>...</pdf>";
      const blob = new Blob([dummyPDFContent], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "dummy-file.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("PDF download is disabled for drafts and in-progress models.");
    }
  };
  const [pendingActivation, setPendingActivation] = useState(null);

  const handleSwitchChange = (row, currentState) => {
    console.log("row", row);
    let modalMessage = "";
    // let res_active = "";
    if (currentState) {
      modalMessage = `"ACTIVE"`;
      // res_active = (modalMessage == `"ACTIVE"`) ? 'true' : 'false'
    } else {
      modalMessage = `"INACTIVE"`;
      // res_active = (modalMessage == `"ACTIVE"`) ? 'true' : 'false'
    }
    switch (row.Status) {
      case "Draft":
        modalMessage += " the DCMS you are creating.";
        break;
      case "InProgress":
        modalMessage += " the DCMS which is InProgress";
        break;
      case "Completed":
        modalMessage += " the DCMS which is published";
        break;
      case "Published":
        modalMessage += " the DCMS which is published";
        break;
      default:
        break;
    }

    setPendingActivation({ row, currentState });
    setModalMessage(modalMessage);
    setIsModalOpen(true);
  };

  const handleConfirmActivation = (confirmed) => {
    setIsModalOpen(false);

    if (confirmed && pendingActivation) {
      const { row, currentState } = pendingActivation;
      const activateValue = currentState ? true : false;
      const updatedData = filteredData.map((item) =>
        item.Name === row.Name ? { ...item, Active: activateValue } : item
      );
      addModelList({
        modelNumber: row?.Name,
        action: activateValue,
      });
      setFilteredData(updatedData);
    }

    setPendingActivation(null);
  };

  // const handleEdit = (index) => {
  //   alert(`Editing model ${modelData[index]?.Name}`);
  // };
  const columns = useMemo(
    () => [
      {
        name: (
          <div
            style={{
              whiteSpace: "normal",
              width: "min-content",
              marginRight: "2px",
              fontSize: "14px",
            }}
          >
            {"Name"}
          </div>
        ),
        selector: (row) => row?.Name,
        sortable: true,
        cell: (row) => {
          let statusPath = "view";
          switch (row.Status) {
            case "Draft":
              statusPath = "view";
              break;
            case "InProgress":
              statusPath = "viewprogress";
              break;
            case "Completed":
              statusPath = "viewfull";
              break;
            case "Published":
              statusPath = "viewfull";
              break;
            default:
              break;
          }
          //  return(<Link to={row?.Status == 'Draft' ? `/model/view/${row?.Name}` : `/model/viewfull/${row?.Name}`} className="model-name-link">
          //     <span style={{ color: "#171C8F" }}>{row?.Name}</span>
          //   </Link>)
          return (
            <Link
              to={`/model/${statusPath}/${row?.Name}`}
              className="model-name-link"
            >
              <span style={{ color: "#171C8F" }}>{row?.Name}</span>
            </Link>
          );
        },
        grow: 0,
      },
      {
        name: "Edited By",
        selector: (row) => row["Edited By"],
        sortable: true,
        wrap: true,
      },
      { name: "Edited On", selector: (row) => row["Edited On"] },
      { name: "Level", selector: (row) => row.Type, sortable: true, grow: 0 },
      {
        name: "Schedule",
        selector: (row) => row.chart,
        cell: (row) => (
          <>
            {
              // (row.Status === "Completed" || row.Status === "Published") ? (
              //   <div
              //     className="cursor-pointer w-4 h-4 flex items-center justify-center"
              //     onClick={() => handleDownloadPDF(row.Status)}
              //   >
              //     <img
              //       loading="lazy"
              //       src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e447261ae51e05387a06b45793394e7a5bdc63ba2ec236b890de4cc2a01900e?"
              //       className="aspect-[0.71] object-contain object-center w-full overflow-hidden"
              //     />
              //   </div>
              // ) :
              <div className="w-4 h-4 flex items-center justify-center opacity-50">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b534af3e29e5484cd6d54970e52ad6eff064973298035dbfcc98cb08c91d3cad?"
                  className="aspect-[0.71] object-contain object-center w-full overflow-hidden"
                />
              </div>
            }
          </>
        ),
        center: true,
        grow: 0,
      },
      {
        name: "Status",
        selector: (row) => row.Status,
        sortable: true,
        cell: (row) => {
          let statusStyle = "";
          let statusText = "";
          switch (row.Status) {
            case "Draft":
              statusStyle =
                " font-semibold w-17 h-5 bg-gray-200 text-neutral-500";
              statusText = "In Draft";
              break;
            case "InProgress":
              statusStyle =
                " font-semibold w-21 h-5 bg-lime-100 text-green-700";
              statusText = "In Progress";
              break;
            case "Completed":
              statusStyle =
                " font-semibold w-19 h-5 bg-rose-200 text-orange-700";
              statusText = "Published";
              break;
            case "Published":
              statusStyle =
                " font-semibold w-19 h-5 bg-rose-200 text-orange-700";
              statusText = "Published";
              break;
            default:
              break;
          }
          return (
            <div
              className={`text-xs leading-3 tracking-tight whitespace-nowrap items-stretch justify-center px-3 py-1 rounded-xl ${statusStyle}`}
              style={{ fontWeight: "400" }}
            >
              {statusText}
            </div>
          );
        },
        center: true,
      },
      // {
      //   name: "Description", selector: (row) => row.Description

      // },

      {
        name: "Activate",
        selector: (row) => row.Active,
        cell: (row) => (
          <Switch
            key={row.Active}
            // onChange={(checked) =>{ handleToggleActivate(row, checked)}  }
            onChange={(e) => {
              handleSwitchChange(row, e);
            }}
            checked={row.Active === true}
            // checked={toggleStates[row.index]}
            onColor="#fff"
            offColor="#FFD3D3"
            onHandleColor="#171c8f"
            offHandleColor="#f00"
            handleDiameter={12}
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 10,
                  color: "#f00",
                  marginRight: -3,
                  marginTop: -2,
                }}
              >
                off
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 10,
                  color: "#171c8f",
                  marginLeft: -3,
                  marginTop: -2,
                }}
              >
                on
              </div>
            }
            width={37}
            height={20}
            className="react-switch"
            id="material-switch"
          />
        ),
        center: true,
        grow: 0,
      },
      {
        name: "Action",
        selector: (row) => row.action,
        cell: (row) => (
          <div className="flex items-center gap-2">
            <div
              className={`cursor-pointer flex flex-col items-start`}
              // onClick={() => handleEdit(row.index)}
            >
              {/* <Router>  */}
              {row.Status !== "Completed" && row.Status !== "Published" ? (
                <Link
                  to={
                    row?.Status === "InProgress"
                      ? { pathname: `/upload/${row?.Name}` }
                      : { pathname: `/model/edit/${row?.Name}` }
                  }
                  className="model-name-link"
                >
                  <i className="fi fi-rr-user">
                    <img src={pencilIcon} alt="Pencil Icon" />
                  </i>
                </Link>
              ) : null}
              {/* </Router> */}
            </div>
          </div>
        ),
        center: true,
        grow: 0,
      },
    ],
    [filteredData]
  );
  return (
    <div
      className=" flex flex-col items-stretch h-full creator-modellist-main-container"
      style={{
        backgroundColor: "#f4f5f8",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      {/* Header */}
      <Header className="header-model-list" isHome={true} />
      <div className="modal-list-main-container">
        <NavigationPathComponent
          paths={[{ name: "MSIL R&D", path: "/creator/modellist" }]}
          current="Models"
        />
      </div>
      <div className="flex-col   relative flex  w-full items-center pl-8 pr-8  max-md:max-w-full max-md:pl-5  modellist-container">
        <div className="justify-between items-center flex w-full gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <div className="text-neutral-700 text-2xl font-semibold tracking-tight grow whitespace-nowrap my-auto">
            Model Catalogue
          </div>
          <div className="flex  ">
            <Button
              className="dcms-btn-main dcms-active-btn"
              onClick={handleCreateClick}
            >
              Create
            </Button>
          </div>
        </div>
        <div className="rounded shadow bg-white flex w-full flex-col justify-center mt-4 pl-4 pr-16 py-4 items-start max-md:max-w-full max-md:pr-5">
          <div className="items-stretch flex gap-6 max-md:max-w-full max-md:flex-wrap">
            <div className="items-center rounded border border-[color:var(--grey-30,#CFD2D9)] bg-white flex gap-2 pl-3  py-3 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5 table-container">
              <i className="aspect-square object-contain object-center w-4 fill-zinc-400 overflow-hidden shrink-0 max-w-full">
                <img src={searchIcon} alt="Pencil Icon" />
              </i>
              <div
                className="text-neutral-500 text-sm font-semibold leading-4 tracking-tight flex items-center gap-2"
                style={{ width: "80%" }}
              >
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
            {/* <div
              className="text-white text-center text-sm leading-4 tracking-tight whitespace-nowrap items-stretch rounded bg-zinc-400 aspect-[1.675] justify-center px-6 py-3 max-md:px-5 cursor-pointer"
              onClick={handleSearch}
            >
              GO
            </div> */}
          </div>
        </div>
        <div className="items-stretch rounded shadow bg-white flex w-full flex-col justify-center mt-6 px-4 py-5 max-md:max-w-full">
          <div className="items-stretch rounded border border-[color:var(--grey-20,#E6E9F0)] bg-white flex flex-col pt-0.5 pb-2 px-3 border-solid max-md:max-w-full">
            <div
              className=" items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:justify-center"
              style={{ height: "60vh" }}
            >
              <DataTable
                columns={columns}
                data={filteredData}
                fixedHeader={true}
                // keyField="Edited By"
                customStyles={{
                  overflowY: "scroll",
                  headRow: {
                    style: {
                      color: "#171C8F",
                      fontWeight: 600,
                      fontSize: "14px",
                    },
                  },
                  headCells: {
                    style: {
                      whiteSpace: "normal",
                    },
                  },
                  height: "60vh",
                }}
                responsive={true}
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
        </div>{" "}
      </div>
    </div>
  );
}
export default App;
