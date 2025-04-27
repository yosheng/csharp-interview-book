# 基础语法

## .NET和C#有什么区别?

- .NET一般指 .NET FrameWork框架，它是一种平台，一种技术。
- C#是一种编程语言，可以基于.NET平台的应用。

## 在.net中，配件的意思是？

程序集。（中间语言，源数据，资源，装配清单）

## C#中 property 与 attribute的区别，他们各有什么用处，这种机制的好处在哪里？

一个是属性，用于存取类的字段，一个是特性，用来标识类，方法等的附加性质。

## 分析以下代码，i=? j=?

```csharp
stringstrTmp = "abcdefg某某某";
inti= System.Text.Encoding.Default.GetBytes(strTmp).Length;
intj= strTmp.Length;
```

答：i=13,j=10

## 是否可以继承String类?

String类是final类故不可以继承。

## 不是说字符串是不可变的吗？string s="abc";s="123"不就是变了吗？

String是不可变的在这段代码中，s原先指向一个String对象，内容是 "abc"，然后我们将s指向"123"，那么s所指向的那个对象是否发生了改变呢？答案是没有。这时，s不指向原来那个对象了，而指向了另一个 String对象，内容为"123"，原来那个对象还存在于内存之中，只是s这个引用变量不再指向它了。

## 字符串中string str=null和string str=""和string str=string.Empty的区别？

string.Empty相当于“”,Empty是一个静态只读的字段。 string str="" ,初始化对象，并分配一个空字符串的内存空间 string str=null,初始化对象，不会分配内存空间

## byte b = 'a'; byte c = 1; byte d = 'ab'; byte e = '啊'; byte g = 256; 这些变量有些错误是错再哪里?

本题考查的是数据类型能承载数据的大小。

- 1byte =8bit，1个汉字=2个byte，1个英文=1个byte=8bit
- 所以bc是对的，deg是错的。'a'是char类型，a错误
- java byte取值范围是-128~127, 而C#里一个byte是0~255

## string和StringBuilder的区别,两者性能的比较

都是引用类型，分配再堆上

StringBuilder默认容量是16，可以允许扩充它所封装的字符串中字符的数量.每个StringBuffer对象都有一定的缓冲区容量，当字符串大小没有超过容量时，不会分配新的容量，当字符串大小超过容量时，会自动增加容量。

对于简单的字符串连接操作，在性能上stringbuilder不一定总是优于strin因为stringbulider对象的创建也消耗大量的性能，在字符串连接比较少的情况下，过度滥用stringbuilder会导致性能的浪费而非节约，只有大量无法预知次数的字符串操作才考虑stringbuilder的使用。从最后分析可以看出如果是相对较少的字符串拼接根本看不出太大差别。

Stringbulider的使用，最好制定合适的容量值，否则优于默认值容量不足而频繁的进行内存分配操作，是不妥的实现方法。

