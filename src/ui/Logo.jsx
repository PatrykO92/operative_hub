import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  margin: 1rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
