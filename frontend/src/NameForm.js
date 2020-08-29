import React, { useState } from "react";
import "./NameForm.css";

/** Form for adding.
 *
 * Props:
 * - handleSave: function to call in parent.
 *
 * ChatApp -> NameForm
 */

function NameForm({ handleSave }) {
  const [formData, setFormData] = useState({name: ""});

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
    handleSave(formData);
  }

  return (
      <form className="NameForm d-flex vh-100" onSubmit={handleSubmit}>

        <div className="form-group align-self-center">
          <p>What shall we call you?</p>
          <input
              id="NameForm-name"
              name="name"
              className="form-control"
              placeholder="TacoCat"
              onChange={handleChange}
              value={formData.name}
              aria-label="Name"
              maxLength="10"
              autoFocus={true}
          />
        </div>

      </form>
  );
}

export default NameForm;
