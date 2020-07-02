import { BoltGUI } from './../components/BoltGUI';

export class Bolt
{
    gui: BoltGUI;

    constructor()
    {
        this.gui = new BoltGUI({});
        BoltGUI.init();
    }
}
