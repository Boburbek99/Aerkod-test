import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey = 'secret-key';

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const usePasswordStore = defineStore('passwordStore', {
    state: () => ({
        passwords: [],
    }),
    actions: {
        addPassword(service, password) {
            if (!service || !password) {
                throw new Error('Service and password cannot be empty');
            }
            const existingService = this.passwords.find(item => item.service === service);
            if (existingService) {
                throw new Error('Password for this service already exists');
            }
            this.passwords.push({
                service,
                password,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            this.saveToCookies();
        },
        removePassword(index) {
            if (index >= 0 && index < this.passwords.length) {
                this.passwords.splice(index, 1);
                if (this.passwords.length === 0) {
                    Cookies.remove('passwords');
                } else {
                    this.saveToCookies();
                }
            } else {
                console.error('Invalid index:', index);
            }
        },
        loadFromCookies() {
            try {
                const encryptedData = Cookies.get('passwords');
                if (encryptedData) {
                    this.passwords = decryptData(encryptedData);
                }
            } catch (error) {
                console.error('Failed to load passwords from cookies:', error);
            }
        },
        saveToCookies() {
            try {
                const encryptedData = encryptData(this.passwords);
                Cookies.set('passwords', encryptedData, { expires: 7 });
            } catch (error) {
                console.error('Failed to save passwords to cookies:', error);
            }
        },
    },
});