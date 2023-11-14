import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'app/providers/error-boundary';
import { StoreProvider } from 'app/providers/store-provider';
import { ThemeProvider } from 'app/providers/theme-provider';
import { App } from 'app/app';

const root = createRoot(document.getElementById('root')!);

root.render(
  <ErrorBoundary>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </ErrorBoundary>,
);
