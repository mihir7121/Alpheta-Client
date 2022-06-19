import './FillButton.css'

function FillButton(props) {
  return (
    <a onClick={props.onClick} href={props.href} className={"fill-btn" + (props.small ? " fill-btn-small" : "")}>
      {props.children}
    </a>
  )
}

export default FillButton