import { Size } from '.';

export interface SidebarIconData
{
    active: boolean;
    bgColour?: string;
    text?: string;
    textColour?: string;
    img?: string;
    imgAlt?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick?: Function;
    size: Size;
}

export interface SidebarData
{
    showSidebar: boolean;
    size: Size;
    iconSize: Size;
    logo?: string;
    logoAlt?: string;
    icons: SidebarIconData[];
    onToggle: () => void;
    expanded: boolean;
}
