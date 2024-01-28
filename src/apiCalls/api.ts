import axios, { AxiosResponse } from "axios";
import { IApplication } from "../type";

export const getApplication = (
  page: number,
  limit: number
): Promise<IApplication[]> => {
  const url = `http://localhost:3001/api/applications?_page=${page}&_limit=${limit}`;

  return axios
    .get(url)
    .then((response: AxiosResponse<IApplication[]>) => response.data)
    .catch((error) => {
      console.error(error, "Error fetching application data");
      throw error;
    });
};
