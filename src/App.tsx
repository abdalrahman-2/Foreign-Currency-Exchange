import {
  Flag,
  Logo,
  CurrencyButton,
  SwapButton,
  DeleteButton,
  LogButton,
  FavoritButton,
  SmallFavoritButton,
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
      <LogButton state="filled" />
      <FavoritButton state="favorited" />
      <SmallFavoritButton state="favorited" />
    </>
  );
}

export default App;
