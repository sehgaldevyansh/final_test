import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Bar } from "react-chartjs-2";
import 'chartjs-adapter-moment';
import { produce } from 'immer';
import set from 'lodash/set';
import dayjs from 'dayjs';
import '../CreateModel/CreateModel.css'
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import ZoomPlugin from 'chartjs-plugin-zoom';
// const labels2 = ["y1", "y2", "y3", "y4"];
// import 'chartjs-plugin-datalabels';
import './CreateModel.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { milestoneDeadlinePickerStyle, milestoneSubDatePickerStyle } from '../CreatorConstants';
// import '../ViewDcms/ViewTimeLine.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    ZoomPlugin,

);

const MilestoneItem = ({ milestoneName, milestoneDetails, onEditDeadline, modelData, keyRefresh }) => {
    const [localMilestoneDetails, setLocalMilestoneDetails] = useState(milestoneDetails)
    const [statemodelData, setStatemodelData] = useState(modelData)

    // const { data, isLoading, error } = useFetchModelDetailsQuery('YY17');
    const [getMilestoneData, setGetMilestoneData] = useState({});
    const [expand, setExpand] = useState(false);
    const [labels, setLabels] = useState([]);
    const [dates, setDates] = useState([]);
    const chartReference = useRef(null);


    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, width: 0 });
    const [selectedBar, setSelectedBar] = useState(null);


    useEffect(() => {
        setStatemodelData(modelData)
        console.log("call time");
    }, [keyRefresh])
    const toggleAcordion = () => {
        setExpand((prev) => { console.log('state changed'); return !prev });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const subTaskData = statemodelData?.Milestones[milestoneName]?.subTask;
                // console.log('subTaskData', subTaskData);

                if (subTaskData) {
                    setLabels(Object.keys(subTaskData));
                    console.log('subtaskdata', subTaskData)
                    const extractedTasks = Object.keys(subTaskData).map((taskKey) => {
                        const task = subTaskData[taskKey];
                        // console.log('taskKey', taskKey);
                        // console.log('task', task);
                        return {
                            taskName: taskKey,
                            startDate: task.start_time,
                            endDate: task.end_time,
                        };
                    });

                    // console.log('extractedTasks', extractedTasks);


                    onEditDeadline('modelData', statemodelData);


                    setDates(extractedTasks);
                } else {
                    console.warn('subTaskData is null or undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [statemodelData, modalVisible, keyRefresh]);


    let graphData = {
        labels: labels,
        datasets: dates?.map((date) => {
            return {
                // label: date.taskName,
                data: [{
                    x: [date.startDate, date.endDate],
                    y: date.taskName,
                    taskName: date.taskName
                }],
                backgroundColor: '#ADB1FF',

                barPercentage: .09,
                barThickness: 'flex',
                categoryPercentage: .9,
                // borderWidth: {
                //     top: 0,
                //     right: 5,
                //     bottom: 0,
                //     left: 5,
                // },
                // borderDash: [5, 5],
                borderRadius: 6,
                border: {
                    dash: [8, 9],
                },
                borderColor: '#171c8f',
                borderSkipped: false,
                stack: 'milestones',
            }

        })
    };




    const [clickedStartDate, setClickedStartDate] = useState(null)

    const handleBarClick = (event, elements) => {
        if (elements.length > 0) {

            const datasetIndex = elements[0].datasetIndex;
            // console.log('datasetIndex', datasetIndex)
            const index = elements[0].index;
            // console.log('index', index)
            // console.log('data', dates[datasetIndex])
            const start = dates[datasetIndex].startDate;
            const end = dates[datasetIndex].endDate;
            // console.log('Clicked Bar Start Date:', start);
            setClickedStartDate(start)
            // console.log('Clicked Bar End Date:', end);
            const clickedElement = elements[0];
            // console.log('clicked element', clickedElement)
            const barPosition = clickedElement.element;
            // console.log('Bar Position', barPosition.x, barPosition.width)
            setModalPosition({ x: barPosition.x, y: barPosition.y - 80, width: barPosition.width });
            // console.log('elements', elements);
            setSelectedBar({ start, end, datasetIndex });
            setModalVisible(true);
            // Open your modal/popup for date changes here
        }
        else {
            setModalVisible(false)
        }
    };

    const options = {
        animation: false,
        onClick: handleBarClick,
        // layout:{
        //     padding:{
        //         bottom:50,
        //     }
        // },
        // aspectRatio: 1.414,
        maintainAspectRatio: false,
        indexAxis: 'y',
        events: ['click'],
        scales: {
            x: {
                display: false,
                // position:'top',
                type: 'time',
                time: {
                    unit: 'day',
                    parser: 'dd/MM/yyyy'
                },

                min: '01/01/2022',
                max: '01/01/2027',

                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
        },
        // elements: {
        //     bar: {
        //         borderWidth: 0,
        //         borderRadius: 12,
        //         backgroundColor: '#ADB1FF',
        //         borderColor: 'rgba(0, 0, 0, 0.20)',
        //         borderSkipped: 'false',
        //         custom: (context) => {
        //             const { chart, dataIndex } = context;
        //             const { ctx, x, y, width, height } = chart.getDatasetMeta(0).data[dataIndex];

        //             ctx.save();
        //             ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        //             ctx.shadowBlur = 3;
        //             ctx.shadowOffsetX = 0;
        //             ctx.shadowOffsetY = 0;
        //             ctx.fillRect(x - 1, y, width + 2, height);
        //             ctx.restore();

        //         },
        //     },
        // },
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },

            legend: {

                display: false,
            },
            title: {
                display: false,

            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'end',
                color: '#7A7C7E',
                formatter: (value) => value.taskName,
            },
        },
    }

    const [maxEndDate, setMaxEndDate] = useState(null)

    const DateChangeModal = ({ selectedBar, handleDateChange, closeModal, modalPosition, subTaskData, milestoneName }) => {
        // console.log("label",subTaskData[selectedBar.datasetIndex]);
        const objectPath = subTaskData[selectedBar.datasetIndex];
        const [startDate, setStartDate] = useState(selectedBar.start);
        // console.log("san", milestoneName, " - > ", objectPath);
        const [endDate, setEndDate] = useState(selectedBar.end);
        setMaxEndDate(statemodelData?.Milestones[milestoneName]?.Deadline)
        const handleStartDateChange = (date) => {
            const d = new Date(date)?.toLocaleDateString("fr-FR");
            setStatemodelData((prevData) =>
                produce(prevData, (draft) => {
                    set(draft, `Milestones.${milestoneName}.subTask.${objectPath}.start_time`, d);
                })
            );
        };

        const handleEndDateChange = (date) => {
            const d = new Date(date)?.toLocaleDateString("fr-FR");
            console.log("debuggger", `Milestones.${milestoneName}.subTask.${objectPath}.end_time`, "->", statemodelData);
            setStatemodelData((prevData) =>
                produce(prevData, (draft) => {
                    set(draft, `Milestones.${milestoneName}.subTask.${objectPath}.end_time`, d);
                })
            );
        };

        const handleSubmit = () => {
            handleDateChange(startDate, endDate);
            closeModal(); // Close the modal after date change
        };


        console.log('dates', startDate, endDate, moment(endDate).format('YYYY-MM-DD'))
        return (
            <div className="tooltip-container" style={{ position: 'absolute', top: modalPosition.y + 103, left: modalPosition.x - modalPosition.width, zIndex: 1000 }}>
                {/* <div className="tooltip-arrow" /> */}
                <div className="tooltip-content flex" style={{ fontSize: '10px', backgroundColor: '#fff', padding: '0.1rem', borderRadius: '4px' }}>
                    {/* <div className="" style={{ fontSize: '12px', top: modalPosition.y + 100, left: modalPosition.x - modalPosition.width, position: 'absolute', width: '100px' }}>
                <div className="flex"> */}
                    <div className="flex flex-col items-start border" >
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
                            <DemoContainer components={['DatePicker']} sx={{

                            }}>
                                <DatePicker
                                    slotProps={{ textField: { size: "small" } }}
                                    format="DD/MM/YYYY"
                                    maxDate={dayjs(moment(maxEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))}
                                    sx={milestoneSubDatePickerStyle}
                                    label="Start Date"
                                    value={convertDateFormat(statemodelData.Milestones[milestoneName].subTask[objectPath].start_time)}
                                    onChange={(e) => handleStartDateChange(e)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-col items-start border">
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
                            <DemoContainer components={['DatePicker']} sx={{

                            }}>
                                <DatePicker
                                    slotProps={{ textField: { size: "small" } }}
                                    format="DD/MM/YYYY"
                                    minDate={convertDateFormat(statemodelData.Milestones[milestoneName].subTask[objectPath].start_time)}
                                    maxDate={dayjs(moment(maxEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))}
                                    sx={milestoneSubDatePickerStyle}
                                    label="End Date"
                                    value={convertDateFormat(statemodelData.Milestones[milestoneName].subTask[objectPath].end_time)}
                                    onChange={(e) => handleEndDateChange(e)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
            </div>

        );
    };

    const handleDateChange = (startDate, endDate) => {
        // Handle date change logic here using startDate and endDate
        // For example, update data or perform other actions
        // console.log('Start Date:', startDate);
        // console.log('End Date:', endDate);

    };

    const closeModal = () => {
        setModalVisible(false);
    };
    function convertDateFormat(inputDate) {
        if (inputDate) {
            const [day, month, year] = inputDate.split('/');
            const outputDate = `${month}/${day}/${year}`;
            return dayjs(outputDate);
        }
    }



    useEffect(() => {
        onEditDeadline(
            `modelData.Milestones.${milestoneName}.Deadline`,
            localMilestoneDetails?.Deadline
        );
        //   console.log("hehe",localMilestoneDetails);
    }, [localMilestoneDetails]);
    const handleDeadlineDateChange = (date, tar) => {
        const d = new Date(date)?.toLocaleDateString("fr-FR");
        setMaxEndDate(d)
        // console.log(d,'------------>',tar);
        const updatedDetails = { ...localMilestoneDetails, Deadline: d };
        setLocalMilestoneDetails(updatedDetails);
        // console.log(localMilestoneDetails);
    };
    return (
        <div className='flex items-center gap-2 milestone-item-container'>

            <Accordion expanded={expand} style={{ width: '100%', boxShadow: 'none', backgroundColor: expand ? '#e6eaf4' : '#fff' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        onClick={toggleAcordion}
                        style={{ backgroundColor: expand ? 'var(--base-text-color)' : '#fff', borderRadius: '50%', color: expand ? '#fff' : '#000', fontSize: '20px', }}
                    />}
                    aria-controls="panel1a-content"
                    style={{
                        gap: '5px',
                        fontSize: '14px',
                    }}
                    sx={{
                        '& .MuiAccordionSummary-content': {
                            margin: '8px'
                        },
                        '& .MuiAccordionSummary-content .Mui-expanded': {
                            margin: '2px'
                        }
                    }}
                >
                    <div className="milestone-label-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p className='milestone-label'>{milestoneName.replace(/_+/g, " ")}</p></div>
                    <div className='milestone-date-input-container'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flexGrow: '1' }}>
                            <DemoContainer components={['DatePicker']} sx={{
                                paddingTop: '4px',
                                paddingBottom: '4px',
                                flexGrow: '1'

                            }}>
                                <DatePicker
                                    slotProps={{ textField: { size: "small" } }}
                                    format="DD/MM/YYYY"
                                    sx={milestoneDeadlinePickerStyle}
                                    label="End Date"
                                    value={convertDateFormat(localMilestoneDetails?.Deadline)}
                                    onChange={(e) => handleDeadlineDateChange(e, `modelData.Milestones.${milestoneName}`)}
                                />
                            </DemoContainer>
                        </LocalizationProvider></div>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#f4f5f8' }}>
                    <Typography>


                        <div className='chart-container-wrapper2' >
                            <div className='chart-container2' style={{ backgroundColor: '#f4f5f8', border: 'none' }}>

                                <Bar data={graphData} options={options} backgroundColor={'#f4f5f8'} ref={(reference) => (chartReference.current = reference)} />
                                {modalVisible && (
                                    <DateChangeModal
                                        selectedBar={selectedBar}
                                        handleDateChange={handleDateChange}
                                        closeModal={closeModal}
                                        modalPosition={modalPosition}
                                        subTaskData={graphData?.labels}
                                        milestoneName={milestoneName}
                                    />
                                )}
                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div >
    )
}

MilestoneItem.propTypes = {
    milestoneName: PropTypes.string.isRequired,
    modalPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number
    }),
    milestoneDetails: PropTypes.object,
    selectedBar: PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
        datasetIndex: PropTypes.number
    }),
    subTaskData: PropTypes.object,
    onEditDeadline: PropTypes.func,
    modelData: PropTypes.array,
};

export default MilestoneItem