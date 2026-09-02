import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUserData] = useState({
        name: "Ruan"
    });

    function deleteUser() {
        setUserData({});
    }

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