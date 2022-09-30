import { Route, Routes } from "react-router-dom";
import PaymentView from "../views/Payment";


function PaymentRoute(): JSX.Element {
    return <Routes>
        <Route path="/payment" element={<PaymentView />} />
    </Routes>
}

export default PaymentRoute;