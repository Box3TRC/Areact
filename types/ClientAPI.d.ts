declare type GameLoggerMethod = (...args: any[]) => void;

declare const console: {
    assert: (assertion, ...args: any[]) => void;
    log: GameLoggerMethod;
    debug: GameLoggerMethod;
    error: GameLoggerMethod;
    warn: GameLoggerMethod;
    clear: GameLoggerMethod;
};

/**
 * 目前仅在客户端 webpack.config.js 有效
 */
declare const __dirname: string;

/**
 * 事件处理模块
 */
declare class EventEmitter<EventMap extends Record<string, any>> {
    /**
     * 监听指定的事件。
     * @param type - 监听的事件类型，是个字符串。
     * @param listener - 监听到事件类型后的处理函数。
     */
    on<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): void;
    /**
     * 与 on 的区别是仅触发一次。
     * @param type - 监听的事件类型，是个字符串。
     * @param listener - 监听到事件类型后的处理函数。
     */
    once<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): void;
    /**
     * 移除找到的第一个 listener。
     * @param type - 要移除的事件类型。
     * @param listener - 要移除的事件处理函数。
     */
    remove<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): void;
    /**
     * 移除找到的所有 listener，不传则移除事件下所有。
     * @param type - 要移除的事件类型。
     * @param listener - 可选，要移除的事件处理函数。
     */
    removeAll<K extends keyof EventMap>(type?: K, listener?: (event: EventMap[K]) => void): void;
    /**
     * 与 on 是同一个方法，只是方法名不同。
     * @param type - 监听的事件类型，是个字符串。
     * @param listener - 监听到事件类型后的处理函数。
     */
    add<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): void;
    /**
     * 与 remove 是同一个方法，只是方法名不同。
     * @param type - 要移除的事件类型。
     * @param listener - 要移除的事件处理函数。
     */
    off<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): void;
    /**
     * 触发指定的事件
     */
    emit<K extends keyof EventMap>(type: K, event: EventMap[K]): void;
}
/**
 * 客户端与服务端通信通道
 */
declare type ClientRemoteChannelEvents = {
    client: JSONValue;
};
declare type JSONValue = string | number | boolean |
{
    [x: string]: JSONValue;
}
    | Array<JSONValue>;
/**
 * 客户端与服务端通信通道
 */
declare class ClientRemoteChannel {
    /**
     * 向服务端发送数据。
     */
    sendServerEvent<T = JSONValue>(event: T): void;
    /**
     * 监听服务端发来的数据事件。
     */
    onClientEvent<T = JSONValue>(handler: (event: T) => void): void;
    /**
     * 事件管理器。
     */
    readonly events: EventEmitter<ClientRemoteChannelEvents>;
}
/**
 * 图像映射中区域的坐标
 */
declare class Coord2 {
    /**
     * 节点坐标的偏移量。
     */
    readonly offset: Vec2;
    /**
     * 节点坐标的缩放比。
     */
    readonly scale: Vec2;
    /**
     * 按创建并返回一个新的Coord2，该Coord2初始offset和scale为{}。
     * @param val - 节点坐标数据。
     */
    static create(val?: Coord2 | { offset: Vec2, scale: Vec2 }): Coord2;
}
/**
 * 二维向量
 */
declare class Vec2 {
    /**
     * Vec2的x坐标。
     */
    x: number;
    /**
     * Vec2的y坐标。
     */
    y: number;
    /**
     * 复制给定的Vec2的x和y到当前Vec2。
     * @param val - 节点坐标数据。
     */
    copy(val: Vec2): void;
    /**
     * 创建并返回一个新的Vec2。如果提供了一个Vec2作为参数，新的Vec2的x和y将被设置为给定Vec2的x和y。如果没有提供参数，新的Vec2的x和y将被设置为0。
     * @param val - 节点坐标数据。
     */
    static create(val?: Vec2 | { x: number, y: number }): Vec2;
}
/**
 * 三维向量 & RGB颜色
 */
