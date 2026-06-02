export default function InputField({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
