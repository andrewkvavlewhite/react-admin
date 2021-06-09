var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { makeStyles } from '@material-ui/core/styles';
var useRcTreeStyles = makeStyles(function (theme) { return ({
    '@keyframes checkboxEffect': {
        '0%': {
            transform: 'scale(1)',
            opacity: '0.5',
        },
        '100%': {
            transform: 'scale(1.6)',
            opacity: '0',
        },
    },
    root: {
        '& .rc-tree.rc-tree-directory .rc-tree-treenode': {
            position: 'relative',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode::before': {
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '4px',
            left: '0',
            transition: 'background-color 0.3s',
            content: "''",
            pointerEvents: 'none',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode:hover::before': {
            background: theme.palette.action.hover,
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode > *': { zIndex: '1' },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode .rc-tree-switcher': {
            transition: 'color 0.3s',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode .rc-tree-node-content-wrapper': {
            borderRadius: '0',
            userSelect: 'none',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode .rc-tree-node-content-wrapper:hover': {
            background: 'transparent',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode .rc-tree-node-content-wrapper.rc-tree-node-selected': {
            color: theme.palette.background.paper,
            background: 'transparent',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode-selected:hover::before,& .rc-tree.rc-tree-directory .rc-tree-treenode-selected::before': {
            background: '#1890ff',
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode-selected .rc-tree-switcher': {
            color: theme.palette.background.paper,
        },
        '& .rc-tree.rc-tree-directory .rc-tree-treenode-selected .rc-tree-node-content-wrapper': {
            color: theme.palette.background.paper,
            background: 'transparent',
        },
        '& .rc-tree-checkbox': {
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: '14px',
            fontVariant: 'tabular-nums',
            lineHeight: ['1.5715', '1'],
            listStyle: 'none',
            fontFeatureSettings: "'tnum'",
            position: 'relative',
            top: '-0.09em',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            outline: 'none',
            cursor: 'pointer',
        },
        '& .rc-tree-checkbox-wrapper:hover .rc-tree-checkbox-inner,& .rc-tree-checkbox:hover .rc-tree-checkbox-inner,& .rc-tree-checkbox-input:focus + .rc-tree-checkbox-inner': {
            borderColor: theme.palette.type === 'light'
                ? theme.palette.info.light
                : theme.palette.info.dark,
        },
        '& .rc-tree-checkbox-checked::after': {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: '1px solid #1890ff',
            borderRadius: '2px',
            visibility: 'hidden',
            animation: '$checkboxEffect 0.36s ease-in-out',
            animationFillMode: 'backwards',
            content: "''",
        },
        '& .rc-tree-checkbox:hover::after,& .rc-tree-checkbox-wrapper:hover .rc-tree-checkbox::after': {
            visibility: 'visible',
        },
        '& .rc-tree-checkbox-inner': {
            position: 'relative',
            top: '0',
            left: '0',
            display: 'block',
            width: '16px',
            height: '16px',
            direction: 'ltr',
            backgroundColor: '#fff',
            border: '1px solid #d9d9d9',
            borderRadius: '2px',
            borderCollapse: 'separate',
            transition: 'all 0.3s',
        },
        '& .rc-tree-checkbox-inner::after': {
            position: 'absolute',
            top: '50%',
            left: '22%',
            display: 'table',
            width: '5.71428571px',
            height: '9.14285714px',
            border: '2px solid #fff',
            borderTop: '0',
            borderLeft: '0',
            transform: 'rotate(45deg) scale(0) translate(-50%, -50%)',
            opacity: '0',
            transition: 'all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s',
            content: "' '",
        },
        '& .rc-tree-checkbox-input': {
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '1',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            opacity: '0',
        },
        '& .rc-tree-checkbox-checked .rc-tree-checkbox-inner::after': {
            position: 'absolute',
            display: 'table',
            border: "2px solid " + theme.palette.background.paper,
            borderTop: '0',
            borderLeft: '0',
            transform: 'rotate(45deg) scale(1) translate(-50%, -50%)',
            opacity: '1',
            transition: 'all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s',
            content: "' '",
        },
        '& .rc-tree-checkbox-checked .rc-tree-checkbox-inner': {
            backgroundColor: theme.palette.type === 'light'
                ? theme.palette.info.light
                : theme.palette.info.dark,
            borderColor: theme.palette.type === 'light'
                ? theme.palette.info.light
                : theme.palette.info.dark,
        },
        '& .rc-tree-checkbox-disabled': { cursor: 'not-allowed' },
        '& .rc-tree-checkbox-disabled.rc-tree-checkbox-checked .rc-tree-checkbox-inner::after': {
            borderColor: 'rgba(0, 0, 0, 0.25)',
            animationName: 'none',
        },
        '& .rc-tree-checkbox-disabled .rc-tree-checkbox-input': {
            cursor: 'not-allowed',
        },
        '& .rc-tree-checkbox-disabled .rc-tree-checkbox-inner': {
            backgroundColor: '#f5f5f5',
            borderColor: '#d9d9d9 !important',
        },
        '& .rc-tree-checkbox-disabled .rc-tree-checkbox-inner::after': {
            borderColor: '#f5f5f5',
            borderCollapse: 'separate',
            animationName: 'none',
        },
        '& .rc-tree-checkbox-disabled + span': {
            color: 'rgba(0, 0, 0, 0.25)',
            cursor: 'not-allowed',
        },
        '& .rc-tree-checkbox-disabled:hover::after,& .rc-tree-checkbox-wrapper:hover .rc-tree-checkbox-disabled::after': {
            visibility: 'hidden',
        },
        '& .rc-tree-checkbox-wrapper': {
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: '14px',
            fontVariant: 'tabular-nums',
            lineHeight: ['1.5715', 'unset'],
            listStyle: 'none',
            fontFeatureSettings: "'tnum'",
            display: 'inline-block',
            cursor: 'pointer',
        },
        '& .rc-tree-checkbox-wrapper.rc-tree-checkbox-wrapper-disabled': {
            cursor: 'not-allowed',
        },
        '& .rc-tree-checkbox-wrapper + .rc-tree-checkbox-wrapper': {
            marginLeft: '8px',
        },
        '& .rc-tree-checkbox + span': {
            paddingRight: '8px',
            paddingLeft: '8px',
        },
        '& .rc-tree-checkbox-group': {
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: '14px',
            fontVariant: 'tabular-nums',
            lineHeight: '1.5715',
            listStyle: 'none',
            fontFeatureSettings: "'tnum'",
            display: 'inline-block',
        },
        '& .rc-tree-checkbox-group-item': {
            display: 'inline-block',
            marginRight: '8px',
        },
        '& .rc-tree-checkbox-group-item:last-child': { marginRight: '0' },
        '& .rc-tree-checkbox-group-item + .rc-tree-checkbox-group-item': {
            marginLeft: '0',
        },
        '& .rc-tree-checkbox-indeterminate .rc-tree-checkbox-inner': {
            backgroundColor: '#fff',
            borderColor: '#d9d9d9',
        },
        '& .rc-tree-checkbox-indeterminate .rc-tree-checkbox-inner::after': {
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            backgroundColor: '#1890ff',
            border: '0',
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '1',
            content: "' '",
        },
        '& .rc-tree-checkbox-indeterminate.rc-tree-checkbox-disabled .rc-tree-checkbox-inner::after': {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderColor: 'rgba(0, 0, 0, 0.25)',
        },
        '& .rc-tree': {
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontVariant: 'tabular-nums',
            lineHeight: '1.5715',
            listStyle: 'none',
            fontFeatureSettings: "'tnum'",
            // background: '#fff',
            // borderRadius: '2px',
            transition: 'background-color 0.3s',
        },
        '& .rc-tree-focused:not(:hover):not(.rc-tree-active-focused)': {
            background: theme.palette.action.hover,
        },
        '& .rc-tree-list-holder-inner': {
            alignItems: 'flex-start',
        },
        '& .rc-tree.rc-tree-block-node .rc-tree-list-holder-inner': {
            alignItems: 'stretch',
        },
        '& .rc-tree.rc-tree-block-node .rc-tree-list-holder-inner .rc-tree-node-content-wrapper': {
            flex: 'auto',
        },
        '& .rc-tree .rc-tree-treenode': {
            display: 'flex',
            alignItems: 'flex-start',
            padding: '0 0 4px 0',
            outline: 'none',
            overflow: 'hidden',
        },
        '& .rc-tree .rc-tree-treenode-disabled .rc-tree-node-content-wrapper': {
            color: 'rgba(0, 0, 0, 0.25)',
            cursor: 'not-allowed',
        },
        '& .rc-tree .rc-tree-treenode-disabled .rc-tree-node-content-wrapper:hover': {
            background: 'transparent',
        },
        '& .rc-tree .rc-tree-treenode-active .rc-tree-node-content-wrapper': {
            background: '#f5f5f5',
        },
        '& .rc-tree-indent': {
            alignSelf: 'stretch',
            whiteSpace: 'nowrap',
            userSelect: 'none',
        },
        '& .rc-tree-indent-unit': { display: 'inline-block', width: '24px' },
        '& .rc-tree .rc-tree-switcher': {
            flex: 'none',
            width: '24px',
            height: '24px',
            margin: '0',
            lineHeight: '24px',
            textAlign: 'center',
            cursor: 'pointer',
        },
        '& .rc-tree .rc-tree-switcher .rc-tree-switcher-icon,& .rc-tree .rc-tree-switcher .rc-tree-switcher-icon': {
            fontSize: 24,
            display: 'inline-block',
            fontWeight: 'bold',
        },
        '& .rc-tree .rc-tree-switcher svg.rc-tree-switcher-icon , & .rc-tree .rc-tree-switcher svg.rc-tree-switcher-icon': {
            transition: 'transform 0.3s',
        },
        '& .rc-tree .rc-tree-switcher-noop': { cursor: 'default' },
        '& .rc-tree .rc-tree-switcher_close svg.rc-tree-switcher-icon': {
            transform: 'rotate(-90deg)',
        },
        '& .rc-tree .rc-tree-checkbox': {
            top: 'initial',
            margin: '4px 8px 0 0',
        },
        '& .rc-tree .rc-tree-node-content-wrapper': {
            minHeight: '24px',
            margin: '0',
            padding: '0 4px',
            color: 'inherit',
            lineHeight: '24px',
            background: 'transparent',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s',
        },
        '& .rc-tree .rc-tree-node-content-wrapper:hover': {
            background: theme.palette.action.hover,
        },
        '& .rc-tree .rc-tree-node-content-wrapper.rc-tree-node-selected': {
            backgroundColor: theme.palette.action.selected,
        },
        '& .rc-tree .rc-tree-node-content-wrapper .rc-tree-iconEle': {
            display: 'inline-block',
            width: '24px',
            height: '24px',
            lineHeight: '24px',
            textAlign: 'center',
            verticalAlign: 'top',
        },
        '& .rc-tree .rc-tree-node-content-wrapper .rc-tree-iconEle:empty': {
            display: 'none',
        },
        '& .rc-tree .rc-tree-treenode-loading .rc-tree-iconEle': {
            display: 'none',
        },
        "& .rc-tree-node-content-wrapper[draggable='true']": {
            lineHeight: '20px',
            borderTop: '2px transparent solid',
            borderBottom: '2px transparent solid',
            userSelect: 'none',
        },
        '& .rc-tree .rc-tree-treenode.drag-over > [draggable]': {
            color: 'white',
            backgroundColor: '#1890ff',
            opacity: '0.8',
        },
        '& .rc-tree .rc-tree-treenode.drag-over-gap-top > [draggable]': {
            borderTopColor: '#1890ff',
        },
        '& .rc-tree .rc-tree-treenode.drag-over-gap-bottom > [draggable]': {
            borderBottomColor: '#1890ff',
        },
        '& .rc-tree-show-line': {},
        '& .rc-tree-show-line .rc-tree-indent-unit': {
            position: 'relative',
            height: '100%',
        },
        '& .rc-tree-show-line .rc-tree-indent-unit::before': {
            position: 'absolute',
            top: 'calc(100% - 4px)',
            right: '-12px',
            bottom: '-28px',
            borderRight: '1px solid #d9d9d9',
            content: "''",
        },
        '& .rc-tree-show-line .rc-tree-indent-unit-end::before': {
            display: 'none',
        },
        '& .rc-tree-show-line .rc-tree-treenode-motion:not(.ant-motion-collapse-leave):not(.ant-motion-collapse-appear-active) .rc-tree-indent-unit::before': {
            display: 'none',
        },
        '& .rc-tree-show-line .rc-tree-switcher': {
            zIndex: '1',
            background: theme.palette.background.paper,
        },
        '& .rc-tree-rtl': { direction: 'rtl' },
        '& .rc-tree .rc-tree-treenode-rtl': { direction: 'rtl' },
        '& .rc-tree-rtl.rc-tree .rc-tree-switcher_close svg.rc-tree-switcher-icon': {
            transform: 'rotate(90deg)',
        },
        '& .rc-tree-rtl.rc-tree-show-line .rc-tree-indent-unit::before': {
            right: 'auto',
            left: '-12px',
            borderRight: 'none',
            borderLeft: '1px solid #d9d9d9',
        },
        // added by react-admin
        '& .rc-tree .rc-tree-title': __assign({}, theme.typography.body1),
        '& .node-motion': {
            transition: 'height 0.15s, opacity 0.15s',
            transitionTimingFunction: 'ease-in-out',
            overflowY: 'hidden',
        },
        '& .rc-tree *, & .rc-tree *::before, & .rc-tree *::after': {
            boxSizing: 'border-box',
        },
    },
    smallIcon: {
        fontSize: '1.2em',
        paddingTop: 4,
    },
}); });
export default useRcTreeStyles;
