import { App } from "astal/gtk4";
import style from "./style.scss";
import Bar from "./widget/Bar";
import Sidebar from "./widget/Sidebar/Sidebar";
import Notif from "./widget/Notifd/Notif";

App.start({
  css: style,
  main() {
    const main = App.get_monitors()[0];
    Bar(main);
    Sidebar(main);
    Notif(main);
  },
});
