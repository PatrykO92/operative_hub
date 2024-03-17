import styled from "styled-components";

const SquareColor = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$main,
    borderColor: props.$secondary,
    width: props.width || "4rem",
    height: props.height || "4rem",
    borderWidth: props.width ? `calc(${props.width} / 4)` : "1rem",
  },
}))`
  border-style: solid;
  outline: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-tiny);
`;

export default SquareColor;
