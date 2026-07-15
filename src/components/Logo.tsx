import logo from '../assets/images/logo.svg';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: calc((139 / 16) * 1rem);
  height: calc((29 / 16) * 1rem);
`;
export default function Logo() {
  return <StyledImage src={logo} alt="FX Checker logo" />;
}
