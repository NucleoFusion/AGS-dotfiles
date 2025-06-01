import { bind, Variable } from "astal"
import { Gtk } from "astal/gtk4"

const time = Variable("").poll(1000, ["bash", "-c", "date +'%H:%M'"])

export default function Time() {
  return <box cssClasses={["bar_item"]} orientation={1} spacing={3}>
    {bind(time).as(time => {
      try {
        const [hour, minutes] = time.split(":")

        return <>
          <label label={hour} halign={Gtk.Align.CENTER} hexpand />
          <label label={minutes} halign={Gtk.Align.CENTER} />
        </>
      } catch (e) {
        console.log(`Error in Time.tsx: ${e}`);
        return <></>
      }
    })}
  </box>
}
