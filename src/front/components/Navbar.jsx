import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };
	
	useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
}, [location.pathname]);

    return (
        <nav className="navbar bg-dark px-4">
            {isLoggedIn && (
                <button className="btn btn-danger ms-auto" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
};
