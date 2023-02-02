import { axiosInstance } from '../config/axiosInstance';

export const getAllUsers = async () => {
  const res = await axiosInstance.get(`/users`);
  return res?.data;
};

export const createUser = async (data: any) => {
  const res = await axiosInstance.post('/users', data);
  return res?.data;
};

export const loginUser = async (data: any) => {
  const res = await axiosInstance.post('/users/login', data);
  return res?.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.put('auth/logout');
  return res?.data;
};

export const getLoggedInUserData = async () => {
  const res = await axiosInstance.get(`/users/loggedIn-user`);
  return res.data;
};
