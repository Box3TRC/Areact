globalThis.global = globalThis;
import { h, Fragment, render } from "preact";
import Color from "color";
// @ts-ignore
import { parseHTML } from "../mod-linkedom/esm";
import htm from 'htm';
export const html = htm.bind(h);
const parsed = parseHTML("<html><body></body></html>");
// const {window}=parsed;
export const { document,HTMLElement,Event,window } = parsed;
// @ts-ignore
globalThis.document = document;
// globalThis.window = window;
// @ts-ignore
if (globalThis.screenWidth === undefined) globalThis.screenWidth = 1200;
// @ts-ignore
if (globalThis.screenHeight === undefined) globalThis.screenHeight = 800;
function parseSize(text: string): { scale: number, offset: number } {
    let scale = 0, offset = 0;
    let tmp = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if ((tmp.length > 0 && (c == "+" || c == "-")) || i == text.length - 1) {
            if (i == text.length - 1) tmp += c;
            let part = tmp;
            // console.log(part)
            tmp = "";
            if (c == "-") tmp += "-";
            try {
                if (part.endsWith("%")) {
                    scale += parseFloat(part.slice(0, -1)) / 100;
                } else if (part.endsWith("px")) {
                    offset += parseFloat(part.slice(0, -2));
                } else {
                    offset += parseFloat(part);
                }
            } catch (e) {
                throw new Error("invalid size format");
            }
        } else {
            tmp += c;
        }
    }
    return { scale, offset };
}

export class AreactApp {
    root: HTMLElement;
    uiNode: UiNode;
    private __interval: any;
    static h = h;
    static frag = Fragment;
    static supportedNodes = [
        "ui-text", "ui-box", "ui-input", "ui-image"
    ]
    uiGenedProps: Record<string, any> = {};
    inputNodes = [];
    renderedNodes = [];

