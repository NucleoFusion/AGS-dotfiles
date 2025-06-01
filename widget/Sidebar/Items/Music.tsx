import { Gio, Variable } from "astal";
import { astalify, Gtk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";

export const Picture = astalify<Gtk.Picture, Gtk.Picture.ConstructorProps>(Gtk.Picture, {})

interface mprisData {
  cover_art?: string;
  position?: number;
  length?: number;
}

export const ytm = AstalMpris.Player.new("YoutubeMusic")

const handleChanges = () => {
  return {
    cover_art: ytm.get_cover_art(),
    position: ytm.get_position(),
    length: ytm.get_length()
  } as mprisData
}

const data = Variable({
  cover_art: ytm.get_cover_art()
} as mprisData)
  .observe(ytm, "notify::cover_art", handleChanges)
  .observe(ytm, "notify::length", handleChanges)
  .observe(ytm, "notify::position", handleChanges)

data.subscribe((val) => console.log(val.cover_art, val.position))


export default function Music() {
  return <box vexpand hexpand halign={Gtk.Align.CENTER} valign={Gtk.Align.START} >
    <box cssClasses={["music_box"]} overflow={Gtk.Overflow.HIDDEN}>
      <overlay>
        <Picture file={data().as(data => Gio.file_new_for_path(data.cover_art || ""))} />
        <label type="overlay" />
      </overlay>
    </box>
  </box>
}
