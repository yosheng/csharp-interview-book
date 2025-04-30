# 字符串

## 是否可以继承String类?

String类是final类故不可以继承。

## 不是说字符串是不可变的吗？string s="abc";s="123"不就是变了吗？

String是不可变的在这段代码中，s原先指向一个String对象，内容是 "abc"，然后我们将s指向"123"，那么s所指向的那个对象是否发生了改变呢？答案是没有。这时，s不指向原来那个对象了，而指向了另一个 String对象，内容为"123"，原来那个对象还存在于内存之中，只是s这个引用变量不再指向它了。

## 字符串中string str=null和string str=""和string str=string.Empty的区别？

string.Empty相当于“”,Empty是一个静态只读的字段。 string str="" ,初始化对象，并分配一个空字符串的内存空间 string str=null,初始化对象，不会分配内存空间

## string和StringBuilder的区别,两者性能的比较

都是引用类型，分配再堆上

StringBuilder默认容量是16，可以允许扩充它所封装的字符串中字符的数量.每个StringBuffer对象都有一定的缓冲区容量，当字符串大小没有超过容量时，不会分配新的容量，当字符串大小超过容量时，会自动增加容量。

对于简单的字符串连接操作，在性能上stringbuilder不一定总是优于strin因为stringbulider对象的创建也消耗大量的性能，在字符串连接比较少的情况下，过度滥用stringbuilder会导致性能的浪费而非节约，只有大量无法预知次数的字符串操作才考虑stringbuilder的使用。从最后分析可以看出如果是相对较少的字符串拼接根本看不出太大差别。

Stringbulider的使用，最好制定合适的容量值，否则优于默认值容量不足而频繁的进行内存分配操作，是不妥的实现方法。

参考链接：[https://www.cnblogs.com/haofuqi/p/4826262.html](https://www.cnblogs.com/haofuqi/p/4826262.html)

## Strings = new String(“xyz”);创建了几个String Object?

两个对象，一个是“xyz”,一个是指向“xyz”的引用对象s。

## 说说什么是逐字字符串

下述内容引自：https://www.cnblogs.com/willick/p/13035697.html

在普通字符串中，反斜杠字符是转义字符。而在逐字字符串（Verbatim Strings）中，字符将被编程器按照原义进行解释。使用逐字字符串只需在字符串前面加上 @ 符号。

```csharp
// 逐字字符串：转义符
var filename = @"c:\temp\newfile.txt";
Console.WriteLine(filenaame);

// 逐字字符串：多行文本
var multiLine = @"This is a
multiline paragraph.";
Console.WriteLine(multiLine);

// 非逐字字符串
var escapedFilename = "c:\temp\newfile.txt";
Console.WriteLine(escapedFilename);
```

输出结果：

```txt
c:\temp\newfile.txt

This is a
multiline paragraph.

c:    emp
ewfile.txt
```

逐字字符串中唯一不被原样解释的字符是双引号。由于双引号是定义字符串的关键字符，所以在逐字字符串中要表达双引号需要用双引号进行转义。

```csharp
var str = @"""I don't think so"", he said.";
Console.WriteLine(str);
```

输出结果：

```
"I don't think so", he said.
```

在逐字字符串中也可以 $ 符号实现字符串内插值。

```csharp
Console.WriteLine($@"Testing \n 1 2 {5 - 2}");
```

输出结果：

```txt
Testing \n 1 2 3
```

## 列举你知道的数字格式化转换

下述内容引自：https://www.cnblogs.com/willick/p/13035697.html

典型的的格式化方法为：

```csharp
string.Format("{index[:format]}", number)
```

可使用“0”和“#”占位符进行补位。“0” 表示位数不够位数就补充“0”，小数部分如果位数多了则会四舍五入；“#”表示占位，用于辅助“0”进行补位。

标准格式化用法：

```csharp
// “0”描述：占位符，如果可能，填充位
string.Format("{0:000000}",1234); // 结果：001234

// “#”描述：占位符，如果可能，填充位
string.Format("{0:######}",1234);  // 结果：1234
string.Format("{0:#0####}",1234);  // 结果：01234
string.Format("{0:0#0####}",1234); // 结果：0001234

// "."描述：小数点
string.Format("{0:000.000}", 1234);       // 结果：1234.000
string.Format("{0:000.000}", 4321.12543); // 结果：4321.125

// ","描述：千分表示
string.Format("{0:0,0}", 1234567);   //结果：1,234,567

// "%"描述：格式化为百分数
string.Format("{0:0%}",1234);        // 结果：123400%
string.Format("{0:#%}", 1234.125);   // 结果：123413%
string.Format("{0:0.00%}",1234);     // 结果：123400.00%
string.Format("{0:#.00%}",1234.125); // 结果：123412.50%
```

内置快捷字母格式化用法：

```csharp
// E-科学计数法表示
(25000).ToString("E"); // 结果：2.500000E+004

// C-货币表示，带有逗号分隔符，默认小数点后保留两位，四舍五入
(2.5).ToString("C"); // 结果：￥2.50

// D[length]-十进制数
(25).ToString("D5"); // 结果：00025

// F[precision]-浮点数，保留小数位数(四舍五入)
(25).ToString("F2"); // 结果：25.00

// G[digits]-常规，保留指定位数的有效数字，四舍五入
(2.52).ToString("G2"); // 结果：2.5

// N-带有逗号分隔符，默认小数点后保留两位，四舍五入
(2500000).ToString("N"); // 结果：2,500,000.00

// X-十六进制，非整型将产生格式异常
(255).ToString("X"); // 结果：FF
```

`ToString` 也可以自定义补零格式化：

```csharp
(15).ToString("000");              // 结果：015
(15).ToString("value is 0");       // 结果：value is 15
(10.456).ToString("0.00");         // 结果：10.46
(10.456).ToString("00");           // 结果：10
(10.456).ToString("value is 0.0"); // 结果：value is 10.5
```

## 说说字符串拼接、字符串内插法

下述内容引自：https://www.cnblogs.com/willick/p/13035697.html

将数组中的字符串拼接成一个字符串：

```csharp
var parts = new[] { "Foo", "Bar", "Fizz", "Buzz"};
var joined = string.Join(", ", parts);
// joined = "Foo, Bar, Fizz, Buzz"
```

以下四种方式都可以达到相同的字符串拼接的目的：

```csharp
string first = "Hello";
string second = "World";
string foo = first + " " + second;
string foo = string.Concat(first, " ", second);
string foo = string.Format("{0} {1}", firstname, lastname);
string foo = $"{firstname} {lastname}";
```

字符串内插法简单用法：

```csharp
var name = "World";
var str =$"Hello, {name}!";
// str = "Hello, World!"
```

带日期格式化：

```csharp
var date = DateTime.Now;
var str = $"Today is {date:yyyy-MM-dd}！";
```

补齐格式化（Padding）：

```csharp
var number = 42;

// 向左补齐
var str = $"The answer to life, the universe and everything is {number, 5}.";
// str = "The answer to life, the universe and everything is ___42." ('_'表示空格)

// 向右补齐
var str = $"The answer to life, the universe and everything is ${number, -5}.";
// str = "The answer to life, the universe and everything is 42___."
```

结合内置快捷字母格式化：

```csharp
var amount = 2.5;
var str = $"It costs {amount:C}";
// str = "￥2.50"

var number = 42;
var str = $"The answer to life, the universe and everything is {number, 5:f1}.";
// str = "The answer to life, the universe and everything is ___42.1"
```