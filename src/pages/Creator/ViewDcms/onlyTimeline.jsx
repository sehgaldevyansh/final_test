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
import { API_BASE_URL } from '../../../store/Apiconstants';
import moment from 'moment';
import PublishConfirmComponent from '../../../components/PublishConfirmComponent/PublishConfirmComponent';
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



    const graphData = {
        labels: tasks?.flatMap((milestone) =>
            milestone?.milestoneTasks?.map((task) => task?.taskName)
        ),
        datasets: [{
            data: tasks?.flatMap((milestone) =>
                milestone?.milestoneTasks?.map((task) => ({
                    x: [task?.startDate, task?.endDate],
                    x2: milestone?.milestoneName,
                    y: task?.taskName,
                }))
            ),
            backgroundColor: '#ADB1FF',
            barPercentage: .07,
            barThickness: 'flex',
            categoryPercentage: 1,
            // borderWidth: {
            //     top: 0,
            //     right: 0,
            //     bottom: 5,
            //     left: 0,
            // },
            borderDash: [5, 5],
            border: {
                dash: [8, 9],
            },
            borderColor: '#ADB1FF',
            borderSkipped: false,
            stack: 'milestones',
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
                            size: 5,
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
                            size: 5,
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
                            size: 5,
                            // color: '#000',
                            // weight:500,
                        },


                        //    textShadowBlur:10,
                        // borderWidth:0,
                        borderColor:"#fff",
                        backgroundColor:"#fff",
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



    return (
        <div className='chart-container'>

        <Bar id="reportPage" ref={chartRef} data={graphData} options={options} />
    </div>




    );
};

export default ViewTimeLine;