import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    addWindow,
    addPanel,
    removePanel,
    addComponent,
    removeComponent,
    updateComponent,
    getWindows,
    toggleWindowExpanded,
    setStore,
} from '../redux';
import { ApplicationStore } from '../types';
import styled from 'styled-components';
import WindowComponent from './panels/WindowComponent';

const mapStateToProps = (store: ApplicationStore) =>
{
    const windows = getWindows(store);

    return { windows, store };
};
const mapDispatch = {
    addWindow,
    addPanel,
    removePanel,
    setStore,
    addComponent,
    updateComponent,
    removeComponent,
    toggleWindowExpanded,
};
const connector = connect(mapStateToProps, mapDispatch);

type BoltGUIReduxProps = ConnectedProps<typeof connector>;

export interface BoltProps extends BoltGUIReduxProps
{
    stage?: any; // this will be the reference object for the game if needed
}

const BoltContainer = styled.div``;

class BoltGUI extends Component<BoltProps>
{
    constructor(props: BoltProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        const windows: string[] = Object.keys(this.props.windows);

        return (
            <BoltContainer>
                {
                    windows.map((key) =>
                        (<WindowComponent
                            key={key}
                            data={this.props.windows[key]}
                        />))
                }
            </BoltContainer>
        );
    }
}

export default connector(BoltGUI);