declare class Vec3 {
    /**
     * Vec3的x坐标。
     */
    x: number;
    /**
     * Vec3的y坐标。
     */
    y: number;
    /**
     * Vec3的z坐标。
     */
    z: number;
    /**
     * Vec3的r颜色值。范围：0-255
     */
    r: number;
    /**
     * Vec3的g颜色值。范围：0-255
     */
    g: number;
    /**
     * Vec3的b颜色值。范围：0-255
     */
    b: number;
    /**
     * 复制给定的Vec3的x和y到当前Vec3。
     * @param val - 节点坐标数据。
     */
    copy(val: Vec3): void;
    /**
     * 创建并返回一个新的Vec3。如果提供了一个Vec3作为参数，新的Vec3的x、y和z将被设置为给定Vec3的x、y和z。如果没有提供参数，新的Vec3的x、y和z将被设置为0。
     * @param val - 节点坐标数据。
     */
    static create(val?: Vec3 | { x: number, y: number, z: number } | { r: number, g: number, b: number }): Vec3;
}
/**
 * UI事件
 */
interface UiEvent {
    /**
     * 触发事件的节点。
     */
    target: UiNode;
}
/**
 * UI输入事件
 */
interface UiInputEvent {
    /**
     * 触发事件的节点。
     */
    target: UiInput;
}
/**
 * UI事件管理器
 */
declare type UiNodeEvents = {
    /**
     * 鼠标按下。
     */
    pointerdown: UiEvent;
    /**
     * 鼠标抬起。
     */
    pointerup: UiEvent;
};

/**
 * UI输入事件管理器
 */
declare type UiInputEvents = UiNodeEvents & {
    /**
     * 获得焦点。
     */
    focus: UiInputEvent;
    /**
     * 失去焦点。
     */
    blur: UiInputEvent;
};

/**
 * 屏幕事件管理器
 */
declare type UiScreenEvents = {
    /**
     * 当屏幕尺寸发生变化时，携带新的屏幕宽度和高度。
     */
    resize: {
        /**游戏屏幕的宽度 */
        screenWidth: number,
        /**游戏屏幕的高度 */
        screenHeight: number
    };
};

/**
 * 屏幕系统。
 */
declare class ScreenSystem {
    /**
     * 一个只读的事件发射器，用于处理用户界面屏幕事件
     */
    readonly events: EventEmitter<UiScreenEvents>;
}

/**
 * 基础节点
 */
declare class UiNode {
    /**
     * 该节点的标识，可重复。
     */
    name: string;
    /**
     * 节点的子节点。如需要调整子节点结构，应修改子节点的parent属性。
     */
    readonly children: ReadonlyArray<UiNode>;
    /**
     * 节点的父节点，非根节点的父节点为空时，该节点将不会被渲染。
     */
    parent: UiNode | undefined;
    /**
     * 按名称查找子节点，返回对应子节点对象。（节点名称可在编辑模式下的属性面板中查看）
     * @param name - 子节点名称。
     */
    findChildByName<T extends UiBox | UiText | UiInput | UiImage>(name: string): T | undefined;
    /**
     * 管理节点相关的事件。
     */
    events: EventEmitter<UiNodeEvents>;
    /**
     * 节点等比例缩放数据。
     */
    uiScale: UiScale | undefined;
    /**
     * 克隆节点，包括其子节点。
     */
    clone: () => this;
}


/**
 * UI可渲染的基类
 */
declare class UiRenderable extends UiNode {
    /**
     * 节点的锚点，用于确定节点的位置。
     */
    readonly anchor: Vec2;
    /**
     * 节点的位置，相对于父节点的位置。
     */
    readonly position: Coord2;
    /**
     * 节点的背景颜色。
     */
    readonly backgroundColor: Vec3;
    /**
     * 节点的背景透明度。
     */
    backgroundOpacity: number;
    /**
     * 节点的尺寸。
     */
    readonly size: Coord2;
    /**
     * 节点的层级，用于确定节点的渲染顺序。
     */
    zIndex: number;
    /**
     * 节点的自动调整尺寸的方式。
     */
    autoResize: 'NONE' | 'X' | 'Y' | 'XY';
    /**
     * 节点的可见性。
     */
    visible: boolean;
    /**
     * 配置鼠标指针事件的响应方式
     */
    pointerEventBehavior: PointerEventBehavior;
}
/**
 * UI盒子
 */
declare class UiBox extends UiRenderable {
    private constructor();
    /**
     * 创建一个新的 Ui盒子 实例。
     */
    static create(): UiBox;
}

/**
 * UI文本
 */
