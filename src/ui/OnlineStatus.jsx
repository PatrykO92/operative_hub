import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";

const StyledOnlineStatus = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: var(--color-brand-500);
  font-weight: 700;
  font-size: 3rem;
  color: var(--color-brand-700);
  z-index: 99999;
`;

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline)
    return (
      <StyledOnlineStatus>
        <Logo />
        <p>Keine Internetverbindung.</p>
      </StyledOnlineStatus>
    );
};

export default OnlineStatus;
