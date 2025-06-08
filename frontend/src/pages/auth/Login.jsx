import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

import Card from "../../components/common/Card";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";

import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

import { validateEmail, validateRequired } from "../../utils/validators";

const Login = () => {
  const navigate = useNavigate();

  // Usar directamente el login del AuthContext en lugar de authService
  const { login } = useAuth();
  const { addNotification } = useNotification();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailValidation = validateEmail(form.email);
    if (emailValidation !== true) {
      newErrors.email = emailValidation;
    }

    const passwordValidation = validateRequired(form.password, "La contraseña");
    if (passwordValidation !== true) {
      newErrors.password = passwordValidation;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification(
        "Por favor, corrija los errores en el formulario",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      console.log('🔍 Starting login process...');
      
      // Usar el login del AuthContext que ya maneja todo
      const result = await login(form.email, form.password);
      
      console.log('🔍 Login result received:', result);

      if (result.success) {
        addNotification("Inicio de sesión exitoso", "success");
        
        console.log('🔍 Navigating to dashboard...');
        
        // Pequeña pausa para asegurar que el state se actualice
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
        
      } else {
        addNotification(result.error || "Credenciales incorrectas", "error");
      }

    } catch (error) {
      console.error('Error en login:', error);
      addNotification("Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <LogIn className="h-12 w-12" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Correo Electrónico"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="correo@ejemplo.com"
            />

            <FormField
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
              icon={<LogIn className="h-5 w-5" />}
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800">
              <strong>💡 Tip:</strong> Usa las credenciales de cualquier usuario que hayas registrado anteriormente.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;