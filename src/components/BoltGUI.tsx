import { Label, TextInputComponent, ButtonInputComponent } from './inputs';
import React, { Component } from 'react';

import { MainPanel } from './MainPanel';
import { TabData } from './ContentPanel';
import goodboyLogo from '../assets/goodboy-logo.png';
import { render } from 'react-dom';

export interface BoltProps
{
    stage?: any; // this will be the reference object for the game if needed
}

export interface BoltState
{
    expandedX: boolean;
    expandedY: boolean;
    activeTab: number;
}

export class BoltGUI extends Component<BoltProps, BoltState>
{
    private tabs: TabData[] = [];

    constructor(props: BoltProps)
    {
        super(props);
        this.state = {
            expandedX: true,
            expandedY: true,
            activeTab: 0,
        };

        const logInputChange = (value:any) => console.log(value);
        
        this.tabs.push({
            title: 'Example',
            id: 'E',
            // idColour: 'red',
            elements: [
                {
                    columns: [
                        { 
                            components: [
                                { component: Label, inputData: { label: 'Hello world! Welcome to Bolt.gui' }},
                            ]
                        },
                    ]
                },
                {
                    label: 'Button example',
                    columns: [
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: { 
                                    imgSrc: goodboyLogo, 
                                    imgAlt: 'test', 
                                    inputBackgroundColour: 'red', 
                                    disabled: true, 
                                    buttonText: 'Clicky', 
                                    callOnClick: () => { console.log('ive been clicked')} 
                                }}
                            ]
                        },
                    ]
                },
                {
                    label: 'Two buttons',
                    columns: [
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: { 
                                    buttonText: 'Option 1', 
                                    callOnClick: () => { console.log('ive been clicked')}, 
                                    inputWidth: '98%'
                                }}
                            ]
                        },
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: { 
                                    buttonText: 'Option 2', 
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '98%' 
                                }}
                            ]
                        },
                    ]
                },
                
            ],    
        })
        this.tabs.push({
            title: 'Level Data',
            // tabImg: goodboyLogo,
            // imgAlt: 'hellooooo',
            elements: [
                {
                    label: '2D Position',
                    columns: [
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'x', inputWidth: '95%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'y', inputWidth: '95%' }}
                            ]
                        },
                    ]
                },
                {
                    label: '3D Position',
                    columns: [
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'x', inputWidth: '92%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'y', inputWidth: '92%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'z', inputWidth: '92%' }}
                            ]
                        },
                    ]
                },
                {
                    label: 'Cursor colour',
                    columns: [
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'r', inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'b', inputWidth: '95%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'g', inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'a', inputWidth: '95%' }}
                            ]
                        },
                    ]
                }
            ],  
        })
        this.tabs.push({
            title: 'SoundBoy Data',
            id: 'S',
            elements: [
                {
                    label: 'Multi-row',
                    columns: [
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }}
                            ]
                        },
                        { 
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%' }}   
                            ]
                        },
                    ]
                },
                {
                    label: 'Use Bolt',
                    columns: [
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: {
                                    inputBackgroundColour: 'green', 
                                    buttonText: 'yes', 
                                    callOnClick: () => { console.log('ive been clicked')}, 
                                    inputWidth: '95%',
                                    inputHeight: '45px' 
                                }}
                            ]
                        },
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: { 
                                    inputBackgroundColour: 'red', 
                                    buttonText: 'No', 
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '95%',
                                    inputHeight: '45px'  
                                }}
                            ]
                        },
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: { 
                                    buttonText: 'Maybe?', 
                                    callOnClick: () => { console.log('ive been clicked')}, 
                                    inputWidth: '95%',
                                    inputHeight: '45px' 
                                }}
                            ]
                        },
                        { 
                            components: [
                                { 
                                    component: ButtonInputComponent, inputData: {  
                                    buttonText: 'Repeat question', 
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '95%',
                                    inputHeight: '45px' 
                                }}
                            ]
                        },
                    ]
                },
            ],  
        })
    }

    // public componentWillMount()
    // {
    // }

    // public componentWillUnmount()
    // {

    // }

    public render(): JSX.Element
    {
        return (
            <MainPanel 
                expandedX={this.state.expandedX} 
                expandedY={this.state.expandedY} 
                expandYCallBack={this.toggleExpandedY.bind(this)}
                setActiveTabCallBack={this.setActiveTab.bind(this)}
                tabData={this.tabs}
                activeTabIndex={this.state.activeTab}
            />
        );
    }

    public toggleExpandedX(): void
    {
        this.setState({ expandedX: !this.state.expandedX });
    }

    public toggleExpandedY(): void
    {
        this.setState({ expandedY: !this.state.expandedY });
    }
    
    public setActiveTab(newState: number): void
    {
        this.setState({ activeTab: newState});
    }

    // STATIC MEMBERS --------------------------------------------------

    public static init(): void // (editor: Editor) - this is where we would pass in the game
    {
        let element = document.getElementById('editor-holder');

        if (!element)
        {
            element = document.createElement('div');
            element.id = 'editor-holder';
            document.body.appendChild(element);
        }
        render(<BoltGUI/>, element);
    }
}
