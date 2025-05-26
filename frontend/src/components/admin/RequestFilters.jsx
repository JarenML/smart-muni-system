import React from "react";
import { Search } from "lucide-react";
import Select from "../common/Select";
import Button from "../common/Button";
import {
  statusOptions,
  priorityOptions,
  requestTypes,
} from "../../utils/mockData";

const RequestFilters = ({ filters, setFilters, onClearFilters }) => {
  // Prepare options for selects
  const statusSelectOptions = [
    { value: "", label: "Todos los estados" },
    ...statusOptions.map((status) => ({
      value: status.value,
      label: status.label,
    })),
  ];

  const prioritySelectOptions = [
    { value: "", label: "Todas las prioridades" },
    ...priorityOptions.map((priority) => ({
      value: priority.value,
      label: priority.label,
    })),
  ];

  const typeSelectOptions = [
    { value: "", label: "Todos los tipos" },
    ...requestTypes.map((type) => ({ value: type, label: type })),
  ];

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  // Handle priority change
  const handlePriorityChange = (e) => {
    setFilters({ ...filters, priority: e.target.value });
  };

  // Handle type change
  const handleTypeChange = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar trámites..."
            value={filters.search || ""}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Status Filter */}
        <Select
          id="status-filter"
          value={filters.status || ""}
          onChange={handleStatusChange}
          options={statusSelectOptions}
          placeholder="Estado"
          className="m-0"
        />

        {/* Priority Filter */}
        <Select
          id="priority-filter"
          value={filters.priority || ""}
          onChange={handlePriorityChange}
          options={prioritySelectOptions}
          placeholder="Prioridad"
          className="m-0"
        />

        {/* Type Filter */}
        <Select
          id="type-filter"
          value={filters.type || ""}
          onChange={handleTypeChange}
          options={typeSelectOptions}
          placeholder="Tipo de trámite"
          className="m-0"
        />
      </div>

      {/* Clear Filters Button */}
      {(filters.search ||
        filters.status ||
        filters.priority ||
        filters.type) && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;
