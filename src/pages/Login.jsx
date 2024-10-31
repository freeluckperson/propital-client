import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const responseData = await loginUser(data);
      toast.success("Login correcto");
      sessionStorage.setItem("jwtToken", responseData.token);
      sessionStorage.setItem("userId", responseData.id);
      navigate("/notifications");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      console.error("Error al iniciar sesión:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h2>
        <LoginForm onSubmit={onSubmit} />
        <div className="text-sm text-center text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
