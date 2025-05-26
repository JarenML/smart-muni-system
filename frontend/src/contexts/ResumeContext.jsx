import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { mockResumes } from "../utils/mockData";

const ResumeContext = createContext();
export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("resumes");
      if (stored) {
        setResumes(JSON.parse(stored));
      } else {
        setResumes(mockResumes);
      }
    } catch (err) {
      console.error("Error al cargar currículos:", err);
      setError("Error al cargar los currículos");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("resumes", JSON.stringify(data));
  };

  const getResume = useCallback(
    (id) => resumes.find((resume) => resume.id === id),
    [resumes]
  );

  const addResume = useCallback((newResume) => {
    const resumeWithId = {
      ...newResume,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
      aiScore: Math.floor(Math.random() * 41) + 60, // 60–100 por realismo
    };

    setResumes((prev) => {
      const updated = [resumeWithId, ...prev];
      saveToStorage(updated);
      return updated;
    });

    return resumeWithId;
  }, []);

  const updateResume = useCallback((id, updates) => {
    setResumes((prev) => {
      const updated = prev.map((resume) =>
        resume.id === id
          ? { ...resume, ...updates, updatedAt: new Date().toISOString() }
          : resume
      );
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateResumeStatus = useCallback((id, status, comment = "") => {
    setResumes((prev) => {
      const updated = prev.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            status,
            statusComment: comment,
            updatedAt: new Date().toISOString(),
          };
        }
        return resume;
      });

      saveToStorage(updated);
      return updated;
    });
  }, []);

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
