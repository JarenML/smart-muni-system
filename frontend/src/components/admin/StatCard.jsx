import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType = "increase",
  footer,
}) => {
  const changeColor =
    changeType === "increase" ? "text-green-500" : "text-red-500";
  const changeIcon = changeType === "increase" ? "↑" : "↓";

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        </div>

        {change && (
          <div className="mt-4">
            <div className={`flex items-baseline text-sm ${changeColor}`}>
              <span>
                {changeIcon} {change}%
              </span>
              <span className="ml-2 text-gray-500">
                respecto al mes anterior
              </span>
            </div>
          </div>
        )}
      </div>

      {footer && <div className="bg-gray-50 px-5 py-3">{footer}</div>}
    </div>
  );
};

export default StatCard;
