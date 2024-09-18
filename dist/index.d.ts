import { h } from "preact";
export declare const html: (strings: TemplateStringsArray, ...values: any[]) => import("preact").VNode<import("preact").Attributes> | import("preact").VNode<import("preact").Attributes>[];
export declare const document: Document;
export declare class AreactApp {
    root: HTMLElement;
    uiNode: UiNode;
    __interval: any;
    static h: typeof h;
    static frag: import("preact").FunctionComponent<{}>;
    static supportedNodes: string[];
    uiGenedProps: Record<string, any>;
    inputNodes: any[];
    renderedNodes: any[];
    constructor();
    static initUiComponents(): Record<string, {
        string_props_name: any;
        special_converters: any;
    }>;
    mount(ele: any, uiNode: UiNode): void;
    render(): void;
    _bindProps(node: Element | HTMLElement, uiNode: UiRenderable | UiNode, string_props_name: any, special_converters: any): void;
    static _uiPropsGen(propTypes: Record<string, string>): {
        string_props_name: any;
        special_converters: any;
    };
    static getConvertorForType(type: string): (val: string) => any | undefined;
    static _camelCaseToDash(str: string): string;
    static _dashToCamelCase(str: string): string;
    createNodeInUi(node: Element | HTMLElement): UiText | UiBox | UiInput | UiImage | UiRenderable;
    renderNodes(node: Element, uiNode: UiRenderable | UiNode): void;
}
export * as hooks from "preact/hooks";
