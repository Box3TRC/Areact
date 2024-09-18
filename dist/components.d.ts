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
    onClick?: (e: any) => void;
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
export declare function UiText(opt: UiTextOpt & {
    children?: any;
}): any;
interface UiBoxOpt extends UiRenderableOpt {
}
export declare function UiBox(opt: UiBoxOpt & {
    children?: any;
}): any;
interface UiImageOpt extends UiRenderableOpt {
    image?: string;
    imageOpacity?: number | string;
}
export declare function UiImage(opt: UiImageOpt & {
    children?: any;
}): any;
interface UiInputOpt extends UiTextOpt {
    placeholder?: string;
    placeholderColor?: string;
    placeholderOpacity?: number | string;
    focus?: string | boolean;
    onInput?: (e: any) => void;
}
export declare function UiInput(opt: UiInputOpt & {
    children?: any;
}): any;
export {};
