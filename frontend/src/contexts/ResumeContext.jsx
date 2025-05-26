import React, { createContext, useContext, useState, useEffect } from "react";
import { mockResumes } from "../utils/mockData";

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API call with mock data
    const fetchResumes = () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call
        setTimeout(() => {
          setResumes(mockResumes);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Error al cargar los currículos");
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const getResume = (id) => {
    return resumes.find((resume) => resume.id === id);
  };

  const addResume = (newResume) => {
    const resumeWithId = {
      ...newResume,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      aiScore: Math.floor(Math.random() * 100),
    };

    setResumes((prev) => [resumeWithId, ...prev]);
    return resumeWithId;
  };

  const updateResume = (id, updates) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === id ? { ...resume, ...updates } : resume
      )
    );
  };

  const updateResumeStatus = (id, status, comment = "") => {
    setResumes((prev) =>
      prev.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            status,
            statusComment: comment,
            updatedAt: new Date().toISOString(),
          };
        }
        return resume;
      })
    );
  };

  const value = {
    resumes,
    loading,
    error,
    getResume,
    addResume,
    updateResume,
    updateResumeStatus,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
