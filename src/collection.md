# 集合

## IList 接口与List的区别是什么?

IList 泛型接口是 Icollection 接口的子代，并且是所有非泛型列表的基接口。 Ilist 实现有三种类别：只读、固定大小、可变大小。 无法修改只读 Ilist。 固定大小的 Ilist 不允许添加或移除元素，但允许修改现有元素。 可变大小的 Ilist 允许添加、移除和修改元素。

IList 是个接口，定义了一些操作方法这些方法要你自己去实现，当你只想使用接口的方法时，这种方式比较好。他不获取实现这个接口的类的其他方法和字段，有效的节省空间。

List 是个类型 已经实现了IList 定义的那些方法。

```csharp
List List1 = new List ();
```

是想创建一个List，而且需要使用到List的功能，进行相关操作。

```csharp
IList IList1 = new List ();
```

而只是想创建一个基于接口IList的对象的实例，只是这个接口是由List实现的。所以它只是希望使用到IList接口规定的功能而已。

## 如何把一个array复制到arrayList里?

```csharp
foreach( object arr in array)
{
    arrayist.Add(arr);
}
```

## List, Set, Map是否继承自Collection接口?

List，Set是，Map不是

## Set里的元素是不能重复的，那么用什么方法来区分重复与否呢? 是用==还是equals()? 它们有何区别?

Set里的元素是不能重复的，那么用iterator()方法来区分重复与否。equals()是判读两个Set是否相等。

equals()和==方法决定引用值是否指向同一对像，equals()在类中被覆盖，为的是当两个分离的对象的内容和类型相配的话，返回真值。

## 有50万个int类型的数字，现在需要判断一下里面是否存在重复的数字，请你简要说一下思路。

1. 使用C#的List集合自带的去重方法，例如 Distinct()，GroupBy()等
2. 利用 Dictionary 的Key值唯一的特性，HashSet 元素值唯一的特性 进行判断

## 数组有没有length()这个方法? String有没有length()这个方法？

数组没有length()这个方法，有length的属性。String有有length()这个方法。

## 一个整数List中取出最大数（找最大值）。不能用Max方法。

```csharp
private static int GetMax(List<int> list)
{
    int max = list[0];
    for (int i = 0; i < list.Count; i++)
    {
        if (list[i]>max)
        {
            max = list[i];
        }
    }
    return max;
}
```

## 利用IEnumerable实现斐波那契数列生成?

```csharp
IEnumerable<int> GenerateFibonacci(int n)
{
    if (n >= 1) yield return 1;
    int a = 1, b = 0;
    for (int i = 2; i <= n; ++i)
    {
        int t = b;
        b = a;
        a += t;
        yield return a;
    }
}
```

## 请利用 foreach 和 ref 为一个数组中的每个元素加 1

注意 foreach 不能用 var ，也不能直接用 int ，需要 ref int ，注意 arr 要转换为 Span 。

```csharp
int[] arr = { 1, 2, 3, 4, 5};
Console.WriteLine(string.Join(",", arr)); // 1,2,3,4,5
foreach (ref int v in arr.AsSpan())
{
	v++;
}
Console.WriteLine(string.Join(",", arr)); // 2,3,4,5,6
```

## 能用foreach遍历访问的对象需要实现 接口或声明方法的类型

答：IEnumerable 、 GetEnumerator。

## 什么是IEnumerable？

IEnumerable及IEnumerable的泛型版本IEnumerable是一个接口，它只含有一个方法GetEnumerator。Enumerable这个静态类型含有很多扩展方法，其扩展的目标是IEnumerable。

实现了这个接口的类可以使用Foreach关键字进行迭代（迭代的意思是对于一个集合，可以逐一取出元素并遍历之）。实现这个接口必须实现方法GetEnumerator。

## IEnumerable的缺点有哪些？

IEnumerable功能有限，不能插入和删除。

访问IEnumerable只能通过迭代，不能使用索引器。迭代显然是非线程安全的，每次IEnumerable都会生成新的IEnumerator，从而形成多个互相不影响的迭代过程。

在迭代时，只能前进不能后退。新的迭代不会记得之前迭代后值的任何变化。

## 延迟执行 (Lazy Loading)是什么？

大部分LINQ语句是在最终结果的第一个元素被访问的时候（即在foreach中调用MoveNext方法）才真正开始运算的，这个特点称为延迟执行。一般来说，返回另外一个序列（通常为IEnumerable或IQueryable）的操作，使用延迟执行，而返回单一值的运算，使用立即执行。

IEnumerable是延迟执行的，当没有触发执行时，就不会进行任何运算。Select方法不会触发LINQ的执行。一些触发的方式是：foreach循环，ToList，ToArray，ToDictionary方法等

## LINQ可视化工具简单介绍一下？

LINQPad工具是一个很好的LINQ查询可视化工具。它由Threading in C#和C# in a Nutshell的作者Albahari编写，完全免费。它的下载地址是http://www.linqpad.net/

进入界面后，LINQPad可以连接到已经存在的数据库（不过就仅限微软的SQL Server系，如果要连接到其他类型的数据库则需要安装插件）。某种程度上可以代替SQL Management Studio，是使用SQL Management Studio作为数据库管理软件的码农的强力工具，可以用于调试和性能优化（通过改善编译后的SQL规模）。

LINQPad支持使用SQL或C#语句（点标记或查询表达式）进行查询。你也可以通过点击橙色圈内的各种不同格式，看到查询表达式的各种不同表达方式：

- Lambda：查询表达式的Lambda表达式版本，
- SQL：由编译器转化成的SQL，通常这是我们最关心的部分，
- IL：IL语言

