import { Action, ActionPanel, Icon, openCommandPreferences, openExtensionPreferences } from "@raycast/api";

export default function SettingsActionPanelSection() {
  return (
    <ActionPanel.Section title="Settings">
      <Action
        title="Configure Command"
        icon={Icon.Gear}
        shortcut={{ modifiers: ["cmd", "shift"], key: "," }}
        onAction={async () => {
          await openCommandPreferences();
        }}
      />
      <Action
        title="Configure Extension"
        icon={Icon.Gear}
        shortcut={{ modifiers: ["opt", "cmd"], key: "," }}
        onAction={async () => {
          await openExtensionPreferences();
        }}
      />
    </ActionPanel.Section>
  );
}
