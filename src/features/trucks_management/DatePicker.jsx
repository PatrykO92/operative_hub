import { useSearchParams } from "react-router-dom";
import Input from "../../ui/Input";
import styled from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5.5rem;

  label {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    background-color: var(--color-brand-700);
    color: var(--color-grey-50);
    font-weight: 500;
    padding: 0.7rem;
    border-radius: var(--border-radius-sm);
  }
`;

export default function DatePicker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentDate = searchParams.get("trucks_load_date") || "all";

  const handleToggle = () => {
    const newDate =
      currentDate === "all" ? new Date().toISOString().split("T")[0] : "all";
    setSearchParams((searchParams) => {
      searchParams.set("trucks_load_date", newDate);
      return searchParams;
    });
  };

  return (
    <StyledFilter>
      {currentDate !== "all" && (
        <Input
          type="date"
          value={currentDate}
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set("trucks_load_date", e.target.value);
              return searchParams;
            })
          }
        />
      )}
      <label htmlFor="current_filter_date_checkbox_check">
        Alle Termine
        <Input
          id="current_filter_date_checkbox_check"
          type="checkbox"
          checked={currentDate === "all"}
          onChange={handleToggle}
        />
      </label>
    </StyledFilter>
  );
}
