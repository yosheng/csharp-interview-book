# ASP.NET MVC

## MVC中的TempData\ViewBag\ViewData区别?

TempData 保存在Session中，Controller每次执行请求的时候，会从Session中先获取 TempData，而后清除Session，获取完TempData数据，虽然保存在内部字典对象中，但是其集合中的每个条目访问一次后就从字典表中删 除，ViewData存的是Key/Value字典，使用时需要类型转换。

ViewBag和ViewData只在当前Action中有效，等同于View，ViewBag比ViewData慢，ViewBag存dynamic类型数据，使用时不需要类型转换

ViewData和ViewBag 中的值可以互相访问，因为ViewBag的实现中包含了ViewData，ViewData存的是Key/Value字典，使用时需要类型转换

## 阐述下MVC框架的机制，各个模块的作用?

- 所谓模型，就是MVC需要提供的数据源，负责数据的访问和维护。
- 所谓视图，就是用于显示模型中数据的用户界面。
- 所谓控制器，就是用来处理用户的输入，负责改变模型的状态并选择适当的视图来显示模型的数据。

## ASP.NET和ASP.NET MVC的关系?

ASP.NET MVC是在核心ASP.NET基础之上构建的，从mvc命名空间System.Web.Mvc就能看出，因为System.Web是Asp.NET的核心命名空间。

比如ASP.NET MVC依赖于HttpHandler，关于请求是怎么进入控制器的，其实就是用到了HttpHandler

Session、Cookie、Cache和Application这些ASP.NET的对象保存机制在MVC中依然是需要用到的

HttpContext、Request、Response、Server对象在MVC中仍然可以使用，在Controller中通过智能感知的形式很容易得到这些对象

## MVC对ASP.NET好处在哪里？

提供非常清晰的成绩管理，像ui层，也就是view, 数据层model和管理层controller。

单元测试比较容易。

改善了数据模型和视图的重用性。

代码的结构更加优化。

## 什么是razor view engine?

这个引擎提供了数据绑定的显示模板。

```csharp
@model MvcStore.Models.Customer
@{ViewBag.Title="Get Customers";}
<div class="cust"><h3><em>@Model.CustomerName</em></h3></div>
```

## view bag 和 view data之间的区别是什么？

view bag是view data的一个扩展。扩展以后可以创建动态的属性。这样的好处有:

不需要进行类型的转换。我们可以使用dynamic关键字。但是有一个缺点就是view bag要比view data慢一些。

## 解释一下sections?

Sections是html页面的一部分。

```csharp
@rendersection("testsection")
```

在子页面中我们定义如下的sections。

```csharp
@section testsection {
<h1>test content</h1>
}
```

如果这个section没有定义的话会出错，我们可以使用一个required属性来防止页面出错。

```csharp
@rendersection("testsection", required: false)
```

## 为什么要使用html.partial？

这个方法用来显示html string指定的某块视图。

```csharp
html.partial("testpartialview")
```

## 什么是partial view？

Partial view相当于传统网页表格中的user controls.

它的主要目的是为了重复使用这些视图，他们一般被放在一个共享文件夹里面。

```csharp
html.partial()
html.renderpartial()
```

## MVC同时适用于Windows应用和Web应用吗?

相比Windows应用，MVC架构更适用于Web应用。对于Windows应用，MVP(Model View Presenter ) 架构更好一点。如果你使用WPF和Silverlight，MVVM更适合。

## 在MVC中如何保持Sessions?

可以通过三种方式保持： tempdata, viewdata, 和viewbag。

## 已经有了ASPX，为什么还要Razor?

相比ASPX，Razor是一个干净的、轻量级的和语法更简单。例如，ASPX去显示时间：

```csharp
<%=DateTime.Now%>
```

在Razor中，只需要一行：

```csharp
@DateTime.Now
```

## 在MVC中如何去执行Windows认证？

你需要修改web.config文件，并设置验证模式为Windows。

```csharp
<authentication mode="Windows"/>
<authorization>
<deny users="?"/>
</authorization>
```

然后在controlle或action中，你可以使用 Authorize 属性，指定哪个用户可以访问这个controller或 action。下面的代码设置到只有指定的用户可以访问它。

```csharp
[Authorize(Users= @"WIN-3LI600MWLQN\Administrator")]
public class StartController : Controller
{
    // GET: /Start/
    [Authorize(Users = @"WIN-3LI600MWLQN\Administrator")]
    public ActionResult Index()
    {
    	return View("MyView");
    }
}
```

## 在MVC中如何用表单认证？

