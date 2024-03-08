import styled from "styled-components";

const CircleColor = styled.div`
  width: 4rem;
  height: 4rem;
  border-width: 1rem;
  border-style: solid;
  background-color: ${({ $main }) => $main};
  border-color: ${({ $secondary }) => $secondary};
`;

export default CircleColor;
