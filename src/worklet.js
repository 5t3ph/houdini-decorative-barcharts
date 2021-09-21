// source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
// via: https://css-tricks.com/conjuring-generative-blobs-with-the-css-paint-api/
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(x, target, amt) {
  return target - x * amt;
}

class HoudiniBarCharts {
  static get inputProperties() {
    return [
      "--barchart-number",
      "--barchart-seed",
      "--barchart-color",
      "--barchart-start-color",
      "--barchart-end-color",
    ];
  }

  paint(ctx, size, properties) {
    const elWidth = size.width;
    const elHeight = size.height;
    const number = parseInt(properties.get("--barchart-number"), 10) || 5;
    const seed = parseInt(properties.get("--barchart-seed"), 10) || 23985;
    const color = String(properties.get("--barchart-color")) || false;
    let startColor = String(properties.get("--barchart-start-color"));
    let endColor = String(properties.get("--barchart-end-color"));

    const numItems = number * 2 - 1;
    // Width for bars and gap
    const width = elWidth / numItems;

    const random = mulberry32(seed);

    let grdStart = startColor;
    let grdEnd = endColor;

    if (color) {
      grdStart = color;
      grdEnd = color;
    } else if (!color && !startColor) {
      grdStart = "hsl(260, 85%, 65%)";
      grdEnd = "hsl(260, 85%, 35%)";
    }

    // Generate, place, and color each bar
    for (let i = 0; i < numItems; i++) {
      const x = i > 0 ? width * i : i;
      const iHeight = lerp(width * i, elHeight, 0.425 * random());

      var grd = ctx.createLinearGradient(0, 0, 0, elHeight);
      grd.addColorStop(0, grdStart);
      grd.addColorStop(1, grdEnd);
      ctx.fillStyle = grd;

      // Mind the gap
      if (i % 2 != 0) {
        ctx.fillStyle = "transparent";
      }

      ctx.fillRect(x, elHeight - iHeight, width, iHeight);
    }
  }
}

registerPaint("houdiniBarCharts", HoudiniBarCharts);
