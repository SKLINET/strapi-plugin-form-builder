import { ReactNode } from 'react';
import { Box as StrapiBox } from '@strapi/design-system';

type BoxProps = Record<string, any> & {
    children: ReactNode;
    width?: string;
    bordered?: boolean;
    rounded?: 'large' | 'medium' | 'small';
};

const Box = ({ children, width = '100%', bordered = false, rounded, ...rest }: BoxProps) => {
    const borderedProps = bordered
        ? {
              borderColor: 'neutral200',
              borderStyle: 'solid',
              borderWidth: '1px',
              background: 'neutral0',
          }
        : {};

    const roundedProps = rounded
        ? {
              borderRadius: rounded === 'large' ? '16px' : rounded === 'medium' ? '12px' : '8px',
          }
        : {};

    return (
        <StrapiBox width={width} {...borderedProps} {...roundedProps} {...rest}>
            {children}
        </StrapiBox>
    );
};

export { Box };
