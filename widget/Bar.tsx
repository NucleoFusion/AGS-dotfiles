import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import Bottom from "./Bottom/Bottom";
import Middle from "./Middle/Middle";
import Top from "./Top/Top";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, RIGHT, LEFT, TOP } = Astal.WindowAnchor;

  return (
    <window
      visible
      namespace="ags-bar"
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | BOTTOM | RIGHT}
      application={App}
    >
      <centerbox cssClasses={["centerbox"]} orientation={1}>
        <Top />
        <Middle />
        <Bottom />
      </centerbox>
    </window>
  );
}
