/* eslint-disable camelcase */
import { NOOP } from '../utils';
import { WindowData } from '../types';

export const defaultTheme = {
    sidebar_bg_color: '#3F51B5',
    sidebar_text_color: '#FFFFFF',
    panel_header_text_color: '#FFFFFF',
    panel_bg_color: '#343C47',
    panel_header_bg_color: '#5C6BC0',
    panel_label_color: '#FFFFFF',
    input_label_color: '#FFFFFF',
};

interface DefaultAttributes
{
    window: WindowData;
    panel: any;
}

export const defaultAttributes: DefaultAttributes = {
    window: {
        id: 'defaultID',
        expanded: true,
        position: { x: '10px', y: '10px' },
        size: { width: 'auto', height: '272px' },
        showSidebar: true,
        sidebarSize: { width: '48px', height: '272px' },
        sidebarIconSize: { width: '48px', height: '48px' },
        sidebarShowLogo: true,
        activePanelIndex: 0,
        panelSize: { width: 'auto', height: '48px' },
        panelData: [],
    },
    panel: {
        symbol: { text: '', color: defaultTheme.sidebar_bg_color, img: null },
        header: { text: '', color: defaultTheme.panel_header_text_color },
        onSelected: NOOP,
    },
};
