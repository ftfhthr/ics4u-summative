import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import "./SettingsView.css"
import { doc, setDoc } from "firebase/firestore"; 
import { updateProfile } from "firebase/auth"; 
import { firestore } from "../firebase/index.js"

const SettingsView = () => {
    const { user } = useStoreContext();
    const { genres, setGenres } = useStoreContext();
    const navigate = useNavigate();
    var checkedGenres = JSON.parse(JSON.stringify(genres));

    const checkGenres = () => {
        var genresSelected = 0;
        for (var genre of checkedGenres) {
            if (genre.checked) {
                genresSelected += 1;
            }
        }
        if (genresSelected < 10) {
            return false;
        } else {
            return true;
        }
    }


    const updateSettings = (e) => {
        e.preventDefault();
        if (!checkGenres()) {
            alert("Choose at least 10 genres!");
        } else {
            changeName(e.target.firstname.value, e.target.lastname.value);
            updateGenres(JSON.parse(JSON.stringify(checkedGenres)));
        }
    }
    
    const changeName = async (firstName, lastName) => {
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
    }
    
    const updateGenres = async (newGenres) => {
        setGenres(newGenres);
        await setDoc(doc(firestore, "users", user.uid), {
            genres: newGenres
        });
    }

    const setCheckedGenres = (e) => {
        for (var i = 0; i < genres.length; i++) {
            if (e.target.id == genres[i].id) {
                if (e.target.checked) {
                    checkedGenres[i].checked = true;
                } else {
                    checkedGenres[i].checked = false;
                }
            }
        }
    }

    return (
        <>
            <Header />
            <div className="settings-view">
                <div className="form-container">
                    <div className="form">
                        <form onSubmit={(e) => updateSettings(e)}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" readOnly value={user.email} />
                            <label htmlFor="first-name">First Name:</label>
                            <input type="text" name="firstname" defaultValue={(user.displayName.split(" "))[0]} required />
                            <label htmlFor="last-name">Last Name:</label>
                            <input type="text" name="lastname" defaultValue={(user.displayName.split(" "))[1]} required />
                            {genres.map((genre) => (
                                <div key={genre.id} className="genre-checkbox">
                                    <input type="checkbox" id={genre.id} defaultChecked={genre.checked} onChange={(event) => setCheckedGenres(event)} />
                                    <label htmlFor={genre.genre}>{genre.genre}</label>
                                </div>
                            ))}
                            <input type="submit" value={"Save Settings"} required />
                        </form>
                        <button onClick={() => navigate("/movies")}>Back</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SettingsView;