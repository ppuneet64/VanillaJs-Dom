(function () {
    const formEl = document.querySelector('.validate')
    const inputArr = formEl.querySelectorAll("input")
    const validations = {
        emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    const isEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(validations.emailPattern);
    };
    const validateValue = (input) => {
        let isValid = false
        let { value, required } = input
        if (required && !value.trim()) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = "Field is required"
            isValid = false
        } else {
            input.nextElementSibling.classList.remove('has-error')
            input.nextElementSibling.textContent = ""
            isValid = true
        }
        return isValid
    }
    const validateEmail = (input) => {
        let isValidEmail = false
        let { type, value, pattern } = input
        if (type !== 'email' || !value.trim()) return true
        if (!pattern && !isEmail(value)) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = "Email is not valid"
            isValidEmail = false
        }
        else if (pattern && !String(value).toLowerCase().match(pattern)) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = "Email is not valid"
            isValidEmail = false
        } else {
            input.nextElementSibling.classList.remove('has-error')
            input.nextElementSibling.textContent = ""
            isValidEmail = true
        }
        return isValidEmail
    }
    const validateInput = (input) => {
        return validateValue(input) && validateEmail(input)
    }

    const handleChange = ({ target }) => {
        validateInput(target)
    }
    const handleBlur = ({ target }) => {
        validateInput(target)
    }

    const handleSubmit = (event) => {
        let validStates = []
        event.preventDefault()
        for (const input of inputArr) {
            let isValid = validateInput(input)
            validStates.push(isValid)
        }
        if (!validStates.filter(el => !el).length) {
            formEl.submit()
        }
    }
    const bindForm = () => {
        formEl.addEventListener("submit", handleSubmit)
        for (const input of inputArr) {
            input.addEventListener("keyup", handleChange)
            input.addEventListener("blur", handleBlur)
        }
    }
    bindForm()
})()