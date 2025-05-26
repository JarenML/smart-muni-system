import React from "react";
import { Search } from "lucide-react";
import Select from "../UI/Select";
import Button from "../UI/Button";
import { statusOptions, jobPositions } from "../../utils/mockData";

const ResumeFilters = ({ filters, setFilters, onClearFilters }) => {
  // Prepare options for selects
  const statusSelectOptions = [
    { value: "", label: "Todos los estados" },
    ...statusOptions.map((status) => ({
      value: status.value,
      label: status.label,
    })),
  ];

  const positionSelectOptions = [
    { value: "", label: "Todos los puestos" },
    ...jobPositions.map((position) => ({ value: position, label: position })),
  ];

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  // Handle position change
  const handlePositionChange = (e) => {
    setFilters({ ...filters, position: e.target.value });
  };

  // Handle aiScore change
  const handleScoreChange = (e) => {
    setFilters({ ...filters, minScore: e.target.value });
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
            placeholder="Buscar candidatos..."
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

        {/* Position Filter */}
        <Select
          id="position-filter"
          value={filters.position || ""}
          onChange={handlePositionChange}
          options={positionSelectOptions}
          placeholder="Puesto"
          className="m-0"
        />

        {/* AI Score Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="score-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Puntuación IA mínima: {filters.minScore || 0}%
          </label>
          <input
            id="score-filter"
            type="range"
            min="0"
            max="100"
            value={filters.minScore || 0}
            onChange={handleScoreChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.search ||
        filters.status ||
        filters.position ||
        (filters.minScore && filters.minScore > 0)) && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeFilters;
