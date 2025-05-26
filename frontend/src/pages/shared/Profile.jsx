import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Key, Save, IdCard } from "lucide-react";

import Card from "../../components/common/Card";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
} from "../../utils/validators";

const Profile = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const { addNotification } = useNotification();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dni: "",
    role: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const { name, email, phone, dni, role } = user;
      setProfile({ name, email, phone, dni, role });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateProfile = () => {
    const newErrors = {};
    if (validateRequired(profile.name, "Nombre") !== true)
      newErrors.name = validateRequired(profile.name, "Nombre");
    if (validateEmail(profile.email) !== true)
      newErrors.email = validateEmail(profile.email);
    if (validatePhone(profile.phone) !== true)
      newErrors.phone = validatePhone(profile.phone);
    if (validateRequired(profile.dni, "DNI") !== true)
      newErrors.dni = validateRequired(profile.dni, "DNI");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (validateRequired(password.current, "Contraseña actual") !== true)
      newErrors.current = validateRequired(
        password.current,
        "Contraseña actual"
      );
    if (validateMinLength(password.new, 8, "Nueva contraseña") !== true)
      newErrors.new = validateMinLength(password.new, 8, "Nueva contraseña");
    if (password.new !== password.confirm)
      newErrors.confirm = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!validateProfile()) {
      addNotification(
        "Por favor, corrige los errores en el formulario",
        "error"
      );
      return;
    }

    const result = updateProfile(profile);
    if (result.success) {
      addNotification("Perfil actualizado correctamente", "success");
    } else {
      addNotification("Hubo un error al actualizar el perfil", "error");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) {
      addNotification("Corrige los errores del formulario", "error");
      return;
    }

    const result = updatePassword(password.current, password.new);
    if (result.success) {
      addNotification("Contraseña actualizada correctamente", "success");
      setPassword({ current: "", new: "", confirm: "" });
    } else {
      addNotification(
        result.error || "Error al actualizar contraseña",
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestione su información personal y contraseña
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Perfil resumido */}
        <Card className="lg:row-span-2">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <User className="h-20 w-20" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
              >
                <User className="h-4 w-4" />
              </button>
            </div>

            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{profile.role}</p>

            <div className="mt-6 w-full">
              <dl className="space-y-4">
                <InfoRow
                  icon={<Mail className="h-4 w-4 mr-2" />}
                  label="Correo"
                  value={profile.email}
                />
                <InfoRow
                  icon={<Phone className="h-4 w-4 mr-2" />}
                  label="Teléfono"
                  value={profile.phone}
                />
                <InfoRow
                  icon={<IdCard className="h-4 w-4 mr-2" />}
                  label="DNI"
                  value={profile.dni}
                />
              </dl>
            </div>
          </div>
        </Card>

        {/* Formulario de edición */}
        <Card title="Información Personal" className="lg:col-span-2">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <FormField
              label="Nombre Completo"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              error={errors.name}
              required
            />
            <FormField
              label="Correo Electrónico"
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              error={errors.email}
              required
            />
            <FormField
              label="Teléfono"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              error={errors.phone}
              required
              helper="Formato: 9XXXXXXXX"
            />
            <FormField
              label="DNI"
              id="dni"
              name="dni"
              value={profile.dni}
              onChange={handleProfileChange}
              error={errors.dni}
              required
              placeholder="Ingresa tu número de DNI"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={<Save className="h-5 w-5" />}
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>

        {/* Cambio de contraseña */}
        <Card title="Cambiar Contraseña" className="lg:col-span-2">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <FormField
              label="Contraseña Actual"
              id="current"
              name="current"
              type="password"
              value={password.current}
              onChange={handlePasswordChange}
              error={errors.current}
              required
            />
            <FormField
              label="Nueva Contraseña"
              id="new"
              name="new"
              type="password"
              value={password.new}
              onChange={handlePasswordChange}
              error={errors.new}
              required
              helper="Mínimo 8 caracteres"
            />
            <FormField
              label="Confirmar Nueva Contraseña"
              id="confirm"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
              error={errors.confirm}
              required
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={<Key className="h-5 w-5" />}
              >
                Actualizar Contraseña
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

// Componente auxiliar
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <dt className="text-sm text-gray-500 flex items-center">
      {icon} {label}:
    </dt>
    <dd className="text-sm text-gray-900">{value}</dd>
  </div>
);

export default Profile;
