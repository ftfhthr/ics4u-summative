import { Link } from "react-router-dom";
import "./Genres.css"
import { useStoreContext } from "../context";
import { doc, getDoc } from "firebase/firestore"; 
import { firestore } from "../firebase/index.js"

const Genres = () => {
    const { user } = useStoreContext();
    const { genres } = useStoreContext();

    const readGenreList = async () => {
        const docRef = doc(firestore, "users", user.uid);
        const data = (await getDoc(docRef)).data();
        // const a = Map(data);
        console.log(docRef);
        console.log(data);
        return data;
    }

    readGenreList();
    return (
        <div className="genres">
            {genres.map((genre) => {
                if (genre.checked) {
                    return <Link key={genre.id} to={`/movies/genre/${genre.id}`}>{genre.genre}</Link>
                }
            })}
            <a href="/">Log Out</a>
        </div>
    )
}

export default Genres;