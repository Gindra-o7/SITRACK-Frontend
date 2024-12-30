import axiosInstance from "../configs/axios.configs"
import { Profile } from "../interfaces/profile.types"

export const profileService = {
    async getProfile() {
        const response = await axiosInstance.get("/profile");
        return response.data;
    },

    async updateProfile(data: Partial<Profile>): Promise<Profile> {
        const response = await axiosInstance.put(`/profile`, data);
        return response.data;
    },
};