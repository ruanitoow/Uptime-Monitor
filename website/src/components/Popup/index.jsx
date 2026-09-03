import style from "./popup.module.css";

function Popup({ open, variant = "error", title, message }) {
  const variants = {
    success: style.success,
    error: style.error,
  };

  const variantClass = variants[variant] ?? style.error;

  if (!open) {
    return null;
  }

  return (
    <div className={`${style.popup} ${variantClass}`}>
      <h1>{title}</h1>
      <span>{message}</span>
    </div>
  );
}

export default Popup;