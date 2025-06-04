import { Astal, Gtk } from "astal/gtk4";
import { connected } from "./Bluetooth";
import AstalBluetooth from "gi://AstalBluetooth";

export default function Connected() {
  return (
    <box orientation={1} spacing={20} visible={connected().as(t => t.length !== 0)}>
      <label
        cssClasses={["subheading"]}
        label="Connected Devices"
        halign={Gtk.Align.START}
      />
      {connected().as((connected) => {
        if (connected.length === 0) {
          return (
            <box>
              <label label="No Connected Devices" halign={Gtk.Align.CENTER} hexpand />
            </box>
          );
        }

        return connected.map((device) => ConnectedDevice(device));
      })}
    </box>
  );
}

export function ConnectedDevice(device: AstalBluetooth.Device) {
  let revealer: Gtk.Revealer;
  return (
    <box
      onHoverEnter={() => revealer.set_reveal_child(true)}
      onHoverLeave={() => revealer.set_reveal_child(false)}
      orientation={1}
      cssClasses={["device"]}
    >
      <label label={device.get_name()} cssClasses={["device_name"]} halign={Gtk.Align.START} />
      <revealer
        setup={(self) => revealer = self}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      >
        <box orientation={1} spacing={10}>
          <label label={"MAC: " + device.get_address()} halign={Gtk.Align.START} hexpand />
          <box spacing={20}>
            <button label="Disconnect" />
          </box>
        </box>
      </revealer>
    </box >
  );
}
