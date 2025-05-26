import React from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";
import { useNotification } from "../../contexts/NotificationContext";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgMap = {
    success: "bg-green-50 border-green-400",
    error: "bg-red-50 border-red-400",
    warning: "bg-yellow-50 border-yellow-400",
    info: "bg-blue-50 border-blue-400",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-full max-w-sm">
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={`rounded-md border-l-4 px-4 py-3 shadow-lg flex items-start space-x-3 animate-slide-in ${
            bgMap[type] || bgMap.info
          }`}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex-shrink-0 pt-0.5">
            {iconMap[type] || iconMap.info}
          </div>
          <div className="flex-1 text-sm text-gray-800">{message}</div>
          <button
            onClick={() => removeNotification(id)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Cerrar notificación"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}

      <style jsx="true">{`
        .animate-slide-in {
          animation: slide-in-right 0.3s ease-out;
        }
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
