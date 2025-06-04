import { Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import Pango from "gi://Pango?version=1.0";

export const active = Variable<AstalNotifd.Notification[]>([]);
export const unread = Variable<AstalNotifd.Notification[]>([]);

const notifd = AstalNotifd.get_default();

function handleTimer(id: number) {
  setTimeout(() => {
    const newArr = active.get().filter((ntf) => ntf.get_id() !== id);
    if (newArr.length == active.get().length) {
      active.set([...newArr]);
      return;
    }

    active.set([...newArr]);

    const n = notifd.get_notification(id);
    unread.set([n, ...unread.get()]);
  }, 4000);
}

notifd.connect("notified", (_, id) => {
  const n = notifd.get_notification(id);

  active.set([n, ...active.get()]);
  handleTimer(id);
});

active.subscribe((val) => console.log(val));

export default function Notif(gdkmonitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible={active().as((notifs) => notifs.length > 0)}
      namespace="ags-notif"
      name="notif"
      cssClasses={["notif"]}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT}
      layer={Astal.Layer.OVERLAY}
      application={App}
      default_width={300}
    >
      <box orientation={1} spacing={10}>
        {active().as((notifs) => notifs.map((notif) => Notification(notif)))}
        <box></box>
      </box>
    </window>
  );
}

function Notification(notif: AstalNotifd.Notification) {
  return (
    <box cssClasses={["instance"]} spacing={20} hexpand={false}>
      <image
        cssClasses={["notif-icon"]}
        file={notif.get_image()}
        pixelSize={50}
        halign={Gtk.Align.CENTER}
      />
      <box orientation={1} spacing={5}>
        <box>
          <box hexpand>
            <label cssClasses={["title"]} label={notif.get_summary()} />
          </box>
          <box hexpand halign={Gtk.Align.END}>
            <button
              cssClasses={["material"]}
              label="close"
              onClicked={() => {
                active.set([
                  ...active.get().filter((ntf) => ntf.id !== notif.id),
                ]);
              }}
            />
          </box>
        </box>
        <box cssClasses={["body"]} widthRequest={300} hexpand={false}>
          <label
            wrap
            wrapMode={Pango.WrapMode.WORD}
            hexpand={false}
            label={
              notif.get_body().length > 150
                ? notif.get_body().slice(0, 150) + "..."
                : notif.get_body()
            }
          />
        </box>
      </box>
    </box>
  );
}
