## Introductions

这是一个不依赖任何库就可以在你的 web 项目中使用的**原生 js 组件库**

## Install

支持按需引入~~和全量引入~~，

#### 按需引入

引入 plugins 下的插件和同名 css 即可使用；

#### 全量引入

~~引入 all.js 和同名 css 文件即可全量引入~~

## Usage

### Toast 轻量级提示

-   调用方式

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
    属性| 必需| 类型 | 描述 | 默认值
    --|--|--|--|--
    `title` | true | string | 要提示的文本内容；如渲染 html，需要手动设置 `dangerouslyUseHTML` 为 `true` | -|
    `duration` | false|number| 持续时间（ms）。若为 0 不会自动关闭； type 为`loading`时需要手动关闭| 2000|-
    `position`| false|string | 出现的位置，可选 `top`（默认）, `middle`, `bottom`|top
    `type`|false |string| 提示的类型，可选 `success`,`error`,`info`,`warn`,`loading`, 指定`loading`类型时`duration`无效，需要手动关闭|-
    `theme` | false|string| 主题类型,可选`light`, `dark`| dark
    `onHide` |false|function| 关闭后执行的操作|-
    `isSingle`|false|boolean| 指定组件是否以单例模式展示|false
    `dangerouslyUseHTML`| false|boolean| 指定是否以危险方式将内容渲染为 HTML|false
-   static methods 静态方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `success`| `title: string, args: object` | 展示一条成功类型的提示 | `object`，当前实例对象
    `error`| `title: string, args: object` | 展示一条错误类型的提示 | `object`，当前实例对象
    `info`| `title: string, args: object` | 展示一条信息类型的提示 | `object`，当前实例对象
    `warn`| `title: string, args: object` | 展示一条加载中类型的提示| `object`，当前实例对象

-   methods 实例方法
    方法| 参数及类型| 描述|返回值及类型
    --|--|--|--
    `hide`| `void`| 手动隐藏 toast | `void`

### messagebox 提示框
