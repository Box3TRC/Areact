// @ts-ignore
import {parseHTML} from "./mod-linkedom/esm/index.js"
// Simplified way for HTML
const {
  // note, these are *not* globals
  window, document, customElements,
  HTMLElement,
  Event, CustomEvent
  // other exports ..
} = parseHTML(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>Hello SSR</title>
    </head>
    <body>
      <form>
        <input name="user">
        <AButton textContent="a">
          Submit
        </AButton>
      </form>
    </body>
  </html>
`);
let btn:HTMLElement=document.querySelector("AButton")!;
btn.onclick=()=>{
    console.log(btn.nodeName)
    console.log("click!",btn.outerHTML)
    btn.setAttribute("textContent","clicked");
    btn.click();

}
btn.click();