declare class UiText extends UiRenderable {
    /**
     * 文本元素的内容，支持转义字符与换行，会对自身元素的自适应大小产生影响。
     * 换行后，所有受到元素大小影响的属性，均需以新的大小进行计算，
     */
    textContent: string;
    /**
     * 节点显示的文本的字体大小。
     */
    textFontSize: number;
    /**
     * 节点显示的文本的颜色。
     */
    readonly textColor: Vec3;
    /**
     * 节点显示的文本的水平对齐方式。
     */
    textXAlignment: 'Center' | 'Left' | 'Right';
    /**
     * 节点显示的文本的垂直对齐方式。
     */
    textYAlignment: 'Center' | 'Top' | 'Bottom';
    /**
     * 是否开启自动换行。
     */
    autoWordWrap: boolean;
    /**
     * 文本的行高。
     */
    textLineHeight: number;
    /**
     * 只读属性，定义文本的描边颜色。
     */
    readonly textStrokeColor: Vec3;
    /**
     * 定义文本描边的不透明度。
     */
    textStrokeOpacity: number;
    /**
     * 定义文本描边的厚度。
     */
    textStrokeThickness: number;
    /**
     * 定义文本使用的字体。
     */
    textFontFamily: UITextFontFamily;
    /**
     * 创建一个新的 Ui文本 实例。
     */
    static create(): UiText;
}
/**
 * UI输入框
 */
declare class UiInput extends UiText {
    /**
     * 输入框的未输入时文本提示内容。
     */
    placeholder: string;
    /**
     * 输入框显示的占位文本的颜色。
     */
    readonly placeholderColor: Vec3;
    /**
     * 输入框提示文本的不透明度。
     */
    readonly placeholderOpacity: number;
    /**
     * 输入框是否聚焦。
     */
    readonly isFocus: boolean;
    /**
     * 使输入框聚焦。
     */
    readonly focus: () => void;
    /**
     * 使输入框失去焦点。
     */
    readonly blur: () => string;
    /**
     * 创建一个新的 Ui输入框 实例。
     */
    static create(): UiInput;
}
/**
 * UI屏幕
 */
declare class UiScreen extends UiNode {
    /**
     * 屏幕是否可见。
     */
    visible: boolean;
    /**
     * 屏幕层级，层级越高的屏幕会显示在顶部，遮盖住层级较低的屏幕。
     */
    zIndex: number;
    /**
     * 创建一个新的 Ui屏幕 实例。
     */
    static create(): UiScreen;
    /**
     * 获取当前所有存在的屏幕实例。
     */
    static getAllScreen(): UiScreen[];
}
/**
 * UI图片
 */
declare class UiImage extends UiRenderable {
    /**
     * 图片元素的内容，应为图片的路径或者 URL。
     */
    image: string;
    /**
     * 图片元素的透明度。
     */
    imageOpacity: number;
    /**
     * 图像显示模式的声明
     */
    imageDisplayMode: ImageDisplayMode;
    /**
     * 创建一个新的 Ui图片 实例。
     */
    static create(): UiImage;
}
/**
 * UI组件
 */
declare class UiComponent {

}
/**
 * UI缩放
 */
declare class UiScale extends UiComponent {
    /**
     * 缩放倍数，仅允许设置大于等于0的数字。当传入非法值时，不会生效并会在控制台打印一条警告。
     */
    scale: number;
    /**
     * 创建一个新的 Ui缩放 实例。
     */
    static create(): UiScale;
}

/**
 * 字体样式
 */
declare enum UITextFontFamily {
    /**   
    *  默认字体   
    */
    Default = 0,
    /**   
    * 阿里妈妈方圆体    
    */
    AlimamaFangYuanTi = 1,
    /**    
    *  Code New Roman Bold     
    */
    CodeNewRomanBold = 2
}

/**
 * 控制图像的显示方式
 */
declare enum ImageDisplayMode {
    /**    
     * 铺满：（默认）适配元素外框长宽拉伸铺满展示，图片可能会变形     
     */
    Fill = 0,
    /**   
     * 等比铺满：等比缩放保证图片完整展示在外框内     
     */
    Contain = 1,
    /**    
     * 等比截取：等比缩放图片使图片填满外框，超出部分将被裁剪（隐藏显示）     
     */
    Cover = 2,
    /**
     * 无：按图片正常尺寸与外框中心对齐展示，不对图片进行任何缩放调整，但是超出元素框部分会被裁剪（隐藏显示）  
     */
    None = 3
}

/**
 * 指针事件行为
 */
