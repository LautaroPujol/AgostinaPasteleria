import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/Product";
import { setToken } from "../../api/Config";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpiamos el error anterior antes de intentar

    try {
      // Llamamos a la función centralizada en api/products.js
      const data = await loginAdmin(email, password);

      if (data.status === "success") {
        // Guardamos el token JWT en localStorage
        setToken(data.token);
        // Redirigimos al panel de admin
        navigate("/admin");
      } else {
        setError("Email o contraseña incorrectos");
      }
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4" style={{ color: "#004d55" }}>
          Acceso Admin
        </h2>
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
          {/* Mostramos el error solo si existe */}
          {error && <p className="text-danger text-center">{error}</p>}
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#f2a88d",
              color: "#004d55",
              fontWeight: "bold",
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;