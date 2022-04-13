
function isEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

function FormValidator(el, errors = {}) {
    const formEl = document.getElementById(el)
    if (!el || !formEl) {
        console.log("Please provide valid form id of associate given id in form");
        return {
            init: () => { },
            isValid: () => { }
        }
    }

    this.form = formEl
    this.inputs = formEl.querySelectorAll("input, select")
    this.formState = []

    /**
     * Check if input is required and has valid value
     * @param {HtmlElement} input current input element
     * @returns true || false
     */
    this.validateValue = (input) => {
        let isValid = false
        let { value, required, name } = input
        let error = errors[name] || {}
        if (required && !value.trim()) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = error?.required || "Field is required"
            input.classList.add('error')
            isValid = false
        } else {
            input.nextElementSibling.classList.remove('has-error')
            input.nextElementSibling.textContent = ""
            input.classList.remove('error')
            isValid = true
        }
        return isValid
    }

    /**
     * Check if input is have valid email id as per setup
     * @param {HtmlElement} input current input element
     * @returns true || false
     */
    this.validateEmail = (input) => {
        let isValidEmail = false
        let { type, value, pattern, name } = input
        let error = errors[name] || {}
        if (type !== 'email' || !value.trim()) return true
        if (!pattern && !isEmail(value)) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = error?.email || "Email is not valid"
            input.classList.add('error')
            isValidEmail = false
        }
        else if (pattern && !String(value).toLowerCase().match(pattern)) {
            input.nextElementSibling.classList.add('has-error')
            input.nextElementSibling.textContent = error?.email || "Email is not valid"
            input.classList.add('error')
            isValidEmail = false
        } else {
            input.nextElementSibling.classList.remove('has-error')
            input.nextElementSibling.textContent = ""
            input.classList.remove('error')
            isValidEmail = true
        }
        return isValidEmail
    }

    /**
     * Validate Input and run all validations
     * @param {HtmlElement} input Input Field
     * @returns true || false
     */
    this.validate = (input) => {
        return this.validateValue(input) && this.validateEmail(input)
    }

    /**
     * Handle Input Change
     * @param {Event} event current upcoming event
     */
    this.handleChange = ({ target }) => {
        this.validate(target)
    }

    /**
     * Handle Input Blur Event
     * @param {Event} event current upcoming event
     */
    this.handleBlur = ({ target }) => {
        this.validate(target)
    }

    /**
     * Check if Form is Valid or not
     * @returns true || false
     */
    this.isValid = () => {
        this.formState = []
        for (const input of this.inputs) {
            let isValid = this.validate(input)
            this.formState.push(isValid)
        }
        return !this.formState.filter(el => !el).length
    }

    /**
     * Initiate Form As Per Provided Setup
     */
    this.init = () => {
        for (const input of this.inputs) {
            input.addEventListener("keyup", this.handleChange)
            input.addEventListener("blur", this.handleBlur)
        }
    }
    return {
        init: this.init,
        isValid: this.isValid
    }
}

const validator = new FormValidator('register', {
    email: {
        required: "Please enter email id",
        email: "Please enter valid email"
    }
})
validator.init()

document.getElementById("register").addEventListener("submit", function (event) {
    const { target } = event
    event.preventDefault()
    if (validator.isValid()) {
        target.submit()
    }
})