import type { FunctionalComponent } from "preact";
export interface AreactHTMLElement extends HTMLElement {
    uiNode: UiRenderable;
}
export interface AreactEvent extends Event {
    target: AreactHTMLElement;
}
interface UiRenderableOpt {
    id?: string;
    x?: string;
    y?: string;
    width?: string;
    height?: string;
    anchor?: string;
    backgroundColor?: string;
    backgroundOpacity?: number | string;
    zIndex?: number | string;
    autoResize?: 'NONE' | 'X' | 'Y' | 'XY';
    visible?: boolean | string;
    pointerEventBehavior?: string;
    onClick?: (e: AreactEvent) => void;
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
export declare function Text(opt: UiTextOpt & {
    children?: any;
}): FunctionalComponent;
interface UiBoxOpt extends UiRenderableOpt {
}
export declare function Box(opt: UiBoxOpt & {
    children?: any;
}): FunctionalComponent;
interface UiImageOpt extends UiRenderableOpt {
    image?: string;
    imageOpacity?: number | string;
}
export declare function Image(opt: UiImageOpt & {
    children?: any;
}): FunctionalComponent;
interface UiInputOpt extends UiTextOpt {
    placeholder?: string;
    placeholderColor?: string;
    placeholderOpacity?: number | string;
    focus?: string | boolean;
    onInput?: (e: AreactEvent) => void;
}
export declare function Input(opt: UiInputOpt & {
    children?: any;
}): FunctionalComponent;
export {};
