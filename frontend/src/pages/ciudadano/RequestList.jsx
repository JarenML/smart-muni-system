import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FilePlus } from "lucide-react";
import RequestFilters from "../../components/admin/RequestFilters"; // ✅ corregido
import RequestTable from "../../components/ciudadano/RequestTable";
import Button from "../../components/common/Button";
import { useRequest } from "../../contexts/RequestContext";

const RequestList = () => {
  const { requests, loading, error } = useRequest();
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    type: "",
  });

  // Apply filters when requests or filters change
  useEffect(() => {
    if (!requests) return;

    let result = [...requests];

    // Filter by search term
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

    // Filter by status
    if (filters.status) {
      result = result.filter((req) => req.status === filters.status);
    }

    // Filter by priority
    if (filters.priority) {
      result = result.filter((req) => req.priority === filters.priority);
    }

    // Filter by type
    if (filters.type) {
      result = result.filter((req) => req.type === filters.type);
    }

    setFilteredRequests(result);
  }, [requests, filters]);

  // Clear all filters
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
            Mis Tramites 
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

export default RequestList;
