export default function Button(props) {
  return (
    <button
      data-testid="colorOption"
      className="color-btn"
      style={props.style}
      onClick={() => props.handleClick(props.color)}
      disabled={props.clickedColor === null ? false : true}
    ></button>
  );
}
