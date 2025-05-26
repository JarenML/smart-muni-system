import React from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";
import { useNotification } from "../../contexts/NotificationContext";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      case "warning":
        return "bg-yellow-50";
      case "info":
      default:
        return "bg-blue-50";
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-400";
      case "error":
        return "border-red-400";
      case "warning":
        return "border-yellow-400";
      case "info":
      default:
        return "border-blue-400";
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-lg border-l-4 shadow-md ${getBgColor(
            notification.type
          )} ${getBorderColor(
            notification.type
          )} transform transition-all duration-300 ease-in-out`}
          style={{
            animation: "slide-in-right 0.3s ease-out",
          }}
        >
          <div className="p-4 flex items-start">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-gray-800">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <style jsx="true">{`
        @keyframes slide-in-right {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationContainer;
