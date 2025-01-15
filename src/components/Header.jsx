import { useNavigate } from "react-router-dom";
import logo from "../assets/321.png";
import { useStoreContext } from "../context";
import "./Header.css"

const Header = () => {
    const { user } = useStoreContext();
    const navigate = useNavigate();

    const loginButtons = () => {
        if (user.email == null) {
            return (
                <>
                    <a href="/login">Log In</a>
                    <a href="/register">Sign Up</a>
                </>
            )
        } else {
            return (
                <>
                    <p>{`Hello, ${(user.displayName.split(" "))[0]}!`}</p>
                    <button onClick={() => navigate("/cart")}>Cart</button>
                    <button onClick={() => navigate("/settings")}>Settings</button>
                    <a href="/">Log Out</a>
                </>
            )
        }
    }

    return (
        <div className="header">
            <a href="/">
                <img src={logo} alt="321 Movies Logo" />
            </a>
            <div className="navbar-container">
                {loginButtons()}
            </div>
        </div>
    );
}

export default Header;