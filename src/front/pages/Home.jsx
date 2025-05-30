import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h2>¿Quieres usar nuestros servicios?</h2>
			<Link to="/register" className="btn btn-primary m-2">Registrarse</Link>
			<h2>¿Ya tienes cuenta?</h2>
			<Link to="/login" className="btn btn-success m-2">Iniciar Sesión</Link>
		</div>
	);
};