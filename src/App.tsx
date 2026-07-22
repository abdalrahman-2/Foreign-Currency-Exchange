import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './styles/GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5 min
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={null} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
