import { astalify, Gtk } from "astal/gtk4";
import { art, artist, length, posn, status, title, ytm } from "./Music";
import { Gio } from "astal";
import AstalMpris from "gi://AstalMpris";

export const Picture = astalify<Gtk.Picture, Gtk.Picture.ConstructorProps>(
  Gtk.Picture,
  {},
);

export default function MusicBox() {
  return (
    <box cssClasses={["music_box"]} overflow={Gtk.Overflow.HIDDEN}>
      {title().as((title) => {
        return (
          <overlay>
            <Picture
              cssClasses={["cover_art"]}
              file={art().as((cover_art) => Gio.file_new_for_path(cover_art))}
            />
            <box
              type="overlay clip"
              orientation={1}
              cssClasses={["music_overlay"]}
            >
              <box
                valign={Gtk.Align.CENTER}
                spacing={15}
                orientation={1}
                vexpand
              >
                <box orientation={1} spacing={10} valign={Gtk.Align.CENTER}>
                  <label label={title} halign={Gtk.Align.CENTER} />
                  <label
                    label={artist()}
                    cssClasses={["artist"]}
                    halign={Gtk.Align.CENTER}
                  />
                </box>
                <box orientation={1} valign={Gtk.Align.CENTER}>
                  <slider min={0} max={length()} step={3} value={posn()} />
                </box>
                <box
                  halign={Gtk.Align.CENTER}
                  hexpand
                  cssClasses={["playpause"]}
                  spacing={40}
                  valign={Gtk.Align.CENTER}
                >
                  <button
                    hexpand
                    cssClasses={["material"]}
                    label="skip_previous"
                    halign={Gtk.Align.CENTER}
                    onClicked={() => ytm.previous()}
                  />
                  <button
                    hexpand
                    cssClasses={["material"]}
                    halign={Gtk.Align.CENTER}
                    label={
                      status().as(
                        (t) => t === AstalMpris.PlaybackStatus.PLAYING,
                      )
                        ? "pause"
                        : "play_arrow"
                    }
                    onClicked={() => ytm.play_pause()}
                  />
                  <button
                    hexpand
                    cssClasses={["material"]}
                    label="skip_next"
                    halign={Gtk.Align.CENTER}
                    onClicked={() => ytm.next()}
                  />
                </box>
              </box>
            </box>
          </overlay>
        );
      })}
    </box>
  );
}
