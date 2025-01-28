// import { defineStore } from "pinia";
// import Cookies from "js-cookie";

// export const usePasswordStore = defineStore("password", {
//     state: () => ({
//         password: null,
//         service: null,
//     }),
//     actions: {
//         pass(password, service) {
//             this.password = password;
//             this.service = service;
//             this.saveToStorage();
//         },
//         saveToStorage() {
//             Cookies.set("password", this.password);
//             Cookies.set("service", this.service);
//         },
//         checkStorage() {
//             const password = Cookies.get("password");
//             const service = Cookies.get("service");

//             if (password && service) {
//                 this.pass(password, service);
//             }
//         },
//     },
//     getters: {
//         isActiveUser: (state) => state.password && state.service,
//     },
// });
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const usePasswordStore = defineStore('passwordStore', {
    state: () => ({
        passwords: [],
    }),
    actions: {
        addPassword(service, password) {
            this.passwords.push({ service, password });
            this.saveToCookies();
        },
        removePassword(service) {
            this.passwords = this.passwords.filter(item => item.service !== service);
            this.saveToCookies();
        },

        loadFromCookies() {
            const data = Cookies.get('passwords');
            if (data) {
                this.passwords = JSON.parse(data);
            }
        },

        // Сохранение массива паролей в cookie
        saveToCookies() {
            const serializedData = JSON.stringify(this.passwords);
            Cookies.set('passwords', serializedData, { expires: 7 });
        },
    },
});
