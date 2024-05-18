import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

function Cart() {
    const cartItems = useSelector((state) => state.itemShop.cartItems);
    const [subTotal, setSubTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + item.price * 1;
        });
        setSubTotal(temp);
    }, [cartItems]);

    console.log(subTotal);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image) => <img src={image} height="100" width="100" />,
        },
        {
            title: "Price",
            dataIndex: "price",
        },
    ];

    const onFinish = (values) => {
        console.log(values);
        const reqObject = {
            ...values,
            subTotal,
            cartItems,
            tax: Number(((subTotal / 100) * 2).toFixed(2)),
            totalAmount: Number(subTotal + (subTotal / 100) * 2),
            userId: JSON.parse(localStorage.getItem("user_data")).user._id,
        };
        console.log(reqObject);

        axios.post(`${API}/bills/charge-bill`, reqObject).then(() => {
            message.success("Bills added successfully");
            navigate("/bills");
        });
    };

    return (
        <div>
            <h1>List of Items in your Cart</h1>
            <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                bordered
            ></Table>
            <div className="d-flex justify-content-end">
                <div>
                    <h3>
                        SUB TOTAL: <b>Rs.{subTotal}</b>
                    </h3>
                </div>
            </div>
            <div className="d-flex justify-content-around">
                {" "}
                <Button type="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Charge Bill
                </Button>
            </div>

            <Modal
                title="Charge Bill"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={false}
            >
                <Form onFinish={onFinish}>
                    <Form.Item label="Customer Name" name="customerName">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Customer Phone Number" name="customerPhoneNumber">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Payment Mode" name="paymentMode">
                        <Select>
                            <Select.Option value="cash">CASH</Select.Option>
                            <Select.Option value="card">CARD</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <h3>
                            {" "}
                            SUB TOTAL: <b>Rs.{subTotal}</b>
                        </h3>
                        <h3>
                            {" "}
                            TAX: <b>Rs.{((subTotal / 100) * 2).toFixed(2)}</b>
                        </h3>
                        <h3>
                            {" "}
                            GRAND TOTAL: <b>Rs.{subTotal + (subTotal / 100) * 2}</b>
                        </h3>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit">
                            Generate Bill
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Cart;
