export function generatePassword(options) {
    let charset = "";
    if (options.customCharset) {
        charset = options.customCharset;
    } else {
        if (options.useLetters) charset += "abcdefghijklmnopqrstuvwxyz";
        if (options.useNumbers) charset += "0123456789";
        if (options.useSymbols) charset += "!@#$%^&*()_+~";
        if (options.caseType === "upper") charset = charset.toUpperCase();
        if (options.caseType === "random") charset += charset.toUpperCase();
        if (!charset) {
            alert("Выберите хотя бы один тип символов!");
            return;
        }
    }
    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
