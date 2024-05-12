import { Col, Row, Form, Button, Input, Checkbox, message } from "antd";
import axios from "axios"
import { API } from "../global";
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log(values)
        axios.post(`${API}/users/login`, values)
            .then((res) => {
                console.log(res)
                message.success("Login Successful")
                localStorage.setItem("user_data", JSON.stringify(res.data))
                navigate("/home")
            }).catch((err) => {
                message.error("Invalid Credentials")
            })
    };
    return (
        <div>
            {/* style={{ marginLeft: "30rem" }} */}

            <Row>
                <Col lg={8} xs={22}>
                    <Form onFinish={onFinish}>
                        <h1>Zepto</h1>
                        <Form.Item label="UserId" name="userId">
                            <Input id="username" placeholder="123" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"

                        >
                            <Input.Password id="password" placeholder="john@123" />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"

                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
