import React from 'react'

const types = {
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        message: 'Preencha um email válido'
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        message: 'A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial.'
    },
    number: {
        regex: /ˆ\d+$/,
        Message: 'Esse campo é apenas numérico'
    }

}

export const useForm = (type) => {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(null)

    function validate(value) {
        if(type === false) return true
        if(value.length === 0 ) {
            setError('Preencha um valor')
            return false
        } else if(types[type] && !types[type].regex.test(value)) {
            setError(types[type].message)
            return false
        } else {
            setError(null)
            return true
        }
    }

    function onChange({target}) {
        if(error) validate(target.value)
        setValue(target.value)
    }

    return {
        value, 
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    }
}

export default useForm