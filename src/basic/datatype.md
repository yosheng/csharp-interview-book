# 数据类型

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

## short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 += 1;有什么错?

s1+1不能显式转换成short类型，可以修改为s1 =(short)(s1 + 1) 。short s1 = 1; s1 += 1正确

## DateTime.Parse(myString); 这行代码有什么问题？

有问题，当myString不能满足时间格式要求的时候，会引发异常，建议使用DateTime.TryParse()

## int?和int有什么区别?

- int？为可空类型，默认值可以是null
- int默认值是0
- int?是通过int装箱为引用类型实现