## LINQ to Object和LINQ to SQL有何区别？

LINQ to SQL可以将查询表达式转换为SQL语句，然后在数据库中执行。相比LINQ to Object，则是将查询表达式直接转化为Enumerable的一系列方法，最终在C#内部执行。LINQ to Object的数据源总是实现IEnumerable（所以不如叫做LINQ to IEnumerable），相对的，LINQ to SQL的数据源总是实现IQueryable并使用Queryable的扩展方法。

将查询表达式转换为SQL语句并不保证一定可以成功。

## Collection和Collections的区别？

Collection 是集合类的上级接口，Collections 是针对集合类的一个帮助类，它提供一系列静态方法来实现对各种集合的搜索，排序，线程安全化操作。

## 能用foreach 遍历访问的对象的要求？

需要实现IEnumerable接口或声明GetEnumerator方法的类型。

## 说出五个集合类？

- List：泛型类；
- Stack：堆栈，后进先出的访问各个元素
- Dictionary<TKey, TValue>：字典类，key是区分大小写；value用于存储对应于key的值
- HashSet：此集合类中不能有重复的子元素
- SortedList<TKey, TValue>：排序列表，key是排好序的数组。

## HashMap和Hashtable区别？

在.Net 模仿 java 的过程中抛弃了 HashMap ，所以以后再去面试.Net的时候当别人问你 HashTable 和 HashMap 的区别的时候，请告诉他，C#.Net 中 没有HashMap，与其相似的是 Dictionary。

| 特性          | `Hashtable` (非泛型)        | `Dictionary<TKey, TValue>` (泛型)             |
| :------------ | :-------------------------- | :-------------------------------------------- |
| **命名空间**  | `System.Collections` (旧版) | `System.Collections.Generic` (现代)           |
| **基类/接口** | 实现 `IDictionary` 接口     | 实现 `IDictionary<TKey, TValue>` 泛型接口     |
| **类型安全**  | 存储 `object`，需装箱拆箱   | 泛型，无需类型转换                            |
| **线程安全**  | 是（方法级同步锁）          | 否（需手动同步或使用 `ConcurrentDictionary`） |
| **性能**      | 较低（因装箱拆箱）          | 更高（无装箱拆箱）                            |

单线程程序中推荐使用 Dictionary, 有泛型优势, 且读取速度较快, 容量利用更充分。多线程程序中推荐使用 Hashtable, 默认的 Hashtable 允许单线程写入, 多线程读取, 对 Hashtable 进一步调用 Synchronized() 方法可以获得完全线程安全的类型. 而 Dictionary 非线程安全, 必须人为使用 lock 语句进行保护, 效率大减。

## 简述一下 Dictionary泛型的实现，以及如何避免碰撞？

实现方式

1. 底层数据结构
  - 哈希桶（Buckets）数组：存储索引，指向条目（Entries）数组中的位置。
  - 条目（Entries）数组：存储实际的键值对，结构为 {hashCode, key, value, next}。
    - next 字段用于处理碰撞（链地址法）。

2. 关键机制
  - 哈希函数：对键调用 GetHashCode() 计算哈希值，再通过取模运算确定桶位置。
  - 扩容策略：当元素数量超过 容量 × 负载因子（默认 0.75）时，容量翻倍并重新哈希。

3. 操作复杂度
  - 插入/查找/删除：平均 O(1)（理想情况下），最坏 O(n)（全碰撞时）。

解决碰撞冲突

1. 链地址法（Separate Chaining）

   - 实现方式：
     每个哈希桶指向一个链表（实际用 `Entries` 数组 + `next` 索引模拟链表）。
     碰撞时，新条目被添加到链表头部（`next` 指向原桶中的条目）。

   - 示例：

     ```csharp
     // 假设哈希冲突：keyA 和 keyB 的哈希值均映射到桶 2
     entries[0] = {hashA, keyA, valueA, -1}  // 桶 2 指向索引 0
     entries[1] = {hashB, keyB, valueB, 0}   // next=0，链接到前一个条目
     ```

2. 优化措施

   - 快速模运算：用 `hashCode & (buckets.Length - 1)` 替代取模（要求容量为 2 的幂）。
   - 素数容量：初始容量为素数（如 3, 7, 11），减少哈希聚集（.NET Core 后改用 2 的幂容量）。
   - 自动扩容：减少碰撞概率。

## 数组、链表、哈希、队列、栈数据结构特点，各自优点和缺点？

**数组(Array)：**
优点：查询快，通过索引直接查找；有序添加，添加速度快，允许重复；
缺点：在中间部位添加、删除比较复杂，大小固定，只能存储一种类型的数据；
如果应用需要快速访问数据，很少插入和删除元素，就应该用数组。

**链表(LinkedList)：**
优点：有序添加、增删改速度快，对于链表数据结构，增加和删除只要修改元素中的指针就可以了；
缺点：查询慢，如果要访问链表中一个元素，就需要从第一个元素开始查找；
如果应用需要经常插入和删除元素，就应该用链表。

**栈(Stack)：**
优点：提供后进先出的存储方式，添加速度快，允许重复；
缺点：只能在一头操作数据，存取其他项很慢；

**队列(Queue)：**
优点：提供先进先出的存储方式，添加速度快，允许重复；
缺点：只能在一头添加，另一头获取，存取其他项很慢；

**哈希(Hash)：**
特点：散列表，不允许重复；
优点：如果关键字已知则存取速度极快；
缺点：如果不知道关键字则存取很慢，对存储空间使用不充分；
