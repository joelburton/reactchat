import React from "react";

/** Present room menu with [room] selected; call [handleSave] on selection. */

function RoomPicker({ rooms, room, handleSave }) {
  return (
      <div className="form-control-lg">
        <select
            className="form-control"
            value={room}
            onChange={evt => handleSave(evt.target.value)}>
          {rooms.map(room => <option key={room}>{room}</option>)}
        </select>
      </div>
  );

}

export default RoomPicker;