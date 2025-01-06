import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useStoreContext } from "../context/index.jsx";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const RegisterView = () => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const { setUser } = useStoreContext();
    const { email, setEmail } = useStoreContext();
    const { firstName, setFirstName } = useStoreContext();
    const { lastName, setLastName } = useStoreContext();
    const { genres, setGenres } = useStoreContext();
    const navigate = useNavigate();
    var checkedGenres = JSON.parse(JSON.stringify(genres));

    const checkGenres = () => {
        var genresSelected = 0;
        for (var genre of genres) {
            if (genre.checked) {
                genresSelected++;
            }
        }
        // if (genresSelected < 10) {
        //     return false;
        // } else {
            return true;
        // }
    }

    const registerByEmail = async (event) => {
        event.preventDefault();
    
        // try {
          const user = (await createUserWithEmailAndPassword(auth, "a@a.com", "123456")).user;
          await updateProfile(user, { displayName: `${firstName} ${lastName}` });
          setUser(user);
          navigate('/movies');
        // } catch (error) {
        //   alert("Error creating user with email and password!");
        // }
    };

    const registerByGoogle = async () => {
        try {
          const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
          setUser(user);
          navigate('/movies');
        } catch {
          alert("Error creating user with email and password!");
        }
    }

    const createAccount = (e) => {
        e.preventDefault();
        registerByEmail(e);
        if (pass1 != pass2) {
            alert("Passwords don't match!");
        } else if (!checkGenres()) {
            alert("Choose at least 10 genres!")
        } else {
            setFirstName(e.target.firstname.value);
            setLastName(e.target.lastname.value);
            setEmail(e.target.email.value);
            navigate("/movies");
        }
    }

    const setCheckedGenres = (e) => {
        checkedGenres = JSON.parse(JSON.stringify(genres));
        for (var i = 0; i < genres.length; i++) {
            if (e.target.id == genres[i].id) {
                if (e.target.checked) {
                    checkedGenres[i].checked = true;
                } else {
                    checkedGenres[i].checked = false;
                }
            }
        }
        setGenres(JSON.parse(JSON.stringify(checkedGenres)));
    }

    return (
        <div>
            <Header />
            <div className="form-container">
                <form className="form" onSubmit={(e) => createAccount(e)}>
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" id="firstname" required />
                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" id="lastname" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="pass" value={pass1} onChange={(event) => { setPass1(event.target.value) }} required />
                    <label htmlFor="reenter-pass">Re-enter Password:</label>
                    <input type="password" id="reenter-pass" value={pass2} onChange={(event) => { setPass2(event.target.value) }} required />
                    {genres.map((genre) => (
                        <div key={genre.id} className="genre-checkbox">
                            <input type="checkbox" id={genre.id} defaultChecked={genre.checked} onChange={(event) => setCheckedGenres(event)} />
                            <label htmlFor={genre.genre}>{genre.genre}</label>
                        </div>
                    ))}
                    <button onClick={() => registerByGoogle()} className="register-button">Register by Google</button>
                    <input type="submit" value={"Sign Up"} required />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterView;