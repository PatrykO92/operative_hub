import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: ${(props) => props.height};
  width: auto;
  margin: 1rem;
`;

function Logo({ height = "9.6rem" }) {
  return (
    <StyledLogo>
      <Img height={height} src="/logo-light.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
