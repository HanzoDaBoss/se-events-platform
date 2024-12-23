import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Container from "react-bootstrap/Container";

export default function FilterButtons({ filterValue, setFilterValue }) {
  const radios = [
    { name: "All", value: "" },
    { name: "I'm attending", value: "attending" },
  ];

  return (
    <Container className="text-center mt-4">
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
    </Container>
  );
}
