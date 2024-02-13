import FillerPreviewBreadCrump from './FillerPreviewBreadCrump'

const FillerPreviewDeviationComponent = ({ system, block, detailedData, deviationReason }) => {
    console.log("system",detailedData?.activityList
    );
    return (
        <div className="flex flex-col border rounded w-full">

            <div className='deviation-item-container'>
                {block && (
                    <FillerPreviewBreadCrump
                        system={system}
                        block={block}
                    />

                )}
            </div>
            {/* <div className="p-4">
                <div className="preview-milestone-name-div">{system}</div>
                <div className="preview-milestone-deviation-div">The A pillars on your car hold either side of the front windscreen in place. They are the ones you see as you look straight at the car from the front.</div>
            </div> */}
            { detailedData?.activityList?.map((data, index) => (
                <div className="p-4">
                    <div className="preview-milestone-name-div">{data?.activityName}</div>
                    <div className="preview-milestone-deviation-div">{data?.causeOfChange}</div>
                </div>
            ))}


        </div>
    )
}

export default FillerPreviewDeviationComponent