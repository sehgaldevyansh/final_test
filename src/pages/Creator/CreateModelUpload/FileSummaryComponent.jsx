import PropTypes from 'prop-types';
import commentCheck from '../../../assets/Flaticons/commentCheck.svg'
import errorCheck from '../../../assets/Flaticons/errorCheck.svg'
import _ from 'lodash'

const FileSummaryComponent = ({ heading, validationMessage, noOfRows, fileProperty, noOfBlocks, issuesIdentified, errorDataInfo, errorMessage }) => {
    // console.log('Error data info', errorDataInfo, errorDataInfo?.length)


    // const groupedErrors=errorDataInfo.reduce((acc,obj)=>{
    //     if(!acc[obj.errorMsg]){
    //         acc[obj.errorMsg]=[];
    //     }
    //     acc[obj.errorMsg].push(obj);
    //     console.log('Acctuator',acc)
    //     return acc;
    // })

    // groupedErrors()

    const errorMsgs = _.uniq(_.map(errorDataInfo, 'errorMsg'));
    console.log('error msgs', errorMsgs)

    // <div>
    //         {
    //             errorMsgs.map((errorMsg, index) => {
    //                 const filteredData = data.filter(err => err.errorMsg == errorMsg);
    //                 console.log('filteredData', filteredData)
    //                 return (
    //                     <div key={index} className="">
    //                         <h1>{errorMsg}</h1>
    //                         {
    //                             filteredData?.map((item, index) => {
    //                                 return (
    //                                     <div key={index} className="">

    //                                         <p>{item.blockNo}</p>
    //                                     </div>
    //                                 )
    //                             })
    //                         }
    //                     </div>
    //                 )
    //             })
    //         }

    return (
        <div className="flex flex-col bg-white gap-4 border p-2" style={{ fontSize: '14px' }}>

            <div className="flex">
                <p className='text-sm font-semibold leading-4 tracking-tight flex gap-2' style={{ color: 'var(--base-text-color)' }}><span>{heading}</span><span className='text-sm font-bold leading-4 tracking-tight' style={{ color: errorDataInfo?.length !== 0 ? '#f00' : '#55B059' }}>{errorDataInfo?.length !== 0 ? 'Upload Unsuccessful!, So please upload corrected file again!' : 'Upload Successful'}</span></p>

            </div>
            {errorMessage?.length === 0 ? (<div className="flex gap-4 ">
                <div className="items-center flex-grow rounded border border-[color:var(--grey-20,#E6E9F0)] flex gap-2 p-2 border-solid"><span className='text-neutral-700 text-sm  tracking-tight my-auto' style={{ fontSize: '14px', fontWeight: '400' }}>Number of Rows </span><span className='text-neutral-700 text-sm font-bold tracking-tight' style={{ fontSize: '14px' }}>{noOfRows}</span></div>
                <div className="items-center flex-grow rounded border border-[color:var(--grey-20,#E6E9F0)] flex gap-2 p-2 border-solid"><span className='text-neutral-700 text-sm  tracking-tight my-auto' style={{ fontSize: '14px', fontWeight: '400' }}>Number of {fileProperty} </span><span className='text-neutral-700 text-sm font-bold tracking-tight'>{noOfBlocks}</span></div>
            </div>) : null}
            <div className="flex flex-col items-stretch  gap-2">
                <div className="text-neutral-700 text-sm leading-4 tracking-tight w-full max-md:max-w-full" style={{ fontSize: '14px', fontWeight: '400' }}>Issues Identified</div>
                <div className="self-stretch rounded border border-[color:var(--grey-20,#E6E9F0)] flex  justify-start gap-1  p-2 border-solid items-center max-md:pr-5">
                    {errorDataInfo?.length === 0 && errorMessage?.length === 0 && (
                        <div className="flex gap-2 items-center">
                            <i>
                                <img src={commentCheck} />

                            </i>
                            <p>{issuesIdentified}</p>
                        </div>
                    )}
                    {
                        errorMessage?.length !== 0 ? (<div className="flex gap-2 items-center">
                            <i>
                                <img src={errorCheck} />

                            </i>
                            <p>{errorMessage}</p>
                        </div>) : null
                    }

                    {errorMessage?.length === 0 && errorDataInfo?.length > 0 && (
                        <div className='grid grid-cols-2 gap-2 justify-between w-full '>
                            <div className="flex flex-col border p-2 gap-3 ">
                                <div className="flex gap-3">
                                    <i>
                                        <img src={errorCheck} />
                                    </i>
                                    <p>Block Master not updated for</p>
                                </div>
                                <div className="flex gap-3 pl-7 flex-wrap">
                                    {Array.from(new Set(errorDataInfo?.map(err => {
                                        console.log('err initial', err)
                                        return (err.blockNo.length > 0 ? err.blockNo : 'Empty')
                                    })))?.map((err, index) => {
                                        console.log('err item', err);
                                        return (<p key={index} style={{
                                            color: '#343536',
                                            backgroundColor: '#f4f5f8',
                                            padding: '4px 8px',
                                            borderRadius: '8px'
                                        }}>{err}</p>)
                                    }
                                    )}
                                    {/* {Array.from(new Set(errorDataInfo?.map(err=>{
                                        err.blockNo.length>0?err.blockNo:'Empty'
                                    })))} */}
                                </div>
                            </div>
                            <div className="flex flex-col border p-2 gap-3 ">
                                {errorMsgs.map((msg, index) => {
                                    return (
                                        <div style={{}} key={index} className="">
                                            <div className="flex gap-3">
                                                <i>
                                                    <img src={errorCheck} />
                                                </i>
                                                <p>{msg}</p>
                                            </div>
                                            <div className="flex gap-3 pl-7 flex-wrap">
                                                {errorDataInfo?.filter(err => msg === err.errorMsg).map((err, index) =>
                                                    <p key={index} style={{
                                                        color: '#343536',
                                                        // backgroundColor: '#f4f5f8',
                                                        padding: '4px 8px',
                                                        borderRadius: '8px',
                                                        display: 'flex'
                                                    }}><span style={{
                                                        borderRadius: '8px 0px 0px 8px',
                                                        backgroundColor: '#e6e9f0',
                                                        padding: '4px 8px'
                                                    }}>{err.cellNo?.length > 0 ? err.cellNo : 'Empty'}</span><span style={{ borderRadius: '0px 8px 8px 0px', backgroundColor: '#f4f5f8', padding: '4px 8px' }}>{err.errorData ? err.errorData : 'Empty'}</span></p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



FileSummaryComponent.propTypes = {
    heading: PropTypes.string.isRequired,
    noOfRows: PropTypes.number.isRequired,
    fileProperty: PropTypes.string.isRequired,
    noOfBlocks: PropTypes.number.isRequired,
    issuesIdentified: PropTypes.string.isRequired,
    errorDataInfo: PropTypes.array,
};


export default FileSummaryComponent