import { Gtk } from "astal/gtk4";
import AstalBluetooth from "gi://AstalBluetooth";
import Connected from "./Connected";
import { Variable } from "astal";
import Saved from "./Saved";

export const bt = AstalBluetooth.get_default()
export const adapter = bt.get_adapter()

const state = Variable((adapter as AstalBluetooth.Adapter).get_powered())
  .observe(adapter as AstalBluetooth.Adapter, "notify::powered", () => (adapter as AstalBluetooth.Adapter).get_powered())

state.subscribe(() => console.log("STATE CHANGED"))

export const connected = Variable<AstalBluetooth.Device[]>([])
export const saved = Variable<AstalBluetooth.Device[]>([])
export const available = Variable<AstalBluetooth.Device[]>([])

const handleDevices = () => {
  connected.set(bt.get_devices().filter(device => device.get_connected()))
  saved.set(bt.get_devices().filter(device => !device.get_connected() && device.get_paired()))
  available.set(bt.get_devices().filter(device => !device.get_connected() && !device.get_paired()))
}

bt.connect("device-added", handleDevices)
bt.connect("device-removed", handleDevices)
handleDevices()

export default function Bluetooth() {
  if (!adapter) {
    return <box vexpand hexpand valign={Gtk.Align.START} orientation={1} spacing={30}>
      <label label="No Adapter Found" />
    </box>
  }

  return (
    <box vexpand hexpand valign={Gtk.Align.START} orientation={1} spacing={30}>
      <box cssClasses={["header"]} hexpand>
        <box hexpand spacing={10}>
          <label cssClasses={["material"]} label="bluetooth" />
          <label cssClasses={["heading"]} label="Bluetooth" />
        </box>
        <box hexpand vexpand={false} valign={Gtk.Align.CENTER} halign={Gtk.Align.END}>
          <switch active={state()} />
        </box>
      </box>
      <box cssClasses={["menu_content"]} orientation={1} spacing={40}>
        <Connected />
        <Saved />
      </box>
    </box>
  );
}
