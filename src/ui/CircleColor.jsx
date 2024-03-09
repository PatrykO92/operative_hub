import styled from "styled-components";

const SquareColor = styled.div`
  width: 4rem;
  height: 4rem;
  border-width: 1rem;
  border-style: solid;
  background-color: ${({ $main }) => $main};
  border-color: ${({ $secondary }) => $secondary};
  outline: 1px solid var(--color-grey-400);
`;

export default SquareColor;
