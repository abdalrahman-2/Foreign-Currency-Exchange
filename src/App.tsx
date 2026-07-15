import { Flag, Logo } from './components';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Logo />
      <Flag size="small" countryName="eg" />
    </>
  );
}

export default App;
