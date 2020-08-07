import { Size, XY } from './';

export interface WindowData
{
    id: string;
    expanded: boolean;
    position?: XY;
    size?: Size;
    sidebarSize?: Size;
    sidebarIconSize?: Size;
    sidebarShowLogo?: boolean;
    showSidebar?: boolean;
    panelSize?: Size;
    activePanelIndex: number;
    panelIDs: string[];
}
