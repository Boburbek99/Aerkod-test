<template>
    <div>
        <div class="card my-3 gap-3 card-body">
            <label>Сервис</label>
            <input class="form-control" v-model="options.service" :class="{ 'is-invalid': v$.service.$error }"
                placeholder="Название сервиса" />
            <span v-if="v$.service.$error" class="invalid-feedback">
                <p class="text-danger"> {{ v$.service.required.$message }}</p>
            </span>
            <label>Свой набор символов:</label>
            <input class="form-control" v-model="options.customCharset" placeholder="Введите свои символы" />
            <div class="form-group d-flex">
                <input type="number" class="form-control me-3" id="exampleInputLength" min="4" max="12"
                    placeholder="Длина пароля" :class="{ 'is-invalid': v$.length.$error }" v-model="options.length">
                <div v-if="v$.length.$error" class="invalid-feedback">
                    <p class="text-danger"> {{ v$.length.lengthRange.$message }}</p>
                </div>
                <input type="text" class="form-control" id="exampleInputLetters" placeholder="Использование букв"
                    :disabled="!!options.customCharset" v-model="options.useLetters" />
            </div>
            <ul class="list-group">
                <li>
                    <input type="checkbox" id="exampleCheck1" class="form-check-input m-2"
                        :disabled="!!options.customCharset" v-model="options.useSymbols">
                    <label class="form-check-label" for="exampleCheck1"> Использование спецсимволов</label>
                </li>
                <label>Регистр:</label>
                <select :disabled="!!options.customCharset" v-model="options.caseType"
                    class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="lower">Нижний</option>
                    <option value="upper">Верхний</option>
                    <option value="random">Случайный</option>
                </select>
            </ul>
            <div class="message-block text-center">
                <p v-if="message" :class="messageType">{{ message }}</p>
            </div>
            <span v-if="generatedPassword"> Ваш сгенерированный пароль: {{ generatedPassword }}</span>
            <button type="button" class="btn btn-primary text-white mt-3" @click="generatePasswordHandler">Сгенерировать
                пароль</button>
            <button type="button" class="btn btn-primary text-white mt-3" @click="handleSubmit">Сохранить</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { usePasswordStore } from "@/stores/passwordStore.js";
import { generatePassword } from "@/utils/PasswordGenerator.js";
import useValidate from '@vuelidate/core';
import { lengthValidation, serviceValidation } from '@/validation/passwordValidition.js';

const message = ref('');
const messageType = ref('');
const passwordStore = usePasswordStore();

const options = reactive({
    service: '',
    length: 12,
    useSymbols: false,
    caseType: 'random',
    customCharset: null,
});

const showMessage = (text, type) => {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
        message.value = '';
        messageType.value = '';
    }, 3000);
};

const generatedPassword = ref('');

const v$ = useValidate({ ...lengthValidation, ...serviceValidation }, options);

const generatePasswordHandler = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        showMessage("Ошибка! Пожалуйста, проверьте введенные данные.", "error");
        return;
    }
    else {
        generatedPassword.value = await generatePassword(options);
    }
};
const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        showMessage("Ошибка! Пожалуйста, проверьте введенные данные.", "error");
        return;
    } else {
        const isSuccess = await simulateServerRequest(options.service, generatedPassword.value);
        if (isSuccess && generatedPassword.value) {
            passwordStore.addPassword(options.service, generatedPassword.value);
            showMessage("Данные успешно сохранены!", "success");
        } else {
            showMessage("Ошибка! Данные не были сохранены.", "error");
        }
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