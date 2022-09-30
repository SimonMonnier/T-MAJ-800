import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFunctionExpression } from "typescript";
import { UserContext } from "../core/provider/user";

import "../css/Authentification.css";

function LoginView(): JSX.Element {
    const [isActive, setIsActive] = useState(false);
    const {SetUser} = useContext(UserContext);
    const navigate = useNavigate();

    function SwitchSignUp() {
        setIsActive(true);
    }

    function SwitchSignIn() {
        setIsActive(false);
    }

    const handleSubmitLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        var { login_email, login_password } = document.forms[1];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: login_email.value, password: login_password.value })
        };

        const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/login`, requestOptions);

        const response = await tmp.json();
        console.log(response);
        if (response.status === "OK") {
            setIsActive(false);
            SetUser(response);
            localStorage.setItem("User", response);
            
        } else if (response.status === "KO" && response.message === "Email déjà utilisé pour un autre compte") {
            console.log(response);
        }
    };

    const handleSubmitRegister = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        var { register_pseudo, register_email, register_password } = document.forms[0];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudo: register_pseudo.value, email: register_email.value, password: register_password.value })
        };

        const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/register`, requestOptions);

        const response = await tmp.json();
        console.log(response);
        if (response.status === "OK") {
            navigate("/subscriptions");
        } else if (response.status === "KO" && response.message === "Email déjà utilisé pour un autre compte") {
            console.log(response.message);
        }
    };

    return <>
        <div className={`container ${isActive ? "right-panel-active" : ""}`} id="container">
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <input name="register_pseudo" type="text" placeholder="Pseudo" />
                    <input name="register_email" type="email" placeholder="Email" />
                    <input name="register_password" type="password" placeholder="Password" />
                    <button onClick={handleSubmitRegister}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <input name="login_email" type="email" placeholder="Email" />
                    <input name="login_password" type="password" placeholder="Password" />
                    <p>Forgot your password?</p>
                    <button onClick={handleSubmitLogin}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={SwitchSignIn}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={SwitchSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default LoginView;