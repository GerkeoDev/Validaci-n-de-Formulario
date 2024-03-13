import { useReducer } from "react"
const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    },
}
function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.payload.field]: {
                    value: action.payload.value,
                    error: validateField(action.payload.field, action.payload.value)
                }
            }
        default:
            return state
    }
}
const validateField = (field, value) => {
    switch (field) {
        case "firstName":
        case "lastName":
            return value.length < 2 ? "Este campo debe tener al menos dos caracteres" : null
        case "email":
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : "Correo electrónico no válido"
        default:
            return null
    }
}
export function Form () {
    const [state, dispatch] = useReducer(reducer, initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Formulario enviado:", state)
    }
    function handleChange(e) {
        const {name, value} = e.target
        dispatch({
            type: "UPDATE_FIELD",
            payload: {field: name, value}
        })
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                {JSON.stringify(state)}
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" name="firstName" onChange={handleChange} value={state.firstName.value}/>
                    {state.firstName.error !== null && (
                        <p className="error">{state.firstName.error}</p>)}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" name="lastName" onChange={handleChange} value={state.lastName.value}/>
                    {state.lastName.error !== null && (
                        <p className="error">{state.lastName.error}</p>)}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" className="" onChange={handleChange} value={state.email.value}/>
                    {state.email.error !== null && (
                        <p className="error">{state.email.error}</p>)}
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </>
    )
}