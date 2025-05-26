import React, { createContext, useContext, useState, useEffect } from "react";
import { mockRequests } from "../utils/mockData";

const RequestContext = createContext();

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API call with mock data
    const fetchRequests = () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call
        setTimeout(() => {
          setRequests(mockRequests);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Error al cargar los trámites");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getRequest = (id) => {
    return requests.find((request) => request.id === id);
  };

  const addRequest = (newRequest) => {
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

    setRequests((prev) => [requestWithId, ...prev]);
    return requestWithId;
  };

  const updateRequest = (id, updates) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, ...updates } : request
      )
    );
  };

  const updateRequestStatus = (id, status, comment = "") => {
    setRequests((prev) =>
      prev.map((request) => {
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
      })
    );
  };

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
