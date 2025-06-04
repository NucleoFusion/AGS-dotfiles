import { Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalCava from "gi://AstalCava";

const cava = AstalCava.get_default();

(cava as AstalCava.Cava).input = AstalCava.Input.PULSE;

const values = Variable<number[]>([]).observe(
  cava as AstalCava.Cava,
  "notify::values",
  (cava) => cava.get_values(),
);

export default function MusicCava() {
  const area = new Gtk.DrawingArea({
    widthRequest: -1,
    heightRequest: 300,
    valign: Gtk.Align.END,
    vexpand: true,
  });

  area.set_draw_func((self, cr, width, height) => {
    if (!cava) return;

    const bars = cava.get_values();
    const barCount = bars.length;
    const barWidth = width / barCount;

    cr.setSourceRGBA(0.58, 0.886, 0.835, 1);

    bars.forEach((value: number, index: number) => {
      const x = index * barWidth;
      const barHeight = value * height;
      cr.rectangle(x, height - barHeight, barWidth - 1, barHeight);
    });

    cr.fill();
  });

  setInterval(() => area.queue_draw(), 16);

  return area;
}
