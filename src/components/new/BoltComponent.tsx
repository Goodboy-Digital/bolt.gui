import React, { FC } from 'react';

import { WindowContainerData } from './window/WindowComponent';
import styled from 'styled-components';

export interface WindowView
{
    component: FC<WindowContainerData>;
    props: WindowContainerData;
}

export interface BoltContainerData
{
    viewData: WindowView[];
}

const BoltContainer = styled.div``;

export const BoltComponent: FC<BoltContainerData> = (props: BoltContainerData) =>
    (
        <BoltContainer>
            {
                props.viewData.map((view, index) =>
                    (
                        <view.component
                            key={index}
                            position={view.props.position}
                            tabSize={view.props.tabSize}
                            showLogo={view.props.showLogo}
                            showTabs={view.props.showTabs}
                            activeTab={view.props.activeTab}
                            isExpanded={view.props.isExpanded}
                            onToggle={view.props.onToggle}
                            onTabActive={view.props.onTabActive}
                            panelData={view.props.panelData}
                        />
                    ))
            }
        </BoltContainer>
    );
