# 内存管理

## C#可否对内存进行直接的操作？

C#在Unsafe 模式下可以使用指针对内存进行操作, 但在托管模式下不可以使用指针。

1. 在 Visual Studio 开发环境中设置/unsafe（启用不安全模式)编译器选项
   打开项目的“属性”页。
   单击“生成”属性页。
   选中“允许不安全代码”复选框。

2. unsafe关键字表示不安全上下文，该上下文是任何涉及指针的操作所必需的。
   可以在类型或成员的声明中使用 unsafe修饰符。
   因此，类型或成员的整个正文范围均被视为不安全上下文。例如，以下是用 unsafe 修饰符声明的方法：

   ```csharp
   unsafe static void FastCopy(byte[] src, byte[] dst, int count)
   {
   	// Unsafe context: can use pointers here.
   }
   ```

   不安全上下文的范围从参数列表扩展到方法的结尾，因此指针在以下参数列表中也可以使用：
   ```csharp
   unsafe static void FastCopy ( byte* ps, byte* pd, int count ) {...}
   ```

   还可以使用不安全块从而能够使用该块内的不安全代码。例如：
   ```csharp
   unsafe
   {
   	// Unsafe context: can use pointers here.
   }
   ```

   若要编译不安全代码，必须指定 /unsafe编译器选项。
   无法通过公共语言运行库验证不安全代码。

## using() 语法有用吗？什么是IDisposable？

有用，实现了IDisposiable的类在using中创建，using结束后会自定调用该对象的Dispose方法，释放资源。

## using 语句会被编译成什么代码？

```csharp
// 编译前
using (var resource = new FileStream(...)) { ... }

// 编译后（等价于）
FileStream resource = null;
try {
    resource = new FileStream(...);
    ...
} finally {
    resource?.Dispose();
}
```

## CTS、CLS、CLR分别作何解释？

CTS：通用语言系统。CLS：通用语言规范。CLR：公共语言运行库。

## 什么是受管制的代码？

unsafe：非托管代码。不经过CLR运行。

## 什么是托管代码、非托管代码托管代码 (managed code)

由公共语言运行库环境（而不是直接由操作系统）执行的代码。托管代码应用程序可以获得公共语言运行库服务，例如自动垃圾回收、运行库类型检查和安全支持等。这些服务帮助提供独立于平台和语言的、统一的托管代码应用程序行为。

非托管代码 (unmanaged code)

在公共语言运行库环境的外部，由操作系统直接执行的代码。非托管代码必须提供自己的垃圾回收、类型检查、安全支持等服务；它与托管代码不同，后者从公共语言运行库中获得这些服务。

## GC是什么? 为什么要有GC?

1. GC是垃圾收集器。程序员不用担心内存管理，因为垃圾收集器会自动进行管理.
2. .NET的GC机制有这样两个问题：首先，GC并不是能释放所有的资源。它不能自动释放非托管资源。

GC并不是实时性的，这将会造成系统性能上的瓶颈和不确定性。

GC就是对“不可达“的对象进行回收，释放内存。

