import style from "./containerFluid.module.css";

function ContainerFluid(props) {
  return (
    <div className={style.containerFluid}>
      {props.children}
    </div>
  );
}

export default ContainerFluid;