import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;

  ${(props) =>
    props.type !== "checkbox" &&
    css`
      box-shadow: var(--shadow-sm);
    `}

  ${(props) =>
    props.type === "checkbox" &&
    css`
      width: 1.8rem;
      height: 1.8rem;
    `}
`;

export default Input;
