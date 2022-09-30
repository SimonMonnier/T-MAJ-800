import { createContext, useEffect, useState } from "react";

interface UserContextType {
    user: any;
    SetUser: Function
}

export const UserContext = createContext<UserContextType>({ user: null, SetUser: () => {} });

function UserProvider(props: any) {
    const [User, SetUser] = useState(null);

    useEffect(() => {
        function GetUserLocalStorage() {
            const user = localStorage.getItem("User");
            return user;
        }

        const user = GetUserLocalStorage();
        
        if (user == null) {
            SetUser(user);
        }
        
        console.log("user");
        console.log(user);
    }, [])
    return <UserContext.Provider value={{ user: User, SetUser: SetUser }}>{props.children}</UserContext.Provider>
}

export default UserProvider;