declare enum PointerEventBehavior {
    /**
     * 不响应，且不允许位于元素后方的其他元素响应。
     */
    DISABLE_AND_BLOCK_PASS_THROUGH = 0,
    /**
     * 不响应。
     */
    DISABLE = 1,
    /**
     * 不允许位于元素后方的其他元素响应。
     */
    BLOCK_PASS_THROUGH = 2,
    /**
     * 正常响应。
     */
    ENABLE = 3
}
/**
 * 游戏屏幕的宽度，取决于玩家进入游戏时的屏幕大小。
 */
declare const screenWidth: number;
/**
 * 游戏屏幕的高度，取决于玩家进入游戏时的屏幕大小。
 */
declare const screenHeight: number;

/**
 * 指针锁定状态变化事件。
 */
declare type PointerLockChangeEvent = {
    /**
     * 表示指针是否锁定。
     */
    isLocked: boolean;
};
/**
 * 玩家指针锁定状态变化或出错时产生的事件。
 */
declare type PointerLockEvents = {
    /**
     * 玩家指针锁定状态变化或出错时产生的事件。
     */
    pointerlockchange: PointerLockChangeEvent;
    /**
     * 玩家指针锁定状态变化或出错时产生的事件。
     */
    pointerlockerror: undefined;
};

/**
 * 全局监听玩家的输入。
 */
declare class InputSystem {
    /**
     * 全局监听玩家指针与UI元素交互时的产生的事件。
     */
    readonly uiEvents: EventEmitter<UiNodeEvents>;
    /**
     * 全局监听当玩家指针锁定状态变化或出错时产生的事件。
     */
    readonly pointerLockEvents: EventEmitter<PointerLockEvents>;
    /**
     * 全局监听当玩家按下鼠标时产生的事件。
     */
    onPointerDown: { sub: (handler: (e: { target: UiNode }) => void) => void };
    /**
     * 调用后解锁鼠标指针。
     */
    unlockPointer(): void;
    /**
     * 调用后锁定鼠标指针，由于浏览器限制，此操作可能会失败。
     * 有兴趣可以查看https://w3c.github.io/pointerlock/#dom-element-requestpointerlock。
     */
    lockPointer(): void;
}


/**
 * 导航器。
 */
declare class Navigator {
    /**
     * 获取该客户端当前设备以及屏幕分辨率
     */
    getDeviceInfo(): { deviceType: 'Desktop' | 'Mobile', screen: { width: number, height: number } };
}
/**
 * 默认的屏幕下的UI根节点。
 */
declare const ui: UiNode;
/**
 * 客户端与服务端通信的通道。
 */
declare const remoteChannel: ClientRemoteChannel;
/**
 * 获取客户端的浏览器信息。
 */
declare const navigator: Navigator;
/**
 * 延迟指定毫秒后返回一个resolve的Promise对象。
 * @param ms - 延迟的毫秒数。
 * @returns 一个Promise，在指定的毫秒数后resolve。
 * @example
 *
 * // 返回Promise，有两种基本用法
 * // #1
 *
 * sleep(1000).then(() => {
 *   console.log('这句话将在一秒后输出。')
 * })
 *
 * // #2
 *
 * (async () => {
 *     await sleep(1000);
 *     console.log('这句话将在一秒后输出。')
 * })();
 */
declare function sleep(ms: number): Promise<void>;
/**
 * 用于延迟执行函数的计时器，delayMs毫秒后异步执行回调函数callback。
 * 该函数自身是同步的，返回用于清除此计时器的ID，可在 clearTimeout 中使用。
 * @param callback - 要延迟执行的回调函数。
 * @param delayMs - 延迟的毫秒数。
 * @returns 用于清除计时器的ID。
 */
declare function setTimeout(callback: Function, delayMs: number): number;
/**
 * 用于清除传入ID对应的 setTimeout 计时器。
 * @param id - 要清除的计时器的ID。
 */
declare function clearTimeout(id: number): void;
/**
 * 用于定时执行函数的计时器，每 delayMs 毫秒后异步执行回调函数 callback。
 * 该函数自身是同步的，返回用于清除此计时器的ID，可在 clearInterval 中使用。
 * @param callback - 要定时执行的回调函数。
 * @param delayMs - 间隔的毫秒数。
 * @returns 用于清除计时器的ID。
 */
declare function setInterval(callback: Function, delayMs: number): number;
/**
 * 用于清除传入ID对应的 setInterval 计时器。
 * @param id - 要清除的计时器的ID。
 */
declare function clearInterval(id: number): void;
/**
 * 全局监听玩家的输入。
 */
declare const input: InputSystem;
/**
 * 全局监听玩家的屏幕。
 */
declare const screen: ScreenSystem;