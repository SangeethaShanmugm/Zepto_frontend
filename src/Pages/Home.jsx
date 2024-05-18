import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../global";
import Item from "./Item";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Flex } from "antd";

function Home() {
    const [itemData, setItemData] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [category, setCategory] = useState("fruits")
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.itemShop.cartItems)

    console.log(cartItems)

    useEffect(() => {
        axios.get(`${API}/items/get-items`).then((res) => {
            console.log(res.data);
            setItemData(res.data);
        });
    }, []);


    useEffect(() => {
        const filteredItems = itemData.filter(item => item.category === category)
        setFilteredData(filteredItems)
    }, [category, itemData])


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])



    return (
        <div>
            <div style={{ marginLeft: " 89%" }}>

                <button type="button" className="bt btn-primary position-relative"
                    onClick={() => navigate("/cart")}>
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                    </span>
                </button>
            </div>

            <Flex align="flex-center" gap="large" >
                <Button type="success" onClick={() => setCategory("fruits")}>Fruits</Button>
                <Button type="success" onClick={() => setCategory("vegetables")}>Vegetables</Button>
            </Flex>
            <hr />
            <div className="item-display">
                {filteredData.map((item) => (
                    <Item key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Home;
