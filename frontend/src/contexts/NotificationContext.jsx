import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const timeouts = useRef({}); // para limpiar si es necesario

  const addNotification = useCallback(
    (message, type = "info", duration = 5000) => {
      const id = Date.now();

      const validTypes = ["success", "error", "info", "warning"];
      const safeType = validTypes.includes(type) ? type : "info";

      const newNotification = {
        id,
        message,
        type: safeType,
        duration,
      };

      setNotifications((prev) => [...prev, newNotification]);

      if (duration) {
        const timeoutId = setTimeout(() => {
          removeNotification(id);
          delete timeouts.current[id];
        }, duration);
        timeouts.current[id] = timeoutId;
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
  }, []);

  // Limpia todos los timeouts si el componente se desmonta
  useEffect(() => {
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
      timeouts.current = {};
    };
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
