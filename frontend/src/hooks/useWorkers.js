import { useState, useEffect, useCallback } from "react";
import workerService from "../services/workerService";

export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.getAllWorkers(params);
      setWorkers(data.workers || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getWorkerById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.getWorkerById(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorker = useCallback(async (workerData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.createWorker(workerData);
      setWorkers((prev) => [...prev, data.worker || data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWorker = useCallback(async (id, workerData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await workerService.updateWorker(id, workerData);
      setWorkers((prev) =>
        prev.map((worker) => (worker.id === id ? data.worker || data : worker)),
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteWorker = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await workerService.deleteWorker(id);
      setWorkers((prev) => prev.filter((worker) => worker.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  return {
    workers,
    loading,
    error,
    fetchWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker,
  };
};

export default useWorkers;
