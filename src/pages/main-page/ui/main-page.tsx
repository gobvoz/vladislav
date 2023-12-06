import { FC, memo } from 'react';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';

import { DialogList } from 'entities/dialog';

import { Logo } from 'shared/ui/logo';

import { MessageWatcher } from 'widgets/message-watcher';

import { MessageWidget } from 'widgets/message-widget/message-widget';

const MainPage: FC = memo(() => {
  return (
    <PageWrapper>
      <div
        style={{
          height: '100%',
          display: 'flex',
          gap: '20px',
        }}>
        <div
          style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            gap: '20px',
          }}>
          <Section>
            <Logo xSmall />
            <DialogList />
          </Section>
        </div>
        <div
          style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
          <MessageWatcher>
            <MessageWidget />
          </MessageWatcher>
        </div>
      </div>
    </PageWrapper>
  );
});

export { MainPage };
