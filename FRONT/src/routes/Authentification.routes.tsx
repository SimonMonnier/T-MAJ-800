import { Route, Routes } from "react-router-dom";

import LoginView from "../views/Login";


function AuthentificationRoute(): JSX.Element {
    return <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
    </Routes>
}

export default AuthentificationRoute;