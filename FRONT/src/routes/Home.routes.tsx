import { Route, Routes } from "react-router-dom";
import HomeView from "../views/Home";
import LibraryView from "../views/Library";


function HomeRoute(): JSX.Element {
    return <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/item/:id" element={<LibraryView />} />
    </Routes>
}

export default HomeRoute;