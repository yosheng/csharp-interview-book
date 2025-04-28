# 基础语法

## .NET和C#有什么区别?

- .NET一般指 .NET FrameWork框架，它是一种平台，一种技术。
- C#是一种编程语言，可以基于.NET平台的应用。

## 在.net中，配件的意思是？

程序集。（中间语言，源数据，资源，装配清单）

## C#中 property 与 attribute的区别，他们各有什么用处，这种机制的好处在哪里？

一个是属性，用于存取类的字段，一个是特性，用来标识类，方法等的附加性质。


## 什么是扩展方法？

一句话解释，扩展方法使你能够向现有类型“添加”方法，无需修改类型

条件：按扩展方法必须满足的条件：

1. 必须要静态类中的静态方法
2. 第一个参数的类型是要扩展的类型，并且需要添加this关键字以标识其为扩展方法

建议：通常，只在不得已的情况下才实现扩展方法，并谨慎的实现

使用：不能通过类名调用，直接使用类型来调用


## C#中的委托是什么？

一句话解释就是：将方法当作参数传入另一个方法的参数。 .net中有很多常见的委托如：Func 、Action 

作用：提高方法的扩展性

## 用最有效的方法算出2乘以8等于几？

位运算是最快，使用的是位运算 逻辑左位移<<。 方法是2<<3相当于0000 0000 0000 0010 （2的16位int二进制）左移三位就是 0000 0000 0001 0000（16的二进制）

## 现有一个整数number，请写一个方法判断这个整数是否是2的N次方

4（100）、5（101）、8（1000）、16（10000）

- 取模运算： 用number%2==0可以判断，但是这个有点低级
- 位运算：（使用位运算逻辑并，两个位上的都为1才是1，其余都是0，判断是否等于0）
  4&3相当于100&011 ，结果是000等于0，所以4是2的n次方
  5&4相当于101&100，结果是100不等于0，所以5不是2的n次方

如果要问如果是2的N次方，这个N是多少？这该怎么算？

```csharp
private static byte get(int n)
{
    byte number = 1;
    while (n/2!=1)
    {
        n = n / 2;
        number += 1;
    }
    return number;
}
```

## CTS、CLS、CLR分别作何解释

CTS：通用语言系统。CLS：通用语言规范。CLR：公共语言运行库。

CTS：Common Type System 通用类型系统。Int32、Int16→int、String→string、Boolean→bool。
每种语言都定义了自己的类型，.Net通过CTS提供了公共的类型，然后翻译生成对应的.Net类型。

CLS：Common Language Specification 通用语言规范。不同语言语法的不同。每种语言都有自己的
语法，.Net通过CLS提供了公共的语法，然后不同语言翻译生成对应的.Net语法。

CLR：Common Language Runtime 公共语言运行时，就是GC、JIT等这些。有不同的CLR，比如服务
器CLR、Linux CLR（Mono）、Silverlight CLR(CoreCLR)。相当于一个发动机，负责执行IL。

## 在.net中，配件的意思是？

程序集。（中间语言，源数据，资源，装配清单）

## c#可否对内存直接操作

C#在unsafe 模式下可以使用指针对内存进行操作, 但在托管模式下不可以使用指针，C#NET默认不运行带指针的，需要设置下，选择项目右键->属性->选择生成->“允许不安全代码”打勾->保存

## 什么是强类型，什么是弱类型？哪种更好些？为什么?

强类型是在编译的时候就确定类型的数据，在执行时类型不能更改，而弱类型在执行的时候才会确定类型。没有好不好，二者各有好处，强类型安全，因为它事先已经确定好了，而且效率高。

一般用于编译型编程语言，如c++,java,c#,pascal等,弱类型相比而言不安全，在运行的时候容易出现错误，但它灵活，多用于解释型编程语言，如javascript,vb,php等

## using关键字的作用

1. 引用命名空间，也可using 别名
2. 释放资源，实现了IDisposiable的类在using中创建，using结束后会自定调用该对象的Dispose方法，释放资源。

## a.Equals(b)和a==b一样吗？

不一样，a==b仅仅表示a和b值相等，a.Equals(b)表示a与b一致

## 代码求值

```csharp
class Class1
{
    internal static int count = 0;
    static Class1()
    {
    	count++;
    }
    public Class1()
    {
    	count++;
    }
}
Class1 o1 = new Class1();
Class1 o2 = new Class1();
```

o1.count的值是多少？

答案：3，静态 构造方法计算一次，两个实例化对象计算两次。

