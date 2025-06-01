import { execAsync } from "astal";
import { App, Gtk } from "astal/gtk4";
import Time from "./Time";
import Services from "./Services";

export default function Top() {
  return (
    <box spacing={10} orientation={1}>
      <button cssClasses={["bar_button", "bar_item"]} onClicked={() => App.toggle_window("sidebar")}>
        <label cssClasses={["material"]} label="view_sidebar" />
      </button>
      <button cssClasses={["bar_button", "bar_item"]} onClicked={() => execAsync("/home/nucleofusion/.config/ags/scripts/power.sh")}>
        <label cssClasses={["material"]} label="power_settings_new" />
      </button>
      <Services />
      <Time />
    </box>
  );
}
