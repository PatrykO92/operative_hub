import styled from "styled-components";

import TestInfoModal from "./TestInfoModal";
import Modal from "./Modal";
import Button from "./Button";

const StyledTestIndicator = styled.div`
  background-color: var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-0);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80rem;
  gap: 2rem;
`;

export default function TestInfo() {
  const testUser = import.meta.env.VITE_TEST_USER;

  if (testUser)
    return (
      <StyledTestIndicator>
        <h5>You are on the test page, click the button to learn more.</h5>
        <Modal defaultOpen="test-window">
          <Modal.Open opens="test-window">
            <Button $variation="green" $size="small">
              More info
            </Button>
          </Modal.Open>
          <Modal.Window name="test-window">
            <TestInfoModal />
          </Modal.Window>
        </Modal>
      </StyledTestIndicator>
    );
}
