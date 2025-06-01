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
    orientation={1}
  >
    <box cssClasses={["header"]} >
      <box>
        <label cssClasses={["material"]} label="wifi" />
        <label label="Wifi" />
      </box>
      <box vexpand={false} valign={Gtk.Align.CENTER}>
        <switch />
      </box>
    </box>
    <box>
      <label label={wifi().as(wifi => wifi ? wifi.get_ssid() : "Not Connected")} />
      <label label={wifi().as(wifi => wifi ? wifi.get_strength().toString() : "Not Connected")} />
    </box>
  </box >
}

