import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useFetchModelDetailsQuery } from '../../../store';
import ZoomPlugin from 'chartjs-plugin-zoom';
import Header from '../../../components/Header/Header';
import './ViewTimeLine.css'
import jsPDF from 'jspdf';
import _ from 'lodash'
import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import logo from '../../../assets/Header/Logo.png'
import TimelineImage from '../../../assets/DcmsImages/MilestoneTimeline.png'
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


import { useNavigate, useLocation } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
} from "@mui/material";

import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../store/Apiconstants';
import moment from 'moment';
import PublishConfirmComponent from '../../../components/PublishConfirmComponent/PublishConfirmComponent';
import NavigationPathComponent from '../../../components/NavigationPathComponent/NavigationPathComponent';
const ViewTimeLine = () => {
    const params = useParams();
    // const location = useLocation();
    // const { model_id } = location.state || {};
    const location = useLocation();
    const { model_id } = location.state || {};
    const chartRef = useRef(null);
    const { data, isLoading, error } = useFetchModelDetailsQuery(model_id);
    const [labels, setLabels] = useState([]);
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        let fd = _.cloneDeep(data);
        fd.modelData.General_info["status"] = 2;
        fd.modelData.General_info["user_email"] = Cookies.get('email'); // do this dynamic
        console.log("fd1", fd);
        axios({
            method: 'POST',
            url: `${API_BASE_URL}/create`,
            data: { modelData: fd?.modelData },
            headers:{
                "token":Cookies.get('jwtToken'),
                "user":Cookies.get('email'),
              }
        }).then((res) => {
            console.log('timeline', res?.data?.data)
            //  setFetchedData(res?.data)
        }).then((res) => {
            // navigate('/creator/modellist');
            setOpenConfirmModel(true)
        })

        // Navigate to /creator/modellist when Cancel is clicked

    };
    const handleCancelClick = () => {
        // Navigate to /creator/modellist when Cancel is clicked
        navigate('/creator/modellist');
    };

    const [startMilestone, setStartMilestone] = useState('');
    const [openConfirmModel, setOpenConfirmModel] = useState(false)

    useEffect(() => {
        if (isLoading || error || !data || !data.modelData || !data.modelData.Milestones) {
            return;
        }

        const milestoneNames = Object.keys(data.modelData.Milestones);
        setLabels(milestoneNames);
        const startMilestone = milestoneNames[0]; // Use the first milestone
        setStartMilestone(startMilestone);
        const extractedTasks = milestoneNames.map((milestoneName) => {
            const milestoneData = data.modelData.Milestones[milestoneName];
            const subTasks = milestoneData?.subTask;
            const milestoneTasks = Object.keys(subTasks).map((taskName) => {
                const taskData = subTasks[taskName];
                return {
                    milestoneName,
                    taskName,
                    startDate: taskData.start_time,
                    endDate: taskData.end_time,
                };
            });
            return {
                milestoneName,
                milestoneTasks,
            };
        });
        setTasks(extractedTasks);
    }, [data, isLoading, error]);
    const handleDownloadClick = () => {
        if (chartRef?.current) {
            const reportPage = document.getElementById('reportPage');
            const reportPageHeight = reportPage.offsetHeight;
            const reportPageWidth = reportPage.offsetWidth;

            const pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
            const Logoimg = new Image();
            Logoimg.src = logo;


            pdf.addImage(Logoimg, 'PNG', 10, 10, 186, 20);
            const headingText = 'DCMS Master Schedule'
            pdf.setFontSize(16);
            pdf.text(500, 30, headingText)
            const footerText = 'Confidential MSIL R&D'
            pdf.setFontSize(12);
            let pdfctxY = 0;
            const buffer = 50;
            document.querySelectorAll('canvas').forEach((canvas) => {
                const canvasHeight = canvas.offsetHeight;
                const canvasWidth = canvas.offsetWidth;

                if (pdfctxY + canvasHeight > reportPageHeight) {
                    pdf.addPage('l', 'pt', [841.89, 595.28]); // A3 dimensions in points
                    // pdf.addPage();
                    pdfctxY = 0;
                }


                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, pdfctxY + buffer, canvasWidth, canvasHeight);
                pdfctxY += canvasHeight + buffer;
            });


            pdf.text(10, reportPageHeight - 10, footerText)
            // download the pdf
            pdf.save('schedule.pdf');
        }
    };


    const graphData = {
        labels: tasks?.flatMap((milestone) =>
            milestone?.milestoneTasks?.map((task) => task?.taskName)
        ),
        datasets: [{
            data: tasks?.flatMap((milestone) =>
                milestone?.milestoneTasks?.map((task) => ({
                    x: [task?.startDate, task?.endDate, task?.startDate, task?.endDate],
                    x2: milestone?.milestoneName,

                    y: task?.taskName,
                }))
            ),
            backgroundColor: '#ADB1FF',
            barPercentage: .07,
            barThickness: 'flex',
            categoryPercentage: 1,
            borderDash: [5, 5],
            borderColor: '#ADB1FF',
            borderSkipped: false,
            // stack: 'milestones',
            // group: 'tasks',
        }],
    };



    const options = {

        layout: {
            padding: {
                bottom: 10,
            }
        },
        // spanGaps: true,
        barValueSpacing: 5,
        aspectRatio: 1.414,
        autoPadding: true,
        // maintainAspectRatio: false,
        indexAxis: 'y',
        events: ['click'],
        scales: {

            x: {
                stacked: true,
                backgroundColor: '#F4F5F8',
                // offset: false,
                display: true,
                position: 'top',
                type: 'time',
                time: {
                    unit: 'month',
                    parser: 'DD/MM/YYYY',
                    displayFormats: {
                        // year: 'YYYY',
                        month: 'MM',
                    },
                },
                min: '01/01/2022',
                max: '30/12/2026',
                grid: {
                    display: true,
                    drawBorder: true,
                    // color: '#171c8f',
                    lineWidth: 1,
                    // borderDash: true,
                    // borderDash: [8, 10],
                    drawOnChartArea: true,
                    // offset: true,
                },
                // offset: true,
                border: {
                    dash: [8, 16],
                },
                ticks: {
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        weight: 'bold',
                    },
                    color: '#171c8f',
                    callback: (value, index, values) => {
                        console.log("mangal", value, index, values)
                        return `${parseInt(index + 1)}`;
                    },
                },
            },
            x2: {
                stacked: true,
                backgroundColor: '#F4F5F8',
                position: 'top',
                offset: true,
                display: true,
                type: 'category',
                // min: labels[0],
                // max: labels[labels.length - 1],
                grid: {
                    display: false,
                    drawBorder: false,
                    color: '#171c8f',
                    lineWidth: 1,
                },
                ticks: {
                    showLabelBackdrop: true,
                    beginAtZero: true,
                    textStrokeColor: `#171c8f`,
                    backdropColor: '#f4f5f8',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 9,
                        weight: 'bold',
                    },
                    color: '#171c8f',
                },
                labels: labels,
            },
            x3: {
                backgroundColor: '#171c8f',
                position: 'top',
                offset: true,
                display: true,
                type: 'time',
                time: {
                    unit: 'year',
                    displayFormats: {
                        year: 'YYYY',
                    }
                },
                min: '01/01/2022',
                max: '01/01/2026',
                grid: {
                    display: true,
                    drawBorder: false,
                    color: '#fff',
                    lineWidth: 1,
                    offset: true,
                },
                border: {
                    dash: [8, 18],
                },
                ticks: {
                    showLabelBackdrop: true,
                    beginAtZero: true,
                    textStrokeColor: '#fff',
                    backdropColor: '#171c8f',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 10,
                        weight: 'bold',
                    },
                    color: '#fff',
                    callback: (value, index, values) => {
                        const year = new Date(value).getFullYear();
                        return `Y(${year})`;
                    },
                },
            },
            y: {

                offset: true,
                stacked: true,
                // type:"linear",
                display: false,
                // beginAtZero: false,
                // position: "top",
                backgroundColor: '#F4F5F8',
                grid: {
                    display: true,
                    drawBorder: false,
                    // color: '#171c8f',
                    // borderDash: true,
                    offset: true,
                },
                border: {
                    dash: [8, 18],
                },
                ticks: {
                    padding: 20,
                    // showLabelBackdrop: true,
                    // min: startMilestoneIndex,
                    beginAtZero: true,
                    textStrokeColor: `#171c8f`,
                    backdropColor: '#f4f5f8',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        weight: 'bold',
                    },
                    // stepSize: 1,
                    color: '#171c8f',
                },
            },
        },
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    title: (tooltipItem) => {
                        return tooltipItem[0]?.dataset.label || '';
                    },
                    label: (tooltipItem) => {
                        const taskData = tooltipItem?.raw;
                        console.log('chote', tooltipItem)
                        if (taskData) {
                            return `Start Date: ${taskData.x[0]} | End Date: ${taskData.x[1]}`;
                        } else {
                            return '';
                        }
                    },
                },
            },
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            datalabels: {
                labels: {
                    index: {
                        offset: true,
                        display: true,
                        anchor: 'start',
                        align: 'start',
                        font: {
                            family: 'Arial, sans-serif',
                            size: 10,
                        },
                        color: '#000',
                        formatter: function (value) {
                            const startDate = moment(value.x[0], 'DD/MM/YYYY').format('DD/MM');
                            return `${startDate}`;
                        },
                    },
                    name: {
                        offset: true,
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        font: {
                            family: 'Arial, sans-serif',
                            size: 10,
                        },
                        color: '#000',
                        formatter: function (value) {
                            const endDate = moment(value.x[1], 'DD/MM/YYYY').format('DD/MM');
                            return `${endDate}`;
                        },
                    },
                    value: {
                        display: true,
                        offset: true,
                        anchor: 'top',
                        align: 'top',
                        font: {
                            family: 'Arial, sans-serif',
                            size: 10,
                        },
                        padding: 2,


                        //    textShadowBlur:10,
                        // borderWidth:1,
                        // borderColor:"#000",
                        // backgroundColor:"#c3c3c3",
                        color: '#000',
                        formatter: function (value) {
                            // const endDate = moment(value.x[1], 'DD/MM/YYYY').format('MM/YY');
                            // console.log("nikhil",value)
                            return `${value.y}`;
                        },
                    },
                },
            },
        },
    };


    const handleConfirmSubmitClose = () => {
        setOpenConfirmModel(false)
    }

    const handleProceed = (val) => {
        navigate('/creator/modellist')
    }

    return (
        <div className="bg-gray-100 flex flex-col items-stretch pb-8">
            <Header className='header-model-list' />

            <div className="create-modal-main-container">
                <NavigationPathComponent paths={[{ name: 'MSIL R&D', path: '/creator/modellist' }]} current='DCMS' />
                <div className="text-neutral-700 text-2xl font-semibold tracking-tight self-stretch w-full max-md:max-w-full">
                    {params?.type === 'viewfull' ? 'View DCMS' : 'Publish DCMS'}
                </div>
                <div className="items-stretch self-stretch rounded shadow bg-white flex w-full flex-col px-4 py-4 max-md:max-w-full">
                    <div className="justify-between items-stretch self-stretch flex gap-5 max-md:flex-wrap">
                        <Typography className="text-blue-900 text-base font-bold max-md:max-w-full flex" >Schedule Of The Model</Typography>
                        <div className="items-stretch flex  self-start">


                            <Button className="text-blue-900 text-sm font-semibold leading-4 tracking-tight" onClick={handleDownloadClick} variant="text" style={{ color: "var(--base-text-color)", textTransform: "none" }}><img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/940e0c1bb0a66cb862713b5e086d52c734697bf57485456a8e1f2c3fcc585456?apiKey=1895f78b588e49a4bae3291cc83ac703&"
                                className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full mr-2"
                            /> Download Schedule</Button>
                        </div>
                    </div>
                    <div className="flex justify-start gap-2">
                        <TextField
                            // label="Model Name"
                            variant="outlined"
                            disabled
                            margin="normal"
                            value={data?.modelData?.General_info?.Model_Name}
                            size='small'
                        />
                        <TextField
                            // label="Type"
                            variant="outlined"
                            margin="normal"
                            disabled
                            value={data?.modelData?.General_info?.Type}
                            size='small'
                        />
                        <TextField
                            // label="Description"
                            variant="outlined"
                            disabled
                            margin="normal"
                            multiline
                            fullWidth
                            value={data?.modelData?.General_info?.Description}
                            size='small'
                        />
                    </div>
                    <div className="flex justify-center mb-4 mt-2">

                        <i className="">
                            <img src={TimelineImage} alt="Timeline" />
                        </i>

                    </div>
                    <div className='chart-container-wrapper' style={{ overflow: 'auto' }}>
                        <div className='chart-container'>

                            <Bar id="reportPage" ref={chartRef} data={graphData} options={options} />
                        </div>
                    </div>
                </div>
                <div className="create-model-button-container flex gap-2 justify-end">
                    <Button onClick={handleCancelClick} className='dcms-btn-main dcms-cancel-btn'>Cancel</Button>
                    {(params?.type !== 'viewfull') ? (<Button onClick={handleSubmit} className='dcms-btn-main dcms-active-btn'>Publish</Button>) : null}
                    <PublishConfirmComponent isOpen={openConfirmModel} handleClose={handleConfirmSubmitClose} handleProceed={handleProceed} />
                </div>
            </div>
        </div >




    );
};

export default ViewTimeLine;
