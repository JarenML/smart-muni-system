import React from "react";
import { getStatusData, getPriorityData } from "../../utils/mockData";

const StatusBadge = ({ status, type = "status" }) => {
  // Get the status data based on the type
  const data =
    type === "status" ? getStatusData(status) : getPriorityData(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.color}`}
    >
      {data.label}
    </span>
  );
};

export default StatusBadge;
