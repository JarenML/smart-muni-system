import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType = "increase", // "increase" | "decrease"
  footer,
}) => {
  const isIncrease = changeType === "increase";
  const changeColor = isIncrease ? "text-green-600" : "text-red-600";
  const changeBg = isIncrease ? "bg-green-100" : "bg-red-100";
  const changeIcon = isIncrease ? (
    <TrendingUp className="w-4 h-4 mr-1" />
  ) : (
    <TrendingDown className="w-4 h-4 mr-1" />
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${changeColor}`}
          >
            {changeIcon}
            <span>{change}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>

        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-100">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
