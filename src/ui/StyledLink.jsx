import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: var(--color-brand-700);
  text-align: center;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export { StyledLink };
