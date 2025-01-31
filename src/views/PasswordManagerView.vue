<script setup>
import Modal from '@/components/Modal.vue';
import PasswordForm from '@/components/PasswordForm.vue';
</script>
<template>
    <section class="d-flex-column my-5 my-auto">
        <div class="main-block  ">
            <nav class="navbar navbar-expand-lg  p-4 rounded-4 d-flex justify-content-evenly m-3">
                <router-link to="/list" class="text-white fs-5 text-decoration-none">Список паролей </router-link>
                <router-link to="/generate" class="text-white text-decoration-none fs-5">Генерация паролей</router-link>
            </nav>
            <Modal>
                <PasswordForm></PasswordForm>
            </Modal>
            <router-view>
            </router-view>
        </div>
    </section>
</template>
<style scoped>
.navbar {
    background-color: #7B68EE;
}
</style>