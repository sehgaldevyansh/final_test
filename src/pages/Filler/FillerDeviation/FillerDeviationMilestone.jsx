import PropTypes from 'prop-types'
import './FillerDeviation.css'

const FillerDeviationMilestone = ({ milestoneName, activityList, handleDeviationActivityClick }) => {
    // console.log('activity list', activityList.type)
    // mileStoneName,modelId,blockName,activity,type,causeOfChange)
    const handleClick = (e, milestoneName, activity,type) => {
        console.log('activity variant click', milestoneName, activity)
        handleDeviationActivityClick(milestoneName, activity,type)
    }

    return (
        <div className="deviation-milestone-container">
            <div className="deviation-milestone-name">
                <div className="deviation-milestone-name-subdiv">{milestoneName}</div>
            </div>
            <div className="deviation-milestone-activity-container">
                { activityList.map((activity, index) => {
                    // console.log('activity ', activity?.length,activity?.activityName, activity?.type, activityList.type === 'necessary')
                    if(activity?.activityName?.length>0)
                    return (
                        <div key={index} onClick={e => handleClick(e, milestoneName, activity,activity?.type,activity?.deviationType)} className={activity?.deviationType===1? 'deviation-milestone-item deviation-unnecessary-changed':((activity?.type === 'necessary')? 'deviation-milestone-item deviation-necessary':'deviation-milestone-item')}><p>{activity?.activityName}</p>
                        </div>
                    )
                    else{
                        return null
                    }
                })}
            </div>
        </div>
    )
}


FillerDeviationMilestone.propTypes = {
    milestoneName: PropTypes.string.isRequired,
    activityList: PropTypes.array,
    handleDeviationActivityClick: PropTypes.function
}

export default FillerDeviationMilestone