import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/schema";
import InputField from "./ImputField";

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <InputField
        id="email"
        label="Correo Electrónico"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        id="password"
        label="Contraseña"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
