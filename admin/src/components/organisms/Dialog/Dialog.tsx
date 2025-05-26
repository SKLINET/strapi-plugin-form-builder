import { ReactNode } from 'react';
import { Dialog as StrapiDialog } from '@strapi/design-system';

interface DialogProps {
    trigger: ReactNode;
    cancel: ReactNode;
    action: ReactNode;
    icon: ReactNode;
    title: string;
    body: string;
}

const Dialog = ({ trigger, cancel, action, icon, title, body }: DialogProps) => (
    <StrapiDialog.Root>
        <StrapiDialog.Trigger>{trigger}</StrapiDialog.Trigger>
        <StrapiDialog.Content>
            <StrapiDialog.Header>{title}</StrapiDialog.Header>
            <StrapiDialog.Body icon={icon}>{body}</StrapiDialog.Body>
            <StrapiDialog.Footer>
                <StrapiDialog.Cancel>{cancel}</StrapiDialog.Cancel>
                <StrapiDialog.Action>{action}</StrapiDialog.Action>
            </StrapiDialog.Footer>
        </StrapiDialog.Content>
    </StrapiDialog.Root>
);

export { Dialog };
