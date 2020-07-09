import { BoltClass } from '../../Bolt';
import { NumberBinding } from './../inputs/NumberBinding';
import { PanelController } from '..';

describe('Component Controller', () =>
{
    let Bolt: BoltClass;
    let panel: PanelController;
    const obj = { test: 10 };

    beforeEach(() =>
    {
        Bolt = new BoltClass();
        panel = Bolt.createPanel();
    });

    it('should add a binding', () =>
    {
        const controller = panel.addInput(obj, 'test');

        expect(controller['_bindings']).toHaveLength(1);
        expect(controller['_bindings'][0]).toHaveLength(1);
    });

    it('should remove a binding', () =>
    {
        const controller = panel.addInput(obj, 'test');

        controller.removeInput(controller.getBinding(obj, 'test'));

        expect(controller['_bindings']).toHaveLength(0);
        expect(() => controller.getBinding(obj, 'test')).toThrow();
    });

    it('should get a binding', () =>
    {
        const controller = panel.addInput(obj, 'test');
        const binding = controller.getBinding(obj, 'test');

        expect(binding).toBeInstanceOf(NumberBinding);
    });
});
