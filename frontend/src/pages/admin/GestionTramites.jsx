import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FilePlus } from "lucide-react";

import RequestFilters from "../../components/admin/RequestFilters";
import RequestTable from "../../components/ciudadano/RequestTable"; // <- aquí cambio de admin a ciudadano
import Button from "../../components/common/Button";

import { useRequest } from "../../contexts/RequestContext";

const GestionTramites = () => {
  const { requests, loading, error } = useRequest();
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    type: "",
  });

  useEffect(() => {
    if (!requests) return;

    let result = [...requests];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (req) =>
          req.title.toLowerCase().includes(searchLower) ||
          req.citizenName.toLowerCase().includes(searchLower) ||
          req.citizenEmail.toLowerCase().includes(searchLower) ||
          req.type.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      result = result.filter((req) => req.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((req) => req.priority === filters.priority);
    }

    if (filters.type) {
      result = result.filter((req) => req.type === filters.type);
    }

    setFilteredRequests(result);
  }, [requests, filters]);

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      type: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Trámites Ciudadanos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestione todos los trámites municipales en un solo lugar
          </p>
        </div>
      </div>

      <RequestFilters
        filters={filters}
        setFilters={setFilters}
        onClearFilters={handleClearFilters}
      />

      <RequestTable
        requests={filteredRequests}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default GestionTramites;
