import {
  Flag,
  Logo,
  CurrencyButton,
  SwapButton,
  DeleteButton,
} from './components';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <h1>showing components</h1>
      <Logo />
      <Flag size="small" countryName="eg" />
      <CurrencyButton type="recieve" countryName="sa" currency="SRY" />
      <SwapButton />
      <DeleteButton />
    </>
  );
}

export default App;
