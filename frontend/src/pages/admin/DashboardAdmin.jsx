import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  FilePlus,
  UserPlus,
} from "lucide-react";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import StatCard from "../../components/admin/StatCard";
import RecentRequestsTable from "../../components/admin/RecentRequestsTable";
import RecentResumesTable from "../../components/admin/RecentResumesTable";
import DashboardCharts from "../../components/admin/DashboardCharts";

import { useRequest } from "../../contexts/RequestContext";
import { useResume } from "../../contexts/ResumeContext";

const Dashboard = () => {
  const { requests, loading: requestsLoading } = useRequest();
  const { resumes, loading: resumesLoading } = useResume();

  // Calculate stats
  const pendingRequests = requests.filter(
    (req) => req.status === "pending"
  ).length;
  const approvedRequests = requests.filter(
    (req) => req.status === "approved"
  ).length;
  const rejectedRequests = requests.filter(
    (req) => req.status === "rejected"
  ).length;

  const pendingResumes = resumes.filter(
    (res) => res.status === "pending"
  ).length;
  const approvedResumes = resumes.filter(
    (res) => res.status === "approved"
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-10">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Bienvenido al Sistema de Gestión Municipal
          </h1>
          <p className="mt-2 text-blue-100">
            Plataforma integral para la gestión de trámites ciudadanos y
            selección de personal mediante inteligencia artificial.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de tramites"
          value={pendingRequests}
          icon={<FileText className="h-6 w-6" />}
          footer={
            <Link
              to="/tramites?status=pending"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Ver todos los tramites
            </Link>
          }
        />

        <StatCard
          title="Trámites Resueltos"
          value={approvedRequests}
          icon={<CheckCircle className="h-6 w-6" />}
        />

        <StatCard
          title="Trámites Rechazados"
          value={rejectedRequests}
          icon={<AlertTriangle className="h-6 w-6" />}
        />

        <StatCard
          title="Total de Currículos"
          value={pendingResumes}
          icon={<Users className="h-6 w-6" />}
          footer={
            <Link
              to="/curriculos?status=pending"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Ver currículos pendientes
            </Link>
          }
        />
      </div>

      {/* Charts */}
      <DashboardCharts requestsData={requests} resumesData={resumes} />

      {/* Recent Requests */}
      <Card
        title="Trámites Recientes"
        footer={
          <Link
            to="/tramites"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos los trámites
          </Link>
        }
      >
        <RecentRequestsTable requests={requests} loading={requestsLoading} />
      </Card>

      {/* Recent Resumes */}
      <Card
        title="Currículos Recientes"
        footer={
          <Link
            to="/curriculos"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos los currículos
          </Link>
        }
      >
        <RecentResumesTable resumes={resumes} loading={resumesLoading} />
      </Card>
    </div>
  );
};

export default Dashboard;
