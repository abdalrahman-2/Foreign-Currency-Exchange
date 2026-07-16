import styled from 'styled-components';

type props = {
  countryName: string;
  size: 'normal' | 'small';
  alt?: string;
};

const StyledFlag = styled.img<{ size: string }>`
  width: ${({ size }) => (size === 'normal' ? 24 / 16 : 20 / 16)}rem;
  height: ${({ size }) => (size === 'normal' ? 24 / 16 : 20 / 16)}rem;
  border-radius: var(--radius-full);
`;

export default function Logo({ countryName, size, alt }: props) {
  return (
    <StyledFlag
      size={size}
      src={`../../assets/images/flags/${countryName}.webp`}
      alt={alt ?? `${countryName} flag`}
    />
  );
}
