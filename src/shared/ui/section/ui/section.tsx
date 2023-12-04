import { classNames } from 'shared/libs/class-names';

import cls from './section.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label?: string;

  tabs?: React.ReactNode;
}

const Section = (props: Props) => {
  const { className, label, tabs, children, ...otherProps } = props;

  const mods = {
    [cls.withTabs]: !!tabs,
  };

  return (
    <div className={cls.wrapper}>
      {label && <h3 className={cls.label}>{label}</h3>}
      {tabs}
      <section className={classNames(cls.section, className, mods)} {...otherProps}>
        {children}
      </section>
    </div>
  );
};

export { Section };
