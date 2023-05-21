/* eslint-disable camelcase */

declare namespace globalThis {
    import type { ClientConfig } from 'corgi/types';

    interface ClerkStats {
        _?: string;
        $?: {
            referrer?: string;
            url?: string;
        };
        category?: string;
        action?: string;
        ab_test?: string;
        ad_skip?: string;
        controller_action?: string;
        device_type?: string;
        district?: string;
        mobile?: boolean;
        project?: string;
        region_id?: number;
        source_version?: string;
        user_id?: number;
        user_type?: string;
    }
    interface Window {
        regeneratorRuntime: typeof regeneratorRuntime;
        clipboardData: ClipboardEventInit['clipboardData'];
        adsbygoogle: {
            loaded: boolean;
            push: ({}) => void;
        };
        SPAConfig: ClientConfig;
        initialParams: { locale: Locale };
        location: string;
        powSolve?: (powComplexity: string, powPrefix: string) => string;
        colbert: (
            ...args:
                | import('corgi/types/colbert').ColbertColors
                | import('corgi/types/colbert').ColbertHost
                | import('corgi/types/colbert').ColbertCreate
                | import('corgi/types/colbert').ColbertPopupQuestionnaire
        ) => void;
        _retag: [push: { code: string; level: number }];
        requestIdleCallback: (func: () => void, { timeout }: { timeout: number }) => void;
        ad_skip?: number;
        GAObject: 'gaUa';
        GoogleAnalyticsObject: 'gaUa';
        gaUa: (...args: any[]) => undefined;
        gtag: Gtag.Gtag;
        clerkStats: {
            push: (stats: ClerkStats, force?: boolean) => void;
        };
        initAnModulesCalled?: boolean;
        dataLayer?: any[];
        ApolloCacheState: Recrod<string, unknown>;
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (name: string, options: Record<string, string>) => void;
            reset: () => void;
        };
        verifyCaptcha?: (token: string) => void;
        GOTCHA_SITE: string;
        GOTCHA_TXID: string;
    }
}
