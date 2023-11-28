import { FC, memo } from 'react';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';

import { MessageList } from 'entities/message';
import { DialogList } from 'entities/dialog';

import { Logo } from 'shared/ui/logo';

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
          <MessageList />
        </div>
      </div>
    </PageWrapper>
  );
});

export { MainPage };
