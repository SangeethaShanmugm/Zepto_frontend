import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../global";
import Item from "./Item";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
    const [itemData, setItemData] = useState([]);
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
            <div className="item-display">
                {itemData.map((item) => (
                    <Item key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Home;
