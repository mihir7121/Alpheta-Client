import './FillButton.css'

function FillButton(props) {
  return (
    <a onClick={props.onClick} className={"fill-btn" + (props.small ? " fill-btn-small" : "")}>
      {props.children}
    </a>
  )
}

export default FillButton