import axios from "@/services/axios.js";
export default {
    async addPassword(passwordAndService) {
        try {
            const response = await axios().post("/addPassword", passwordAndService);
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
    async delete(user) {
        try {
            const response = await axios().delete("/deletePassword", user);
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
    async getAllPasswords() {
        try {
            const response = await axios().get('/getPasswords')
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
};
