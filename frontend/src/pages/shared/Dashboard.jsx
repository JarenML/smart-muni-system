import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardAdmin from "../admin/DashboardAdmin";
import DashboardCiudadano from "../ciudadano/DashboardCiudadano";
import AdminLayout from "../../components/layout/AdminLayout";
import CiudadanoLayout from "../../components/layout/CiudadanoLayout";

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return (
      <AdminLayout>
        <DashboardAdmin />
      </AdminLayout>
    );
  }

  if (user?.role === "ciudadano") {
    return (
      <CiudadanoLayout>
        <DashboardCiudadano />
      </CiudadanoLayout>
    );
  }

  return (
    <div className="text-center text-red-600 py-10 font-semibold">
      Acceso no autorizado
    </div>
  );
};

export default Dashboard;
