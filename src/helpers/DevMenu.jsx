import SpacialSound from "./SpacialSound";

export default function DevMenu() {
  const style = {
    position: "absolute",
    left: "10",
  };

  return (
    <div style={style}>
      <ul>
        <li>
          <SpacialSound />
        </li>
      </ul>
    </div>
  );
}
