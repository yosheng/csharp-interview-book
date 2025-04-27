# 常见的算法

## 求质数

质数也成为素数，质数就是这个数除了1和他本身两个因数以外，没有其他因数的数，叫做质数，和他相反的是合数，就是除了1和他本身两个因数以外，还友其他因数的数叫做合数。

```csharp
//以下为函数部分
static void cal(long x)
{
    long sum = 1;
    byte row = 1;
    Console.Write("\n");
    for (long a = 3; a < x + 1; a++)
    {
        bool flag = true;
        for (long b = 2; b < (a / 2) + 1; b++)
        {
            if (a % b != 0) continue;
            flag = false;
            break;
    	}
    	if (flag)
        {
            if (row == 10) { Console.WriteLine(); row = 0; }
            if (sum == 1) Console.Write("{0,7}", 2);
            Console.Write("{0,7}", a);
            sum++; row++;
        }
    }
    Console.WriteLine("\n\n{0} 以内共有 {1} 个质数\n", x, sum);
}
```

## 有一列数1，1，2，3，5，........求第30个数.

```csharp
public static int Foo(int i)
{
    if (i <= 0)
    	return 0;
    else if (i > 0 && i <= 2)
    	return 1;
    else
    	return Foo(i - 1) + Foo(i - 2);
}
```

## 冒泡排序

```csharp
//冒泡排序类
public class sorter
{
    public void Sort(int[] list)
    {
        int i, j, temp;
        bool done = false;
        j = 1;
        while ((j < list.Length) && (!done))
        {
        	done = true;
        	for (i = 0; i < list.Length - j; i++)
        	{
        		if (list[i] > list[i + 1])
        		{
                    done = false;
                    temp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp;
                }
            }
        	j++;
        }
    }
}
```

## 请编写一个函数，能够计算10以内数的阶乘，尽量采用递归算法。（10!=3628800）。

```csharp
public int jiecheng(int n)
{
    if (n == 1)
    	return 1;
    else if (n == 2)
    	return 2;
    else
    	return n * jiecheng(n - 1);
}
```

## 请编程实现此方法。将输入的整型数组，合并转换为逗号分隔的字符串。

例如输入参数为整型数组{9，7，2}，那么输出结果为字符串"9,7,2"。

```csharp
private static string Combine(int[] data)
{
    string str = "";
    foreach (int s in data)
    {
    	str += s.ToString() + ",";
    }
    return str;
}
```

## 产生一个int数组，长度为100，并向其中随机插入1-100，并且不能重复。

```csharp
//产生一个int数组，长度为100，并向其中随机插入1-100，并且不能重复。
int[] arr = new int[100];
ArrayList myList = new ArrayList();
Random rad = new Random();
while (myList.Count < 100)
{
    int num = rad.Next(1, 101);
    if (!myList.Contains(num))
    {
    	myList.Add(num);
    }
}
for (int i = 0; i < 100; i++)
{
	arr[i] = (int)myList[i];
}
for (int i = 0; i < arr.Length; i++)
{
	Console.Write(arr[i] + ",");
}
Console.ReadKey();
```

## 请将字符串"I am a student"按单词逆序输出 如"student a am I"

```csharp
string S = "I am a student";
char[] C = new char[] { ' '};
string[] n =S.Split(C);
int length = S.Length;
for (int i =length-1 ; i >=0; i--)
{
    Console.Write(n[i]);
    if (i != 0)
    {
    	Console.Write(" ");
    }
}
```

## C# 取两个数组的相同元素

摘要: 以往我们都是肯定绞尽脑汁，肯定什么循环，元素大小，什么因素都考虑进去。但是现在采用Linq可以很好的解决这个问题。找出两个或多个数组的相同项。代码如下：

```csharp
string[] names = {"Adams","Arthur","Buchanan","Tsbuchis","ShCian","FuchsiaLinda","DecheChen","Lotheer","FindLanciCade","SorchLand","JiangZheng","MisiiLoda","Gtod","Dfac","Lama","BakCades","Losangle","ZheWQ","GehengDahaLothi","ToryLandey","DakaLothy","BthLanda","MenNorth","Fith","FoxMain","DontM","Saobba","Del","Sala","Ghero","BhthLaPhda"};
IEnumerable<string> skip = names.Skip(10);
IEnumerable<string> take = names.Take(11);
//取出两个序列中交集部分，按理论应该输出JiangZheng
IEnumerable<string> intersect = skip.Intersect(take);
foreach(varsinintersect)
{
	Console.WriteLine(s);
}
Console.ReadKey();
```

## 有一个字符串 "I am a good man",设计一个函数,返回 "man good a am I"。

```csharp
static string Reverse()
{
    string s = "I am a good man";
    string[] arr = s.Split(' ');
    string res = "";
    for (int i = arr.Length - 1; i >= 0; i--)
    {
        res += arr[i];
        if (i > 0)
        res += " ";
    }
    return res;
}
```

## 有1、2、3、4个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？

```csharp
//有1、2、3、4个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？
//分解题目
//条件：四个数字1、2、3、4 ；三位数：百位、十位、个位
//要求：互不相同；无重复数字：每个数字在三位中只出现一次
//结果：多少个？ 都是多少？
int count = 0; //统计个数
for (int bw = 1; bw <= 4; bw++)
{
    for (int sw = 1; sw <= 4; sw++)
    {
		if (sw!= bw) //很显然，只有百位和十位不同的情况下才能谈个位。
		{
			for (int gw = 1; gw <= 4; gw++)
			{
				if (gw != sw && gw != bw) //百位用过的，十位就不能用；百位和十位都用过的，个位就不能用
				{
					count++;
					Console.WriteLine("{0}{1}{2}", bw, sw, gw);
				}
			}
		}
	}
}
Console.WriteLine("一共有{0}个", count);
Console.Read();
```

