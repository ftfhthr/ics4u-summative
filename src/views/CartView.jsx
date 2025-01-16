import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStoreContext } from "../context"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartView.css";
import { firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const CartView = () => {
    const { user } = useStoreContext();
    const { cart, setCart } = useStoreContext();
    const { purchases, setPurchases } = useStoreContext();
    const navigate = useNavigate();

    const checkout = async () => {
        const localCart = JSON.parse(localStorage.getItem("cart"));
        for (const key in localCart) {
            setPurchases((prev) => prev.set(key, JSON.parse(JSON.stringify(localCart[key]))));
        }
        await updateDoc(doc(firestore, "users", user.uid), {
            purchasedMovies: purchases.toJS()
        });
    }

    const removeItem = (key) => {
        setCart((prevCart) => prevCart.delete(key));
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    });

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
                <button onClick={() => checkout()}>Checkout</button>
                <button onClick={() => navigate("/movies")}>Back</button>
            </div>
            <Footer />
        </>
    )
}

export default CartView;