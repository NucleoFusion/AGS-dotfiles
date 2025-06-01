import { Gtk, Widget } from "astal/gtk4";

function SlantedBar(leftValue: number, rightValue: number, child?: Gtk.Widget) {
  const area = new Gtk.DrawingArea({
    hexpand: true,
    vexpand: true,
    cssClasses: ["slant"],
  });

  area.set_draw_func((_, cr, w, h) => {
    const pad = 4;
    const barHeight = h - pad * 2;

    const lRatio = Math.min(Math.max(leftValue, 0), 100) / 100;
    const rRatio = Math.min(Math.max(rightValue, 0), 100) / 100;

    const leftLength = lRatio * (w / 2);
    const rightLength = rRatio * (w / 2);

    cr.setSourceRGBA(180 / 255, 190 / 255, 254 / 255, 1);

    cr.moveTo(w / 2 - leftLength, h - pad); // Bottom left
    cr.lineTo(w / 2, pad); // Top center
    cr.lineTo(w / 2 + rightLength, h - pad); // Bottom right
    cr.closePath();
    cr.fill();
  });

  return area;
}

export default SlantedBar;
