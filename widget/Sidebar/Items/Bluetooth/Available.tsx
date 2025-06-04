import { Gtk } from "astal/gtk4";
import { adapter, available } from "./Bluetooth";
import AstalBluetooth from "gi://AstalBluetooth";

export default function Available() {
  return (
    <box orientation={1} spacing={20}>
      <box>
        <box halign={Gtk.Align.START} hexpand>
          <label
            cssClasses={["subheading"]}
            label="Available Devices"
            halign={Gtk.Align.START}
          />
        </box>
        <box halign={Gtk.Align.END} hexpand>
          <button label="Scan" onClicked={() => adapter?.start_discovery()} />
        </box>
      </box>
      {available().as((available) => {
        if (available.length === 0) {
          return (
            <box hexpand halign={Gtk.Align.CENTER}>
              <label label="No Available Devices" halign={Gtk.Align.CENTER} />
            </box>
          );
        }

        return available.map((device) => AvailableDevice(device));
      })}
    </box>
  );
}

export function AvailableDevice(device: AstalBluetooth.Device) {
  let revealer: Gtk.Revealer;
  return (
    <box
      onHoverEnter={() => revealer.set_reveal_child(true)}
      onHoverLeave={() => revealer.set_reveal_child(false)}
      orientation={1}
      cssClasses={["device"]}
    >
      <label label={device.get_name() || device.get_address()} cssClasses={["device_name"]} halign={Gtk.Align.START} />
      <revealer
        setup={(self) => revealer = self}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      >
        <box orientation={1} spacing={10}>
          <label visible={device.get_name() !== ""} label={"MAC: " + device.get_address()} halign={Gtk.Align.START} hexpand />
          <box spacing={20}>
            <button label="Connect" />
          </box>
        </box>
      </revealer>
    </box >
  );
}
