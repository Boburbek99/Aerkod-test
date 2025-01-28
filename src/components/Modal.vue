<script setup>
import { usePasswordStore } from "../stores/passwordStore.js";
import { ref } from 'vue';
const requestItem = ref({});
const error = ref('');
const message = ref('');
const messageClass = ref('')
const passwordStore = usePasswordStore();
const handleSubmit = async () => {
    const isSuccess = await simulateServerRequest(requestItem.value);
    if (isSuccess) {
        console.log(requestItem.value.password, requestItem.value.service)
        passwordStore.addPassword(requestItem.value.password, requestItem.value.service);
        message.value = "Данные успешно сохранены!";
        messageClass.value = "success";
    } else {
        message.value = "Ошибка! Данные не были сохранены.";
        messageClass.value = "error";
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

let modelValue = defineModel()

function onClick() {
    modelValue.value = true;

}
function modalClick() {
    message.value = '';
    modelValue.value = false;
    requestItem.value = {};
}
</script>

<template>
    <div>
        <button type="button" class="btn btn-secondary" @click="onClick">
            Добавить пароль
        </button>
        <Teleport to="body">
            <div v-show="modelValue" class="modal" id="bootstrapModal">
                <div class=" mx-auto  modal-dialog d-flex justify-content-end align-items-center m-5">
                    <div class="modal-content  rounded-4 " style="min-width: 100%;">
                        <button type="button" class="btn position-absolute end-0 p-3 fs-6 text-black "
                            @mousedown="modalClick"><i class="bi fs-4 bi-x-lg"></i></button>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <form class="p-5">
                            <div class="form-group">
                                <label for="exampleInputservice">Сервис</label>
                                <input type="text" class="form-control" id="exampleInputservice"
                                    v-model="requestItem.service" placeholder="Сервис">
                            </div>
                            <div class="form-group py-3">
                                <label for="exampleInputPassword1">Пароль</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                    v-model="requestItem.password" placeholder="Password">
                            </div>
                            <button type="button" class="btn btn-primary" @click="handleSubmit">Submit</button>
                        </form>
                        <p v-if="error" class="error">{{ error }}</p>
                        <p v-if="message" class="success">{{ message }}</p>
                    </div>
                </div>
            </div>

        </Teleport>
    </div>
</template>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
    display: inline-block
}
</style>