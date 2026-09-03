import { createContext, useEffect, useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const UserContext = createContext();
const defaultUserData = {
    name: "Not logged",
    email: "Not logged"
}

function UserProvider({ children }) {
    const [user, setUserData] = useState(defaultUserData);

    function deleteUser() {
        setUserData(defaultUserData);
    }

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${backendURL}/user/data`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                const data = await response.json();

                setUserData(data.name ? data : defaultUserData);
            } catch (err) {
                deleteUser()
            }
        }

        getUserData()
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUserData,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };