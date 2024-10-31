import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/schema";
import InputField from "./ImputField";

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
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
        id="username"
        label="Nombre de Usuario"
        type="text"
        register={register("username")}
        error={errors.username}
      />
      <InputField
        id="password"
        label="Contraseña"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <InputField
        id="confirmPassword"
        label="Confirmar Contraseña"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
