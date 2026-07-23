import styled from 'styled-components';

type EmptyProps = {
  heading: string;
  description: string;
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
  padding: var(--spacing-500) 0;
  text-align: center;
`;

const StyledHeading = styled.h3`
  color: var(--neutral-100);
`;

const StyledDescription = styled.p`
  color: var(--neutral-200);
`;

export default function Empty({ heading, description }: EmptyProps) {
  return (
    <StyledContainer>
      <StyledHeading className="text-preset-2">{heading}</StyledHeading>
      <StyledDescription className="text-preset-4">
        {description}
      </StyledDescription>
    </StyledContainer>
  );
}
