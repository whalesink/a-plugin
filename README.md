## Introduction

中文文档 | [English](./docs/readme_en.md)

`a-plugin`是一个不依赖任何库就可以在你的 web 项目中使用的**原生 js 插件库**。
旨在帮助那些仍在维护老旧项目，又不想在项目中引入侵入性改动的工程师们快速构建 UI。

## Install

支持不同开发环境下的按需引入和全量引入。

<!-- #### 模块化开发环境

1. 安装 a-plugin

```shell
npm install a-plugin
```

2. 在你的项目中引入

```javascript
// 全量引入
import * as APlugin from "a-plugin";

// 按需引入
import { Toast, MessageBox } from "a-plugin";
``` -->

#### 非模块化开发环境

在非模块化开发环境中，所有组件接口均暴露在全局变量`window`下。

-   全量引入

下载项目中`dist`目录，在你的页面中通过 HTML 标签引入文件`a-plugin.min.js`和`a-plugin.min.css`即可。

-   按需引入
    你可以`clone`这个仓库，按自己的需要来打包插件

1. 配置打包的插件列表
   修改`/src/main.js`中导出的组件列表

2. 打包构建

```shell
# 安装生产环境依赖
npm install

# 打包构建
npm run build
```

之后从`dist`目录导出所需产物即可。

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
});

setTimeout(() => {
	myToast.hide();
}, 5000);
```

-   params 属性
    属性| 必需| 类型 | 描述及可选值 | 默认值
    --|--|--|--|--
    `title` | true | string | 要提示的文本内容；如渲染 html，需要手动设置 `dangerouslyUseHTML` 为 `true` | -|
    `duration` | false|number| 持续时间（ms）。若为 0 不会自动关闭； type 为`loading`时需要手动关闭| `2000`|-
    `type`|false |string| 提示的类型，可选 `success`,`error`,`info`,`warn`,`loading`, 指定`loading`类型时`duration`无效，需要手动关闭|-
    `theme` | false|string| 主题类型,可选`light`, `dark`| `dark`
    `onHide` |false|function| 关闭后执行的操作|-
    `dangerouslyUseHTML`| false|boolean| 指定是否以危险方式将内容渲染为 HTML|`false`
    ~~`isSingle`~~ | ~~false~~ | ~~boolean~~| ~~指定组件是否以单例模式展示~~|~~`false`~~ |
-   static methods 静态方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `show`| `title: string, args: object` | 展示一条无图标的文本提示 | `object`，当前实例对象
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
MessageBox.warn("删除数据后不可恢复，确定吗？", {
	onCancel() {
		console.log("点击了取消");
	},
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
    `showConfirmBtn` | false | boolean | 是否显示确认按钮 | `true`
    `showCancelBtn` | false | boolean | 是否显示取消按钮 | `true`

-   static methods 静态方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `success`| `title: string, args: object` | 展示成功类型的提示框 | `object`，当前实例对象
    `error`| `title: string, args: object` | 展示错误类型的提示框 | `object`，当前实例对象
    `info`| `title: string, args: object` | 展示信息类型的提示框 | `object`，当前实例对象
    `warn`| `title: string, args: object` | 展示警告类型的提示框 | `object`，当前实例对象

-   methods 实例方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `close`| `void`| 手动关闭（销毁） MessageBox | `void`

### ToolTip 提示框