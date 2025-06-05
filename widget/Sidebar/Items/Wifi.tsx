import { Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalNetwork from "gi://AstalNetwork";

const handleWifi = () => {
  wifi.set(nm.get_wifi())
  wifi.get()?.connect("state-changed", handleWifi)
}

const nm = AstalNetwork.get_default()

const wifi = Variable(nm.get_wifi())//.observe(nm.get_wifi(), "state-changed", () => AstalNetwork.get_default().get_wifi())
wifi.get()?.connect("state-changed", handleWifi)

export default function Wifi() {
  return <box
    vexpand
    hexpand
    valign={Gtk.Align.START}
    orientation={1}
    spacing={30}
    cssClasses={["wifi_menu"]}
  >
    <box cssClasses={["header"]} hexpand>
      <box hexpand spacing={10}>
        <label cssClasses={["material"]} label="wifi" />
        <label cssClasses={["heading"]} label="Wifi" />
      </box>
      <box
        hexpand
        vexpand={false}
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.END}
      >
        <switch active={true} /> {/*  TODO: */}
      </box>
    </box>
  </box>
}

