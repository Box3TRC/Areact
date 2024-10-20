import { Areact, hooks } from "./src/index";
import { Text,Input,Box,Image } from "./src/components";
let app = new Areact();

function App() {
  const [name,setName]=hooks.useState("");
  return (<>
    <Text x="0px" y="0px" height="50px" width="200px" text={"showing " + (name==""?"nothing":name)}
      backgroundColor="#000000"
      textColor="#ffffff"
      backgroundOpacity="100%"
    ></Text>
    <Input x="0px" y="50px" width="200px" height="50px" placeholder="输入avatar.png"
      onInput={(e)=>setName(e.target.getAttribute("text"))}
      text={name}
    ></Input>
    <Image x="0px" y="100px" width="200px" height="200px" image={"picture/"+name}></Image>
  </>);
}
app.mount(<App />, ui);