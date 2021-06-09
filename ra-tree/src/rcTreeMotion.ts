import { CSSProperties } from 'react';

const motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: (): CSSProperties => ({ height: 0 }),
    onAppearActive: (node: HTMLElement): CSSProperties => ({
        height: node.scrollHeight,
    }),
    onLeaveStart: (node: HTMLElement): CSSProperties => ({
        height: node.offsetHeight,
    }),
    onLeaveActive: (): CSSProperties => ({ height: 0 }),
};

export default motion;
