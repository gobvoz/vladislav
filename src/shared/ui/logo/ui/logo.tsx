import { memo } from 'react';

import { classNames } from 'shared/libs/class-names';

import cls from './logo.module.scss';

interface Props {
  className?: string;

  xSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xLarge?: boolean;
}

const Logo = memo((props: Props) => {
  const { className, xSmall, small, medium, large, xLarge } = props;

  const mods = {
    [cls.xSmall]: xSmall,
    [cls.small]: small,
    [cls.medium]: medium,
    [cls.large]: large,
    [cls.xLarge]: xLarge,
  };

  return (
    <div className={classNames(cls.wrapper, className, mods)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 512" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M251.001 0.0282685C391.831 -2.04974 507.296 110.7 509.501 251.528C511.74 394.553 394.027 513.146 251.001 511.028C111.283 508.959 0.273911 395.76 0.000504732 256.028C-0.273446 116.018 111.005 2.09396 251.001 0.0282685ZM71.5005 251.528C61.0005 247.528 67.0005 236.028 78.5005 231.528L383.001 114.528C392.501 110.528 406.001 117.028 401.001 142.028L349.001 383.528C346.501 395.528 332.001 398.528 324.501 392.528L245.501 335.028L201.501 376.528C197.501 380.528 185.501 379.028 183.501 373.528L152.001 277.528L71.5005 251.528Z"
          fill="url(#gradient)"
          fillOpacity="0.4"
        />
        <path
          d="M164.001 273.028L192.001 358.028L197.501 299.528C197.501 299.528 341.001 173.028 342.501 168.528C344.001 164.028 340.001 163.028 334.501 165.528L164.001 273.028Z"
          fill="url(#gradient)"
          fillOpacity="0.4"
        />
        <defs>
          <linearGradient
            id="gradient"
            x1="463"
            y1="104"
            x2="45"
            y2="404"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.3" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});

export { Logo };
