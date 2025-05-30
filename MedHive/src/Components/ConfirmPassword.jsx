import { useState } from "react";
import InputField from "./InputField";

function ConfirmPassword({onPasswordChange, setIsValid }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleValidation = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match!");
      if (setIsValid) setIsValid(false);
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      if (setIsValid) setIsValid(false);
    } else {
      setError("");
      if (setIsValid) setIsValid(true);
    }
  };
  
  return (
    <div>
      <InputField
        label={"Password"}
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => {
          const newPassword = e.target.value;
          setPassword(newPassword);
          if (onPasswordChange) {
            onPasswordChange(newPassword);
          }
        }}
        onBlur={handleValidation}
        className="text-gray-400"
        required={true}
        showToggle={true}/>
       
      <InputField
        label={"Confirm password"}
        type="password"
        placeholder="confirm your password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        onBlur={handleValidation}
        className="text-gray-400"
        required={true}
        showToggle={true}/>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default ConfirmPassword

