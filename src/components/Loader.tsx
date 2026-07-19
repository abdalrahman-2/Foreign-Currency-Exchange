import styled, { keyframes } from 'styled-components';

const wave = keyframes`
  to {
    background-position: 50% 0, 75% 100%;
  }
`;

const StyledLoader = styled.div`
  height: calc(30 / 16 * 1rem);
  aspect-ratio: 6;
  --c: #0000 64%, var(--neutral-50) 66% 98%, #0000 101%;
  background:
    radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
    radial-gradient(35% 146% at 50% -59%, var(--c)) 25% 100%;
  background-size: calc(100% / 3) 50%;
  background-repeat: repeat-x;
  animation: ${wave} 1s infinite linear;
`;

export default function Loader() {
  return <StyledLoader aria-label="Loading" role="status" />;
}
