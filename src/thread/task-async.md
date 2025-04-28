# Task与异步

## .NET 执行异步有哪三种模式?

1. 基于任务的异步模式 (TAP, Task-based Asynchronous Pattern)

   - **核心类型**：`Task`、`Task<T>`
   - **关键字**：`async`/`await`
   - **特点**：
     - 使用 `async` 标记异步方法，`await` 等待任务完成。
     - 非阻塞调用，自动处理上下文切换（如 UI 线程不卡死）。
     - 通过 `Task.Run` 将同步代码卸载到线程池。

   ```csharp
   public async Task<int> GetDataAsync()
   {
       var data = await HttpClient.GetStringAsync("https://example.com");
       return data.Length;
   }
   ```

2. 基于事件的异步模式 (EAP, Event-based Asynchronous Pattern)
   （旧版 .NET 2.0+，已过时）

   - **核心类型**：`BackgroundWorker`、`WebClient`
   - **特点**：
     - 通过事件（如 `Completed`）通知异步操作结果。
     - 需要手动注册事件回调。

   ```csharp
   var client = new WebClient();
   client.DownloadStringCompleted += (sender, e) => 
   {
       Console.WriteLine(e.Result); // 异步完成后的回调
   };
   client.DownloadStringAsync(new Uri("https://example.com"));
   ```

3. 异步编程模型 (APM, Asynchronous Programming Model) 
   最早期模式，.NET 1.1，已过时）

   - **核心类型**：`IAsyncResult`、`BeginXXX`/`EndXXX` 方法对。
   - **特点**：
     - 使用 `BeginOperation` 启动异步操作，`EndOperation` 获取结果。
     - 需手动处理回调或轮询。

   ```csharp
   var stream = File.OpenRead("file.txt");
   byte[] buffer = new byte[1024];
   stream.BeginRead(buffer, 0, buffer.Length, asyncResult => 
   {
       int bytesRead = stream.EndRead(asyncResult); // 获取结果
       Console.WriteLine($"Read {bytesRead} bytes");
   }, null);
   ```

   



## 写出控制台输出的字符串顺序

先看一个例子（[来源](https://www.cnblogs.com/jonins/p/9558275.html)）

```csharp
class Program
 {
     static void Main(string[] args)
     {
         Console.WriteLine($"头部已执行，当前主线程Id为：{Thread.CurrentThread.ManagedThreadId}");
         CallerWithAsync("jack");
         Console.WriteLine($"尾部已执行，当前主线程Id为：{Thread.CurrentThread.ManagedThreadId}");
         Console.ReadKey();
     }
     async static void CallerWithAsync(string name)
     {
         Console.WriteLine($"异步调用头部执行，当前线程Id为：{Thread.CurrentThread.ManagedThreadId}");
         string result = await SayHiAsync(name);
         Console.WriteLine($"异步调用尾部执行，当前线程Id为：{Thread.CurrentThread.ManagedThreadId}");
         Console.WriteLine(result);
     }
     static Task<string> SayHiAsync(string name)
     {
         return Task.Run<string>(() => { return SayHi(name); });
     }
     static string SayHi(string name)
     {
         Task.Delay(2000).Wait();//异步等待2s
         Console.WriteLine($"SayHi执行，当前线程Id为：{Thread.CurrentThread.ManagedThreadId}");
         return $"Hello,{name}";
     }
 }
```

**执行结果如下：** 使用await关键字来调用返回任务的异步方法SayHiAsync，而使用await需要有用async修饰符声明的方法，在SayHiAsync方法为完成前，下面的方法不会继续执行。但是主线程并没有阻塞，且任务处理完成后await后的逻辑继续执行。

```
头部已执行，当前主线程Id为：1
异步调用头部执行，当前线程Id为：1
尾部已执行，当前主线程Id为：1
SayHi执行，当前线程Id为：3
异步调用尾部执行，当前线程Id为：3
Hello,jack
```

- **本质：** 编译器将await关键字后的所有代码放进了延续（ContinueWith）方法的代码块中来转换await关键词。
- **注意：**
  1. 无法等待具有void返回类型的异步方法，并且无效返回方法的调用方捕获不到异步方法抛出的任何异常。
     **async void** 应仅用于事件处理程序。因为事件不具有返回类型（因此无法返回 Task 和 Task）。
  2. 异步方法无法声明 in、ref 或 out 参数，但可以调用包含此类参数的方法。 同样，异步方法无法通过引用返回值，但可以调用包含 ref 返回值的方法。
