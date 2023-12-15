import { FC, memo } from 'react';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';
import { MessageWatcher } from 'widgets/message-watcher';
import { MessageWidget } from 'widgets/message-widget/message-widget';

import { DialogList } from 'entities/dialog';

import { Logo } from 'shared/ui/logo';

import cls from './main-page.module.scss';

const MainPage: FC = memo(() => {
  return (
    <PageWrapper>
      <div className={cls.wrapper}>
        <div className={cls.menuSection}>
          <Section>
            <Logo xSmall />
            <DialogList />
          </Section>
        </div>
        <div className={cls.messageSection}>
          <MessageWatcher>
            <MessageWidget />
          </MessageWatcher>
        </div>
      </div>
    </PageWrapper>
  );
});

export { MainPage };
