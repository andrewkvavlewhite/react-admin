import { CSSProperties } from 'react';
declare const motion: {
    motionName: string;
    motionAppear: boolean;
    onAppearStart: () => CSSProperties;
    onAppearActive: (node: HTMLElement) => CSSProperties;
    onLeaveStart: (node: HTMLElement) => CSSProperties;
    onLeaveActive: () => CSSProperties;
};
export default motion;
