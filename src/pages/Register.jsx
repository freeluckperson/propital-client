import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registro exitoso. Redirigiendo a la página principal...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Espera de 2 segundos para mostrar el mensaje
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al registrar";
      console.error("Error al registrar:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Registrarse
        </h2>
        <RegisterForm onSubmit={onSubmit} />
        <div className="text-sm text-center text-gray-500">
          ¿Tienes una cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
