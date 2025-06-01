import { Gtk } from "astal/gtk4";
import { active } from "../Sidebar/Content";
import { SidebarMenu } from "../Sidebar/Active";

export default function Services() {
  return <box cssClasses={["right_items", "bar_item"]} spacing={10} orientation={1}>
    <button
      cssClasses={["material"]}
      label="volume_up"
      tooltipText="Audio"
      onClicked={() => active.showSidebar(SidebarMenu.Volume)}
    />
    <button
      cssClasses={["material"]}
      label="bluetooth"
      tooltip_text="BT"
      onClicked={() => active.showSidebar(SidebarMenu.Bluetooth)}
    />
    <button
      cssClasses={["material"]}
      label="wifi"
      tooltipText="WIFI"
      onClicked={() => active.showSidebar(SidebarMenu.Wifi)}
    />
    <button
      cssClasses={["material"]}
      label="battery_full"
      tooltipText="battery"
      onClicked={() => active.showSidebar(SidebarMenu.Notif)}
    />
  </box >
}
