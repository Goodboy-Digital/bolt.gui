import { SidebarIconData } from './';

export interface PanelData
{
    id: string;
    title: string;
    icon: SidebarIconData;
    panelColour?: string;
    childIDs: string[];
    isActive: boolean;
}
