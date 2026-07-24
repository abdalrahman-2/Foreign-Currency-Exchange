import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './styles/GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import History from './pages/History';
import Logs from './pages/Logs';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import { AppDataProvider } from './contexts/AppDataContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5 min
    },
  },
});

function App() {
  return (
    <AppDataProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<History />} />
              <Route path="compare" element={<Compare />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="logs" element={<Logs />} />
            </Route>
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </AppDataProvider>
  );
}

export default App;
