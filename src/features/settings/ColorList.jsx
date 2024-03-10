import styled from "styled-components";
import useGetColors from "../../hooks/useGetColors";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import SquareColor from "../../ui/SquareColor";
import { useState } from "react";
import { useRemoveColorById } from "./useRemoveColorById";
import { HiTrash } from "react-icons/hi2";

const Container = styled.div`
  background-color: var(--color-grey-200);
  padding: 1rem;
  border-radius: var(--border-radius-md);
`;

const StyledColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

export default function ColorList() {
  const [showColorList, setShowColorList] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { colors, colorsLoading } = useGetColors();
  const { removeColor, isDeleting } = useRemoveColorById();

  if (colorsLoading) return <Spinner />;

  return (
    <Container>
      <Heading as="h3" onClick={() => setShowColorList((oldVal) => !oldVal)}>
        Verfügbare Farben {showColorList ? "-" : "+"}
      </Heading>

      {showColorList && (
        <StyledColorList>
          {colors.map((color) => {
            return (
              <Box
                key={color.id}
                onClick={() => setShowOptions((oldVal) => !oldVal)}
              >
                <SquareColor
                  $main={color.main_color}
                  $secondary={color.secondary_color}
                />
                Quantität: {color.quantity}
                {showOptions && (
                  <button
                    onClick={() => removeColor(color.id)}
                    disabled={isDeleting}
                  >
                    <HiTrash />
                  </button>
                )}
              </Box>
            );
          })}
        </StyledColorList>
      )}
    </Container>
  );
}
