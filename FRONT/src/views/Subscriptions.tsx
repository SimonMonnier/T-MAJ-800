import { MouseEvent, useContext, useState } from "react";
import "../css/Subscriptions.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Routes, Route, useNavigate} from 'react-router-dom';


function SubscriptionsView(): JSX.Element {
    const navigate = useNavigate();

    // const handleSubmitLogin = async (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();

    //     var { login_email, login_password } = document.forms[1];

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email: login_email.value, password: login_password.value })
    //     };

    //     const tmp = await fetch(`http://a9b2-195-78-24-234.ngrok.io/login`, requestOptions);

    //     const response = await tmp.json();
    //     console.log(response);
    //     if (response.status === "OK") {
    //         setIsActive(false);
    //         SetUser(response);
    //         localStorage.setItem("User", response);

    //     } else if (response.status === "KO" && response.message === "Email déjà utilisé pour un autre compte") {
    //         console.log(response);
    //     }
    // };

    // const handleSubmitRegister = async (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();

    //     var { register_pseudo, register_email, register_password } = document.forms[0];

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ pseudo: register_pseudo.value, email: register_email.value, password: register_password.value })
    //     };

    //     const tmp = await fetch(`http://a9b2-195-78-24-234.ngrok.io/register`, requestOptions);

    //     const response = await tmp.json();
    //     console.log(response);
    //     if (response.status === "OK") {
    //         SwitchSignIn();
    //     } else if (response.status === "KO" && response.message === "Email déjà utilisé pour un autre compte") {
    //         console.log(response.message);
    //     }
    // };

    const handleChoosingSub = async (params: any) => {
        console.log("Sub choosing: ", params);
        let subPrice = "";
        if (params === 1)
            subPrice = "4.99";
        else if(params === 2)
            subPrice = "14.99";
        else if(params === 3)
            subPrice = "39.99";
        navigate("/payment", {
            state: {
              "subPrice": subPrice
            }
        });
    };

    return <>
        <div>
            <h1 style={{ textTransform: 'uppercase' }}>Now Choose your subscription type</h1>
            <Card className="SubCard" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h2">
                        Monthly
                    </Typography>
                    <Typography variant="h3">
                        4.99€
                    </Typography>
                    <Typography variant="h4">
                        Six month commitment
                    </Typography>
                </CardContent>
                <CardActions style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button className="myButton" onClick={() => handleChoosingSub(1)}>Choose</Button>
                </CardActions>
            </Card>
            <Card className="SubCard" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h2">
                        Half-yearly
                    </Typography>
                    <Typography variant="h3">
                        14.99€
                    </Typography>
                    <Typography variant="h4">
                        Without engagement
                    </Typography>
                </CardContent>
                <CardActions style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button className="myButton" onClick={() => handleChoosingSub(2)}>Choose</Button>
                </CardActions>
            </Card>
            <Card className="SubCard" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h2">
                        Annual
                    </Typography>
                    <Typography variant="h3">
                        39.99€
                    </Typography>
                    <Typography variant="h4">
                        2 months free
                    </Typography>
                </CardContent>
                <CardActions style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button className="myButton" onClick={() => handleChoosingSub(3)}>Choose</Button>
                </CardActions>
            </Card>
        </div>
    </>
}

export default SubscriptionsView;