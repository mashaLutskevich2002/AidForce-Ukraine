import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import 'intersection-observer';

interface ViewportWrapperProps {
    visible: boolean;
    className?: string;
    children: ReactNode | null;
    props?: Record<string, unknown>;
}

interface ViewportProps {
    children?: ReactNode;
    className?: string;
    qaId?: string;
    render?: ({ visible }: { visible: boolean }) => ReactNode | null;
    event?: () => void;
}

export const ViewportWrapper = forwardRef<HTMLDivElement, ViewportWrapperProps>(
    ({ visible, children, ...props }, ref): JSX.Element => {
        if (!visible) {
            return (
                <div ref={ref} {...props}>
                    {children}
                </div>
            );
        }
        return <div>{children}</div>;
    },
);

export const Viewport = ({ children, className, qaId, render, event }: ViewportProps) => {
    const [visible, setVisible] = useState(false);
    const refNode = useRef<HTMLDivElement>(null);
    const content = visible ? children : null;

    useEffect(() => {
        if (refNode.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            });
            observer.observe(refNode.current);

            return () => observer.disconnect();
        }
        return undefined;
    }, []);

    useEffect(() => {
        if (visible && event) {
            event();
        }
    }, [visible]);

    return (
        <ViewportWrapper ref={refNode} visible={visible} className={className} data-qaid={qaId}>
            {event ? (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>{children}</>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>{render ? render({ visible }) : content}</>
            )}
        </ViewportWrapper>
    );
};
