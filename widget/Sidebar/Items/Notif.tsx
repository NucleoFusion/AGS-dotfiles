import { Gtk } from "astal/gtk4";
import { unread } from "../../Notifd/Notif";
import AstalNotifd from "gi://AstalNotifd?version=0.1";
import Pango from "gi://Pango?version=1.0";
import { ScrolledWindow } from "../Sidebar";

export default function Notif() {
  return (
    <box cssClasses={["notif-sidebar", "notif"]} orientation={1} spacing={50} vexpand >
      <box cssClasses={["header"]} hexpand>
        <box spacing={10} halign={Gtk.Align.START}>
          <label cssClasses={["material"]} label={unread().as(t => t.length > 0 ? "notifications_active" : "notifications")} />
          <label cssClasses={["heading"]} label="Notifications" />
        </box>
      </box>
      <ScrolledWindow hexpand={false} vexpand cssClasses={["scrolled"]}>
        <box orientation={1} spacing={30} hexpand vexpand>
          {unread().as((notifs) => {
            if (notifs.length === 0) {
              return <label label="No Unread Notifications" />
            }

            return notifs.map((ntf) => Notification(ntf))
          })}
        </box>
      </ScrolledWindow>
    </box >
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
                unread.set([
                  ...unread.get().filter((ntf) => ntf.id !== notif.id),
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
