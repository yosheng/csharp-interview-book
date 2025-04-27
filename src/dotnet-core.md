# ASP.NET CORE

## 如何在controller中注入service?

在config services方法中配置这个service。

在controller的构造函数中，添加这个依赖注入。

## 谈一谈对DDD的理解?

DDD，领域驱动设计。就是通过领域来指导软件设计，是一种十分抽象的软件设计思想，它主要分为战略设计和战术设计

战略方面，通过事件风暴进行领域模型的划分，划分出核心域，子域，支撑域，定义通用语言，划分出界限上下文。

在战术设计方面，ddd将架构分层，“松耦合，高内聚”是架构设计的整体思想。按照DDD思想，可以分为领域层，基础设施层，应用层，接口层。

接口层为前端用户提供api接口。基础设施层可以放一些第三方的服务，数据库连接等内容。应用层是对领域服务的编排，是很薄的一层（目前我自己的架构，应用的是cqrs，所有的相关逻辑都是放在了应用层，而领域层只是放了实体，因为暂时还不是特别理解领域层的服务和事件都应该写什么）。领域层包括实体，值对象，聚合根，领域服务，领域事件等内容。

## ASP.NET Core 比 ASP.NET 更具优势的地方是什么？

跨平台，ASP.NET Core 可以运行在 Windows 、Linux 和 MAC 系统上；

对框架本安装没有依赖，所有依赖都跟程序本身在一起；

ASP.NET Core 处理请求的效率更高，进而可以处理更多的请求；

ASP.NET Core 具有更多的安装配置方法。

## asp.net core 主要的特性有哪些？

- 依赖注入。
- 日志系统架构。
- 引入了一个跨平台的网络服务器，kestrel。可以没有iis, apache和nginx就可以单独运行。
- 可以使用命令行创建应用。
- 使用AppSettings.json 来配置工程。
- 使用startup来注册服务。
- 更好的支持异步编程。
- 支持web socket和signal IR。
- 对于跨网站的请求的预防和保护机制。

## ASP.NET Core Filter如何支持依赖注入?

可以通过全局注册，支持依赖注入

通过TypeFilter(typeof(Filter)) 标记在方法，标记在控制器

通过ServiceType(typeof(Filter))标记在方法，标记在控制器，必须要注册Filter这类；

TypeFilter和ServiceType的本质是实现了一个IFilterFactory接口；

## Asp.Net Core中有哪些异常处理的方案？

1. 继承Controller，重写OnActionExecuted

   默认都会继承一个Controller类，重写OnActionExecuted，添加上异常处理即可。一般情况下我们会新
   建一个BaseController, 让所有Controller继承BaseController。代码如下

   ```csharp
   public class BaseController : Controller
   {
       public override void OnActionExecuted(ActionExecutedContext context)
       {
           var exception = context.Exception;
           if (exception != null)
           {
               context.ExceptionHandled = true;
               context.Result = new ContentResult
               {
                   Content = $"BaseController错误 : { exception.Message }"
               };
           }
           base.OnActionExecuted(context);
       }
   }
   ```

