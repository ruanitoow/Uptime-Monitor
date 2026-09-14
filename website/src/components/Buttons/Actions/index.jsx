import { useContext } from "react";
import style from "./actions.module.css";
import { Link } from "react-router-dom";
import { UserProvider } from "../../../contexts/user.context";

const variants = {
  primary: style.primary,
  secondary: style.secondary,
  outline: style.outline,
  ghost: style.ghost,
};

function Action(props) {
  const variantClass = variants[props.variant] ?? style.primary;

  return (
    <Link className={`${style.action} ${variantClass}`} to={props.url} onClick={props.onClick}>
      {props.img && <img src={props.img} alt={props.alt ?? ""} />}
      {props.name}
    </Link>
  );
}

export default Action;