import { useState } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import logo from '../assets/img/logo.svg'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate();
    const [FormData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (errorMessage !== "") {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleChange = e => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();

        userServices.login(FormData)
            .then(data => {
                if (!data) {
                    setErrorMessage("Credenciales incorrectas");
                } else {
                    navigate("/private");

                }
            });
    };
    return (

        <div className="container my-2">
            <div className="row justify-content-center">



                <div className="col-md-6 col-lg-4 p-0 border rounded shadow text-center">
                    <div className="col-sm  fs-5 mb-4 px-3 py-2 text-white bg-blue text-start">Login</div>
                    <img
                        src={logo}
                        alt="Chef Logo"
                        className="mg-fluid mt-2 mb-1"

                    />
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}


                    <form onSubmit={handleSubmit} className='m-4'>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="username"
                                className="form-control"
                                placeholder="Enter your email"
                                value={FormData.email}
                                onChange={handleChange}
                            />
                            <small className="text-muted">Your unique username</small>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={FormData.password}
                                onChange={handleChange}
                            />
                            <small className="text-muted">Your secure password</small>
                        </div>

                        <button type="submit" className="btn bg-blue text-white w-100">
                            Login
                        </button>
                        <div className="mt-2 mb-5 text-muted">Forgot Password?</div>
                    </form>


                </div>
            </div>
        </div>

    )
}