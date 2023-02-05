import { axiosInstance } from '../config/axiosInstance';

export const getAllLogs = async () => {
  const res = await axiosInstance.get(`/activity-log`);
  return res?.data;
};

export const createLogs = async (data: any) => {
  const res = await axiosInstance.post('/activity-log', data);
  return res?.data;
};

export const addLogUsingUuid = async (data: any) => {
  const res = await axiosInstance.post('/activity-log/add-log', data);
  return res?.data;
};
