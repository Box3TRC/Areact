import { AreactApp } from ".";

let ui_case_switch_props:Record<string,Record<string,string>>={};
let comp_prop_dat=AreactApp.initUiComponents();
let ui_node_types=Object.keys(comp_prop_dat);
ui_node_types.forEach((node_type)=>{
    let {string_props_name}=comp_prop_dat[node_type];
    ui_case_switch_props[node_type]=string_props_name;
})
function toArgs(opt:any,node_type:string){
    let args={};
    for(let key in opt){
        if(key=="children"){
            continue;
        }
        let val=opt[key];
        if(val!==undefined){
            // args+=` ${AreactApp._camelCaseToDash(key)}="${val}"`
            // args[AreactApp._camelCaseToDash(key)]=val;
            if((ui_case_switch_props[node_type]&&ui_case_switch_props[node_type][key])||ui_case_switch_props["renderable"][key]){
                if(!(ui_case_switch_props[node_type]&&ui_case_switch_props[node_type][key])&&ui_case_switch_props["renderable"][key]){
                    args[ui_case_switch_props["renderable"][key]]=val;
                }else args[ui_case_switch_props[node_type][key]]=val;
            }else{
                args[key]=val;
            }
        }
    }
    return args;
}
function toChildren(opt:any){
    return (opt.children!=undefined?opt.children:[]);
}

interface UiRenderableOpt {
    id?: string;
    x?:string;
    y?:string;
    width?:string;
    height?:string;
    anchor?: string;
    backgroundColor?: string;
    backgroundOpacity?: number | string;
    zIndex?: number | string;
    autoResize?: 'NONE' | 'X' | 'Y' | 'XY';
    visible?: boolean | string;
    pointerEventBehavior?: string;
    onClick?: (e:any)=>void;
}


interface UiTextOpt extends UiRenderableOpt {
    text?: string;
    textFontSize?: number | string;
    textColor?: string;
    textXAlignment?: 'Center' | 'Left' | 'Right';
    textYAlignment?: 'Center' | 'Top' | 'Bottom';
    autoWordWrap?: boolean | string;
    textLineHeight?: number | string;
}

export function UiText(opt:UiTextOpt&{children?:any}){
    // @ts-ignore
    return <ui-text {...toArgs(opt,"text")}>{toChildren(opt)}</ui-text>
}

interface UiBoxOpt extends UiRenderableOpt {}
export function UiBox(opt:UiBoxOpt&{children?:any}){
    // @ts-ignore
    return <ui-box {...toArgs(opt,"box")}>{toChildren(opt)}</ui-box>
}

interface UiImageOpt extends UiRenderableOpt {
    image?: string;
    imageOpacity?: number | string;
}

export function UiImage(opt:UiImageOpt&{children?:any}){
    // @ts-ignore
    return <ui-image {...toArgs(opt,"image")}>{toChildren(opt)}</ui-image>
}

interface UiInputOpt extends UiTextOpt {
    placeholder?: string;
    placeholderColor?: string;
    placeholderOpacity?: number | string;
    focus?: string|boolean;
    onInput?: (e:any)=>void;
}

export function UiInput(opt:UiInputOpt&{children?:any}){
    // @ts-ignore
    return <ui-input {...toArgs(opt,"input")}>{toChildren(opt)}</ui-input>
}