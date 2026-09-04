import style from './createmonitor.module.css';
import { useState } from 'react';

function CreateMonitor({ fields, onSubmit, submitText, onClose }) {
    const initialValues = {
        type: "",
        ...Object.fromEntries(
            fields.map((field) => [field.name, ""])
        )
    };;
    const [values, setValues] = useState(initialValues);
    function handleChange(event) {
        const { name, value } = event.target;
        setValues((currentValues) => ({ ...currentValues, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit?.(values)
    }

    return (
        <>
            <button
                className={style.closeMenu}
                type="button"
                onClick={onClose}
            ></button>
            <form className={style.form} onSubmit={handleSubmit}>
                <select
                    name="type"
                    id="protocol"
                    value={values.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o protocolo</option>
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                    <option value="TCP">TCP</option>
                </select>
                {fields.map((field) => (
                    <label key={field.name} className={style.field}>
                        <span>{field.label}</span>
                        <input
                            name={field.name}
                            type={field.type ?? "text"}
                            value={values[field.name]}
                            placeholder={field.placeholder}
                            required={field.required ?? true}
                            onChange={handleChange}
                        />
                    </label>
                ))}
                <button className={style.submit} type="submit">{submitText}</button>
            </form>
        </>
    )
}

export default CreateMonitor;