import { Gtk } from "astal/gtk4";
import { Image } from "astal/gtk4/widget";
import Workspaces from "./Workspaces";
import Tray from "./Tray";

export default function Bottom() {
  return (
    <box spacing={10} orientation={1} halign={Gtk.Align.CENTER}>
      <Tray />
      <Workspaces />
      <box spacing={15} cssClasses={[""]}>
        <Image
          file="/home/nucleofusion/.config/ags/icons/arch.svg"
          pixelSize={30}
        />
      </box>
    </box>
  );
}
