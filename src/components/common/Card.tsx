import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleIcon?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', titleIcon, footer }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center">
            {titleIcon && <span className="mr-2">{titleIcon}</span>}
            <h3 className="font-medium text-neutral-800">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;