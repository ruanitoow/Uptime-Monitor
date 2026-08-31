import style from "./actions.module.css";

const variants = {
  primary: style.primary,
  secondary: style.secondary,
  outline: style.outline,
  ghost: style.ghost,
};

function Action(props) {
  const variantClass = variants[props.variant] ?? style.primary;

  return (
    <a className={`${style.action} ${variantClass}`} href={props.url}>
      {props.img && <img src={props.img} alt={props.alt ?? ""} />}
      {props.name}
    </a>
  );
}

export default Action;