参考链接：[https://www.cnblogs.com/haofuqi/p/4826262.html](https://www.cnblogs.com/haofuqi/p/4826262.html)

## 什么是扩展方法？

一句话解释，扩展方法使你能够向现有类型“添加”方法，无需修改类型

条件：按扩展方法必须满足的条件：

1. 必须要静态类中的静态方法
2. 第一个参数的类型是要扩展的类型，并且需要添加this关键字以标识其为扩展方法

建议：通常，只在不得已的情况下才实现扩展方法，并谨慎的实现

使用：不能通过类名调用，直接使用类型来调用

## byte a =255;a+=5;a的值是多少？

byte的取值范围是-2的8次方至2的8次方-1，-256至258，a+=1时，a的值时0，a+=5时，a的值是0，
所以a+=5时，值是4

## 什么是装箱和拆箱？

装箱就是隐式地将一个值类型转换成引用类型，如：

```csharp
int i=0;
Syste.Object obj=i;
```

拆箱就是将引用类型转换成值类型，如：

```csharp
int i=0;
System.Object obj=i;
int j=(int)obj; //（将obj拆箱）
```

## 值类型和引用类型的区别?

值类型变量是直接包含值。将一个值类型变量赋给另一个值类型变量，是复制包含的值，默认值是0。

引用类型变量的赋值只复制对对象的引用，而不复制对象本身，默认值是null

值类型有整形、浮点型、bool、枚举。

引用类型有class、delegate、Object、string

值类型存储在栈中，引用类型存储在堆中

## new关键字的作用?

- 运算符：创建对象实例
- 修饰符：在派生类定义一个重名的方法，隐藏掉基类方法
- 约束：泛型约束定义，约束可使用的泛型类型,如：

```csharp
public class ItemFactory<T> where T : IComparable, new()
{
}
```

## int?和int有什么区别?

- int？为可空类型，默认值可以是null
- int默认值是0
- int?是通过int装箱为引用类型实现

## C#中的委托是什么？

一句话解释就是：将方法当作参数传入另一个方法的参数。 .net中有很多常见的委托如：Func 、Action 

作用：提高方法的扩展性

## 用最有效的方法算出2乘以8等于几？

位运算是最快，使用的是位运算 逻辑左位移<<。 方法是2<<3相当于0000 0000 0000 0010 （2的16位int二进制）左移三位就是 0000 0000 0001 0000（16的二进制）

## const和readonly有什么区别？

都可以标识一个常量。主要有以下区别：

1. 初始化位置不同。const必须在声明的同时赋值；readonly即可以在声明处赋值，也可以在静态构造方法（必须是静态构造方法，普通构造方法不行）里赋值。
2. 修饰对象不同。const即可以修饰类的字段，也可以修饰局部变量；readonly只能修饰类的字段
3. const是编译时常量，在编译时确定该值；readonly是运行时常量，在运行时确定该值。
4. const默认是静态的；而readonly如果设置成静态需要显示声明
5. 修饰引用类型时不同，const只能修饰string或值为null的其他引用类型；readonly可以是任何类型。

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

## 分析下面代码，a、b的值是多少？

```csharp
string strTmp = "a1某某某";
int a = System.Text.Encoding.Default.GetBytes(strTmp).Length;
int b = strTmp.Length;
```

分析：一个字母、数字占一个byte，一个中文占占两个byte，所以a=8,b=5

## Strings = new String(“xyz”);创建了几个String Object?

两个对象，一个是“xyz”,一个是指向“xyz”的引用对象s。

## 静态成员和非静态成员的区别

1. 静态成员用statis修饰符声明，在类被实例化时创建，通过类进行访问
2. 不带statis的变量时非静态变量，在对象被实例化时创建，通过对象进行访问，
3. 静态方法里不能使用非静态成员，非静态方法可以使用静态成员
4. 静态成员属于类，而不属于对象

## c#可否对内存直接操作

C#在unsafe 模式下可以使用指针对内存进行操作, 但在托管模式下不可以使用指针，C#NET默认不运行带指针的，需要设置下，选择项目右键->属性->选择生成->“允许不安全代码”打勾->保存

## short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 += 1;有什么错?

s1+1不能显式转换成short类型，可以修改为s1 =(short)(s1 + 1) 。short s1 = 1; s1 += 1正确

## 什么是强类型，什么是弱类型？哪种更好些？为什么?

强类型是在编译的时候就确定类型的数据，在执行时类型不能更改，而弱类型在执行的时候才会确定类型。没有好不好，二者各有好处，强类型安全，因为它事先已经确定好了，而且效率高。

一般用于编译型编程语言，如c++,java,c#,pascal等,弱类型相比而言不安全，在运行的时候容易出现错误，但它灵活，多用于解释型编程语言，如javascript,vb,php等

## using关键字的作用

1. 引用命名空间，也可using 别名
2. 释放资源，实现了IDisposiable的类在using中创建，using结束后会自定调用该对象的Dispose方法，释放资源。

## ref和out有什么区别

1. 都是按引用类型进行传递
2. 属性不是变量不能作为out、ref参数传递
3. ref参数必须初始化。out不需要初始化
4. 作用，当方法有多个返回值时，out非常有用

## 说明C#中的方法声明参数关键字params，ref，out的意义及用法?

1. params 关键字，官方给出的解释为用于方法参数长度不定的情况。有时候不能确定一个方法的方法参数到底有多少个，可以使用params关键字来解决问题
2. ref 关键字：使用引用类型参数，在方法中对参数所做的任何更改都将反应在该变量中
3. out 关键字：out 与ref相似但是out 无需进行初始化。

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

## as和is的区别

as在转换的同时判断兼容性，如果无法进行转换，返回位null（没有产生新的对象），as转换是否成功判断的依据是是否位null is只是做类型兼容性判断，并不执行真正的类型转换，返回true或false，对象为null也会返回false。

as比is效率更高，as只需要做一次类型兼容检查

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

## DateTime.Parse(myString); 这行代码有什么问题？

有问题，当myString不能满足时间格式要求的时候，会引发异常，建议使用DateTime.TryParse()

## Server.UrlEncode、HttpUtility.UrlDecode的区别

Server.UrlEncode的编码方式是按照本地程序设置的编码方式进行编码的，而HttpUtility.UrlEncode是默认的按照.net的utf-8格式进行编码的。
