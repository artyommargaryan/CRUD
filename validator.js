function isValidRequestBody(body) {
    return !(!isValidName(body.name) || !isValidSurname(body.surname) || !isValidAge(body.age) || !isValidEmail(body.email));

    function isValidName(name) {
        if (!name) {
            return false;
        }

        if (!(typeof name === "string")) {
            return false;
        }

        return name.length >= 3 && name.length <= 25;
    }

    function isValidSurname(surname) {
        if (!surname) {
            return false;
        }

        if (!(typeof surname === "string")) {
            return false;
        }

        return surname.length >= 3 && surname.length <= 50;
    }

    function isValidAge(age) {
        if (!age) {
            return false;
        }

        if (!(typeof age === "number")) {
            return false;
        }

        return age >= 0 && age <= 120;
    }

    function isValidEmail(email) {
        if (!email) {
            return false;
        }

        if (!(typeof email === "string")) {
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

module.exports = {isValidRequestBody};