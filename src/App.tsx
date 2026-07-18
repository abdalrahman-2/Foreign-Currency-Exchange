import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components';
import GlobalStyles from './styles/GlobalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, //1 min
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Header />
    </QueryClientProvider>
  );
}

export default App;
