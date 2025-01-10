import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "./LoginView.css"
import { useStoreContext } from "../context/index.jsx";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { firestore } from "../firebase/index.js"

const LoginView = () => {
    const { setUser } = useStoreContext();
    const { setGenres } = useStoreContext();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const readGenreList = async () => {
    }
    
    const login = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = (await signInWithEmailAndPassword(auth, email, pass)).user;
        setUser(user);
        const docRef = doc(firestore, "users", user.uid);
        const data = (await getDoc(docRef)).data();
        setGenres(data.genres);
        readGenreList();
        navigate("/movies");
    }

    return (
        <div>
            <Header />
            <div className="form-container">
                <form className="form" onSubmit={(e) => { login(e) }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={email} onChange={(event) => { setEmail(event.target.value) }} required />
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