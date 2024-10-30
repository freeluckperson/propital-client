import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const registerSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La confirmación debe tener al menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, username, password } = data;
      await axios.post(`${api_base_url}/register`, { email, username, password });
      toast.success("Registro exitoso. Redirigiendo a la página principal...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Espera de 2 segundos para mostrar el mensaje
    } catch (error) {
      console.error("Error al registrar:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Registrarse</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
