import { FC, memo } from 'react';

import { PageWrapper } from 'widgets/page-wrapper';

const MainPage: FC = memo(() => {
  return (
    <PageWrapper>
      <h1>Main page</h1>
    </PageWrapper>
  );
});

export { MainPage };
