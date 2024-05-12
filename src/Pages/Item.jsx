
import { Card, Button } from 'antd';
import { addToCart } from "../redux/itemSlice"
import { useDispatch } from 'react-redux';

const { Meta } = Card;

function Item({ item }) {
    const dispatch = useDispatch()

    const handleAddCart = (item) => {
        console.log("Added to Cart")
        dispatch(addToCart(item))
    }
    return (
        <div>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt={item.name} src={item.image} />}
            >
                <Meta title={item.name} />
                <h4>Price: Rs. {item.price}</h4>
                <Button type="primary" onClick={() => handleAddCart(item)}>Add to Cart</Button>
            </Card>
        </div>
    )
}

export default Item