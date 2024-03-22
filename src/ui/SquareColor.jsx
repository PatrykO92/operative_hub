import styled from "styled-components";

const StyledSquareColor = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$main,
    borderColor: props.$secondary,
    color: props.$labelColor,
    width: props.width || "4rem",
    height: props.height || "4rem",
    borderWidth: props.width ? `calc(${props.width} / 4)` : "1rem",
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border-style: solid;
  outline: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-tiny);
`;

export default function SquareColor({ $label, ...props }) {
  return (
    <StyledSquareColor {...props}>
      <span>{$label}</span>
    </StyledSquareColor>
  );
}
