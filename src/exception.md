# 异常

## C#异常类有哪些信息？

C#中，所有异常都继承自System.Exception类，Exception类定义了C#异常应该具有的信息和方法。值得注意的属性有：

```csharp
public virtual string Message { get; }// 错误的信息，文字描述
public virtual string StackTrace { get; }// 发生异常的调用堆栈信息
public System.Reflection.MethodBase TargetSite { get; }//引发这个错误的方法
public Exception InnerException { get; }// 子异常
```

## 如何创建一个自定义异常?

根据类继承原则和异常处理原则，我们可以使用以下方式来自定义一个类：

```csharp
public class CustomException : Exception
{
}
```

## 如何针对不同的异常进行捕捉？

```csharp
public class Program
{
	public static void Main(string[] args)
	{
        Program p = new Program();
        p.RiskWork();
        Console.ReadKey();
	}
	public void RiskWork()
    {
        try
        {
        	// 一些可能会出现异常的代码
        }
        catch (NullReferenceException ex)
        {
        	HandleExpectedException(ex);
        }
        catch (ArgumentException ex)
        {
        	HandleExpectedException(ex);
        }
        catch (FileNotFoundException ex)
        {
        	HandlerError(ex);
        }
        catch (Exception ex)
        {
        	HandleCrash(ex);
        }
	}
    // 这里处理预计可能会发生的，不属于错误范畴的异常
    private void HandleExpectedException(Exception ex)
    {
        // 这里可以借助log4net写入日志
        Console.WriteLine(ex.Message);
    }
    // 这里处理在系统出错时可能会发生的，比较严重的异常
    private void HandlerError(Exception ex)
    {
    	// 这里可以借助log4net写入日志
        Console.WriteLine(ex.Message);
    	// 严重的异常需要抛到上层处理
    	throw ex;
    }
    // 这里处理可能会导致系统崩溃时的异常
    private void HandleCrash(Exception ex)
    {
        // 这里可以借助log4net写入日志
        Console.WriteLine(ex.Message);
        // 关闭当前程序
        System.Threading.Thread.CurrentThread.Abort();
    }
}
```

## 如何避免类型转换时的异常？

其中有些是确定可以转换的（比如将一个子类类型转为父类类型），而有些则是尝试性的（比如将基类引用的对象转换成子类）。当执行常识性转换时，我们就应该做好捕捉异常的准备。

当一个不正确的类型转换发生时，会产生InvalidCastException异常，有时我们会用try-catch块做一些尝试性的类型转换，这样的代码没有任何错误，但是性能却相当糟糕，为什么呢？异常是一种耗费资源的机制，每当异常被抛出时，异常堆栈将会被建立，异常信息将被加载，而通常这些工作的成本相对较高，并且在尝试性类型转换时，这些信息都没有意义。

在.NET中提供了另外一种语法来进行尝试性的类型转换，那就是关键字 is 和 as 所做的工作。

（1）is 只负责检查类型的兼容性，并返回结果：true 和 false。→ 进行类型判断

```csharp
public static void Main(string[] args)
{
    object o = new object();
    // 执行类型兼容性检查
    if(o is ISample)
    {
        // 执行类型转换
        ISample sample = (ISample)o;
        sample.SampleShow();
    }
    Console.ReadKey();
}
```

（2）as 不仅负责检查兼容性还会进行类型转换，并返回结果，如果不兼容则返回 null 。→ 用于类型转型

```cs
public static void Main(string[] args)
{
    object o = new object();
    // 执行类型兼容性检查
    ISample sample = o as ISample;
    if(sample != null)
    {
    sample.SampleShow();
    }
    Console.ReadKey();
}
```

两者的共同之处都在于：不会抛出异常！综上比较，as 较 is 在执行效率上会好一些，在实际开发中应该量才而用，在只进行类型判断的应用场景时，应该多使用 is 而不是 as。

## try {}里有一个return语句，那么紧跟在这个try后的finally {}里的code会不会被执行，什么时候被执行，在return前还是后?

会执行，在return前执行。

## C# 中的异常类有哪些？

C# 异常是使用类来表示的，异常类主要是直接或间接地派生于 System.Exception 类。

- System.ApplicationException 和 System.SystemException 类是派生于 System.Exception 类的异常类。
- System.ApplicationException 类支持由应用程序生成的异常，所以我们自己定义的异常都应派生自该类。
- System.SystemException 类是所有预定义的系统异常的基类。
- System.IO.IOException 用于处理 I/O 错误(读写文件)。
- System.IndexOutOfRangeException 用于处理当方法指向超出范围的数组索引时生成的错误。
- System.ArrayTypeMismatchException 用于处理当数组类型不匹配时生成的错误。
- System.NullReferenceException 用于处理当依从一个空对象时生成的错误。
- System.DivideByZeroException 用于处理当除以零时生成的错误。例如：100/0就会报这个错误。
- System.InvalidCastException 用于处理在类型转换期间生成的错误。
- System.OutOfMemoryException 用于处理空闲内存不足生成的错误。
- System.StackOverflowException 用于处理栈溢出生成的错误。

