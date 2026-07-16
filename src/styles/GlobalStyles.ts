import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  } */

  :root {
    /* ----------COLORS---------- */
    /* ========= Neutral ========= */
    --neutral-900: #0A0A0A;
    --neutral-700: #171719;
    --neutral-600: #202223;
    --neutral-500: #2E2E2E;
    --neutral-400: #3D3D3D;
    --neutral-300: #454547;
    --neutral-200: #9D9D9D;
    --neutral-100: #C6C6C6;
    --neutral-50: #FFFFFF;

    /* ========= Lime ========= */
    --lime-500: #D3FC47;
    --lime-650:#a4bd50;
    --lime-800: #283300;

    /* ========= Green ========= */
    --green-500: #42BE05;

    /* ========= Red ========= */
    --red-500: #FF4141;

    /* ----------SPACINGS---------- */
    --spacing-0: 0rem;        /* 0px */
    --spacing-025: 0.125rem;  /* 2px */
    --spacing-050: 0.25rem;   /* 4px */
    --spacing-075: 0.375rem;  /* 6px */
    --spacing-100: 0.5rem;    /* 8px */
    --spacing-125: 0.625rem;  /* 10px */
    --spacing-150: 0.75rem;   /* 12px */
    --spacing-200: 1rem;      /* 16px */
    --spacing-250: 1.25rem;   /* 20px */
    --spacing-300: 1.5rem;    /* 24px */
    --spacing-400: 2rem;      /* 32px */
    --spacing-500: 2.5rem;    /* 40px */
    --spacing-600: 3rem;      /* 48px */
    --spacing-800: 4rem;      /* 64px */
    --spacing-1000: 5rem;     /* 80px */
    --spacing-1200: 6rem;     /* 96px */
    --spacing-1400: 7rem;     /* 112px */
    --spacing-1600: 8rem;     /* 128px */
    --spacing-1800: 8.75rem;  /* 140px */

    /* ----------BORDER RADII---------- */
    --radius-0: 0rem;        /* 0px */
    --radius-4: 0.25rem;     /* 4px */
    --radius-6: 0.375rem;    /* 6px */
    --radius-8: 0.5rem;      /* 8px */
    --radius-10: 0.625rem;   /* 10px */
    --radius-12: 0.75rem;    /* 12px */
    --radius-16: 1rem;       /* 16px */
    --radius-20: 1.25rem;    /* 20px */
    --radius-24: 1.5rem;     /* 24px */
    --radius-full: 999px;
  }

  body {
    font-family: "JetBrains Mono", monospace;
    background-color: var(--neutral-900);
    color: var(--neutral-50);
  }

  /* ----------FONTS---------- */
  /* ========= Font Type ========= */
  @font-face {
    font-family: "JetBrains Mono";
    src: url("../../assets/fonts/jetbrains-mono/jetbrains-mono-variable.ttf")
        format("truetype");
    font-weight: 100 800;
    font-style: normal;
    font-display: swap;
  }

  /* ========= Font Shapes ========= */
  /* Text Preset 1 */
  .text-preset-1 {
    font-family: "JetBrains Mono", monospace;
    font-size: 2.5rem; /* 40px */
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.5px;
  }

  .text-preset-1-tablet {
    font-family: "JetBrains Mono", monospace;
    font-size: 2rem; /* 32px */
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.5px;
  }

  /* Text Preset 2 */
  .text-preset-2 {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.25rem; /* 20px */
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .text-preset-2-bold {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.25rem; /* 20px */
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.5px;
  }

  /* Text Preset 3 */
  .text-preset-3 {
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem; /* 16px */
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 1px;
  }

  .text-preset-3-medium {
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem; /* 16px */
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 1px;
  }

  .text-preset-3-bold {
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem; /* 16px */
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 1px;
  }

  /* Text Preset 4 */
  .text-preset-4 {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem; /* 14px */
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 1px;
  }

  /* Text Preset 5 */
  .text-preset-5 {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem; /* 12px */
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }

  .text-preset-5-medium {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem; /* 12px */
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.5px;
  }

  /* Text Preset 6 */
  .text-preset-6 {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.625rem; /* 10px */
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0;
  }
`;

export default GlobalStyles;
