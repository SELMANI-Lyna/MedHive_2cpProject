import React from 'react'

function SubmitButton({ text="click me", type = "button", className = ""}) {
  return (
    <button
      type={type}
      className={`px-5 py-1 font-bold  rounded focus:outline-none   disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  )
}

export default SubmitButton
