import { Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalNotifd from "gi://AstalNotifd";

const active = Variable<AstalNotifd.Notification[]>([])
const unread = Variable<AstalNotifd.Notification[]>([])

const notifd = AstalNotifd.get_default()

function handleTimer(id: number) {
  setTimeout(() => {
    active.set(active.get().filter(ntf => ntf.get_id() !== id))

    const n = notifd.get_notification(id)
    unread.set([n, ...unread.get()])
  }, 5000)
}

notifd.connect("notified", (_, id) => {
  const n = notifd.get_notification(id)

  active.set([n, ...active.get()])
  handleTimer(id)
})

export default function Notif(gdkmonitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      namespace="ags-notif"
      name="notif"
      cssClasses={["notif"]}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT}
      layer={Astal.Layer.OVERLAY}
      application={App}
    >
      <box orientation={1} spacing={10}>
        {active().as(notifs => notifs.map(notif => Notification(notif)))}
      </box>
    </window>
  );
}


function Notification(notif: AstalNotifd.Notification) {
  return <box cssClasses={["instance"]} spacing={20}>
    <image iconName={notif.get_app_icon()} />
    <box orientation={1}>
      <box>
        <box hexpand>
          <label label={notif.get_app_name()} />
        </box>
        <box hexpand halign={Gtk.Align.END}>
          <button label="X" />
        </box>
      </box>
      <box>
        <label label={notif.get_body()} />
      </box>
    </box>
  </box>
}
