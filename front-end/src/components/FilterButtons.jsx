import { useState } from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButton from "react-bootstrap/ToggleButton";

export default function FilterButtons({ filterValue, setFilterValue }) {
  const radios = [
    { name: "All", value: "" },
    { name: "I'm attending", value: "attending" },
  ];

  return (
    <div className="text-center mt-4">
      {radios.map((radio, id) => (
        <ButtonGroup className="me-3" key={id}>
          <ToggleButton
            id={`radio-${id}`}
            type="radio"
            variant="outline-success"
            className=""
            name="radio"
            value={radio.value}
            checked={filterValue === radio.value}
            onChange={(e) => setFilterValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        </ButtonGroup>
      ))}
    </div>
  );
}
