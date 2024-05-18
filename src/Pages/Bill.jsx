import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { Button } from 'antd'
import { useReactToPrint } from 'react-to-print'
import { useNavigate } from 'react-router-dom'

function Bill() {
    const componentRef = React.useRef(null)
    const [billData, setBillData] = useState([])
    const navigate = useNavigate()
    const getAllBills = () => {
        axios.get(`${API}/bills/get-bill`)
            .then((res) => {
                console.log(res.data)
                setBillData(res.data)
            })
    }

    useEffect(() => {
        getAllBills()
    }, [])


    console.log("billData", billData)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <div>
            <h1>Invoice Details for Zepto</h1>
            <table className='table table-bordered' ref={componentRef}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Phone Number</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((item) => {
                        return (
                            <tr>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhoneNumber}</td>
                                <td>Rs. {item.subTotal}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
            <Button type="primary" onClick={handlePrint}>Print Bill</Button>
        </div>
    )
}

export default Bill