2. 使用 ActionFilterAttribute。

   ActionFilterAttribute是一个特性，本身实现了 IActionFilter 及 IResultFilter , 所以不管是action里抛错，还是view里抛错，理论上都可以捕获。我们新建一个 ExceptionActionFilterAttribute, 重写OnActionExecuted及OnResultExecuted，添加上异常处理，完整代码如下:

   ```csharp
   public class ExceptionActionFilterAttribute:ActionFilterAttribute
   {
       public override void OnActionExecuted(ActionExecutedContext context)
       {
           var exception = context.Exception;
           if (exception != null)
           {
           	context.ExceptionHandled = true;
           	context.Result = new ContentResult
           	{
           	Content = $"错误 : { exception.Message }"
           	};
           }
           base.OnActionExecuted(context);
       }
       public override void OnResultExecuted(ResultExecutedContext context)
       {
           var exception = context.Exception;
           if (exception != null)
           {
               context.ExceptionHandled = true;
               context.HttpContext.Response.WriteAsync($"错误 : {exception.Message}");
           }
           base.OnResultExecuted(context);
       }
   }
   ```

   使用方式有两种，在controller里打上 [TypeFilter(typeof(ExceptionActionFilter)] 标签;

   在Startup里以filter方式全局注入。

   ```csharp
   services.AddControllersWithViews(options =>
   {
   	options.Filters.Add<ExceptionActionFilterAttribute>();
   })
   ```

3. 使用 IExceptionFilter

   我们知道, Asp.Net Core提供了5类filter, IExceptionFilter是其中之一，顾名思义，这就是用来处理异常的。Asp.net Core中ExceptionFilterAttribute已经实现了IExceptionFilter，所以我们只需继承ExceptionFilterAttribute，重写其中方法即可。 同样新建CustomExceptionFilterAttribute继承ExceptionFilterAttribute，重写 OnException ，添加异常处理，完整代码如下：

   ```csharp
   public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
   {
       public override void OnException(ExceptionContext context)
       {
           context.ExceptionHandled = true;
           context.HttpContext.Response.WriteAsync($"CustomExceptionFilterAttribute错误:{context.Exception.Message}");
           base.OnException(context);
       }
   }
   ```

4. 使用ExceptionHandler.

   在 startup 里，vs新建的项目会默认加上.

   ```csharp
   if (env.IsDevelopment())
   {
   	app.UseDeveloperExceptionPage();
   }
   else
   {
   	app.UseExceptionHandler("/Home/Error");
   }
   ```

5. 自定义Middleare处理

   通过middleware全局处理。

   ```csharp
   public class ErrorHandlingMiddleware
   {
       private readonly RequestDelegate next;
       public ErrorHandlingMiddleware(RequestDelegate next)
       {
       	this.next = next;
       }
       public async Task Invoke(HttpContext context)
       {
           try
           {
           	await next(context);
           }
           catch (System.Exception ex)
           {
               //处理异常
           }
       }
   }
   ```

## 介绍ASP.NET Core中服务的生命周期？

ASP.NET Core支持依赖注入软件设计模式，它允许在不同的组件中注入我们的服务，并且控制服务的初始化。有些服务可以在短时间内初始化，并且只能在某个特别的组件，以及请求中才能用到；而还有一些服务，仅仅只用初始化一次，就可以在整个应用程序中使用。

Singleton --单例模式：

只有一个服务的实例被创建，这个实例，存储在内存中，可以在整个应用程序中使用。我们可以对一些初始化代价比较大的服务，使用Singleton模式。在代码中可以这样：

```csharp
services.AddSingleton<IProductService, ProductService>();
```

Scoped --作用域

这种模式下，将会为每一个请求，都创建一个服务的实例。所有同一个请求中的中间件、MVC控制器，等等，都会得到一个相同的服务实例。Entity Framework Context就是一个Scoped服务最好的参考例子。我们可以通过使用AddScoped方法来使用Scoped模式：

```csharp
services.AddScoped<IProductService, ProductService>();
```

Transient --短暂的、瞬变的

Transient模式下，服务每次被请求的时候，都会创建一个服务实例，这种模式特别适合轻量级、无状态的服务。我们可以使用AddTransient方法，来注入服务：

```csharp
services.AddTransient<IProductService, ProductService>();
```

## 简述ASP.NET Core中服务的生命周期实现

Transient（瞬时生命周期）

- 每次请求都创建新实例：直接调用 ActivatorUtilities.CreateInstance 或构造函数生成新对象。
- 无缓存：容器不保存实例引用，完全由调用方管理生命周期。
- `IServiceProvider.GetService` → `CallSiteRuntimeResolver.VisitTransient` → 动态实例化。

Scoped（作用域生命周期）

- 作用域内单例：每个作用域（如 HTTP 请求）内缓存实例，通过字典维护实例引用。
- 作用域隔离：不同作用域的实例完全独立。
- 每个 ServiceProviderEngineScope 包含一个 ResolvedServices 字典，存储已解析的实例。

Singleton（单例生命周期）

- 全局单例：实例存储在根容器的 ResolvedServices 字典中。

### **底层实现**

#### **1. 服务注册表（ServiceCollection）**

- 注册时记录服务类型、实现类型及生命周期标志：

#### **2. 服务提供者（ServiceProvider）**

- 根据 `ServiceDescriptor` 的生命周期标志选择实例化策略：
  - `Transient` → 每次新建
  - `Scoped` → 从当前作用域缓存获取
  - `Singleton` → 从根容器缓存获取

#### **3. 作用域（IServiceScope）**

- 通过 `IServiceScopeFactory.CreateScope()` 创建独立作用域：

## 什么是依赖注入？

依赖注入是一个过程，就是当一个类需要调用另一个类来完成某项任务的时候，在调用类里面不要去new被调用的类的对象，而是通过注入的方式来获取这样一个对象。具体的实现就是在调用类里面有一个被调用类的接口，然后通过调用接口的函数来完成任务。比如A调用B，而B实现了接口C，那么在A里面用C定义一个变量D，这个变量的实例不在A里面创建，而是通过A的上下文来获取。这样做的好处就是将类A和B分开了，他们之间靠接口C来联系，从而实现对接口编程。

## 依赖注入有哪几种方式？

setter注入：

就是在类A里面定义一个C接口的属性D，在A的上下文通过B实例化一个对象，然后将这个对象赋值给属性D。主要就是set 与 get

构造函数注入：

就是在创建A的对象的时候，通过参数将B的对象传入到A中。还有常用的注入方式就是工厂模式的应用了，这些都可以将B的实例化放到A外面，从而让A和B没有关系。还有一个接口注入，就是在客户类（A）的接口中有一个服务类(B)的属性。在实例化了这个接口的子类后，对这个属性赋值，这和setter注入一样。

接口注入：

相比构造函数注入和属性注入，接口注入显得有些复杂，使用也不常见。具体思路是先定义一个接口，包含一个设置依赖的方法。然后依赖类，继承并实现这个接口。

## 控制反转是什么？

控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。

通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。

## 依赖注入有哪些著名的框架？

Unity、autofac、http://spring.net、MEF、Injection、Asp.Net Core的ServiceCollection。

## 介绍一些ABP.NEXT？

ASP.NET Boilerplate是.Net平台非常优秀的一个开源Web应用程序框架,在国内也有大量的粉丝.

从名称可以看出来, 这是ASP.NET Boilerplate的下一代框架。

ABP框架创作于2013年，那时候没有.Net Core和ASP.NET Core，也没有Angular2 +。ABP发布后，它们都是从头开发的。

ASP.NET Core引入了许多内置解决方案（扩展库），用于依赖注入，日志记录，缓存，本地化，配置等。它们实际上独立于ASP.NET Core，可用于任何类型的应用程序。

## 什么是dotnet core的startup class？

Startup class是dotnet core应用的入口。所有的dotnet core应用必须有这个class。这个类用来配置应用。这个类的调用是在program main函数里面进行配置的。类的名字可以自己定义。

## startup class的configure方法有什么作用？

这个方法来定义整个应用如何响应HTTP请求。它有几个比较重要的参数，application builder，Hosting environment, logo factory， 在这里我们可以配置一些中间件用来处理路径，验证和session等等。

## 什么是中间件（Middleware）？

中间件是组装到应用程序管道中以处理请求和响应的软件。 每个组件：

选择是否将请求传递给管道中的下一个组件。

可以在调用管道中的下一个组件之前和之后执行工作。

请求委托（Request delegates）用于构建请求管道，处理每个HTTP请求。

请求委托使用Run，Map和Use扩展方法进行配置。单独的请求委托可以以内联匿名方法（称为内联中间件）指定，或者可以在可重用的类中定义它。这些可重用的类和内联匿名方法是中间件或中间件组件。请求流程中的每个中间件组件都负责调用流水线中的下一个组件，如果适当，则负责链接短路。

## 中间件的使用场景有哪些？

身份验证，Session存储，日志记录等。其实我们的Asp.net core项目中本身已经包含了很多个中间件。比如 身份认证中间件 UseAuthorization()等系列

## 列举官方常用的中间件？

异常/错误处理 当应用在开发环境中运行时： 

- 开发人员异常页中间件 (UseDeveloperExceptionPage) 报告应用运行时错误。 
- 数据库错误页中间件报告数据库运行时错误。 

当应用在生产环境中运行时：

- 异常处理程序中间件 (UseExceptionHandler) 捕获以下中间件中引发的异常。 
- HTTP 严格传输安全协议 (HSTS) 中间件 (UseHsts) 添加 Strict-Transport-Security 标头。

HTTPS 重定向中间件 (UseHttpsRedirection) 将 HTTP 请求重定向到 HTTPS。

静态文件中间件 (UseStaticFiles) 返回静态文件，并简化进一步请求处理。

Cookie 策略中间件 (UseCookiePolicy) 使应用符合欧盟一般数据保护条例 (GDPR) 规定。

用于路由请求的路由中间件 (UseRouting)。

身份验证中间件 (UseAuthentication) 尝试对用户进行身份验证，然后才会允许用户访问安全资源。

用于授权用户访问安全资源的授权中间件 (UseAuthorization)。

会话中间件 (UseSession) 建立和维护会话状态。 如果应用使用会话状态，请在 Cookie 策略中间件之后和 MVC 中间件之前调用会话中间件。

用于将 Razor Pages 终结点添加到请求管道的终结点路由中间件（带有 MapRazorPages 的 UseEndpoints）。

## 中间件的执行顺序？

1. 异常/错误处理
2. HTTP 严格传输安全协议
3. HTTPS 重定向
4. 静态文件服务器
5. Cookie 策略实施
6. 身份验证
7. 会话
8. MVC

## application builder的use和run方法有什么区别？

这两个方法都在start up class的configure方法里面调用。都是用来向应用请求管道里面添加中间件的。Use方法可以调用下一个中间件的添加，而run不会。

## dotnet core 管道里面的map拓展有什么作用?

可以针对不同的路径添加不同的中间件。

```csharp
public void Configure(IApplicationBuilder app)
{
    app.Map("/path1", Middleware1);
    app.Map("/path2", Middleware2);
}
```

## dotnet core里面的路径是如何处理的？

路径处理是用来为进入的请求寻找处理函数的机制。所有的路径在函数运行开始时进行注册。

主要有两种路径处理方式， 常规路径处理和属性路径处理。常规路径处理就是用MapRoute的方式设定调用路径，属性路径处理是指在调用函数的上方设定一个路径属性。

## dotnet core工程里面有哪些常见的工程文件？

global, launch setting，app settings，bundle config，bower, package。

## 依赖注入实现原理？

实现DI，核心在于依赖注入容器IContainer，该容器具有以下功能

- ①.（容器）保存可用服务的集合 // 要用的特定对象、特定类、接口服务
- ②.（注册）提供一种方式将各种部件与他们依赖的服务绑定到一起；// Add...函数或containerBuilder.Register函数，
- ③.（解析点）为应用程序提供一种方式来请求已配置的对象： 构造函数注入、属性注入.

运行时，框架会一层层通过反射构造实例，最终得到完整对象。

## ASP.NET Core项目如何设置IP地址和端口号？

可以使用Properties文件夹下的launchSettings配置文件来配置不同的启动方式的时候，分别配置IP和端口号。
