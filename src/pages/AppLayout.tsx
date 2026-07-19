import { Outlet } from 'react-router-dom';
import { ConverterForm, Header, Main } from '../components';

export default function AppLayout() {
  return (
    <>
      <Header />
      <Main>
        <ConverterForm />
        <Outlet />
      </Main>
    </>
  );
}