表单认证和ASP.NET的表单验证一样。第一步是设置认证模式为Forms。loginUrl是指向到controller，而不是一个页面。

```csharp
<authentication mode="Forms">
<forms loginUrl="~/Home/Login" timeout="2880"/>
</authentication>
```

我们也需要创建一个controller，去验证用户。如果验证通过，需要设置cookies值。

```csharp
public ActionResult Login()
{
    if ((Request.Form["txtUserName"] == "Shiv") &&
    (Request.Form["txtPassword"] == "Shiv@123"))
    {
        FormsAuthentication.SetAuthCookie("Shiv",true);
        return View("About");
    }
    else
    {
    	return View("Index");
    }
}
```

其它需要验证的action都需要加一个 Authorize 属性，如果用户没权限将转向到登陆页面。

```csharp
[Authorize]
PublicActionResult Default()
{
	return View();
}
[Authorize]
publicActionResult About()
{
	return View();
}
```

## MVC有多少种不同类型的结果类型？

注意： 很难去记住所有的12种类型。但是一些重要的你可以记住，例如： ActionResult ，ViewResult ，和 JsonResult 。详情如下: 

MVC中的12种结果类型，最主要的是ActionResult类，它是一个基础类，它有11个子类型，如下：

- ViewResult - 给响应流渲染指定的视图
- PartialViewResult - 给响应流渲染指定的局部视图
- EmptyResult - 返回空的响应结果。
- RedirectResult - 执行一个HTTP转向到指定的URL。
- RedirectToRouteResult - 执行一个HTTP转向到一个URL，这个URL由基于路由数据的路由引擎来决定
- JsonResult - 序列化一个ViewData对像到JSON格式。
- JavaScriptResult - 返回一段Javascript代码，它可以在客户端执行。
- ContentResult - 写内容到响应流，不需要视图支持。
- FileContentResult - 返回一个文件到客户端。
- FileStreamResult - 返回一个文件到客户端，它提供的是流。
- FilePathResult - 返回一个文件到客户端。

## 什么是WebAPI?

HTTP是最常用的协议。过去的很多年，浏览器是我们使用HTTP方式公开数据的首选客户端。但是日新月异，客户端发展到多种形式。我们需要使用HTTP方式传递数据给不同的客户端，例如：移动手机、Javascript，Windows应用等等。

WebAPI是一个通过HTTP方式公开数据的技术，它跟随REST规则。

## 什么是MVC中的打包与压缩?

打包与压缩帮助我们减少一个页面的请求时间，从而提高页面执行性能。

## 打包如何提高性能？

我们的项目总是需要CSS和脚本文件。打包帮助你合并多个Javascript和css文件到单个文件，从而最小化多个请求到一个请求。

例如，包含下面的web请求到一个页。这个页面要求两个Javascript文件， Javascript1.js 和 Javascript2.js 。

## 在项目中如何解决高并发问题？

答案：尽量使用缓存，包括用户缓存，信息缓存等，多花点内存来做缓存，可以大量减少与数据库的交互，提高性能。

优化数据库查询语句。

优化数据库结构，多做索引，提高查询效率。

统计的功能尽量做缓存，或按每天一统计或定时统计相关报表，避免需要时进行统计的功能。

能使用静态页面的地方尽量使用，减少容器的解析（尽量将动态内容生成静态html来显示）。

解决以上问题后，使用服务器集群来解决单台的瓶颈问题。

## MVC中还有哪些注释属性用来验证？

如果你要去检查字符的长度，你可以使用 ﻿`StringLength﻿`

```csharp
[StringLength(160)]
public string FirstName { get; set; }
```

如果你想使用注册表达式，你可以使用 RegularExpression 。

```csharp
[RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")]
public string Email { get; set; }
```

如果你想检查数字是否在一个范围内，你可以使用 Range 。

```csharp
[Range(10,25)]public int Age { get; set; }
```

有时你想比较两个字段的值，我们可以使用 Compare。

```csharp
public string Password { get; set; }
[Compare("Password")]
public string ConfirmPass { get; set; }
```

## ActionResult 和 ViewResult有什么不同?

ActionResult 是一个抽象类，ViewResult衍生于 ActionResult 类。 ActionResult有几种衍生类，例
如： ViewResult，JsonResult，FileStreamResult， 等等。

ActionResult 可以用来开发多态和动态动象。所以如果你动态运行不同类型的视图，ActionResult 是最
好的选择。例如下面的代码，你可以看见我们有一个DynamicView。基于标记（IsHtmlView），它会返
回ViewResult 或 JsonResult。

