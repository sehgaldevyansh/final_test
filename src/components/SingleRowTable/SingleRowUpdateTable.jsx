import { Select } from '@mui/material'
import {useState} from 'react';
import PropTypes from 'prop-types';
import './SingleRowTable.css'
// ['BOM GName', 'Block', 'Level', 'Parents Part No', 'DWG Type', 'PartName', 'QTY', 'Sum QTY', 'A/AR']
const keysToInclude = ["baseModel", "block", "level","parentsPartNo", "dwgType", "partName", "qty", "sumQty", "aar"]
const SingleRowUpdateTable = ({ headings, data, type,dataDetails,createData,setCreateData}) => {
    const [cdata,setCdata] = useState(createData);
    const handleChange = (e) => {
      setCdata((prevData)=>{
        return {...prevData,[e.target.name] : e.target.value}
      });
    }
    const handlePartialSubmit = (e) => {
      setCreateData(cdata);
    }
    console.log('type in single row', dataDetails)
    return (
      <div className="p-4 w-full flex">
        <table className="w-full" style={{ borderCollapse: "separate" }}>
          <thead>
            <tr>
              {headings?.map((heading, index) => (
                <th
                  style={{
                    paddingRight: "50px",
                    textAlign: "left",
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#343536",
                  }}
                  key={index}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

                <tbody>
                   
                    <tr>
                    {keysToInclude?.map((key, index) => { 
                        console.log('key!!',key,dataDetails[key])
                      return (
                      <td key={index} style={{ paddingRight: '50px', textAlign: 'left', fontWeight: '400', fontSize: '14px', color: '#9ea1a7' }}>
                        {dataDetails && dataDetails[key] !== undefined ? (
                          dataDetails[key] === '' ? 
                            (type === 'tpl' ? (<select className='single-row-select-component'></select>) : <input name={key} className='single-row-select-component' onChange={handleChange} onBlur={handlePartialSubmit} />)
                            : 
                            (dataDetails[key])
                        ) :  <input className='single-row-select-component' name={key} value={cdata[key]} onChange={handleChange} onBlur={handlePartialSubmit}/>}
                      </td>
                    )})}
                  </tr>
                </tbody>
        </table>
      </div>
    );
}

SingleRowUpdateTable.propTypes = {
    headings: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    type: PropTypes.string,
    dataDetails:PropTypes.object
};

export default SingleRowUpdateTable