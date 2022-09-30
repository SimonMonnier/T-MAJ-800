import { Route, Routes } from "react-router-dom";
import SubscriptionsView from "../views/Subscriptions";


function SubscriptionsRoute(): JSX.Element {
    return <Routes>
        <Route path="/subscriptions" element={<SubscriptionsView />} />
    </Routes>
}

export default SubscriptionsRoute;