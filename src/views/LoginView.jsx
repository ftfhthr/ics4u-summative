import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "./LoginView.css"
import { useStoreContext } from "../context/index.jsx";

const LoginView = () => {
    const { setEmail } = useStoreContext();
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        if (pass == "iloveyou") {
            navigate("/movies");
        } else {
            alert("Wrong Password!");
        }
        setEmail(e.target.email.value);
    }

    return (
        <div>
            <Header />
            <div className="form-container">
                <form className="form" onSubmit={(e) => { login(e) }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={pass} onChange={(event) => { setPass(event.target.value) }} required />
                    <input type="submit" value={"Log In"} required />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView;