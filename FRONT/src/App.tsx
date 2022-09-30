import { useContext } from "react";
import { UserContext } from "./core/provider/user";
import AuthentificationRoute from "./routes/Authentification.routes";
import HomeRoute from "./routes/Home.routes";

function App() {
  const { user } = useContext(UserContext);
  
  if (user === null) {
    return <>
      <AuthentificationRoute />
    </>
  } else {
    return <>
      <HomeRoute />
    </>
  }

}

export default App;