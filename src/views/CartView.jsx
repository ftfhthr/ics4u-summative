import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStoreContext } from "../context"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartView.css";

const CartView = () => {
    const { cart, setCart } = useStoreContext();
    const navigate = useNavigate();

    const removeItem = (key) => {
        setCart((prevCart) => prevCart.delete(key));
    }

    // useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // });
    console.log(cart);

    return (
        <>
            <Header />
            <div className="cart-view">
                <div className="item-container">
                    {cart.entrySeq().map(([key, value]) => {
                        return (
                            <div className="cart-item" key={key}>
                                <p key={key}>{value.title}</p>
                                <img className="movie-poster" src={value.url} alt="" />
                                <button onClick={() => removeItem(key)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => navigate("/movies")}>Back</button>
            </div>
            <Footer />
        </>
    )
}

export default CartView;