## 关于构造函数说法正确的是哪个？

- a)构造函数可以声明返回类型。
- b)构造函数不可以用private修饰
- c)构造函数必须与类名相同
- d)构造函数不能带参数

答案：c ，构造函数必须与类名相同，可以传递多个传递，作用就是便于初始化对象成员，不能有任何
返回类型

## Math.Round(11.5)等於多少? Math.Round(-11.5)等於多少?

Math.Round(11.5)=12

Math.Round(-11.5)=-12

## &和&&的区别

相同点

&和&&都可作逻辑与的运算符，表示逻辑与（and），当运算符两边的表达式的结果都为true时，其结果才为true，否则，只要有一方为false，则结果为false。（ps：当要用到逻辑与的时候&是毫无意义，&本身就不是干这个的）

不同点

``` csharp
if(loginUser!=null & &string.IsnullOrEmpty(loginUser.UserName))
```

&&具有短路的功能，即如果第一个表达式为false，则不再计算第二个表达式，对于上面的表达式，当loginUser为null时，后面的表达式不会执行，所以不会出现NullPointerException如果将&&改为&，则会抛出NullPointerException异常。（ps：所以说当要用到逻辑与的时候&是毫无意义的）

& 是用作位运算的。

总结

&是位运算，返回结果是int类型 &&是逻辑运算，返回结果是bool类型

## i和i有什么区别？

1. i++是先赋值，然后再自增；++i是先自增，后赋值。
2. i=0，i++=0，++i=1； Console.WriteLine(i==i); 结果位true

## 什么是协变和逆变?

可变性是以一种类型安全的方式，将一个对象作为另一个对象来使用。其对应的术语则是不变性（invariant）。

可变性：可变性是以一种类型安全的方式，将一个对象作为另一个对象来使用。例如对普通继承中的可变性：若某方法声明返回类型为Stream，在实现时可以返回一个MemoryStream。可变性有两种类型：协变和逆变。

- 协变性：可以建立一个较为一般类型的变量，然后为其赋值，值是一个较为特殊类型的变量。例如：

  ```csharp
  string str = "test";
  // An object of a more derived type is assigned to an object of a less deri
  ved type.
  object obj = str;
  ```

  因为string肯定是一个object，所以这样的变化非常正常。

- 逆变性：在上面的例子中，我们无法将str和一个新的object对象画等号。如果强行要实现的话，只能这么干：

  ```csharp
  string s = (string) new object();
  ```

  但这样还是会在运行时出错。这也告诉我们，逆变性是很不正常的。

泛型的协变与逆变:

协变性和out关键字搭配使用，用于向调用者返回某项操作的值。例如下面的接口仅有一个方法，就是生产一个T类型的实例。那么我们可以传入一个特定类型。如我们可以将IFactory视为IFactory。这也适用于Food的所有子类型。（即将其视为一个更一般类型的实现）

```csharp
interface IFactory<T>
{
	T CreateInstance();
}
```

逆变性则相反，和in关键字搭配使用，指的是API将会消费值，而不是生产值。此时一般类型出现在参数中：

```csharp
interface IPrint<T>
{
	void Print(T value);
}
```

这意味着如果我们实现了IPrint< Code >，我们就可以将其当做IPrint< CsharpCode >使用。（即将其视为一个更具体类型的实现）

如果存在双向的传递，则什么也不会发生。这种类型是不变体(invariant)。

```csharp
interface IStorage<T>
{
    byte[] Serialize(T value);
    T Deserialize(byte[] data);
}
```

这个接口是不变体。我们不能将它视为一个更具体或更一般类型的实现。

假设有如下继承关系People –> Teacher，People –> Student。

如果我们以协变的方式使用（假设你建立了一个IStorage< Teacher >的实例，并将其视为IStorage）则我们可能会在调用Serialize时产生异常，因为Serialize方法不支持协变（如果参数是People的其他子类，例如Student，则IStorage< Teacher >将无法序列化Student）。

如果我们以逆变的方式使用（假设你建立了一个IStorage的实例，并将其视为IStorage< Teacher >），则我们可能会在调用Deserialize时产生异常，因为Deserialize方法不支持逆变，它只能返回People不能返回Teacher。

## Server.UrlEncode、HttpUtility.UrlDecode的区别

Server.UrlEncode的编码方式是按照本地程序设置的编码方式进行编码的，而HttpUtility.UrlEncode是默认的按照.net的utf-8格式进行编码的。
