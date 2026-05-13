export default function RegisterInput({
  label,
  icon,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="su-input-group">
      <label>{label}</label>

      <div className="su-input-wrapper">
        {icon}

        <input
          name={name}
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
