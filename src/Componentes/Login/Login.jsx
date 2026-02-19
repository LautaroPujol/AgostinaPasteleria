import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/Config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Si entra bien, la mandamos al panel de control (que haremos luego)
                console.log("Logueado:", userCredential.user);
                navigate("/admin"); 
            })
            .catch((error) => {
                setError("Email o contraseña incorrectos");
                console.error(error);
            });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{maxWidth: "400px", width: "100%"}}>
                <h2 className="text-center mb-4" style={{color: "#004d55"}}>Acceso Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <button type="submit" className="btn w-100" style={{backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold"}}>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;