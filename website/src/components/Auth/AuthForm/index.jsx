import { useState } from "react";
import style from "./authForm.module.css";

function AuthForm({ title, description, fields, submitText, footerText, footerLinkText, footerUrl, onSubmit }) {
  const initialValues = Object.fromEntries(fields.map((field) => [field.name, ""]));
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(values);
  }

  return (
    <div className={style.card}>
      <div className={style.heading}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={style.field}>
            <span>{field.label}</span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              value={values[field.name]}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required={field.required ?? true}
              onChange={handleChange}
            />
          </label>
        ))}

        <button className={style.submit} type="submit">{submitText}</button>
      </form>

      <p className={style.footerText}>
        {footerText} <a href={footerUrl}>{footerLinkText}</a>
      </p>
    </div>
  );
}

export default AuthForm;
