<template>
    <section>
        <form class="form mx-auto">
            <fieldset>
                <div class="form-group">
                    <input type="text" class="form-control" :class="{ 'is-invalid': v$.service.$error }"
                        id="exampleInputservice" v-model="requestItem.service" placeholder="Сервис" autocomplete="off"
                        ref="serviceInput">
                    <div v-show="v$.service.$error" class="invalid-feedback">
                        <p class="text-danger"> {{ v$.service.required.$message }}</p>
                    </div>
                    <div class="form-group border d-flex align-items-center rounded-2 my-3">
                        <input :type="isPasswordVisible ? 'text' : 'password'"
                            :class="{ 'is-invalid': v$.password.$error }" class="form-control border-none"
                            id="exampleInputPassword1" v-model="requestItem.password" placeholder="Пароль" min="4"
                            max="12" autocomplete="new-password" ref="passwordInput" />
                        <button type="button" class="btn bg-primary text-white btn-link ms-2"
                            @click="togglePasswordVisibility">
                            <i :class="isPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                        </button>
                    </div>
                    <div v-show="v$.password.$error" class="invalid-feedback">
                        <p class="text-danger"> {{ v$.password.required.$message }}</p>
                    </div>
                </div>

                <button type="button" class="btn bg-primary text-white mt-3" @click="handleSubmit">Сохранить</button>
                <div class="message-block text-center">
                    <p v-if="message" :class="messageType">{{ message }}</p>
                </div>
            </fieldset>
        </form>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { usePasswordStore } from "@/stores/passwordStore.js";
import useValidate from '@vuelidate/core';
import { passwordValidation, serviceValidation } from '@/validation/passwordValidition.js';

const requestItem = reactive({
    service: '',
    password: '',
});

const v$ = useValidate({ ...passwordValidation, ...serviceValidation }, requestItem);

const message = ref('');
const messageType = ref('');
const isPasswordVisible = ref(false);
const passwordStore = usePasswordStore();
const serviceInput = ref(null);
const passwordInput = ref(null);

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const showMessage = (text, type) => {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
        message.value = '';
        messageType.value = '';
    }, 3000);
};

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        showMessage("Ошибка! Пожалуйста, проверьте введенные данные.", "error");
        return;
    }
    const isSuccess = await simulateServerRequest(requestItem.service, requestItem.password);
    if (isSuccess) {
        passwordStore.addPassword(requestItem.service, requestItem.password);
        showMessage("Данные успешно сохранены!", "success");
        requestItem.service = '';
        requestItem.password = '';
    } else {
        showMessage("Ошибка! Данные не были сохранены.", "error");
    }
};

const simulateServerRequest = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            resolve(isSuccess);
        }, 1000);
    });
};

</script>

<style scoped>
.form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.list-group {
    padding-left: 0;
}

.list-group li {
    list-style: none;
}
</style>