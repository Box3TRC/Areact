import { AreactApp, hooks } from "./src/index";
import { UiText,UiInput,UiBox,UiImage } from "./src/components";
let app = new AreactApp();

function App() {
  const [name,setName]=hooks.useState("");
  return (<>
    <UiText x="0px" y="0px" height="50px" width="200px" text={"showing " + (name==""?"nothing":name)}
      backgroundColor="#000000"
      textColor="#ffffff"
      backgroundOpacity="100%"
    ></UiText>
    <UiInput x="0px" y="50px" width="200px" height="50px" placeholder="输入avatar.png"
      onInput={(e)=>setName(e.target.getAttribute("text"))}
      text={name}
    ></UiInput>
    <UiImage x="0px" y="100px" width="200px" height="200px" image={"picture/"+name}></UiImage>
  </>);
}
app.mount(<App />, ui);