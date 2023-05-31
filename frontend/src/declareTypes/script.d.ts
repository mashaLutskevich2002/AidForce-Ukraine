declare module 'react-script' {
    export interface ScriptProps {
        url: string;
        onCreate?: () => void;
        onError?: () => void;
        onLoad?: () => void;
    }

    const Script: React.ComponentType<ScriptProps>;
    export default Script;
}
