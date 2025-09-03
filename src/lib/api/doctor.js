import axiosInstance from "./axiosInstance";

export const getAllDoctors = ({page, limit, search, specialization}) => {
  return axiosInstance.get("/doctors", {
    params: {
      page,
      limit,
      search: search || undefined,
      specialization: specialization || undefined,
    },
  });
}