import { createContext, useState, useContext, useEffect } from "react";
import { fromJS, Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState({});
    // const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genres, setGenres] = useState([
        {
            genre: "Action",
            id: 28,
            checked: false
        },
        {
            genre: "Crime",
            id: 80,
            checked: false
        },
        {
            genre: "Family",
            id: 10751,
            checked: false
        },
        {
            genre: "Science Fiction",
            id: 878,
            checked: false
        },
        {
            genre: "Adventure",
            id: 12,
            checked: false
        },
        {
            genre: "Fantasy",
            id: 14,
            checked: false
        },
        {
            genre: "War",
            id: 10752,
            checked: false
        },
        {
            genre: "Animation",
            id: 16,
            checked: false
        },
        {
            genre: "History",
            id: 36,
            checked: false
        },
        {
            genre: "Thriller",
            id: 53,
            checked: false
        },
        {
            genre: "Comedy",
            id: 35,
            checked: false
        }
    ]);
    // const [cart, setCart] = useState(Map());
    console.log(fromJS(JSON.parse(localStorage.getItem("cart"))));
    const [cart, setCart] = useState(fromJS(JSON.parse(localStorage.getItem("cart"))));

    useEffect(() => {
        // setCart(fromJS(JSON.parse(localStorage.getItem("cart"))));
        const localCart = JSON.parse(localStorage.getItem("cart"));
        const map = Map()
        for (const key in localCart) {
            setCart(map.set(key, localCart[key]));
        }
        console.log(cart);
    }, []);

    return (
        <StoreContext.Provider value={{ user, setUser, firstName, setFirstName, lastName, setLastName, genres, setGenres, cart, setCart }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}