import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { mockRequests } from "../utils/mockData";

const RequestContext = createContext();

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simula una API y puede usar localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("requests");
      if (stored) {
        setRequests(JSON.parse(stored));
      } else {
        setRequests(mockRequests); // o llamar a una API real
      }
    } catch (err) {
      setError("Error al cargar los trámites");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("requests", JSON.stringify(data));
  };

  const getRequest = useCallback(
    (id) => requests.find((request) => request.id === id),
    [requests]
  );

  const addRequest = useCallback((newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      history: [
        {
          date: new Date().toISOString(),
          status: "pending",
          comment: "Trámite creado correctamente",
        },
      ],
    };

    setRequests((prev) => {
      const updated = [requestWithId, ...prev];
      saveToStorage(updated);
      return updated;
    });

    return requestWithId;
  }, []);

  const updateRequest = useCallback((id, updates) => {
    setRequests((prev) => {
      const updated = prev.map((request) =>
        request.id === id ? { ...request, ...updates } : request
      );
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateRequestStatus = useCallback((id, status, comment = "") => {
    setRequests((prev) => {
      const updated = prev.map((request) => {
        if (request.id === id) {
          const historyEntry = {
            date: new Date().toISOString(),
            status,
            comment,
          };

          return {
            ...request,
            status,
            history: [...(request.history || []), historyEntry],
          };
        }
        return request;
      });

      saveToStorage(updated);
      return updated;
    });
  }, []);

  const value = {
    requests,
    loading,
    error,
    getRequest,
    addRequest,
    updateRequest,
    updateRequestStatus,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};
