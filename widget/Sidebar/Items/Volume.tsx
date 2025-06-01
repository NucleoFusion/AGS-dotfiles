import { Gtk } from "astal/gtk4";

export default function Volume() {
  return <box hexpand halign={Gtk.Align.CENTER}><label label="Volume" /></box>
}
