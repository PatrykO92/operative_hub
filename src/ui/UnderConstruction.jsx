import styled from "styled-components";

const UnderConstructionWrapper = styled.div`
  margin: auto auto;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #721c24;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #721c24;
`;

const UnderConstruction = () => {
  return (
    <UnderConstructionWrapper>
      <Title>Im Aufbau</Title>
      <Message>
        Ich arbeite derzeit an diesem Teil der Website. Bitte schauen Sie später
        noch einmal vorbei.
      </Message>
    </UnderConstructionWrapper>
  );
};

export default UnderConstruction;
