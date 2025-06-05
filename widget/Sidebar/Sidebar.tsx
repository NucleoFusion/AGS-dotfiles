import { App, Astal, astalify, Gdk, Gtk } from "astal/gtk4";
import Nav from "./Nav";
import Content from "./Content";

export const ScrolledWindow = astalify<
  Gtk.ScrolledWindow,
  Gtk.ScrolledWindow.ConstructorProps
>(Gtk.ScrolledWindow, {});

export default function (gdkmonitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible={false}
      namespace="ags-side-bar"
      name="sidebar"
      cssClasses={["Sidebar"]}
      gdkmonitor={gdkmonitor}
      anchor={TOP | BOTTOM | RIGHT}
      layer={Astal.Layer.OVERLAY}
      application={App}
      vexpand
      // marginRight={-5}
      marginTop={5}
      marginBottom={5}
      default_width={400}
    >
      <box >
        <box cssClasses={["content"]} hexpand >
          <Content />
        </box>
        <Nav />
      </box>
    </window>
  );
}
