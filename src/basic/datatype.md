# 数据类型

## 值类型和引用类型的区别?

值类型变量是直接包含值。将一个值类型变量赋给另一个值类型变量，是复制包含的值，默认值是0。

引用类型变量的赋值只复制对对象的引用，而不复制对象本身，默认值是null

值类型有整形、浮点型、bool、枚举。

引用类型有class、delegate、Object、string

值类型存储在栈中，引用类型存储在堆中

## C#中什么是值类型与引用类型？

值类型：struct、enum、int、float、char、bool、decimal

引用类型：class、delegate、interface、array、object、string

## C# 中值传递与引用传递的区别是什麽？

值传递：值传递时，系统首先为被调用方法的形参分配内存空间，并将实参的值按位置一一对应复制给形参，被调用方法中形参得任何改变都不会影响到相应的实参。

引用传递时：系统不是将实参本身得值赋值后传给形参，而是将其引用值（地址值）传递给形参。因此形参所引用得该地址上的变量与传递的实参相同，方法体内相应的形参值得任何改变都会影响到作为引用传递的实参。

简而言之，按值传递不是值参数是值类型，而是指形参变量会复制实参变量，也就是会在栈上多创建一个相同的变量。而按引用传递则不会。可以通过 ref 和 out 来决定参数是否按照引用传递。

## 分析以下代码，i=? j=?

```csharp
stringstrTmp = "abcdefg某某某";
inti= System.Text.Encoding.Default.GetBytes(strTmp).Length;
intj= strTmp.Length;
```

答：i=13,j=10

## 分析下面代码，a、b的值是多少？

```csharp
string strTmp = "a1某某某";
int a = System.Text.Encoding.Default.GetBytes(strTmp).Length;
int b = strTmp.Length;
```

分析：一个字母、数字占一个byte，一个中文占占两个byte，所以a=8,b=5

## byte b = 'a'; byte c = 1; byte d = 'ab'; byte e = '啊'; byte g = 256; 这些变量有些错误是错再哪里?

本题考查的是数据类型能承载数据的大小。

- 1byte =8bit，1个汉字=2个byte，1个英文=1个byte=8bit
- 所以bc是对的，deg是错的。'a'是char类型，a错误
- java byte取值范围是-128~127, 而C#里一个byte是0~255

## byte a =255;a+=5;a的值是多少？

byte的取值范围是-2的8次方至2的8次方-1，-256至258，a+=1时，a的值时0，a+=5时，a的值是0，
所以a+=5时，值是4

## 什么是装箱和拆箱？

装箱就是隐式地将一个值类型转换成引用类型，如：

```csharp
int i=0;
Syste.Object obj=i;
```

对值类型在堆中分配一个对象实例，并将该值复制到新的对象中。按三步进行。 

- 第一步：新分配托管堆内存(大小为值类型实例大小加上一个方法表指针和一个 SyncBlockIndex)。 
- 第二步：将值类型的实例字段拷贝到新分配的内存中。 
- 第三步：返回托管堆中新分配对象的地址。这个地址就是一个指向对象的引用了。 

拆箱就是将引用类型转换成值类型，如：

```csharp
int i=0;
System.Object obj=i;
int j=(int)obj; //（将obj拆箱）
```

检查对象实例，确保它是给定值类型的一个装箱值。将该值从实例复制到值类型变量中。有书上讲，拆箱只是获取引用对象中指向值类型部分的指针，而内容拷贝则是赋值语句之触发。

## short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 += 1;有什么错?

s1+1不能显式转换成short类型，可以修改为s1 =(short)(s1 + 1) 。short s1 = 1; s1 += 1正确

## DateTime.Parse(myString); 这行代码有什么问题？

有问题，当myString不能满足时间格式要求的时候，会引发异常，建议使用DateTime.TryParse()

## int?和int有什么区别?

- int？为可空类型，默认值可以是null
- int默认值是0
- int?是通过int装箱为引用类型实现