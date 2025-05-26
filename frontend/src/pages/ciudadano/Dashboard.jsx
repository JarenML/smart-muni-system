import React from "react";
import Card from "../../components/common/Card";
import { ClipboardList, FileText, Bell } from "lucide-react";

const mockUserDashboard = {
  solicitudes: 3,
  cvs: 1,
  notificaciones: 2,
};

const Dashboard = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Bienvenido a tu Panel de Usuario
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        <Card className="flex flex-col items-center justify-center py-8">
          <ClipboardList className="h-10 w-10 text-blue-600 mb-2" />
          <h2 className="text-lg font-semibold">Mis Solicitudes</h2>
          <p className="text-3xl font-bold text-blue-600">
            {mockUserDashboard.solicitudes}
          </p>
          <span className="text-sm text-gray-500">Trámites en curso</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-8">
          <FileText className="h-10 w-10 text-green-600 mb-2" />
          <h2 className="text-lg font-semibold">CVs Subidos</h2>
          <p className="text-3xl font-bold text-green-600">
            {mockUserDashboard.cvs}
          </p>
          <span className="text-sm text-gray-500">Documentos registrados</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-8">
          <Bell className="h-10 w-10 text-yellow-600 mb-2" />
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {mockUserDashboard.notificaciones}
          </p>
          <span className="text-sm text-gray-500">Mensajes nuevos</span>
        </Card>
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Bienvenido/a</h3>
          <p className="text-gray-700">
            Desde este panel podrás gestionar tus solicitudes, cargar y
            visualizar tu CV, y recibir notificaciones importantes de la
            municipalidad. Usa el menú para navegar y accede a todas las
            funcionalidades disponibles para los ciudadanos.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
