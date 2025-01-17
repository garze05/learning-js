const hexToRgb = hex => {
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);
  
  // If shorthand hex (e.g. #FFF), convert to full form
  if (h.length === 3) {
      h = [...h].map(x => x + x).join('');
  }
  
  // Convert to integer
  const hexInt = parseInt(h, 16);
  
  // Extract RGB values using bit shifting
  return {
      r: hexInt >>> 16,
      g: (hexInt & 0x00ff00) >>> 8,
      b: hexInt & 0x0000ff
  };
};

export const getBrightness = (r, g, b) => {
  // Fórmula común para calcular el brillo percibido
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export function lightOrDark(color) {
  const { r, g, b } = hexToRgb(color);
  const brightness = getBrightness(r, g, b);
  
  // Un valor de 128 es un buen punto medio para determinar si es claro u oscuro
  return brightness < 128 ? 'dark' : 'light';
}

export const rgbToHsl = (r, g, b) => {
    // Convert RGB values to range [0, 1]
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    // Find maximum and minimum values
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    
    // Calculate lightness
    const lightness = (max + min) / 2;
    
    // If max equals min, we have a shade of gray
    if (max === min) {
        return {
            h: 0,
            s: 0,
            l: Math.round(lightness * 100)
        };
    }

    // Calculate saturation
    const delta = max - min;
    const saturation = lightness <= 0.5 
        ? delta / (max + min)
        : delta / (2 - max - min);

    // Calculate hue
    let hue;
    switch (max) {
        case red:
            hue = ((green - blue) / delta) + (green < blue ? 6 : 0);
            break;
        case green:
            hue = ((blue - red) / delta) + 2;
            break;
        case blue:
            hue = ((red - green) / delta) + 4;
            break;
    }
    hue *= 60;

    return {
        h: Math.round(hue),
        s: Math.round(saturation * 100),
        l: Math.round(lightness * 100)
    };
};