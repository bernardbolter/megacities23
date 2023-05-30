export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const curvedText = (text, radius) => {
  var chars = text.split("");
  var circleLength = 2 * Math.PI * radius;
  var angleRad = w / (2 * radius);
  var angle = (2 * angleRad * 180) / Math.PI / text.length;
  var returnedText = "";
  var w = 400;

  chars.map((char, idx) => {
    // var transformReturn = `translate(${w / 2}px,0px) rotate(${
    //   idx * angle - (text.length * angle) / 2
    // }deg)`;

    var transformReturn = `translate(200px,0px) rotate(30deg)`;

    return (returnedText += `<span id="${idx}">${char}</span>`);
  });
  // console.log(returnedText);
  var textCurved = text;

  return textCurved;
};

export const returnFlag = name => {
  if (name === "en") {
    return "flags/gb.png";
  } else if (name === "us") {
    return "flags/us.png";
  } else if (name === "de") {
    return "flags/de.png";
  } else if (name === "cn") {
    return "flags/cn.png";
  }
};

export const getPopulation = cities => {
  var totalPopulation = 0;
  cities.map(city => {
    totalPopulation =
      totalPopulation + parseInt(city.population.replace(/,/g, ""), 10);
  });
  return totalPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
