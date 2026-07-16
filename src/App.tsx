import { Flag, Logo } from './components';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Logo />
      <h1 className="text-4xl bg-red-600">tryccc</h1>
      <Flag size="small" countryName="eg" />
    </>
  );
}

export default App;
