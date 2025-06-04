import { bind } from "astal";
import { SidebarActive, SidebarMenu } from "./Active";
import Notif from "./Items/Notif";
import Wifi from "./Items/Wifi";
import Bluetooth from "./Items/Bluetooth/Bluetooth";
import Music from "./Items/Music/Music";
import Stats from "./Items/Stats";
import Volume from "./Items/Volume";

export let active = new SidebarActive();

export default function Content() {
  return (
    <>
      {bind(active.active).as((curr) => {
        switch (curr) {
          case SidebarMenu.Notif:
            return <Notif />;
          case SidebarMenu.Wifi:
            return <Wifi />;
          case SidebarMenu.Bluetooth:
            return <Bluetooth />;
          case SidebarMenu.Music:
            return <Music />;
          case SidebarMenu.Stats:
            return <Stats />;
          case SidebarMenu.Volume:
            return <Volume />;
        }
      })}
    </>
  );
}
