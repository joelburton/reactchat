import React, { useState } from "react";
import "./UsernameForm.css";

/** Form for adding.
 *
 * Props:
 * - handleSave: function to call in parent.
 *
 * ChatApp -> UsernameForm
 */

function UsernameForm({ handleSave }) {
  const [formData, setFormData] = useState({username: ""});

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    if (evt.target.value.length >= 10) return
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSave(formData);
  }

  return (
      <form className="UsernameForm d-flex vh-100" onSubmit={handleSubmit}>

        <div className="form-group align-self-center">
          <p>What shall we call you?</p>
          <input
              id="UsernameForm-username"
              name="username"
              className="form-control"
              placeholder="TacoCat"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
              autoFocus={true}
          />
        </div>

      </form>
  );
}

export default UsernameForm;
