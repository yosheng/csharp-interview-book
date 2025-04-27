# 多线程与异步

## 根据线程安全的相关知识，分析以下代码，当调用test方法时i>10时是否会引起死锁?并简要说明理由。

```csharp
public void test(int i)
{
    lock(this)
    {
        if (i>10)
        {
            i--;
            test(i);
        }
    }
}
```

不会发生死锁，（但有一点int是按值传递的，所以每次改变的都只是一个副本，因此不会出现死锁。但如果把int换做一个object，那么死锁会发生）

## 描述线程与进程的区别？

线程(Thread)与进程（Process）二者都定义了某种边界，不同的是进程定义的是应用程序与应用程序之间的边界，不同的进程之间不能共享代码和数据空间，而线程定义的是代码执行堆栈和执行上下文的边界。一个进程可以包括若干个线程，同时创建多个线程来完成某项任务，便是多线程。

而同一进程中的不同线程共享代码和数据空间。用一个比喻来说，如果一个家庭代表一个进程，在家庭内部，各个成员就是线程，家庭中的每个成员都有义务对家庭的财富进行积累，同时也有权利对家庭财富进行消费，当面对一个任务的时候，家庭也可以派出几个成员来协同完成，而家庭之外的人则没有办法直接消费不属于自己家庭的财产。

## Windows单个进程所能访问的最大内存量是多少？它与系统的最大虚拟内存一样吗？这对于系统设计有什么影响？

这个需要针对硬件平台，公式为单个进程能访问的最大内存量=2的处理器位数次方/2，比如通常情况下，32位处理器下，单个进程所能访问的最大内存量为:232 /2 = 2G 。单个进程能访问的最大内存量是最大虚拟内存的1/2，因为要分配给操作系统一半虚拟内存。

## 前台线程和后台线程有什么区别？

通过将 Thread.IsBackground 属性设置为 true，就可以将线程指定为后台线程

前台线程： 应用必须结束掉所有的前台线程才能结束程序，只要有一个前台线程没退出进程就不会自动退出，当然线程是依附在进程上的，所以你直接把进程KO掉了的话自然所有前台线程也会退出。

后台线程： 进程可以不考虑后台直接自动退出，进程自动退出后所有的后台线程也会自动销毁。

## 什么是互斥？

当多个线程访问同一个全局变量，或者同一个资源(比如打印机)的时候，需要进行线程间的互斥操作来保证访问的安全性。

## 如何查看和设置线程池的上下限？

线程池的线程数是有限制的，通常情况下，我们无需修改默认的配置。但在一些场合，我们可能需要了解线程池的上下限和剩余的线程数。线程池作为一个缓冲池，有着其上下限。在通常情况下，当线程池中的线程数小于线程池设置的下限时，线程池会设法创建新的线程，而当线程池中的线程数大于线程池设置的上限时，线程池将销毁多余的线程。

PS：在.NET Framework 4.0中，每个CPU默认的工作者线程数量最大值为250个，最小值为2个。而IO线程的默认最大值为1000个，最小值为2个。

在.NET中，通过 ThreadPool 类型提供的5个静态方法可以获取和设置线程池的上限和下限，同时它还额外地提供了一个方法来让程序员获知当前可用的线程数量，下面是这五个方法的签名：

- ① static void GetMaxThreads(out int workerThreads, out int completionPortThreads)
- ② static void GetMinThreads(out int workerThreads, out int completionPortThreads)
- ③ static bool SetMaxThreads(int workerThreads, int completionPortThreads)
- ④ static bool SetMinThreads(int workerThreads, int completionPortThreads)
- ⑤ static void GetAvailableThreads(out int workerThreads, out int completionPortThreads)

## Task状态机的实现和工作机制是什么？

CPS 全称是Continuation Passing Style，在.NET 中，它会自动编译为：

1. 将所有引用的局部变量做成闭包，放到一个隐藏的状态机的类中；
2. 将所有的await 展开成一个状态号，有几个await 就有几个状态号；
3. 每次执行完一个状态，都重复回调状态机的MoveNext 方法，同时指定下一个状态号；
4. MoveNext 方法还需处理线程和异常等问题。

