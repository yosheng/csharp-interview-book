# WebForm

## 列举ASP.NET页面之间传递值的几种方式。

- 1).使用QueryString, 如....?id=1; response. Redirect()....
- 2).使用Session变量
- 3).使用Server.Transfer

## 什么是Code-Behind技术？

代码后植。

## 什么是ASP.net中的用户控件？

用户控件一般用在内容多为静态,或者少许会改变的情况下..用的比较大..类似ASP中的include..但是功能要强大的多。

## 什么是code-Behind技术？

ASPX,RESX和CS三个后缀的文件，这个就是代码分离.实现了HTML代码和服务器代码分离.方便代码编写和整理。

## 在.Net中，类System.Web.UI.Page 可以被继承么？

可以。

## <%# %> 和 <% %> 有什么区别？

- <%# %>表示绑定的数据源
- <%%>是服务器端代码块

## 说出一些常用的类、接口，请各举5个?

要让人家感觉你对.Net开发很熟，所以，不能仅仅只列谁都能想到的那些东西，要多列你在做项目中涉及的那些东西。就写你最近写的那些程序中涉及的那些类。

常用的类：StreamReader、WebClient、Dictionary<K,V>、StringBuilder、SqlConnection、FileStream、File、Regex、List

常用的接口：IDisposable、IEnumerable、IDbConnection、IComparable、ICollection、IList、IDictionary

## ASP.NET和ASP有什么区别?

ASP.NET的脚本是与HTML分离的，代码被编译成了DLL, DLL可以在server端执行。

ASP的脚本是与HTML在一起的，每次都会进行解释执行。

## 简述 Application，session，cookie，cache，viewState 的概念，以及相互之间的区别?

- Application 任意大小 整个应用程序的生命期 所有用户 服务器端
- Seccion 小量，简单的数据 用户活动时间+ 单个用户 服务器端一段延迟时间（一般为20分钟）
- Cookie 小量，简单的数据 可以根据需要设定 单个用户 客户端
- ViewState 小量，简单的数据 一个Web页面的生命期 单个用户 客户端
- Cache 任意大小 可以根据需要设定 所有用户 服务器端

## ASP.NET中的六大对象有哪些？

1. Response
2. Request
3. Server
4. Application
5. Session
6. Cookie

## 简单描述Ihtttphandler和Ihttpmodule的区别和各自的作用？

1. 先后次序.先IHttpModule,后IHttpHandler. 注:Module要看你响应了哪个事件，一些事件是在Handler之前运行的，一些是在Handler之后运行的
2. 对请求的处理上:
   IHttpModule 是属于大小通吃类型,无论客户端请求的是什么文件,都会调用到它;例如 aspx,rar,html的请求.
   IHttpHandler则属于挑食类型,只有ASP.net注册过的文件类型(例如aspx,asmx等等) 才会轮到调用它.
3. IHttpHandler按照你的请求 生成响应的内容，IHttpModule对请求进行预处理，如验证、修改、过滤等等，同时也可以对响应进行处理

## 应用程序池集成模式和经典模式的区别?

如果托管应用程序在采用集成模式的应用程序池中知运行，服务器将使用 IIS 和 ASP.NET 的集成请求处理管道来处理请求。

如果托管应用程序在采用经典模式的应用程序池中运行，服务器会继续通过 Aspnet_isapi.dll 路由托管代码请求，其处理请求的方式就像应用程序在 IIS 6.0 中运行一样。

## 什么是viewstate，能否禁用？是否所用控件都可以禁用?

Viewstate是保存状态的一种机制，EnableViewState属性设置为false即可禁用

## 数据访问通过aspx页面和DB层会很慢，有什么解决方法?

- （1）浏览器使用缓存；
- （2）使用压缩的JS和CSS
- （3）减少发送HTTP请求的次数；
- （4）后台，对于一些不经常变化的数据进行Cache；
- （5）对可能的低效率的SQL语句进行优化；
- （6）进行服务器负载均衡
