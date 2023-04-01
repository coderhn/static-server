let iframeCache = {};

self.addEventListener("message", (event) => {
  const src = event.data;
  if (!iframeCache[src]) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.onload = () => {
      iframeCache[src] = xhr.responseText;
      self.postMessage({ src, content: xhr.responseText });
    };
    xhr.send();
  } else {
    self.postMessage({ src, content: iframeCache[src] });
  }
});
