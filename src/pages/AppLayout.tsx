import { ConverterForm, Header, Main } from '../components';
import RoutesContainer from '../components/RoutesContainer';

export default function AppLayout() {
  return (
    <>
      <Header />
      <Main>
        <ConverterForm />
        <RoutesContainer />
      </Main>
    </>
  );
}
