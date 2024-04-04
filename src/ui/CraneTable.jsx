import { styled } from "styled-components";

const CraneStyledTable = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;

const CraneCommonRow = styled.div`
  align-items: center;
  column-gap: 0.2rem;
  display: grid;

  grid-template-columns:
    minmax(8rem, 0.4fr) minmax(7rem, 0.4fr) minmax(14rem, 1.5fr)
    minmax(14rem, 1.5fr) minmax(9.5rem, 0.4fr) minmax(7rem, 0.2fr) minmax(4rem, 0.1fr);

  padding: 0.5rem 1.2rem;
  transition: none;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CraneStyledHeader = styled(CraneCommonRow)`
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  border-bottom: 1px solid var(--color-yellow-200);
  color: var(--color-grey-600);
  font-weight: 600;
  letter-spacing: 0.4px;
  padding: 1rem 1.2rem;
  text-transform: uppercase;
`;

const CraneStyledBody = styled.section`
  margin-top: 1rem;
`;

const CraneStyledTruckContainer = styled.div`
  background-color: var(--color-grey-100);
  border: 2px solid var(--color-brand-700);
  border-radius: var(--border-radius-sm);

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const CraneStyledTruckContainerLabel = styled.div`
  display: grid;
  grid-template-columns:
    minmax(8rem, 0.1fr) minmax(15rem, 0.2fr) minmax(25rem, 0.6fr)
    minmax(30rem, 1fr);
  background-color: var(--color-brand-700);
  color: var(--color-grey-0);
  padding: 0.4rem 1.2rem;

  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CraneEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2.4rem;
  text-align: center;
`;

const CraneCell = styled.div`
  color: var(--color-grey-600);
  font-family: "Sono";
  font-size: 1.3rem;
  font-weight: 600;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export {
  CraneStyledTable,
  CraneCommonRow,
  CraneStyledHeader,
  CraneStyledBody,
  CraneStyledTruckContainer,
  CraneStyledTruckContainerLabel,
  CraneEmpty,
  CraneCell,
};
