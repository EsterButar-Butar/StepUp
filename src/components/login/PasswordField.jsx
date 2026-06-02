import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({ password, setPassword, navigate }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <label>Password</label>

      <div className="input-wrapper">
        <FiLock className="input-icon" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
}
