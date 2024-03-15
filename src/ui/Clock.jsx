import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledClock = styled.div`
  color: var(--color-grey-700);
  font-weight: 500;
  width: 6rem;
`;

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <StyledClock>{time.toLocaleTimeString()}</StyledClock>;
}

export default Clock;
