import styled from 'styled-components';

const StyledImage = styled.img`
  width: calc(139 / 16 * 1rem);
  height: calc(26 / 16 * 1rem);

  // Mobile
  @media (max-width: 23.4375em) {
    width: calc(107.15 / 16 * 1rem);
    height: calc(20 / 16 * 1rem);
  }
`;

export default function Logo() {
  return (
    <StyledImage src="../../assets/images/logo.svg" alt="FX Checker logo" />
  );
}
