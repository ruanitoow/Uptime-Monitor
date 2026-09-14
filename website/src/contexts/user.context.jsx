import { createContext, useEffect, useState } from "react";

let backendURL = import.meta.env.VITE_BACKEND_URL;

const UserContext = createContext();
const defaultUserData = {
    name: "Not logged",
    email: "Not logged"
}

function UserProvider({ children }) {
    const [user, setUserData] = useState(defaultUserData);
    const [terminated, setTerminated] = useState(false);

    async function deleteUser() {
        try {
            const removeToken = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            if (removeToken.ok) {
                return removeToken.message;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setUserData(defaultUserData);
        }
    }

    async function getUserData() {
        try {
            const response = await fetch(`${backendURL}/user/data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data.name ? data : defaultUserData);
        } catch (err) {
            deleteUser()
        } finally {
            setTerminated(true);
        }
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUserData,
                getUserData,
                deleteUser,
                terminated
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };