<template>
    <div class="mx-auto">
        <h2>Cписок паролей</h2>
        <table class="table table-hover ">

            <thead>
                <tr>
                    <td><b>Пароль</b> </td>
                    <td><b>Сервис</b></td>
                    <td colspan="2"></td>
                </tr>
            </thead>

            <tbody v-for="item in store.passwords" key="item.service">
                <tr>
                    <td> {{ item.password }}</td>
                    <td>{{ item.service }}</td>
                    <td><button class="btn" @click="copyPasswordAndService(item)"><i class="bi bi-copy"></i>
                        </button> <span v-if="item.message" class="text-success">{{ item.message }}</span></td>
                    <td> <button class="btn" @click="removePasswordAndService(item)"><i class="bi  bi-trash-fill"></i>
                        </button><span v-if="item.messageDelete" class="text-success">{{ item.messageDelete }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { usePasswordStore } from '@/stores/passwordStore';
const store = usePasswordStore();
store.loadFromCookies();
function copyPasswordAndService(item) {
    navigator.clipboard.writeText(item.password);
    item.message = 'Пароль успешно скопирован!'
    setTimeout(() => {
        item.message = ''
    }, 2000);
}
function removePasswordAndService(item) {
    const success = Math.random() > 0.5;
    if (success) {
        item.messageDelete = 'Пароль успешно удалено!';
        setTimeout(() => {
            store.removePassword(item.service)
            item.messageDelete = ''
        }, 2000);
    }
    item.messageDelete = 'Пароль не удалено!';
}
</script>
<style scoped>
.table {
    max-width: 600px;
}
</style>