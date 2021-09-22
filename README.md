![Preview of generated bar charts, in shades of purple, blue, and seafoam with various numbers of bars](https://repository-images.githubusercontent.com/408878985/2b66d282-faf7-4609-bbc1-93040e3a02c1)

# CSS Houdini Decorative Bar Charts

> From Stephanie Eckles [@5t3ph](https://twitter.com/5t3ph) - author of [ModernCSS.dev](https://moderncss.dev).

Generate dynamic _decorative/placeholder_ bar charts using CSS Houdini. Intended to be an alternate to SVG icons or less flexible CSS gradient solutions.

The worklet will create randomized bar heights and compute bar widths and gap sizes relative to the number of bars requested vs. the width of the element. Since worklets update when the element is repainted, these values will resize alongside the element. The `seed` value ensures consistent results across repaints (prevents "flashing" effect on resize).

> [**Preview on CodePen >**](https://codepen.io/5t3ph/pen/jOwKGPZ)

**Important**: Do not use these as a substitute for real bar charts because they will not provide any information to non-sighted or keyboard users unless you separately create text alternatives to describe the information. Plus, they are random which means you will not be able to match real data.

## How to Use

While Houdini paint worklets have the best support out of available Houdini features, they still currently require a polyfill to ensure they are applied cross browser.

So, first include the following once in your project:

```html
<script src="https://unpkg.com/css-paint-polyfill"></script>
```

Then, include the paint worklet script _after_ the polyfill is loaded:

```html
<script>
  CSS.paintWorklet.addModule("https://unpkg.com/houdini-decorative-barcharts");
</script>
```

Finally, use it in your styles! For best results, assign as the `background-image` to a dedicated element or a pseudo element to control the size used for the bar chart.

```css
.barchart-element {
  /* Number of bars */
  --barchart-number: 5;
  /* Chart seed number - ensures chart variance */
  --barchart-seed: 22382;
  /* Option 1: Provide a CSS color */
  --barchart-color: purple;
  /* Option 2: Provide gradient start and end colors for a "to bottom" gradient */
  --barchart-start-color: hsl(260, 85%, 65%);
  --barchart-end-color: hsl(260, 85%, 35%);

  /* Use the worklet! */
  background: paint(houdiniBarCharts);
}
```

## What is CSS Houdini?

Check out other Houdini paint worklets and more info at [Houdini.How](https://houdini.how).
