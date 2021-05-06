import { createStore } from 'redux';
import BoltGUI from '../BoltGUI';
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from '../../redux/reducers';
import { ButtonInputComponent, CollapsibleFolderComponent, GridSelectorComponent } from '../inputs';
import { addWindow, addPanel, addComponent, updateComponent, removeComponent } from '../../redux';
import { storiesOf } from '@storybook/react';
import logo from '../../assets/goodboy-logo.png';

// This is `Bolt GUI`

const store = createStore(rootReducer);

store.dispatch(addWindow({
    id: 'window1',
    expanded: true,
    position: { x: '40px', y: '40px' },
    sidebarSize: { height: '250px', width: '50px' },
    panelSize: { height: '250px', width: '250px' },
    showSidebar: true,
    activePanelIndex: 0,
    panelIDs: [],
}));

store.dispatch(addPanel({
    id: 'panel1',
    title: 'Test Panel',
    icon: {
        text: 'Te',
        active: true,
        size: { height: '40px', width: '40px' },
    },
    childIDs: [],
    isActive: true,
}, 'window1'));

store.dispatch(addWindow({
    id: 'window2',
    expanded: true,
    position: { x: '400px', y: '40px' },
    sidebarSize: { height: '250px', width: '50px' },
    panelSize: { height: '250px', width: '250px' },
    showSidebar: true,
    activePanelIndex: 0,
    panelIDs: [],
}));

store.dispatch(addPanel({
    id: 'panel2',
    title: 'Test Panel',
    icon: {
        text: 'Te',
        active: true,
        size: { height: '40px', width: '40px' },
    },
    childIDs: [],
    isActive: true,
}, 'window2'));

store.dispatch(addPanel({
    id: 'panel3',
    title: 'Another Test Panel',
    icon: {
        text: 'p2',
        active: false,
        size: { height: '40px', width: '40px' },
    },
    childIDs: [],
    isActive: false,
}, 'window2'));

store.dispatch(addComponent({
    id: 'folder1',
    component: CollapsibleFolderComponent,
    inputData: {
        id: 'folder1',
        childIDs: [],
        label: 'Folder 1',
        expanded: true,
    },
}, 'panel1'));

store.dispatch(addComponent({
    id: 'button1',
    component: ButtonInputComponent,
    inputData: {
        buttonText: 'click me',
        callOnClick: () =>
        {
            store.dispatch(updateComponent({
                id: 'button1',
                component: ButtonInputComponent,
                inputData: {
                    buttonText: 'ive been updated',
                    callOnClick: () =>
                    {
                        store.dispatch(removeComponent('button1', 'folder1'));
                    },
                },
            }));
        },
    },
}, 'folder1'));

store.dispatch(addComponent({
    id: 'button2',
    component: ButtonInputComponent,
    inputData: {
        buttonText: 'click me',
        callOnClick: () =>
        {
            store.dispatch(updateComponent({
                id: 'button2',
                component: ButtonInputComponent,
                inputData: {
                    buttonText: 'ive been updated',
                    callOnClick: () =>
                    {
                        store.dispatch(removeComponent('button2', 'folder1'));
                    },
                },
            }));
        },
    },
}, 'folder1'));

store.dispatch(addWindow({
    id: 'window3',
    expanded: true,
    position: { x: '750px', y: '40px' },
    sidebarSize: { height: '250px', width: '50px' },
    panelSize: { height: '250px', width: '250px' },
    showSidebar: true,
    activePanelIndex: 0,
    panelIDs: [],
}));

store.dispatch(addPanel({
    id: 'panel4',
    title: 'Panel 4, window 3',
    icon: {
        text: 'p4',
        active: false,
        size: { height: '40px', width: '40px' },
    },
    childIDs: [],
    isActive: false,
}, 'window3'));

store.dispatch(addComponent({
    id: 'gridSelect',
    component: GridSelectorComponent,
    inputData: {
        id: 'gridSelect',
        imageURLs: [
            logo,
            logo,
            logo,
            logo,
            logo,
            logo,
            logo,
            logo,
            logo,
            logo,
        ],
        selection: '',
        onSelect: (url) =>
        {
            console.log(url);
        },
        search: '',
        label: 'gridSelect',
        expanded: true,
    },
}, 'panel4'));

const withProvider = (story) => (
    <Provider store={store}>
        { story() }
    </Provider>
);

storiesOf('Bolt', module)
    .addDecorator(withProvider)
    .add('BoltGUIProv', () => (
        <BoltGUI />
    ));
