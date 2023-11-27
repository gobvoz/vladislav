import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'app/providers/error-boundary';
import { StoreProvider } from 'app/providers/store-provider';
import { ThemeProvider } from 'app/providers/theme-provider';
import { App } from 'app/app';
import { TelegramProvider } from 'app/providers/telegram-provider/ui/telegram.provider';

const root = createRoot(document.getElementById('root')!);

root.render(
  <ErrorBoundary>
    <StoreProvider>
      <TelegramProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </TelegramProvider>
    </StoreProvider>
  </ErrorBoundary>,
);
