import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTestInfoModal = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-sm);
  max-width: 80rem;
  line-height: 1.8;

  h3 {
    font-size: 1.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.7rem;
    font-weight: 600;
  }

  ul {
    list-style-type: disc;
    margin: 0.6rem 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  li > span {
    font-weight: 500;
  }

  div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const InfoStyledLink = styled(Link)`
  text-decoration: underline;
  color: var(--color-brand-700);
`;

export default function TestInfoModal() {
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;

  return (
    <StyledTestInfoModal>
      <h3>
        Welcome to the <span style={{ color: "red" }}>test version</span> of
        Operative Hub app.
      </h3>
      <div>
        This application was designed to assist with truck loading operations
        within my company. While simple in nature, it effectively addresses a
        long-standing challenge we&apos;ve faced.
        <br />
        This app is designed specifically for a German company, and
        unfortunately, it&apos;s not available with an English translation.
      </div>
      <p>The app comprises three primary modules:</p>
      <ul>
        <li>
          <span>Admin Dashboard:</span> You&apos;re currently on the admin
          dashboard, which enables order and truck management, as well as
          tracking production issues and machine maintenance.
          <br />
          This section of the app was developed for desktop devices.
        </li>
        <li>
          <span>Crane Operator Page:</span> This section is specifically
          tailored for crane operators involved in truck loading. Here, crane
          operators can mark orders as loaded. <br />
          This section of the app was tailored for tablet devices.
          <br />
          Access this page via the following{" "}
          <InfoStyledLink to="/crane">link</InfoStyledLink>.
        </li>
        <li>
          <span>Operator Page:</span> Dedicated to all production personnel,
          this page provides a straightforward list of orders.
          <br /> This section of the app was tailored for tablet devices.
          <br />
          Access it via the following{" "}
          <InfoStyledLink to="/operator">link</InfoStyledLink>.
        </li>
      </ul>

      <div>
        As the app is still in development, we welcome any bug reports. Please
        email them to {supportEmail}.
      </div>
    </StyledTestInfoModal>
  );
}
