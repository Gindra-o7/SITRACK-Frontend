import axiosInstance from "../configs/axios.configs"

export const profileService = {
    async getProfile() {
        const response = await axiosInstance.get("/profile");
        return response.data;
    },

    async updateProfile(data: any) {
        const response = await axiosInstance.put("/profile", data);
        return response.data;
    }
};