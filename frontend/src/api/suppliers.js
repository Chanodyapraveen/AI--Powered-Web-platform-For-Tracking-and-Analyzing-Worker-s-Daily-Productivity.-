import api from "../services/api";

export const listSuppliers = async (params = {}) => {
  return await api.get("/suppliers", { params });
};

export const getSupplier = async (id) => {
  return await api.get(`/suppliers/${id}`);
};

export const createSupplier = async (supplierData) => {
  return await api.post("/suppliers", supplierData);
};

export const updateSupplier = async (id, supplierData) => {
  return await api.put(`/suppliers/${id}`, supplierData);
};

export const deleteSupplier = async (id) => {
  return await api.delete(`/suppliers/${id}`);
};

export const suspendSupplier = async (id) => {
  return await api.patch(`/suppliers/${id}/suspend`);
};

export const activateSupplier = async (id) => {
  return await api.patch(`/suppliers/${id}/activate`);
};
