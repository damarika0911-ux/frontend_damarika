import placeholder from "../assets/placeholder.svg";
// Capturing handles image failures throughout pages and galleries, including lazy images.
document.addEventListener("error", event => {
  const target = event.target;
  if (target instanceof HTMLImageElement && target.src !== new URL(placeholder, document.baseURI).href) {
    target.src = placeholder;
    target.title = "Original image unavailable";
  }
}, true);
