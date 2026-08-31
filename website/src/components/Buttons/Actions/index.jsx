import style from "./actions.module.css";
import { Link } from "react-router-dom";

const variants = {
  primary: style.primary,
  secondary: style.secondary,
  outline: style.outline,
  ghost: style.ghost,
};

function Action(props) {
  const variantClass = variants[props.variant] ?? style.primary;

  return (
    <Link className={`${style.action} ${variantClass}`} to={props.url}>
      {props.img && <img src={props.img} alt={props.alt ?? ""} />}
      {props.name}
    </Link>
  );
}

export default Action;