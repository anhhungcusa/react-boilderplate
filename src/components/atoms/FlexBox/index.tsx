import React from 'react';
import classnames from 'classnames';
import './style.scss';

const alignGroup = {
  start: 'align-items-start',
  end: 'align-items-end',
  center: 'align-items-center',
};

const justifyGroup = {
  between: 'justify-content-between',
  center: 'justify-content-center',
  end: 'justify-content-end',
  start: 'justify-content-start',
};

export interface FlexBoxProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  align?: keyof typeof alignGroup;
  justify?: keyof typeof justifyGroup;
  direct?: 'row' | 'column';
  full?: boolean;
  height?: string;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  as = 'div',
  children,
  className = '',
  align,
  justify,
  direct,
  full,
  height,
  ...rest
}) => {
  const alignClassName = align ? alignGroup[align] : '';
  const justifyClassName = justify ? justifyGroup[justify] : '';
  const directClassName = direct ? `flex-${direct}` : '';
  return (
    <div
      className={classnames(
        'flex-box d-flex',
        className,
        alignClassName,
        justifyClassName,
        directClassName,
        { full },
      )}
      style={{ height: height }}
      {...rest}
    >
      {children}
    </div>
  );
};
