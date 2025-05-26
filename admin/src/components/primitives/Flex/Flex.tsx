import { ReactNode } from 'react';
import { Flex as StrapiFlex } from '@strapi/design-system';

type FlexProps = Record<string, any> & {
    children: ReactNode;
    width?: string;
    bordered?: boolean;
    rounded?: 'large' | 'medium' | 'small';
    direction?: 'row' | 'column';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justifyContent?: 'center' | 'flex-start' | 'flex-end';
    flexWrap?: 'wrap' | 'nowrap';
    gap?: number | string;
};

const Flex = ({
    children,
    width = '100%',
    bordered = false,
    rounded,
    direction = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    flexWrap = 'nowrap',
    gap = 0,
    ...rest
}: FlexProps) => {
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
        <StrapiFlex
            width={width}
            {...borderedProps}
            {...roundedProps}
            direction={direction}
            alignItems={alignItems}
            justifyContent={justifyContent}
            flexWrap={flexWrap}
            gap={gap}
            {...rest}
        >
            {children}
        </StrapiFlex>
    );
};

export { Flex };
