/* eslint-disable camelcase */
import { NOOP } from '../../utils';
import { WindowContainerData } from './window/WindowComponent';

export const defaultTheme = {
    tab_bg_color: '#3F51B5',
    tab_text_color: '#FFFFFF',
    panel_header_text_color: '#FFFFFF',
    panel_bg_color: '#343C47',
    panel_header_bg_color: '#5C6BC0',
    panel_label_color: '#FFFFFF',
    input_label_color: '#FFFFFF',
};

interface DefaultAttributes
{
    window: WindowContainerData;
    panel: any;
}

export const defaultAttributes: DefaultAttributes = {
    window: {
        position: { x: '10px', y: '10px' },
        showLogo: true,
        showTabs: true,
        activeTab: 0,
        size: { width: 'auto', height: '272px' },
        tabSize: { width: '48px', height: '48px' },
        onToggle: NOOP,
        onTabActive: NOOP,
        isExpanded: true,
    },
    panel: {
        symbol: { text: '', color: defaultTheme.tab_bg_color, img: null },
        header: { text: '', color: defaultTheme.panel_header_text_color },
        onSelected: NOOP,
    },
};
