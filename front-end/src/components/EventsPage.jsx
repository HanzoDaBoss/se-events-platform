import { useState } from "react";
import EventsList from "./EventsList";
import FilterButtons from "./FilterButtons";

export default function EventsPage() {
  const [filterValue, setFilterValue] = useState("");
  return (
    <>
      <h1>Events</h1>
      <FilterButtons
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <EventsList wrapper="link" filterBy={filterValue} />
    </>
  );
}
