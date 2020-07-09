import { BoltClass } from '../../Bolt';
import { ComponentController } from '../windows/ComponentController';
import { PanelController } from '..';

describe('Panel Controller', () =>
{
    let Bolt: BoltClass;
    let panel: PanelController;

    beforeEach(() =>
    {
        Bolt = new BoltClass();
        panel = Bolt.createPanel();
    });

    it('should have a parent', () =>
    {
        expect(panel.window).toEqual(Bolt['_defaultWindow']);
    });

    it('should add a component', () =>
    {
        const obj = {
            test: 'any',
            jest: 24,
        };

        const componentController = panel.addInput(obj, 'test');

        expect(componentController).toBeInstanceOf(ComponentController);
        expect(panel['_groups']).toHaveLength(1);
    });

    it('should remove a component', () =>
    {
        const obj = {
            test: 'any',
            jest: 24,
        };

        const componentController = panel.addInput(obj, 'test');

        panel.removeInput(componentController);

        expect(panel['_groups']).toHaveLength(0);
    });

    // it('should remove a component', () =>
    // {
    //     //
    // });

    // it('should remove all components', () =>
    // {
    //     //
    // });
});
