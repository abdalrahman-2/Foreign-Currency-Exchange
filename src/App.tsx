import { Flag, Logo, CurrencyButton } from './components';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <h1>showing components</h1>
      <Logo />
      <Flag size="small" countryName="eg" />
      <CurrencyButton countryName="sa" currency="SRY" />
    </>
  );
}

export default App;
