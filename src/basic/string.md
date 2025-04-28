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