    constructor() {
        let root = document.createElement("div");
        root.id = "root-" + Math.random().toString().slice(2);
        document.body.appendChild(root);
        this.root = root;
        Object.assign(this.uiGenedProps, AreactApp.initUiComponents());
    }
    static initUiComponents(): Record<string, { string_props_name: any, special_converters: any }> {
        let res = {};
        res["renderable"] = this._uiPropsGen({
            "anchor": "anchor-vec2",
            "backgroundColor": "color",
            "backgroundOpacity": "percent",
            "zIndex": "number",
            "autoResize": "string",
            "visible": "boolean",
            "pointerEventBehavior": "enum:DISABLE_AND_BLOCK_PASS_THROUGH,DISABLE,BLOCK_PASS_THROUGH,ENABLE"
        });
        res["renderable"].string_props_name["?id"] = "id";// ? for ignore assign
        res["text"] = this._uiPropsGen({
            "textContent": "string",
            "textFontSize": "number",
            "textColor": "color",
            "textXAlignment": "string",
            "textYAlignment": "string",
            "autoWordWrap": "boolean",
            "textLineHeight": "number",
            "textStrokeColor": "color",
            "textStrokeOpacity":"percent",
            "textStrokeThickness": "number",
            "textFontFamily":"enum:Default,AlimamaFangYuanTi,CodeNewRomanBold"
        });
        res["text"].string_props_name["textContent"]="text";// 前者uinode，后者html
        res["box"] = this._uiPropsGen({});
        res["input"] = this._uiPropsGen({
            "textContent": "string",
            "placeholder": "string",
            "placeholderColor": "color",
            "placeholderOpacity": "percent",
            "textFontSize": "number",
            "textColor": "color",
            "textXAlignment": "string",
            "textYAlignment": "string",
            "autoWordWrap": "boolean",
            "textLineHeight": "number",
        });
        res["input"].string_props_name["textContent"]="text";
        res["image"] = this._uiPropsGen({
            "image": "string",
            "imageOpacity": "percent",
            "imageDisplayMode":"enum:Fill,Contain,Cover,None"
        });
        return res;
    }
    mount(ele: any, uiNode: UiNode) {
        this.uiNode = uiNode;
        render(ele, this.root);
        this.render();
        if (this.__interval) {
            clearInterval(this.__interval);
        }
        this.__interval = setInterval(() => {
            this.inputNodes.forEach((uiNode) => {
                let domnode = (uiNode as any).bindNode;
                let oldtext = domnode.getAttribute("text");
                domnode.value = uiNode.textContent;
                domnode.setAttribute("value", uiNode.textContent);// so this is read-only
                domnode.setAttribute("text", uiNode.textContent);
                if (oldtext != uiNode.textContent) {
                    domnode.dispatchEvent(new Event("input", { bubbles: false }));
                }
            });
            this.inputNodes = [];
            this.render();
        }, 2);
    }
    render() {
        try {
            this.renderNodes(this.root, this.uiNode);
        } catch (e) {
            console.error(e);
        }
    }
    _bindProps(node: Element | HTMLElement, uiNode: UiRenderable | UiNode, string_props_name: any, special_converters: any) {
        // let string_props_name = { "textContent": "textContent"(on html) };
        Object.keys(string_props_name).forEach((uiprop) => {
            let prop = string_props_name[uiprop];
            if(uiprop.startsWith("?"))return;
            if (node.hasAttribute(prop)) {
                let val: any = node.getAttribute(prop);
                if (special_converters[uiprop]) {
                    try { val = special_converters[uiprop](val); } catch (e) {
                        console.warn(`converter failed ${prop}: ${e}`)
                    }
                }
                // check if val object has x,y prop(Vec3/vec2)
                if ((val.x !== undefined && val.y !== undefined) || val.r !== undefined) {
                    uiNode[uiprop].copy(val);
                } else {
                    Object.assign(uiNode, { [uiprop]: val })
                }
            }
        });
    }
    static _uiPropsGen(propTypes: Record<string, string>): { string_props_name: any, special_converters: any } {
        let string_props_name: Record<string, string> = {};
        let special_converters: Record<string, any> = {};
        Object.keys(propTypes).forEach((prop) => {
            let type = propTypes[prop];
            // string_props_name[prop] = AreactApp._camelCaseToDash(prop);
            string_props_name[prop] = prop;
            let converter = AreactApp.getConvertorForType(type);
            if (converter) {
                special_converters[prop] = converter;
            }
        });
        return { string_props_name, special_converters }
    }
    static getConvertorForType(type: string):(val:string)=>any|undefined {
        if (type == "string") return;
        if (type == "number") {
            return (val: string) => parseFloat(val);
        } else if (type == "boolean") {
            return (val: string) => val != "false";
        } else if (type == "color") {
            // turn all colors style into (r,g,b)
            return (val: string) => {
                let color = new Color(val).rgb();
                // console.log(color.red(),color.green(),color.blue());
                return Vec3.create({
                    r: color.red(),
                    g: color.green(),
                    b: color.blue()
                })
            }
        } else if (type.startsWith("enum:")) {
            let enum_vals = type.slice(5).split(",");
            return (val: string) => enum_vals.indexOf(val);
        } else if (type == "vec2") {
            return (val: string) => {
                let parts = val.split(",").map(x => parseFloat(x));
                return Vec2.create({ x: parts[0], y: parts[1] });
            }
        } else if (type == "anchor-vec2") {
            // 100%,100% with a %
            return (val: string) => {
                let parts = val.split(",").map(x => {
                    if (!x.endsWith("%")) {
                        return parseFloat(x) / 100;
                    }
                    return parseFloat(x.slice(0, -1)) / 100
                });
                return Vec2.create({ x: parts[0], y: parts[1] });
            }
        } else if (type == "percent") {
            return (val: string) => {
                if (val.endsWith("%")) val = val.slice(0, -1);
                return parseFloat(val) / 100;
            }
        }
    }
    static _camelCaseToDash(str: string) {
        return str.replace(/([A-Z])/g, (g) => "-" + g[0].toLowerCase());
    }
    static _dashToCamelCase(str: string) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    createNodeInUi(node: Element | HTMLElement): UiText | UiBox | UiInput | UiImage | UiRenderable {
        let nodeName = node.nodeName.toLowerCase();
        let uiNode: UiText | UiBox | UiInput | UiImage | UiRenderable = null;
        if ((node as any).uiNode && (node as any).uiNode.parent) {
            uiNode = (node as any).uiNode;
        }
        if (AreactApp.supportedNodes.includes(nodeName)) {
            let uiType = nodeName.slice(3);
            if (uiType == "text") {
                if (!uiNode) uiNode = UiText.create();
                // console.log("??? text node")
                this._bindProps(node, uiNode, this.uiGenedProps["text"].string_props_name, this.uiGenedProps["text"].special_converters);
            } else if (uiType == "box") {
                if (!uiNode) uiNode = UiBox.create();
                this._bindProps(node, uiNode, this.uiGenedProps["box"].string_props_name, this.uiGenedProps["box"].special_converters);
            } else if (uiType == "input") {
                if (!uiNode) uiNode = UiInput.create();
                // implement input(no change)
                let oldContent = node.getAttribute("text") || "";
                (uiNode as UiInput).textContent = oldContent;
                this.inputNodes.push(uiNode);
                if (node.hasAttribute("focus")) {
                    if (node.getAttribute("focus") != "false") {
                        (uiNode as UiInput).focus();
                    } else {
                        (uiNode as UiInput).blur();
                    }
                }
                // this._bindProps(node,uiNode,this.uiGenedProps["text"].string_props_name, this.uiGenedProps["text"].special_converters);
                this._bindProps(node, uiNode, this.uiGenedProps["input"].string_props_name, this.uiGenedProps["input"].special_converters);
            } else if (uiType == "image") {
                if (!uiNode) uiNode = UiImage.create();
                this._bindProps(node, uiNode, this.uiGenedProps["image"].string_props_name, this.uiGenedProps["image"].special_converters);
            }
            this._bindProps(node, uiNode, this.uiGenedProps["renderable"].string_props_name, this.uiGenedProps["renderable"].special_converters)
        } else {
            if (!uiNode) uiNode = UiBox.create();
            uiNode.backgroundOpacity = 0;
        }
        uiNode.name = node.id || "node-unnamed-" + Math.random();
        (uiNode as any).bindNode = node;
        (node as any).uiNode = uiNode;
        let xywh_props = ["x", "y", "width", "height"];
        let xywh: Record<string, { offset: number, scale: number }> = {};
        xywh_props.forEach((prop) => {
            if (node.hasAttribute(prop)) {
                try {
                    xywh[prop] = parseSize(node.getAttribute(prop));
                } catch (e) {
                    console.warn("invalid size format")
                }
            }
        });
        // console.log(JSON.stringify(xywh));
        uiNode.position.offset.x = xywh?.x?.offset || uiNode.position.offset.x;
        uiNode.position.offset.y = xywh?.y?.offset || uiNode.position.offset.y;
        uiNode.position.scale.x = xywh?.x?.scale || uiNode.position.scale.x;
        uiNode.position.scale.y = xywh?.y?.scale || uiNode.position.scale.y;
        uiNode.size.offset.x = xywh?.width?.offset || uiNode.size.offset.x;
        uiNode.size.offset.y = xywh?.height?.offset || uiNode.size.offset.y;
        uiNode.size.scale.x = xywh?.width?.scale || uiNode.size.scale.x;
        uiNode.size.scale.y = xywh?.height?.scale || uiNode.size.scale.y;
        return uiNode;
    }
    renderNodes(node: Element, uiNode: UiRenderable | UiNode) {
        let children = node.children;
        let x = this.createNodeInUi(node);
        x.events.removeAll("pointerup");
        x.events.on("pointerup", () => {
            (x as any).bindNode.click();
        });
        x.parent = uiNode;
        x.children.forEach((child: UiRenderable) => {
            child.parent = undefined;
        })
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if ((child as any).uiNode) {
                (child as any).uiNode.parent = x;
            }
            this.renderNodes(child, x);
        }
    }
}
export const Areact=AreactApp;
export * as hooks from "preact/hooks"