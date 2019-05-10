import EditorCore, { TriggerEvent } from '../interfaces/EditorCore';
import EventLocker from '../interfaces/EventLocker';
import { PluginEvent } from 'roosterjs-editor-types';

const triggerEvent: TriggerEvent = (
    core: EditorCore,
    pluginEvent: PluginEvent,
    broadcast: boolean
) => {
    if (broadcast || !core.eventLockers.some(locker => tryHandleLockedEvent(pluginEvent, locker))) {
        core.eventHandlerPlugins.forEach(plugin => {
            plugin.onPluginEvent(pluginEvent);
        });
    }
};

function tryHandleLockedEvent(event: PluginEvent, locker: EventLocker): boolean {
    if (locker.shouldHandleEvent(event)) {
        locker.plugin.onPluginEvent(event);
        return true;
    }

    return false;
}

export default triggerEvent;
