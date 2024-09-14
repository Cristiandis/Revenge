import PluginManager from "@lib/addons/plugins/PluginManager";
import type { BunnyPluginManifest } from "@lib/addons/plugins/types";

import type { UnifiedPluginModel } from "..";

export default function unifyVdPlugin(manifest: BunnyPluginManifest): UnifiedPluginModel {
    return {
        id: manifest.id,
        name: manifest.display.name,
        description: manifest.display.description,
        authors: manifest.display.authors,
        icon: manifest.extras?.vendetta?.icon,

        isEnabled: () => PluginManager.settings[manifest.id].enabled,
        isInstalled: () => Boolean(PluginManager.settings[manifest.id]),
        usePluginState() {
            PluginManager.usePlugin(manifest.id);
        },
        toggle(start: boolean) {
            start ? PluginManager.enable(manifest.id) : PluginManager.disable(manifest.id);
        },
        resolveSheetComponent() {
            return import("../sheets/VdPluginInfoActionSheet");
        },
        getPluginSettingsComponent() {
            return PluginManager.getSettingsComponent(manifest.id);
        },
    };
}
