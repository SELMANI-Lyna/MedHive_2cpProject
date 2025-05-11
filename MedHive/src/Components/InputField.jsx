import { useState } from "react";

function InputField({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label = "",
  required,
  onBlur,
  showToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const inputType = showPassword && isPasswordType ? "text" : type;

  return (
    <div className="relative">
      <h2 className="mb-1 text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h2>
      <input
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 pr-10 mb-4 border-b border-gray-400 focus:outline-none focus:border-green-400 focus:border-b-2"
        required={required}
        onBlur={onBlur}
      />
      {showToggle && isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-8 text-gray-600"
        >
          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
        </button>
      )}
    </div>
  );
}

export default InputField;
