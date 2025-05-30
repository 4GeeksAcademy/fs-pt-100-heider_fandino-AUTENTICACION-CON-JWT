import { Link } from "react-router-dom";
import { Login } from "../components/Login";

export const LoginPage = () => {

    return(
        <>
        <Login/>
        <Link className= " m-0 d-flex justify-content-center "to="/register"> Necesitas una cuenta?</Link>
        </>
    )
}
