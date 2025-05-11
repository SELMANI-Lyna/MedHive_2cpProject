function Button({ text="click me", onClick=()=>{}, type = "button", className = ""}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-1 font-bold  rounded focus:outline-none   disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
