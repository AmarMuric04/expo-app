import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

const cx = (...args: classNames.ArgumentArray) =>
  twMerge(classNames(args).split(' '));

export { cx };
