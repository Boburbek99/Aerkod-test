<script setup>
let modelValue = defineModel()

function onClick() {
    modelValue.value = true;

}
function modalClick() {
    modelValue.value = false
}
</script>

<template>
    <div>
        <button type="button" class="btn  " @click="onClick">
            <i class="bi bi-plus-circle-dotted"></i> Добавить пароль
        </button>
        <Teleport to="body">
            <div v-show="modelValue" class="modal" id="bootstrapModal">
                <div class=" mx-auto  modal-dialog d-flex justify-content-end align-items-center ">
                    <div class="modal-content  rounded-4 " style="min-width: 100%;">
                        <div class="modal-header border-none">
                            <h5 class="modal-title" id="exampleModalLongTitle">Добавить пароль</h5>
                            <button type="button" class="btn position-absolute end-0   fs-6 text-black "
                                @mousedown="modalClick"><i class="bi fs-4 bi-x-lg"></i></button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
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