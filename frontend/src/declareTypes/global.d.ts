declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.graphql' {
    import { DocumentNode } from 'graphql';

    const Schema: DocumentNode;
    export = Schema;
}

// eslint-disable-next-line camelcase
declare let __webpack_public_path__: string;

declare interface NodeModule {
    hot: {
        accept(path?: string, fn?: () => void, callback?: () => void): void;
    };
}

declare module 'classnames' {
    import classSet from 'classnames';

    export default classSet;
}

declare module '*.svg' {
    const content: string;

    export default content;
}

declare module '*.png';
declare module '*.jpg';

declare namespace Express {
    export interface Request {
        txid?: string | string[];
        pageName: string;
    }
}

declare module 'react-hot-toast';
