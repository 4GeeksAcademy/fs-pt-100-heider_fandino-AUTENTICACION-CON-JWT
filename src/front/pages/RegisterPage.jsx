import { Link } from "react-router-dom";
import { Register } from "../components/register";

export const RegisterPage = () => {

    return(
        <>
        
        <Register/>
        <Link className="m-0 d-flex justify-content-center" to="/login"> Ya tienes cuenta? </Link>
       
        
        </>
    )
}
