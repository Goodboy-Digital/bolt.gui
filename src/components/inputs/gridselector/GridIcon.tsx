import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface GridIconProps
{
    active: boolean;
    url: string;
    height: string;
    width: string;
    onClick: () => void;
}

const Container = styled.div<{ height: string; width: string }>`
    display: inline-flex;
    width: ${(p: { width:string }) => p.width};
    height: ${(p: { height:string }) => p.height};
`;

const Icon = styled.img<{active: boolean}>`
    width: 100%;
    height: 100%;
    opacity: ${(p: { active: boolean }) => (p.active ? '1' : '0.8')};
`;

export const GridIcon: FunctionComponent<GridIconProps> = (props: GridIconProps) =>
{
    const { active, width, height, url, onClick } = props;

    return (
        <Container width={width} height={height} onClick={onClick}>
            <Icon active={active} src={url} />
        </Container>
    );
};

