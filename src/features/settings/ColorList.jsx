import styled from "styled-components";
import useGetColors from "../../hooks/useGetColors";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import SquareColor from "../../ui/SquareColor";
import { useState } from "react";
import { useRemoveColorById } from "./useRemoveColorById";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Container = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: var(--border-radius-md);
`;

const StyledColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-50);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

export default function ColorList() {
  const [showColorList, setShowColorList] = useState(false);

  const { colors, colorsLoading } = useGetColors();

  if (colorsLoading) return <Spinner />;

  return (
    <Container>
      <Heading as="h3" onClick={() => setShowColorList((oldVal) => !oldVal)}>
        Verfügbare Farben {showColorList ? "-" : "+"}
      </Heading>

      {showColorList && (
        <StyledColorList>
          {colors.map((color) => (
            <Box key={color.id} color={color} />
          ))}
        </StyledColorList>
      )}
    </Container>
  );
}

function Box({ color }) {
  const { removeColor, isDeleting } = useRemoveColorById();
  return (
    <Modal>
      <Modal.Open opens="delete-color">
        <StyledBox>
          <SquareColor
            $main={color.main_color}
            $secondary={color.secondary_color}
            $label={color.label}
            $labelColor={color.label_color}
          />
          Quantität: {color.quantity}
        </StyledBox>
      </Modal.Open>
      <Modal.Window name="delete-color">
        <ConfirmDelete
          disabled={isDeleting}
          resource={color.label}
          onConfirm={() => removeColor(color.id)}
        >
          <SquareColor
            $main={color.main_color}
            $secondary={color.secondary_color}
            $label={color.label}
            $labelColor={color.label_color}
          />
        </ConfirmDelete>
      </Modal.Window>
    </Modal>
  );
}
