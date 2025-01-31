import { required, minLength, maxLength, helpers } from '@vuelidate/validators';

const lengthRange = (min, max) => {
    return helpers.withMessage(
        `Длина должна быть между ${min} и ${max} символами`,
        (value) => value >= min && value <= max
    );
};

export const lengthValidation = {
    length: {
        required: helpers.withMessage("Обязательное поле", required),
        lengthRange: lengthRange(4, 12),
    },
};

export const serviceValidation = {
    service: {
        required: helpers.withMessage("Обязательное поле", required),
    },
};

export const passwordValidation = {
    password: {
        required: helpers.withMessage("Обязательное поле", required),
        minLength: helpers.withMessage("Минимальная длина 4 символов", minLength(4)),
        maxLength: helpers.withMessage("Максимальная длина 12 символов", maxLength(12)),
    },
};
export const fullValidation = (model) => ({
    ...lengthValidation,
    ...serviceValidation,
    ...passwordValidation,
});