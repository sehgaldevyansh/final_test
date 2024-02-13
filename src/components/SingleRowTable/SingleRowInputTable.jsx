import { Select } from '@mui/material'
import React from 'react'

const SingleRowTable = ({ headings, data }) => {

    return (
        <div className="p-4">
            <table style={{ borderCollapse: 'separate' }}>
                <thead>
                    <tr>
                        {headings?.map((heading, index) => (
                            <th style={{ paddingRight: '50px', textAlign: 'left', fontWeight: '400', fontSize: '12px', color: '#343536' }} key={index}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {data?.map((item, index) => (
                            <td style={{ paddingRight: '50px', textAlign: 'left', fontWeight: '400', fontSize: '14px', color: '#9ea1a7' }} key={index}>{item === '' ? (<Select size='small'></Select>) : item}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SingleRowTable