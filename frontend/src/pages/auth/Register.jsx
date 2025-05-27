import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone, Contact } from "lucide-react";

import Card from "../../components/common/Card";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";

import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

import {
  validateEmail,
  validateRequired,
  validateMinLength,
  validatePhone,
} from "../../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addNotification } = useNotification();

  const [form, setForm] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
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

    const nameValidation = validateRequired(form.name, "El nombre");
    if (nameValidation !== true) newErrors.name = nameValidation;

    const dniValidation = validateRequired(form.dni, "El DNI");
    if (dniValidation !== true) newErrors.dni = dniValidation;

    const emailValidation = validateEmail(form.email);
    if (emailValidation !== true) newErrors.email = emailValidation;

    const phoneValidation = validatePhone(form.phone);
    if (phoneValidation !== true) newErrors.phone = phoneValidation;

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
      const result = await register({
        name: form.name,
        dni: form.dni,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (result.success) {
        addNotification(
          "Registro exitoso. Por favor, inicie sesión",
          "success"
        );
        navigate("/login");
      } else {
        addNotification(result.error || "Error al registrar usuario", "error");
      }
    } catch (err) {
      addNotification("Error al registrar usuario", "error");
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
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
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
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              placeholder="9XXXXXXXX"
              helper="Formato: 9 dígitos"
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
