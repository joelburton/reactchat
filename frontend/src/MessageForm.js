import React, { useState } from "react";

/** Form for adding.
 *
 * Props:
 * - handleSave: function to call in parent.
 *
 * ChatApp -> MessageForm
 */

function MessageForm({ handleSave }) {
  const [formData, setFormData] = useState({ message: "" });

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!formData.message) return;
    handleSave(formData);
    setFormData({ message: "" });
  }

  return (
      <form className="MessageForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
              id="MessageForm-message"
              name="message"
              className="form-control"
              onChange={handleChange}
              value={formData.message}
              aria-label="Message"
              placeholder="What's on your mind?"
              maxLength="80"
              autoFocus={true}
          />
        </div>
      </form>
  );
}

export default MessageForm;
