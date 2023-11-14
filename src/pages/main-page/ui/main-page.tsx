import { FC, memo } from 'react';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { Section } from 'shared/ui/section';

import { PageWrapper } from 'widgets/page-wrapper';



const MainPage: FC = memo(() => {
  return (
    <PageWrapper>
      <Section label="Login section">
        <Input label="User ID" value="" placeholder="Enter telegram user ID" onChange={() => {}} />
        <Input
          label="Secret key"
          value=""
          placeholder="Enter user's secret key"
          onChange={() => {}}
        />
        <Button>Send</Button>
      </Section>
    </PageWrapper>
  );
});

export { MainPage };
