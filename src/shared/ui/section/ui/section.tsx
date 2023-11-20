import { classNames } from 'shared/libs/class-names';

import cls from './section.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label?: string;
}

const Section = (props: Props) => {
  const { className, label, children, ...otherProps } = props;

  return (
    <div className={cls.wrapper}>
      {label && <h3 className={cls.label}>{label}</h3>}
      <section className={classNames(cls.section, className)} {...otherProps}>
        {children}
      </section>
    </div>
  );
};

export { Section };