## 产生一个int数组，长度为100，并向其中随机插入1-100，并且不能重复。

```csharp
int[] intArr=new int[100];
ArrayList myList=new ArrayList();
Random rnd=new Random();
while(myList.Count<100)
{
    int num=rnd.Next(1,101);
    if(!myList.Contains(num))
    myList.Add(num);
}
for(int i=0;i<100;i++)
intArr[i]=(int)myList[i];
```

## 用C#写一段选择排序算法，要求用自己的编程风格。

```csharp
public void xuanZhe(int[] list) //选择排序
{
    for (int i = 0; i < list.Length – 1; i++)
    {
    	min = i;
    	for (int j = i + 1; j < list.Length; j++)
    	{
    		if (list[j] < list[min])
    		min = j;
    	}
    	int t = list[min];
        list[min] = list[i];
        list[i] = t;
    }
}
```

## 有一个10个数的数组，计算其中不重复数字的个数。{3,5,9,8,10,5,3},用HashSet。

```csharp
int[] values = { 3, 5, 9, 8, 10, 5, 3 };
HashSet<int> set = new HashSet<int>();
foreach (int i in values)
{
	set.Add(i);
}
foreach (int i in set)
{
	Console.WriteLine(i);
}
```

## Ａ、Ｂ、Ｃ、Ｄ、Ｅ五名学生有可能参加计算机竞赛，根据下列条件判断哪些人参加了竞赛：

- （１）Ａ参加时，Ｂ也参加；
- （２）Ｂ和Ｃ只有一个人参加；
- （３）Ｃ和Ｄ或者都参加，或者都不参加；
- （４）Ｄ和Ｅ中至少有一个人参加；
- （５）如果Ｅ参加，那么Ａ和Ｄ也都参加。

```csharp
char[] name={'A','B','C','D','E'};
int[] value = new int[5];
for (value[0]=0;value[0]<2;value [0]++)
for (value[1]=0; value[1] < 2; value[1]++)
for (value[2]=0; value[2] < 2; value[2]++)
for (value[3]=0; value[3] < 2; value[3]++)
for (value[4]=0; value[4] < 2; value[4]++)
{
    if ((value[1] >= value[0]) && (value[1] + value[2] == 1) && (value[2] =
        = value[3]) && (value[3] + value[4]==1) && (value[4]==0 || value[4]==1 &&
        value[0]==1 && value[3]==1))
    {
        for (int i = 0; i < 5; i++)
        {
            if (value[i]==1)
            {
                Console.WriteLine("{0}参加", name[i]);
            }
            else
            {
                Console.WriteLine("{0}不参加", name[i]);
            }
        }
    }
}
```

## 程序设计: 猫大叫一声，所有的老鼠都开始逃跑，主人被惊醒。

```csharp
public delegate void SubEventHandler();
public abstract class Subject
{
    public event SubEventHandler SubEvent;
    protected void FireAway()
    {
        if (this.SubEvent != null)
            this.SubEvent();
    }
}
public class Cat : Subject
{
    public void Cry()
    {
        Console.WriteLine(cat cryed.);
        this.FireAway();
    }
}
public abstract class Observer
{
    public Observer(Subject sub)
    {
        sub.SubEvent += new SubEventHandler(Response);
    }
    public abstract void Response();
}
public class Mouse : Observer
{
    private string name;
    public Mouse(string name, Subject sub) : base(sub)
    {
        this.name = name;
    }
    public override void Response()
    {
        Console.WriteLine(name + attempt to escape!);
    }
}
public class Master : Observer
{
    public Master(Subject sub) : base(sub){}
    public override void Response()
    {
        Console.WriteLine(host waken);
    }
}
class Class1
{
    static void Main(string[] args)
    {
        Cat cat = new Cat();
        Mouse mouse1 = new Mouse(mouse1, cat);
        Mouse mouse2 = new Mouse(mouse2, cat);
        Master master = new Master(cat);
        cat.Cry();
    }
}
```

## 写一个冒泡排序

```csharp
public class bubblesorter
{
    public void sort(int[] list)
    {
        int i, j, temp;
        bool done = false;
        j = 1;
        while ((j < list.Length) && (!done))
        {
            done = true;
            for (i = 0; i < list.Length - j; i++)
            {
                if (list[i] > list[i + 1])
                {
                    done = false;
                    temp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp;
                }
            }
            j++;
        }
    }
}
```

## 写一个选择排序

```csharp
public class selectionsorter
{
    private int min;

    public void sort(int[] list)
    {
        for (int i = 0; i < list.Length - 1; i++)
        {
            min = i;
            for (int j = i + 1; j < list.Length; j++)
            {
                if (list[j] < list[min])
                    min = j;
            }

            int t = list[min];
            list[min] = list[i];
            list[i] = t;
        }
    }
}
```

## 一列数的规则如下: 1、1、2、3、5、8、13、21、34...... 求第30位数是多少，用递归算法实现。

```csharp
public class MainClass
{
    public static void Main()
    {
        Console.WriteLine(Foo(30));
    }
    public static int Foo(int i)
    {
        if (i <= 0)
            return 0;
        else if(i > 0 && i <= 2)
            return 1;
        else return Foo(i -1) + Foo(i - 2);
    }
}
```

