import {
  Flag,
  Logo,
  CurrencyButton,
  SwapButton,
  DeleteButton,
  LogButton,
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
      <LogButton className="text-preset-5-medium" state="empty" />
    </>
  );
}

export default App;
