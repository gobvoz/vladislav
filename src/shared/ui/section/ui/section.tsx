import { classNames } from 'shared/libs/class-names';

import cls from './section.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label?: string;
}

const Section = (props: Props) => {
  const { className, label, children, ...otherProps } = props;

  return (
    <section className={classNames(cls.section, className)} {...otherProps}>
      {label && <h3 className={cls.label}>{label}</h3>}
      {children}
    </section>
  );
};

export { Section };
