import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

import ResumeFilters from "../../components/admin/ResumeFilters"; // ❌ este archivo no existe
import ResumeTable from "../../components/ciudadano/ResumeTable"; // ✅ mover al folder correcto si usas este

import Button from "../../components/common/Button";

import { useResume } from "../../contexts/ResumeContext";

const ResumeList = () => {
  const { resumes, loading, error } = useResume();
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    position: "",
    minScore: 0,
  });

  useEffect(() => {
    if (!resumes) return;

    let result = [...resumes];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (resume) =>
          resume.name.toLowerCase().includes(searchLower) ||
          resume.email.toLowerCase().includes(searchLower) ||
          resume.position.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      result = result.filter((resume) => resume.status === filters.status);
    }

    if (filters.position) {
      result = result.filter((resume) => resume.position === filters.position);
    }

    if (filters.minScore > 0) {
      result = result.filter((resume) => resume.aiScore >= filters.minScore);
    }

    setFilteredResumes(result);
  }, [resumes, filters]);

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      position: "",
      minScore: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Currículos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Evalúe candidatos con ayuda de IA para procesos de selección
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/curriculos/nuevo">
            <Button variant="primary" icon={<UserPlus className="h-5 w-5" />}>
              Subir Currículum
            </Button>
          </Link>
        </div>
      </div>

      <ResumeFilters
        filters={filters}
        setFilters={setFilters}
        onClearFilters={handleClearFilters}
      />

      <ResumeTable resumes={filteredResumes} loading={loading} error={error} />
    </div>
  );
};

export default ResumeList;
