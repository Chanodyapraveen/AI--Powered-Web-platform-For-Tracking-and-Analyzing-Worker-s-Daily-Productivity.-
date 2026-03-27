import api from "../services/api";

export const listItems = async (params = {}) => {
  return await api.get("/fni", { params });
};

export const getItem = async (id) => {
  return await api.get(`/fni/${id}`);
};

export const createItem = async (itemData) => {
  return await api.post("/fni", itemData);
};

export const updateItem = async (id, itemData) => {
  return await api.put(`/fni/${id}`, itemData);
};

export const deleteItem = async (id) => {
  return await api.delete(`/fni/${id}`);
};

export const getFNIStats = async () => {
  return await api.get("/fni/stats");
};
