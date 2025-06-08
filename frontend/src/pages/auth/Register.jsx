import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone, Contact } from "lucide-react";

import Card from "../../components/common/Card";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";

import { useNotification } from "../../contexts/NotificationContext";
import { authService } from "../../services/api";

import {
  validateEmail,
  validateRequired,
  validateMinLength,
  validatePhone,
} from "../../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [form, setForm] = useState({
    nombre: "",      // Cambiar a 'nombre' para coincidir con la BD
    dni: "",
    email: "",
    telefono: "",    // Cambiar a 'telefono'
    direccion: "",   // Agregar dirección (opcional)
    password: "",
    confirmPassword: "",
  });

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

    const nombreValidation = validateRequired(form.nombre, "El nombre");
    if (nombreValidation !== true) newErrors.nombre = nombreValidation;

    const dniValidation = validateRequired(form.dni, "El DNI");
    if (dniValidation !== true) newErrors.dni = dniValidation;

    const emailValidation = validateEmail(form.email);
    if (emailValidation !== true) newErrors.email = emailValidation;

    const telefonoValidation = validatePhone(form.telefono);
    if (telefonoValidation !== true) newErrors.telefono = telefonoValidation;

    const passwordValidation = validateMinLength(
      form.password,
      6,
      "La contraseña"
    );
    if (passwordValidation !== true) newErrors.password = passwordValidation;

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
      const userData = {
        nombre: form.nombre,
        dni: form.dni,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion || null,
        password: form.password,
        rol: "ciudadano" // Por defecto todos son ciudadanos
      };

      const result = await authService.register(userData);

      addNotification(
        "Registro exitoso. Por favor, inicie sesión",
        "success"
      );
      navigate("/login");
      
    } catch (error) {
      console.error('Error en registro:', error);
      
      let errorMessage = "Error al registrar usuario";
      
      if (error.message.includes('email')) {
        errorMessage = "El correo electrónico ya está registrado";
      } else if (error.message.includes('dni')) {
        errorMessage = "El DNI ya está registrado";
      }
      
      addNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <UserPlus className="h-12 w-12" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Nombre Completo"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              error={errors.nombre}
              required
              icon={<User className="h-5 w-5 text-gray-400" />}
              placeholder="Tu nombre completo"
            />

            <FormField
              label="DNI"
              id="dni"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              error={errors.dni}
              required
              icon={<Contact className="h-5 w-5 text-gray-400" />}
              placeholder="Ingrese su número de DNI"
              helper="Debe contener 8 dígitos"
            />

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
              label="Teléfono"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              error={errors.telefono}
              required
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              placeholder="9XXXXXXXX"
              helper="Formato: 9 dígitos"
            />

            <FormField
              label="Dirección (Opcional)"
              id="direccion"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              icon={<Contact className="h-5 w-5 text-gray-400" />}
              placeholder="Tu dirección"
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
              helper="Mínimo 6 caracteres"
            />

            <FormField
              label="Confirmar Contraseña"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={<UserPlus className="h-5 w-5" />}
            >
              Registrarse
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;