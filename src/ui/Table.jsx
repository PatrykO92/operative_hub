import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1rem 1.2rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-yellow-200);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 0.1rem 1.2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-yellow-200);
  }

  ${(props) =>
    props.$danger &&
    css`
      background-color: var(--color-red-100);
    `}
`;

const StyledBody = styled.section`
  margin: 0.1rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ $columns, children }) {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { $columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" $columns={$columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children, $danger }) {
  const { $columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={$columns} $danger={$danger}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>Keine Daten zum Anzeigen</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

Table.Footer = Footer;

export default Table;
