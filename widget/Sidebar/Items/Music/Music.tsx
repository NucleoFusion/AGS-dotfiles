import { Gio, Variable } from "astal";
import { astalify, Gtk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";
import MusicBox from "./MusicBox";
import MusicCava from "./Cava";

export const ytm = AstalMpris.Player.new("YoutubeMusic");

export const art = Variable(ytm.get_cover_art()).observe(
  ytm,
  "notify::cover-art",
  () => ytm.get_cover_art(),
);

export const title = Variable(ytm.get_title()).observe(
  ytm,
  "notify::title",
  () => ytm.get_title(),
);

export const artist = Variable(ytm.get_artist()).observe(
  ytm,
  "notify::artist",
  () => ytm.get_artist(),
);

export const status = Variable(ytm.get_playback_status()).observe(
  ytm,
  "notify::playback-status",
  () => ytm.get_playback_status(),
);

export const posn = Variable(ytm.get_position()).observe(
  ytm,
  "notify::position",
  () => ytm.get_position(),
);

export const length = Variable(ytm.get_length()).observe(
  ytm,
  "notify::length",
  () => ytm.get_length(),
);

export default function Music() {
  if (ytm.get_playback_status() === AstalMpris.PlaybackStatus.STOPPED)
    return <label label="No Music Playing" halign={Gtk.Align.CENTER} hexpand />;

  return (
    <centerbox vexpand halign={Gtk.Align.CENTER} orientation={1}>
      <MusicBox />
      <box vexpand></box>
      {MusicCava()}
    </centerbox>
  );
}
