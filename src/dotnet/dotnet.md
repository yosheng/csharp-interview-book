# .NET

## 谈一谈对DDD的理解?

DDD，领域驱动设计。就是通过领域来指导软件设计，是一种十分抽象的软件设计思想，它主要分为战略设计和战术设计

战略方面，通过事件风暴进行领域模型的划分，划分出核心域，子域，支撑域，定义通用语言，划分出界限上下文。

在战术设计方面，ddd将架构分层，“松耦合，高内聚”是架构设计的整体思想。按照DDD思想，可以分为领域层，基础设施层，应用层，接口层。

接口层为前端用户提供api接口。基础设施层可以放一些第三方的服务，数据库连接等内容。应用层是对领域服务的编排，是很薄的一层（目前我自己的架构，应用的是cqrs，所有的相关逻辑都是放在了应用层，而领域层只是放了实体，因为暂时还不是特别理解领域层的服务和事件都应该写什么）。领域层包括实体，值对象，聚合根，领域服务，领域事件等内容。

## 请简述一下CQRS架构

**CQRS（Command Query Responsibility Segregation）** 是一种架构模式，其核心在于 **分离读写操作**：

- **命令（Command）**：修改数据（写操作），返回执行结果（成功/失败），不返回数据。
- **查询（Query）**：获取数据（读操作），不改变系统状态。

```mermaid
graph LR
    A[客户端] -->|命令| B[命令处理器]
    A -->|查询| C[查询处理器]
    B --> D[写数据库]
    C --> E[读数据库]
    D -->|同步| E
```

## 什麽是AOP？.Net Core 如何支持AOP？

AOP（Aspect-Oriented Programming） 是一种编程范式，用于将横切关注点（如日志、事务、权限）与核心业务逻辑分离，通过动态注入方式实现代码复用和解耦。

| 术语                     | 说明                                             |
| :----------------------- | :----------------------------------------------- |
| **切面（Aspect）**       | 封装横切逻辑的模块（如日志记录器）。             |
| **连接点（Join Point）** | 程序执行的点（如方法调用、异常抛出）。           |
| **通知（Advice）**       | 切面在连接点执行的动作（如方法执行前、后）。     |
| **切入点（Pointcut）**   | 定义哪些连接点会被切面拦截（如匹配特定方法名）。 |

1. 动态代理（Dynamic Proxy）

   **原理**：运行时生成代理类包装目标对象，拦截方法调用。

   **常用库**：

   - **Castle DynamicProxy**（最流行）
   - **DispatchProxy**（.NET Core 内置轻量级方案）

   示例：使用 Castle DynamicProxy

   ```csharp
   // 1. 定义拦截器
   public class LogInterceptor : IInterceptor
   {
       public void Intercept(IInvocation invocation)
       {
           Console.WriteLine($"调用方法前: {invocation.Method.Name}");
           invocation.Proceed(); // 继续执行原方法
           Console.WriteLine($"调用方法后: {invocation.Method.Name}");
       }
   }
   
   // 2. 创建代理类
   var proxyGenerator = new ProxyGenerator();
   var service = proxyGenerator.CreateInterfaceProxyWithTarget<IMyService>(
       new MyService(), // 目标对象
       new LogInterceptor()); // 拦截器
   
   // 3. 使用代理对象
   service.DoWork(); // 自动触发日志
   ```

2. 中间件（Middleware）

   适用场景：ASP.NET Core 请求管道中的AOP（全局或控制器级别）。

   示例：记录HTTP请求日志

   ```csharp
     public class LoggingMiddleware
     {
         private readonly RequestDelegate _next;
         public LoggingMiddleware(RequestDelegate next) => _next = next;
     
         public async Task Invoke(HttpContext context)
         {
             Console.WriteLine($"请求开始: {context.Request.Path}");
             await _next(context); // 继续管道
             Console.WriteLine($"请求结束: {context.Response.StatusCode}");
         }
     }
     
     // 注册中间件
     app.UseMiddleware<LoggingMiddleware>();
   ```

3. 过滤器（Filters）

   适用场景：MVC/Web API 中的动作级别AOP。

   类型：

   - **Action Filter**：方法执行前后拦截
   - **Exception Filter**：异常处理
   - **Result Filter**：结果格式化

   示例：Action Filter

   ```csharp
   public class LogActionFilter : IActionFilter
   {
       public void OnActionExecuting(ActionExecutingContext context)
           => Console.WriteLine($"Action执行前: {context.ActionDescriptor.DisplayName}");
   
       public void OnActionExecuted(ActionExecutedContext context)
           => Console.WriteLine($"Action执行后: {context.Result}");
   }
   
   // 注册为全局过滤器
   services.AddControllers(options => options.Filters.Add<LogActionFilter>());
   ```

4. 源码生成器（Source Generators）

   原理：编译时生成代理代码（高性能，无运行时反射）。

   适用库：

   - **AspectInjector**
   - **PostSharp**（商业版）

   示例：AspectInjector

   ```csharp
     [Aspect(Scope.Global)]
     public class LogAspect
     {
         [Advice(Kind.Before)] // 方法执行前切入
         public void LogEnter([Argument(Source.Name)] string methodName)
             => Console.WriteLine($"Entering {methodName}");
     }
     
     // 标记需要拦截的方法
     [Inject(typeof(LogAspect))]
     public class MyService { ... }
   ```

  
