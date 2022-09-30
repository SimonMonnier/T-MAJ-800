import { MouseEvent, useContext, useState } from "react";
import "../css/Subscriptions.css";
import "../css/payment.css";
import { useLocation } from "react-router-dom";
import CreditCard from '../components/CreditCard';

type LocationState = {
    subPrice: string
}

function PaymentView(): JSX.Element {
    const location = useLocation();

    const { subPrice } = location.state as LocationState;
    console.log("subPrice: ", subPrice);

    // const handleChoosingSub = async (param: any) => {
    //     console.log("state: ", state);
    // };

    return <>
        <div className="Payment">
            <h1 style={{ textTransform: 'uppercase' }}>Payment Page</h1>
            <CreditCard  data={subPrice}/>
        </div>
    </>
}

export default PaymentView;