import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";

const date = Variable("").poll(3000000, ["bash", "-c", "date +'%d:%y:%b'"])

export default function Date() {
  return <box cssClasses={["bar_item", "date"]} orientation={1} spacing={10}>
    {bind(date).as((dates) => {
      const [day, year, month] = (dates as string).split(":");

      return <>
        <label label={day} halign={Gtk.Align.CENTER} />
        <label label={month} halign={Gtk.Align.CENTER} />
        <label label={year} halign={Gtk.Align.CENTER} />
      </>
    })}
  </box>
}
