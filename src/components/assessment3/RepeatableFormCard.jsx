// src/components/assessment3/RepeatableFormCard.jsx

import { useState } from "react";

import { FiPlus, FiTrash2 } from "react-icons/fi";

import "../../styles/assessmentcard3.css";

export default function RepeatableFormCard({
  title,
  fields,
  optional = false,

  // OPTIONAL EXTERNAL STATE
  items: externalItems,
  setItems: externalSetItems,
}) {
  // CREATE EMPTY ITEM
  const createEmptyItem = () => {
    const empty = {};

    fields.forEach((field) => {
      empty[field.name] = "";
    });

    return empty;
  };

  // INTERNAL STATE
  const [internalItems, setInternalItems] = useState([createEmptyItem()]);

  // USE EXTERNAL OR INTERNAL
  const items = Array.isArray(externalItems) ? externalItems : internalItems;

  const setItems =
    typeof externalSetItems === "function"
      ? externalSetItems
      : setInternalItems;

  if (!Array.isArray(items)) {
    return null;
  }

  // ADD ITEM
  const addItem = () => {
    setItems([...items, createEmptyItem()]);
  };

  // REMOVE ITEM
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);

    setItems(updated);
  };

  // HANDLE CHANGE
  const handleChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  return (
    <div className="repeatable-section">
      {/* HEADER */}
      <div className="repeatable-header">
        <div className="repeatable-title">
          <h3>{title}</h3>

          {optional && <span className="optional-badge">Optional</span>}
        </div>
      </div>

      {/* ITEMS */}
      {items.map((item, index) => (
        <div key={index} className="repeatable-card">
          {/* TOP */}
          <div className="card-top">
            <h4>
              {title} #{index + 1}
            </h4>

            {items.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                <FiTrash2 />
              </button>
            )}
          </div>

          {/* FIELDS */}
          {fields.map((field) => (
            <div key={field.name} className="input-group">
              <label>{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  value={item[field.name]}
                  onChange={(e) =>
                    handleChange(index, field.name, e.target.value)
                  }
                />
              ) : (
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={item[field.name]}
                  onChange={(e) =>
                    handleChange(index, field.name, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* ADD BUTTON */}
      <button type="button" className="add-more-btn" onClick={addItem}>
        <FiPlus />
        Add Another {title}
      </button>
    </div>
  );
}
