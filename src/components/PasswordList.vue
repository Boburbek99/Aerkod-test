<template>
    <div class="text-center ">
        <h4 class="py-4">Cписок паролей</h4>
        <input v-model="searchQuery" class="form-control searchBar mx-auto my-3" placeholder="Поиск по сервисам" />
        <table class="table table-hover mx-auto">
            <thead>
                <tr>
                    <td><b>№</b> </td>
                    <td><b>Сервис</b></td>
                    <td><b>Пароль</b> </td>
                    <td colspan="3"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredPasswords" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.service }}</td>
                    <td>
                        {{ passwordVisibility[index] ? item.password : '******' }}
                    </td>
                    <td>
                        <button type="button" class="btn btn-link ms-2" @click="togglePasswordVisibility(index)">
                            <i :class="passwordVisibility[index] ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn" @click="copyPasswordAndService(item)">
                            <i class="bi bi-copy"></i>
                        </button>
                        <span v-if="item.message" class="text-success">{{ item.message }}</span>
                    </td>
                    <td>
                        <button class="btn" @click="removePasswordAndService(index)">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        <span v-if="item.messageDelete" class="text-success">{{ item.messageDelete }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { usePasswordStore } from '@/stores/passwordStore';
import { ref, computed } from 'vue';
const searchQuery = ref('');


const store = usePasswordStore();
store.loadFromCookies();

const filteredPasswords = computed(() => {
    return store.passwords.filter(item =>
        item.service.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const passwordVisibility = ref(store.passwords.map(() => false));

const togglePasswordVisibility = (index) => {
    passwordVisibility.value[index] = !passwordVisibility.value[index];
};

function copyPasswordAndService(item) {
    navigator.clipboard.writeText(item.password)
        .then(() => {
            item.message = 'Пароль скопирован!';
            setTimeout(() => {
                item.message = '';
            }, 1000);
        })
        .catch(() => {
            item.message = 'Ошибка копирования!';
            setTimeout(() => {
                item.message = '';
            }, 1000);
        });
}

function removePasswordAndService(index) {
    const item = store.passwords[index];
    if (!item) {
        console.error('Элемент не найден по индексу:', index);
        return;
    }

    const success = Math.random() > 0.5;
    if (success) {
        item.messageDelete = 'Пароль успешно удален!';
        setTimeout(() => {
            store.removePassword(index);
        }, 1000);
    } else {
        item.messageDelete = 'Пароль не удален!';
        setTimeout(() => {
            item.messageDelete = '';
        }, 1000);
    }
}
</script>

<style scoped>
.table {
    max-width: 800px;
}

.searchBar {
    width: 400px;
}
</style>