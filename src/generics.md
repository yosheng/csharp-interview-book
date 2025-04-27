# 泛型

## 泛型的主要约束和次要约束是什么？

当一个泛型参数没有任何约束时，它可以进行的操作和运算是非常有限的，因为不能对实参进行任何类型上的保证，这时候就需要用到泛型约束。

泛型的约束分为：主要约束和次要约束，它们都使实参必须满足一定的规范，C#编译器在编译的过程中可以根据约束来检查所有泛型类型的实参并确保其满足约束条件。

（1）主要约束

一个泛型参数至多拥有一个主要约束，主要约束可以是一个引用类型、class或者struct。如果指定一个引用类型（class），那么实参必须是该类型或者该类型的派生类型。相反，struct则规定了实参必须是一个值类型。下面的代码展示了泛型参数主要约束：

```csharp
public class ClassT1<T> where T : Exception
{
    private T myException;
    public ClassT1(T t)
    {
    	myException = t;
    }
    public override string ToString()
    {
        // 主要约束保证了myException拥有source成员
        return myException.Source;
    }
}

public class ClassT2<T> where T : class
{
    private T myT;
    public void Clear()
    {
        // T是引用类型，可以置null
        myT = null;
    }
}

public class ClassT3<T> where T : struct
{
    private T myT;
    public override string ToString()
    {
        // T是值类型，不会发生NullReferenceException异常
        return myT.ToString();
    }
}
```

(2)次要约束

次要约束主要是指实参实现的接口的限定。对于一个泛型，可以有0到无限的次要约束，次要约束规定了实参必须实现所有的次要约束中规定的接口。次要约束与主要约束的语法基本一致，区别仅在于提供的不是一个引用类型而是一个或多个接口。例如我们为上面代码中的ClassT3增加一个次要约束：

```csharp
public class ClassT3<T> where T : struct, IComparable
{
    ......
}
```

## 泛型的优点有哪些？

代码的可重用性。无需从基类型继承，无需重写成员。

扩展性好。

类型安全性提高。 泛型将类型安全的负担从你那里转移到编译器。 没有必要编写代码来测试正确的数据类型，因为它会在编译时强制执行。 降低了强制类型转换的必要性和运行时错误的可能性。

性能提高。泛型集合类型通常能更好地存储和操作值类型，因为无需对值类型进行装箱。

## 泛型有哪些常见的约束？

泛型约束 public void GetEntity() where T:class

where T :struct //约束T必须为值类型

where K : class //约束K必须为引用类型

where V : IComparable //约束V必须是实现了IComparable接口

where W : K //要求W必须是K类型，或者K类型的子类

where X :class ,new () // 或者写出 new class() ； X必须是引用类型，并且要有一个无参的构造函数（对于一个类型有多有约束，中间用逗号隔开）
