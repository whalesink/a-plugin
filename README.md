## Introductions

`a-plugin`是一个不依赖任何库就可以在你的 web 项目中使用的**原生 js 插件库**。
旨在帮助那些由于种种原因，仍然在维护未使用三大框架的项目的工程师们提供便利。

## Install

~~支持按需引入和全量引入~~，
目前仅支持通过`<script>`标签引入，未来会使用构建工具打包

#### 按需引入

通过`<script>`标签引入 `src` 下所需要的 js 插件和`style-all.css` 即可使用；

#### ~~全量引入~~

~~引入 all.js 和同名 css 文件即可全量引入~~

## Usage

### Toast 轻量级提示

-   使用方式

```javascript
// 构造实例
var myToast = new Toast({
	title: "我是一个朴实无华且枯燥的toast",
	duration: 3000,
	type: "info",
});

// 或者直接调用静态方法
Toast.success("表单提交成功！");

// 异步关闭
var myToast = Toast.loading("加载中，请稍候...", {
	theme: "light",
	position: "middle",
});

setTimeout(() => {
	myToast.hide();
});
```

-   params 属性
    属性| 必需| 类型 | 描述及可选值 | 默认值
    --|--|--|--|--
    `title` | true | string | 要提示的文本内容；如渲染 html，需要手动设置 `dangerouslyUseHTML` 为 `true` | -|
    `duration` | false|number| 持续时间（ms）。若为 0 不会自动关闭； type 为`loading`时需要手动关闭| `2000`|-
    `position`| false|string | 出现的位置，可选 `top`（默认）, `middle`, `bottom`|`top`
    `type`|false |string| 提示的类型，可选 `success`,`error`,`info`,`warn`,`loading`, 指定`loading`类型时`duration`无效，需要手动关闭|-
    `theme` | false|string| 主题类型,可选`light`, `dark`| `dark`
    `onHide` |false|function| 关闭后执行的操作|-
    `isSingle`|false|boolean| 指定组件是否以单例模式展示|`false`
    `dangerouslyUseHTML`| false|boolean| 指定是否以危险方式将内容渲染为 HTML|`false`
-   static methods 静态方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `success`| `title: string, args: object` | 展示一条成功类型的提示 | `object`，当前实例对象
    `error`| `title: string, args: object` | 展示一条错误类型的提示 | `object`，当前实例对象
    `info`| `title: string, args: object` | 展示一条信息类型的提示 | `object`，当前实例对象
    `warn`| `title: string, args: object` | 展示一条警告类型的提示| `object`，当前实例对象
    `loading`| `title: string, args: object` | 展示一条加载中类型的提示| `object`，当前实例对象

-   methods 实例方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `hide`| `void`| 手动隐藏（并销毁）toast | `void`

### messagebox 提示框

-   使用方式

```javascript
// 构造实例
let mb = new MessageBox({
	message: "点击按钮试试看",
	confirmBtnText: "好嘞 👌",
	cancelBtnText: "v(ノ｀Д)ノ",
	onConfirm() {
		alert("点击了确认");
		mb.close();
	},
	onCancel() {
		alert("点击了取消");
		mb.close();
	},
});

// 调用静态方法
Toast.success("保存成功！是否返回上一页？", {
	confirmBtnText: "好的",
	cancelBtnText: "不了不了",
});
```

-   params 属性
    属性| 必需| 类型 | 描述及可选值 | 默认值
    --|--|--|--|--
    `title` | false |string|提示框标题 | `提示`
    `message` | false | string | 提示框消息正文，可以是 HTML | -
    `type` | false |string | 提示框类型，用于渲染图标。可选 `success`,`info`,`error`,`warn`| -
    `cancelBtnText`| false |string | 取消按钮的文案 | `取消`
    `confirmBtnText` | false| string | 确认按钮的文案 | `确认`
    `onCancel` | false |function | 点击取消按钮时的回调函数 | `this.close`
    `onConfirm` |false | function | 点击确定按钮时的回调函数 | `this.close`
    `zIndex` | false |number | 手动设置提示框的定位层级 | `2000`
    `dangerouslyUseHTML` |false | boolean | 指定是否以危险方式将消息正文渲染为 HTML |`false`
    `cancelBtnClass` | false |string | 取消按钮的自定义类名 | -
    `confirmBtnClass` | false |string | 确认按钮的自定义类名 | -
    `iconClass` | false |string | 自定义图标的类名, 将覆盖 type 的图标 | -
    `showClose` | false |boolean | 是否展示右上角 close 图标 | `true`
    `closeOnClickMask` | false |boolean | 是否可通过点击遮罩关闭弹窗 |`false`
    `closeOnPressEscape` | false |boolean | 是否可通过按下 Esc 关闭弹窗 |`true`

-   static methods 静态方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `success`| `title: string, args: object` | 展示成功类型的提示框 | `object`，当前实例对象
    `error`| `title: string, args: object` | 展示错误类型的提示框 | `object`，当前实例对象
    `info`| `title: string, args: object` | 展示信息类型的提示框 | `object`，当前实例对象
    `warn`| `title: string, args: object` | 展示警告类型的提示框| `object`，当前实例对象

-   methods 实例方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `close`| `void`| 手动关闭（销毁） MessageBox | `void`
