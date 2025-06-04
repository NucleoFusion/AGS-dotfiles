import { Gtk } from "astal/gtk4";
import { saved } from "./Bluetooth";
import AstalBluetooth from "gi://AstalBluetooth";

export default function Saved() {
  return (
    <box orientation={1} spacing={10} visible={saved().as(t => t.length !== 0)}>
      <label
        cssClasses={["subheading"]}
        label="Saved Devices"
        halign={Gtk.Align.START}
      />
      {saved().as((saved) => {
        if (saved.length === 0) {
          return (
            <box>
              <label
                label="No Saved Devices"
                halign={Gtk.Align.CENTER}
                hexpand
              />
            </box>
          );
        }

        return saved.map((device) => SavedDevice(device));
      })}
    </box>
  );
}

export function SavedDevice(device: AstalBluetooth.Device) {
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
            <button label="Connect" />
            <button label="Forget" />
          </box>
        </box>
      </revealer>
    </box >
  );
}