## MVC中如何执行打包？

打开App_Start文件夹中的BundleConfig.cs

在BundleConfig.cs中，添加你想打包的JS文件路径到打包集合。如下所示：

```csharp
bundles.Add(new ScriptBundle("~/Scripts/MyScripts").Include("~/Scripts/*.js"));
```

下面是 BundleConfig.cs 文件的代码：

```csharp
public class BundleConfig
{
    public static void RegisterBundles(BundleCollection bundles)
    {
        bundles.Add(new ScriptBundle("~/Scripts/MyScripts").Include("~/Scripts/*.js"));
        BundleTable.EnableOptimizations = true;
    }
}
```

一旦你合并了脚本到一个文件，你可以使用下面的代码去调用它：

```csharp
<%= Scripts.Render("~/Scripts/MyScripts") %>
```

## MVC的路由选择是什么?

路由选择功能帮你定义一个URL规则，映射URL到控制器。

## 在哪里写路由映射表？

在 “global.asax” 文件。

## 在MVC中提到Area的好处?

在MVC中Area的好处如下：

- 它允许我们将模型、视图和控制器组织成应用程序的单独功能部分，如管理、计费，客户支持和更多。
- 很容易与另一个创建的其他区域集成。
- 也很容易进行单元测试。

## 你能解释一下MVC中的RenderBody和RenderPage吗？

RenderBody就像web表单中的ContentPlaceHolder。这将存在于布局页中，并将呈现子页/视图。布局页将只有一个RenderBody（）方法。RenderPage也存在于布局页中，多个RenderPage（）可以存在于布局页中。

## ASP.NET MVC的过滤器有哪些？

APS.NET MVC中（以下简称“MVC”）的每一个请求，都会分配给相应的控制器和对应的行为方法去处理，而在这些处理的前前后后如果想再加一些额外的逻辑处理。这时候就用到了过滤器。

MVC支持的过滤器类型有四种，分别是：Authorization(授权),Action（行为）,Result（结果）和Exception（异常）。

- Authorization：此类型（或过滤器）用于限制进入控制器或控制器的某个行为方法。
- Exception：用于指定一个行为，这个被指定的行为处理某个行为方法或某个控制器里面抛出的异常。
- Action：用于进入行为之前或之后的处理。
- Result：用于返回结果的之前或之后的处理。

## Session有什么重大BUG，微软提出了什么方法加以解决？

是iis中由于有进程回收机制，系统繁忙的话Session会丢失，可以用Sate server或SQL Server数据库的方式存储Session不过这种方式比较慢，而且无法
捕获Session的END事件。

## 详细描述三层架构开发模式以及三层架构的好处?

数据访问层，业务层，表示层。

- 数据访问层（DAL），主要是存放对数据类的访问，即对数据库的添加、删除、修改、更新等基本操作
- 业务逻辑层（BLL）对传送数据进行逻辑判断分折，并进行传送正确的值。
- 表示层为了与用户交互例如用户添加表单。

优点： 分工明确，条理清晰，易于调试，而且具有可扩展性。

## Server.Transfer和Response.Redirect的区别是什么？

Server.Transfer仅是服务器中控制权的转向，在客户端浏览器地址栏中不会显示出转向后的地址；Response.Redirect则是完全的跳转，浏览器将会得到跳转的地址，并重新发送请求链接。这样，从浏览器的地址栏中可以看到跳转后的链接地址。

Server.Transfer是服务器请求资源，服务器直接访问目标地址的URL，把那个URL的响应内容读取过来，然后把这些内容再发给浏览器，浏览器根本不知道服务器发送的内容是从哪儿来的，所以它的地址栏中还是原来的地址。 这个过程中浏览器和Web服务器之间经过了一次交互。

Response.Redirect就是服务端根据逻辑,发送一个状态码,告诉浏览器重新去请求那个地址，一般来说浏览器会用刚才请求的所有参数重新请求。这个过程中浏览器和Web服务器之间经过了两次交互。

Server.Transfer不可以转向外部网站，而Response.Redirect可以。

Server.Execute效果和Server.Transfer类似，但是是把执行的结果嵌入当前页面。

## 请解释web.config文件中的重要节点？

- appSettings包含自定义应用程序设置。
- system.web 系统配置；
- compilation动态调试编译设置；
- customErrors自定义错误信息设置；
- authentication身份验证,此节设置应用程序的身份验证策略。
- authorization授权, 此节设置应用程序的授权策略。

