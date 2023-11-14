import { classNames } from 'shared/libs/class-names';

import cls from './section.module.scss';

interface Props {
  className?: string;
  label?: string;

  children: React.ReactNode;
}

const Section = (props: Props) => {
  const { className, label, children } = props;

  return (
    <section className={classNames(cls.section, className)}>
      {label && <h3 className={cls.label}>{label}</h3>}
      {children}
    </section>
  );
};

export { Section };
