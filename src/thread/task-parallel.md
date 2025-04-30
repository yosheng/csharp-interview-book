# Task与并行

## 聊聊任务Task 与并行Parallel

下述内容出自：https://www.dongchuanmin.com/csharp/1960.html

任务Task与并行Parallel本质上内部都是使用的线程池，提供了更丰富的并行编程的方式。任务Task基于线程池，可支持返回值，支持比较强大的任务执行计划定制等功能，下面是一个简单的示例。Task提供了很多方法和属性，通过这些方法和属性能够对Task的执行进行控制，并且能够获得其状态信息。Task的创建和执行都是独立的，因此可以对关联操作的执行拥有完全的控制权。

```csharp
//创建一个任务
Task<int> t1 = new Task<int>(n =>
{
    System.Threading.Thread.Sleep(1000);
    return (int)n;
}, 1000);
//定制一个延续任务计划
t1.ContinueWith(task =>
{
    Console.WriteLine("end" + t1.Result);
}, TaskContinuationOptions.AttachedToParent);
t1.Start();
//使用Task.Factory创建并启动一个任务
var t2 = System.Threading.Tasks.Task.Factory.StartNew(() =>
{
    Console.WriteLine("t1:" + t1.Status);
});
Task.WaitAll();
Console.WriteLine(t1.Result);
```

并行Parallel内部其实使用的是Task对象（TPL会在内部创建System.Threading.Tasks.Task的实例），所有并行任务完成后才会返回。少量短时间任务建议就不要使用并行Parallel了，并行Parallel本身也是有性能开销的，而且还要进行并行任务调度、创建调用方法的委托等等。

## 下面代码输出结果是什么？为什么？

```csharp
int a = 0;
System.Threading.Tasks.Parallel.For(0, 100000, (i) =>
{
    a++;
});
Console.Write(a);
```

输出结果不稳定，小于等于100000。因为多线程访问，没有使用锁机制，会导致有更新丢失。

## 多线程并行（Parallelism）和并发（Concurrency）的区别

- 并行：同一时刻有多条指令在多个处理器上同时执行，无论从宏观还是微观上都是同时发生的。
- 并发：是指在同一时间段内，宏观上看多个指令看起来是同时执行，微观上看是多个指令进程在快速的切换执行，同一时刻可能只有一条指令被执行。

## C# Parallel.For和普通For的区别

Parallel类是.NET 4中新增的抽象线程类。Parallel.For()方法类似于C#的for循环语句，也是多次执行一个任务。但是使用Parallel.For()方法，可以并行运行。

对于Parallel.For、Parallel.Foreach的使用应该要特别小心，它们的优势是处理列表很长，且对列表内的元素进行很复杂的业务逻辑，且不会使用共享资源，只针对自身的业务逻辑处理，方才能提升效率。
