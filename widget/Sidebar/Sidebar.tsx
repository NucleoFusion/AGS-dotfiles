import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import Nav from "./Nav";
import Content from "./Content";

export default function (gdkmonitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  return <window
    visible={false}
    namespace="ags-side-bar"
    name="sidebar"
    cssClasses={["Sidebar"]}
    gdkmonitor={gdkmonitor}
    anchor={TOP | BOTTOM | RIGHT}
    layer={Astal.Layer.OVERLAY}
    application={App}
    vexpand
    marginLeft={-5}
    marginTop={5}
    marginBottom={5}

  >
    <box vexpand >
      <box cssClasses={["content"]} hexpand vexpand>
        <Content />
      </box>
      <Nav />
    </box>
  </window>
}
