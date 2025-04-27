# WinForm

## 请编程遍历页面上所有TextBox控件并给它赋值为string.Empty？

```csharp
foreach (System.Windows.Forms.Control control in this.Controls)
{
    if (control is System.Windows.Forms.TextBox)
    {
    	System.Windows.Forms.TextBox tb = (System.Windows.Forms.TextBox)control ;
    	tb.Text = String.Empty ;
    }
}
```

## 在.net（C# or vb.net）中，Appplication.Exit 还是 Form.Close有什么不同？

一个是退出整个应用程序，一个是关闭其中一个form。

## 什么是Windows服务，它的生命周期与标准的EXE程序有什么不同？

Windows服务是运行在windows后台指定用户下（默认System）的应用程序，它没有标准的UI界面，想比标准的EXE程序，Windows服务是在服务开始的时候创建，而在服务结束的时候销毁，而且可以设置服务是否与操作系统一起启动，一起关闭。它支持三种方式：１）自动方式 2）手动方式 ３）禁用 。

自动方式的时候，windows服务将在OS启动后自动启动运行，而手动方式则必须手工启动服务，禁用的情况下服务将不能被启动。另外标准的EXE默认使用的当前登录的用户，而windows服务则默认使用System用户，这在对系统资源访问的时候特别需要注意。
