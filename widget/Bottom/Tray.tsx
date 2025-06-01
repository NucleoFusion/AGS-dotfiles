import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalTray from "gi://AstalTray?version=0.1";

const tr = AstalTray.get_default();

const items = Variable(tr.get_items())
  .observe(tr, "item-added", () => tr.get_items())
  .observe(tr, "item-removed", () => tr.get_items());

export default function Tray() {
  return bind(items).as((itemsForLength) => {
    if (itemsForLength.length > 0) {
      return (
        <box cssClasses={["bar_item"]} orientation={1} spacing={10}>
          {bind(items).as((items) => items.map((item) => Item(item)))}
        </box>
      );
    } else {
      return <></>;
    }
  });
}

function Item(item: AstalTray.TrayItem) {
  return (
    <button
      cssClasses={["tray_button"]}
      tooltipText={item.get_tooltip_markup()}
      onClicked={() => item.activate(0, 0)}
      hexpand
      halign={Gtk.Align.CENTER}
    >
      <image gicon={item.get_gicon()} />
    </button>
  );
}
