import styled from "styled-components";
import { CgUnavailable } from "react-icons/cg";

const StyledOrderLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const SmallLabel = styled.div`
  width: 60rem;
  padding: 1rem;
  border: 1px solid var(--color-grey-800);
  border-radius: var(--border-radius-lg);
  border-bottom: 0;
  display: grid;
  grid-template-rows: 2.8rem 5.3rem 2.8rem 2.8rem;
`;

const BigLabel = styled.div`
  padding: 1.5rem;
  border: 1px solid var(--color-grey-800);
  border-radius: var(--border-radius-lg);
  border-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3.3rem 3.3rem 2.8rem 5.3rem 2.8rem 2.8rem 2.8rem;
`;

const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  & > div > span:first-child {
    font-size: 1.2rem;
    font-weight: normal;
  }

  & > div > span:last-child {
    font-weight: 600;
    font-size: inherit; /* Inherits default font size */
  }
`;

const RowBetweenStyled = styled(RowBetween)`
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-grey-400);
  font-weight: 600;
  font-size: 1.9rem;
  margin-bottom: -1px;
`;

const RowBetweenX = styled(RowBetween)`
  align-items: center;
  justify-content: center;
  font-size: 15rem;
`;

export default function OrderLabel({ order }) {
  return (
    <StyledOrderLabel>
      <SmallLabel>
        <RowBetween>
          <div>
            <span>Projekt: </span>
            <span>{order.project_number}</span>
          </div>
          <div>
            <span>Plan: </span>
            <span>---</span>
          </div>

          <div>
            <span></span>
            <span>---</span>
          </div>
          <div></div>
        </RowBetween>
        <RowBetween>
          <div>
            <span>Anz: </span>
            <span>---</span>
          </div>
          <div>
            <span></span>
            <span>Ø--</span>
          </div>
          <img
            src="/barcode.svg"
            alt="Barcode-Beispiel"
            style={{ height: "6rem" }}
          />
        </RowBetween>
        <RowBetween>
          <div></div>
          <div>
            <span>Pos: </span>
            <span>---</span>
          </div>
          <div>
            <span>Lange: </span>
            <span>---</span>
          </div>
          <div></div>
          <div>
            <span></span>
            <span>---</span>
          </div>
        </RowBetween>
        <RowBetween>
          <div>
            <span>Gew: </span>
            <span>---</span>
          </div>
          <div>
            <span>Fuhre: </span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span>{order.truck_side_nr}</span>
          </div>
          <div>
            <span></span>
            <span>---</span>
          </div>
          <div>
            <span></span>
            <span>{order.project_date}</span>
          </div>
        </RowBetween>
      </SmallLabel>
      <BigLabel>
        <RowBetweenStyled style={{ gridColumn: "span 2" }}>
          {order.client_name}
        </RowBetweenStyled>
        <RowBetweenStyled style={{ gridColumn: "span 2" }}>
          {order.construction_site}
        </RowBetweenStyled>
        <RowBetween>
          <div>
            <span>Projekt: </span>
            <span>{order.project_number}</span>
          </div>
          <div>
            <span>Plan: </span>
            <span>---</span>
          </div>
          <div></div>
        </RowBetween>
        <RowBetween style={{ gridColumn: "1" }}>
          <div></div>
          <div>
            <span>Anz: </span>
            <span>---</span>
          </div>
          <div>
            <span></span>
            <span>Ø--</span>
          </div>
          <div></div>
        </RowBetween>
        <RowBetween style={{ gridColumn: "1" }}>
          <div>
            <span>Pos: </span>
            <span>---</span>
          </div>
          <div>
            <span>Lange: </span>
            <span>---</span>
          </div>
          <div></div>
        </RowBetween>
        <RowBetween style={{ gridColumn: "1" }}></RowBetween>
        <RowBetween style={{ gridColumn: "1" }}>
          <div>
            <span>Bund: </span>
            <span>---kg</span>
          </div>
          <div>
            <span></span>
            <span>{order.project_date}</span>
          </div>
        </RowBetween>
        <RowBetweenX style={{ gridColumn: "2", gridRow: "3/-1" }}>
          <CgUnavailable size="11rem" alt="Projektbild nicht verfügbar" />
        </RowBetweenX>
      </BigLabel>
    </StyledOrderLabel>
  );
}