## await的作用和原理，并说明和GetResult()有什么区别？

从状态机的角度出发，await的本质是调用Task.GetAwaiter()的UnsafeOnCompleted(Action)回调，并指定下一个状态号。

从多线程的角度出发，如果await的Task需要在新的线程上执行，该状态机的MoveNext()方法会立即返回，此时，主线程被释放出来了，然后在UnsafeOnCompleted回调的action指定的线程上下文中继续MoveNext()和下一个状态的代码。

而相比之下，GetResult()就是在当前线程上立即等待Task的完成，在Task完成前，当前线程不会释放。 注意：Task也可能不一定在新的线程上执行，此时用GetResult()或者await就只有会不会创建状态机的区别了。

## Task和Thread有区别吗？

Task和Thread都能创建用多线程的方式执行代码，但它们有较大的区别。Task较新，发布于.NET 4.5，能结合新的async/await代码模型写代码，它不止能创建新线程，还能使用线程池（默认）、单线程等方式编程，在UI编程领域，Task还能自动返回UI线程上下文，还提供了许多便利API以管理多个Task。

## 多线程有什么用？

（1）发挥多核CPU的优势

随着工业的进步，现在的笔记本、台式机乃至商用的应用服务器至少也都是双核的，4核、8核甚至16核的也都不少见，如果是单线程的程序，那么在双核CPU上就浪费了50%，在4核CPU上就浪费了75%。单核CPU上所谓的”多线程”那是假的多线程，同一时间处理器只会处理一段逻辑，只不过线程之间切换得比较快，看着像多个线程”同时”运行罢了。多核CPU上的多线程才是真正的多线程，它能让你的多段逻辑同时工作，多线程，可以真正发挥出多核CPU的优势来，达到充分利用CPU的目的。

（2）防止阻塞

从程序运行效率的角度来看，单核CPU不但不会发挥出多线程的优势，反而会因为在单核CPU上运行多线程导致线程上下文的切换，而降低程序整体的效率。但是单核CPU我们还是要应用多线程，就是为了防止阻塞。试想，如果单核CPU使用单线程，那么只要这个线程阻塞了，比方说远程读取某个数据吧，对端迟迟未返回又没有设置超时时间，那么你的整个程序在数据返回回来之前就停止运行了。多线程可以防止这个问题，多条线程同时运行，哪怕一条线程的代码执行读取数据阻塞，也不会影响其它任务的执行。

（3）便于建模

这是另外一个没有这么明显的优点了。假设有一个大的任务A，单线程编程，那么就要考虑很多，建立整个程序模型比较麻烦。但是如果把这个大的任务A分解成几个小任务，任务B、任务C、任务D，分别建立程序模型，并通过多线程分别运行这几个任务，那就简单很多了。

## 两个线程交替打印0~100的奇偶数

这道题就是说有两个线程，一个名为偶数线程，一个名为奇数线程，偶数线程只打印偶数，奇数线程只打印奇数，两个线程按顺序交替打印。

```csharp
publicclassThreadExample
{
    ///<summary>
    ///两个线程交替打印0~100的奇偶数
    ///</summary>
    public static void PrintOddEvenNumber
    {
        varwork = newTheadWorkTest;
        varthread1 = newThread(work.PrintOddNumer) { Name = "奇数线程"};
        varthread2 = newThread(work.PrintEvenNumber) { Name = "偶数线程"};
        thread1.Start;
        thread2.Start;
    }
}
publicclassTheadWorkTest
{
    privatestaticreadonlyAutoResetEvent oddAre = newAutoResetEvent( false);
    privatestaticreadonlyAutoResetEvent evenAre = newAutoResetEvent( false);
    publicvoidPrintOddNumer
    {
        oddAre.WaitOne;
        for( var0; i < 100; i++ )
        {
        if(i % 2!= 1) continue;
        Console.WriteLine($"{Thread.CurrentThread.Name}：{i}");
        evenAre.Set;
        oddAre.WaitOne;
    	}
	}
	publicvoidPrintEvenNumber
	{
		for( vari = 0; i < 100; i++ )
		{
            if(i % 2!= 0) continue;
            Console.WriteLine($"{Thread.CurrentThread.Name}：{i}");
            oddAre.Set;
            evenAre.WaitOne;
		}
	}
}
```

