import React from 'react';
import classnames from 'classnames';
import './style.scss';

const alignGroup = {
  start: 'align-start',
  end: 'align-end',
  center: 'align-center',
};

const justifyGroup = {
  between: 'justify-between',
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
};

export interface FlexBoxProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  align?: keyof typeof alignGroup;
  justify?: keyof typeof justifyGroup;
  direct?: 'row' | 'column';
  full?: boolean;
  height?: string;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
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
