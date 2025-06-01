import { App, Gtk } from "astal/gtk4";
import { SidebarMenu } from "./Active";
import { active } from "./Content";
import { bind } from "astal";

export default function Nav() {
  return <box cssClasses={["nav"]} orientation={1} valign={Gtk.Align.CENTER} vexpand spacing={30}>
    <button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Notif))}
      onClicked={() => ShowSidebar(SidebarMenu.Notif)}
      label="notifications"
    /><button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Music))}
      onClicked={() => ShowSidebar(SidebarMenu.Music)}
      label="music_note"
    /><button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Wifi))}
      onClicked={() => ShowSidebar(SidebarMenu.Wifi)}
      label="wifi"
    /><button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Bluetooth))}
      onClicked={() => ShowSidebar(SidebarMenu.Bluetooth)}
      label="bluetooth"
    /><button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Volume))}
      onClicked={() => ShowSidebar(SidebarMenu.Volume)}
      label="volume_up"
    /><button
      cssClasses={active.active().as(() => getClasses(SidebarMenu.Stats))}
      onClicked={() => ShowSidebar(SidebarMenu.Stats)}
      label="bar_chart"
    />
  </box>
}

function ShowSidebar(item: SidebarMenu) {
  active.setActive(item)
}

function getClasses(item: SidebarMenu) {
  let classes = ["material"]

  if (active.active.get() === item) {
    classes.push("active")
  }

  return classes
}