## 为什么GUI不支持跨线程调用?有什么解决方法？

因为GUI应用程序引入了一个特殊的线程处理模型，为了保证UI控件的线程安全，这个线程处理模型不允许其他子线程跨线程访问UI元素。解决方法比较多的：

- 利用UI控件提供的方法，Winform是控件的Invoke方法，WPF中是控件的Dispatcher.Invoke方法；
- 使用BackgroundWorker；
- 使用GUI线程处理模型的同步上下文SynchronizationContext来提交UI更新操作

## 说说常用的锁，lock是一种什么样的锁？

常用的如如SemaphoreSlim、ManualResetEventSlim、Monitor、ReadWriteLockSlim，lock是一个混合锁，其实质是Monitor

## lock为什么要锁定一个参数（可否为值类型？）参数有什么要求？

lock的锁对象要求为一个引用类型。可以锁定值类型，但值类型会被装箱，每次装箱后的对象都不一样，会导致锁定无效。

对于lock锁，锁定的这个对象参数才是关键，这个参数的同步索引块指针会指向一个真正的锁（同步块），这个锁（同步块）会被复用。

## 多线程和异步的区别和联系?

多线程是实现异步的主要方式之一，异步并不等同于多线程。实现异步的方式还有很多，比如利用硬件的特性、使用进程或纤程等。

在.NET中就有很多的异步编程支持，比如很多地方都有 Begin、End 的方法，就是一种异步编程支持，她内部有些是利用多线程，有些是利用硬件的特性来实现的异步编程。

## 线程池的有点和不足?

优点：减小线程创建和销毁的开销，可以复用线程；也从而减少了线程上下文切换的性能损失；在GC回收时，较少的线程更有利于GC的回收效率。

缺点：线程池无法对一个线程有更多的精确的控制，如了解其运行状态等；不能设置线程的优先级；加入到线程池的任务（方法）不能有返回值；对于需要长期运行的任务就不适合线程池。

## Mutex和lock有什么不同？一般用哪一种比较好？

Mutex是一个基于内核模式的互斥锁，支持锁的递归调用，而Lock是一个混合锁，一般建议使用Lock更好，因为lock的性能更好。

## 用双检锁实现一个单例模式Singleton

```csharp
public static class Singleton<T> where T : class,new()
{
    private static T _Instance;
    private static object _lockObj = new object();
    /// <summary>
    /// 获取单例对象的实例
    /// </summary>
    public static T GetInstance()
    {
        if (_Instance != null) return _Instance;
        lock (_lockObj)
        {
            if (_Instance == null)
            {
                var temp = Activator.CreateInstance<T>();
                System.Threading.Interlocked.Exchange(ref _Instance, temp);
            }
        }
        return _Instance;
    }
}
```

## Thread 类有哪些常用的属性和方法？

属性：

- CurrentContext：获取线程正在其中执行的当前上下文。
- CurrentCulture：获取或设置当前线程的区域性。
- CurrentPrincipal：获取或设置线程的当前负责人（对基于角色的安全性而言）。
- CurrentThread：获取当前正在运行的线程。
- CurrentUICulture：获取或设置资源管理器使用的当前区域性以便在运行时查找区域性特定的资源。
- IsBackground：获取或设置一个值，该值指示某个线程是否为后台线程。
- Priority：获取或设置一个值，该值指示线程的调度优先级。
- ThreadState：获取一个值，该值包含当前线程的状态。

方法：

- 在调用此方法的线程上引发 ThreadAbortException，以开始终止此线程的过程。调用此方法通常会终止线程。
  ```csharp
  public void Abort()
  ```

- 取消为当前线程请求的 Abort。
  ```csharp
  public static void ResetAbort()
  ```

- 开始一个线程。
  ```csharp
  public void Start()
  ```

- 让线程暂停一段时间。
  ```csharp
  public static void Sleep( int millisecondsTimeout )
  ```

- 导致调用线程执行准备好在当前处理器上运行的另一个线程。由操作系统选择要执行的线程。

  ```csharp
  public static bool Yield()
  ```

