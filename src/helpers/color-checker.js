export const getContrastDetails = (hexDetails) => {
  //break each hex colors into rgb
  let resultList = []
  for(var detail of hexDetails) {
    let backgroundRGB = hexToRgb(detail[0]);
    let foregroundRBG = hexToRgb(detail[1]);
    let backgroundLuminance = luminance(backgroundRGB.r, backgroundRGB.g, backgroundRGB.b);
    let foregroundLuminance = luminance(foregroundRBG.r, foregroundRBG.g, foregroundRBG.b);
    // calculate the color contrast ratio
    const ratio = backgroundLuminance > foregroundLuminance ? ((foregroundLuminance + 0.05) / (backgroundLuminance + 0.05)): ((backgroundLuminance + 0.05) / (foregroundLuminance + 0.05));
    resultList.push( {
      condition: detail[2],
      background: detail[0],
      foreground: detail[1],
      ratio: ratio,
      "AA Large Text": ratio < 1/3 ? 'PASS' : 'FAIL',
      "AA Small Text": ratio < 1/4.5 ? 'PASS' : 'FAIL',
      "AAA Large Text": ratio < 1/4.5 ? 'PASS' : 'FAIL',
      "AAA Small Text": ratio < 1/7 ? 'PASS' : 'FAIL',
      score: ratio * 21
    } )
  }
  return resultList;
}

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}