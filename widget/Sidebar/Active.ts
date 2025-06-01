import { Variable } from "astal";
import { App } from "astal/gtk4";

export enum SidebarMenu {
  Wifi,
  Bluetooth,
  Stats,
  Volume,
  Music,
  Notif
}

export class SidebarActive {
  active: Variable<SidebarMenu>;

  constructor() {
    this.active = Variable(SidebarMenu.Notif)
  }

  setActive(choice: SidebarMenu) {
    this.active.set(choice)
  }

  showSidebar(item: SidebarMenu) {
    this.setActive(item);
    const sidebar = App.get_window("sidebar")

    if (!sidebar) return

    if (!sidebar.get_visible()) {
      sidebar.set_visible(true)
    }
  }
}

