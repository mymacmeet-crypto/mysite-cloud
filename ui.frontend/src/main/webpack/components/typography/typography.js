import Handlebars from "handlebars/runtime";
import template from "./typography.hbs";
import "./typography.scss";

// Register the 'eq' helper for Handlebars
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

export const Typography = (args) => {
  const { variant = "p", text = "", children = "" } = args;

  // Create the HTML string
  const htmlString = template({
    variant,
    text: text || children,
  });

  // Create a temporary container to parse the HTML
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const typography = temp.firstElementChild;

  return typography;
};
