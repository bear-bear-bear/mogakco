import { useRouter } from 'next/router';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { Children, cloneElement } from 'react';
import type { ReactNode, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children?: ReactNode;
  activeClassName: string;
}

/**
 * @desc 현재 경로와 href가 일치할 경우 child에 activeClassName을 부여합니다.
 */
const ActiveLink = ({
  children,
  activeClassName,
  ...linkProps
}: ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(children) as ReactElement;
  const childClassName = child.props.className || '';

  // pages/[slug].js will be matched via linkProps.as, not linkProps.href
  const className =
    asPath === linkProps.href || asPath === linkProps.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...linkProps}>
      {cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
