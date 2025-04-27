# WPF

## WPF由哪两部分组成？

wpf 由两个主要部分 组成：引擎和编程框架。

1. 引擎。wpf引擎是基于窗体的应用程序 图形 视频 音频和文档提供了一个单一的运行时库。重要的是WPF基于矢量的呈现引擎使应用程序可以灵活地利用高DPI监视器，支持图形的硬件加速。
2. 框架。WPF框架为媒体 用户界面设计和文档提供大量的解决方案。wpf的设计考虑了可扩展性，使开发人员可以完全在WPF引擎的基础上创建自己的控件，也可以通过对现有WPF控件进行再分类来创建自己的控件。

## 什么是WPF？

WPF英文全称是Windows Presentation Foundation，中文为Windows表现层基础。是微软最初在.NET Framework3.5平台推出的一个图形平台。

## Silverlight 和 WPF的异同？

它们的运行方式是不同的：

1. silverlight是基于浏览器插件的，在浏览器中运行。
2. WPF可以编写Web程序或者桌面应用程序，可以直接编译为独立运行的exe文件。

实现功能是不同的：

1. WPF支持直接在XAML中绑定触发来触发动画，而silverlight就只能通过托管代码或者javascript来进行。
2. WPF直接支持3D效果和3D镜头变换，但是silverlight就不支持。

它们也有相似的地方：

silverlight 原名WPF/E 就是WPF Everywhere 是WPF的一个子集。因此它们在很多语法实现上非常类似。

## 如何理解WPF体系结构？

WPF使用多层架构，类似于三层结构，最顶层部分为托管代码API，此层用于为开发人员编写WPF应用程序提供较高层次的服务，基于C#托管代码编写。转换.NET代码到DirectX的工作由中间层milcore.dll实现。

中间层milcore是用非托管代码实现，因为它需要与DirectX紧密集成，对性能敏感，就是消耗的资源比较多，对性能影响较大。

## 在WPF中Binding的作用及实现语法？

典型的Binding具有四个重要组成部分：Binding目标对象（binding target object） 目标对象属性（target property） Binding数据源（binding source） Path(用于指明要从数据源中取得的值，就是我们通常写的属性名称）。

## 什么是XML扩展XAML?有何优点？

1. XAML是eXtensible Application Markup Language的英文缩写，相应于中文称为可扩展应用程序标记语言，它是微软公司为构建应用程序用户界面而创建的一种新的描述性语言。
2. XAML是XML语言的一个衍生物，它的语法与XML语言完全一致，它的功能就是专门用来设计和实现程序的UI。\
3. XAML一个很大的优点就是由于WPF支持WEB开发，那么WEB开发和桌面开发的转换是很简单，修改的地方很短，同时UI与逻辑完全分离，所以逻辑代码也几乎不用改动。

## 解释什么是依赖属性，它和以前的属性有什么不同？为什么在WPF会使用它？

Windows Presentation Foundation (WPF) 提供了一组服务，这些服务可用于扩展公共语言运行时 (CLR) 属性的功能，这些服务通常统称为 WPF 属性系统。由 WPF 属性系统支持的属性称为依赖项属性。

它和以往属性的不同之处有

- (1)依赖属性是一种特定类型的属性。这种属性的特殊之处在于，其属性值受到 Windows 运行时中专用属性系统的跟踪和影响。
- (2)依赖属性的用途是提供一种系统的方式，用来基于其他输入（在应用运行时其内部出现的其他属性、事件和状态）计算属性的值。
- (3)依赖属性代表或支持编程模型的某种特定功能，用于定义 Windows 运行时应用，这种模型使用 XAML 编写 UI，使用 C#、Microsoft Visual Basic 或 Visual C++ 组件扩展 (C++/CX) 编写代码。

一般的属性没有这么复杂。

WPF使用它是有不少优点的

- （1）优化了属性的存储，直接减少了不必要的内存使用。
- （2）有属性变化通知 限制 验证等。
- （3）可以储存多个值，配合Expression及Animation等，打造出更灵活的使用方法。

## WPF中什么是样式？

首先明白WPF中样式属于资源中重要的一种。

同时样式也是属性值的集合，能被应用到一个合适的元素中，或者说能将一组属性应用到多个元素。

WPF中样式可以设置任何依赖属性。

WPF中样式也支持触发器，通过属性的改变，触发一组活动，包括改变某个控件的样式。

WPF中元素只能使用一个样式。

样式有继承的特性，样式可以继承样式。

## WPF中什么是模板 ？

WPF中模板是用于定义或重定义控件结构，或者说对象的外观。

WPF中模板有两类，一个是控件模板（ControlTemplate) 另一个是数据模板（DataTemplate），它们都派生自FrameworkTemplate抽象类。

总共有三大模板 ControlTemplate，ItemsPanelTemplate，DataTemplate

1. ControlTemplate 主要用途是更改控件的外观。它有两个重要属性：VisualTree（视觉树）内容属性和Triggers触发器，对于触发器可以不用过多考虑，触发器可有可无。VisualTree就是呈现我们所画的控件。Triggers可以对我们的视觉树上的元素进行一些变化。
2. ItemsPanelTemplate 是个特殊的空间模板，主要用来标明多条目控件如何显示它所包含的多项数据。也可以说是指定用于项的额布局的面板。多用于多个内容控件的目标。多为Panel属性或者Panel结尾的属性。
3. DataTemplate 主要用于数据的呈现。也被称为显示绑定数据对象的模板。

## 绑定（Binding ）的基础用法

WPF 里分三种：Binding,PriorityBinding,MultiBinding,这三种Binding的基类都是BindingBase，而BindingBase又继承于MarkupExtension。

常见的使用Binding方法是：

1. 针对于继承于FrameworkElement控件。 SetBinding(DependencyProperty dp,String path),SetBinding(DependencyProperty dp,BindingBase binding),其中FrameworkElement中SetBinding只对DependencyProperty有效。

2. 另一种是 BindingOperations.SetBinding(currentFolder,TextBlock.TextProperty,binding);

   BindingOperations.SetBinding的原型是

   ```csharp
   public static BindingExpressionBase SetBinding(DependencyObject target,DependencyProperty dp,BindingBase binding)
   ```

3. 清除Binding:

   ```csharp
   BindingOperations.ClearBinding(currentFolder,TextBlock.TextProperty);
   //删除currentFolder上的TextBlock.TextProperty绑定
   BindingOperations.ClearAllBindings(currentFolder);//删除currentFolder上的所有绑定。
   ```

   直接对Dependency Property赋值也可以解除binding，不过只对单向binding有效。

## 解释这几个类的作用及关系: Visual, UIElement, FrameworkElement, Control 。

它们四个的关系：从System.Windows.Controls命名空间中看，依次的继承关系是：

- Visual继承UIElement
- UIElement继承FrameworkElement
- FrameworkElement继承Control。

1. Visual主要作用是为WPF提供2D呈现支持，主要包括输出显示，坐标转换，区域剪切等。
2. UIElement的主要作用是构建WPF元素和基本呈现特征的基类。例如其中定义很多与输入和焦点有关的特性，例如键盘事件，鼠标，还有一些与WPF事件模型有关的API。
3. FrameworkElement的主要作用是为定义的WPF元素添加一些功能。例如，布局定义 逻辑树 对象生命周期事件 支持数据绑定和动态资源引用 支持样式和动画。
4. Control的主要作用是为自定义应用程序控件提供基础。因为它是创建自定义应用程序控件的基类,作用就是可以重写Control类所提供的属性，方法，事件等，为自定义控件添加自定义逻辑。构建WPF应用程序页面的Window类也派生自它。

## 视觉树 VS 逻辑树?

逻辑树是视觉树的子集，也就是视觉树基本上是逻辑树的一种扩展。

WPF通过逻辑树来解决依赖项属性继承和资源的问题，使用视觉树来处理渲染，事件路由，资源定位等问题。

逻辑树可以认为是XAML所见的，而视觉树包含了XAML元素内部的结构。

逻辑树的查找可以通过LogicalTreeHelper辅助类，视觉树的查找可以通过VisualTreeHelper辅助类，其中需要注意的是对ContentElement元素的查找，无法直接通过VisualTreeHelper进行查找，ContentElement元素并不继承Visual，而ContentElement元素的使用时需要一个ContentElement载体FrameworkContentElement。

六 属性变更通知(INotifyPropertyChanged 和 ObservableCollection)

1. INotifyPropertyChanged向客户端发出某一属性值更改的通知。
2. ObservableCollection类，它是实现 INotifyCollectionChanged 接口的数据集合的内置实现。表示一个动态数据集合，在添加项、移除项或刷新整个列表时，此集合将提供通知

## 解释一下ResourceDictionary ？

提供包含元素和 WPF 应用程序的其他元素使用的 WPF 资源的一个哈希表/字典实现。

有利于项目中资源共享

## 路由事件的哪三种方式/策略（冒泡 直接 隧道）？

WPF中的路由事件是沿着VisualTree传递的，作用是用来调用应用程序的元素树上的各种监听器上的处理程序。

- （1）冒泡，这种事件处理方式是从源元素向上级流过去，直到到达根节点即顶层节点，一般为最外层的控件。
- （2）直接，这种处理方式是在源上处理，主要用在源元素上处理。通常setter和trigger中有所体现，我个人认为VisualState可视状态可能也是直接事件处理，也是依赖属性的状态改变。和Trigger有一定的重复，但是VisualState是通过生硬的动画间接实现依赖属性的改变。
- （3）隧道，又称作Preview事件，和冒泡事件处理方式相反的。元素树的根位置调用事件处理程序，依次向下直到源元素位置。

隧道事件和冒泡事件一般成对出现。同一事件，执行时首先是隧道事件，然后是冒泡事件。

## 解释Routed Events(路由事件) 与 Commands(命令)？

Event 和 Command 是程序内部通信基础，Routed Events 能够发起多重控件，并且能有序和用户沟通。

Commands是.NET Framework 提供的核心构架，来激活和去除高级别任务。

由此衍生的Animation是events的更进一步。让你能够以友好互动的方式使用Event架构，来使用多重控件。

## 模板

WPF模板有三种：ControlTemplate、DataTemplate、ItemsPanelTemplate，

它们都继承自FrameworkTemplate抽象类。在这个抽象类中有一个FrameworkElementFactory类型的VisualTree变量，通过该变量可以设置或者获取模板的根节点，包含了你想要的外观元素树。

- （1） 控件模板。控件模板可以将自定义模板应用到某一特定类型的所有控件，或是控件的某一实例。决定控件外观的是ControlTemplate，它决定了控件“长成什么样子”，因此控件模板由ControlTemplate类表示。控件模板实际在资源集合或资源字典中定义。例子详见：通过设计ControlTemplate，制作圆角文本框与圆角按钮（http://www.cnblogs.com/zhouhb/p/3284780.html）。
- （2） 数据模板。在WPF中，决定数据外观的是DataTemplate，即DataTemplate是数据内容的表现形式，一条数据显示成什么样子，是简单的文本还是直观的图形，就是由DataTemplate决定的。例子详见：DataTemplate应用（http://www.cnblogs.com/zhouhb/p/3284827.html）。
- （3）ItemsPanelTemplate模板。ItemsPanelTemplate 指定用于项的布局的面板。如下面的例子通过设置ListBox的ItemsPanelTemplate，使得每一项从左至右按顺序显示。

1. ControlTemplate
   ControlTemplate:控件模板主要有两个重要属性：VisualTree内容属性和Triggers触发器。所谓VisualTree(视觉树),就是呈现我们所画的控件。Triggers可以对我们的视觉树上的元素进行一些变化。一般用于单内容控件。

2. ItemsPanelTemplate
   ItemsPanelTemplate在MSDN的解释是：ItemsPanelTemplate 指定用于项的布局的面板。 GroupStyle 具有一个类型为 ItemsPanelTemplate 的 Panel 属性。 ItemsControl 类型具有一个类型为ItemsPanelTemplate 的 ItemsPanel 属性。

   我们先讲ItemTemplate。它一般用在多个内容控件的模板。比如ListBox。

3. DataTemplate 和 HierarchicalDataTemplate
   DataTemplate就是显示绑定数据对象的模板。

   WPF中的数据模板(DataTemplate) 在WPF中我们可以为自己的数据定制显示方式，也就是说虽然某数据数据是一定 的，但我们可以做到让它的表现方式多种多样

   HierarchicalDataTemplate继承于DataTemplate，它专门对TreeViewItem 或 MenuItem的一些数据对象的绑定。

## 触发器

WPF中的触发器，是对WPF事件的一种封装，WPF中的触发器，有多种方式，总结起来可分为：

- 控件触发（FrameworkElement.Triggers集合）
- 样式触发（Styles.Triggers集合）
- 控件模板触发（ControlTemplate.Triggers集合）
- 数据模板触发（DataTemplate.Triggers集合）

触发器种类

- System.Windows.DataTrigger 数据触发器
- System.Windows.EventTrigger 事件触发器
- System.Windows.MultiDataTrigger 多数据触发器
- System.Windows.MultiTrigger 多属性触发器
- System.Windows. Trigger 属性触发器

1. 属性触发器 Trigger

   顾名思义，属性触发器是由属性的改变而引起的，所以属性触发器有几个关键属性：

   Property：获取或设置返回的值进行比较的属性 Value 触发器的属性。 比较是引用相等性检查。（只有依赖属性才有用）

   Value：获取或设置要与该元素的属性值进行比较的值。 比较是引用相等性检查

   Setter：获取一套 Setter 对象，描述要应用当满足指定的条件的属性值。

   Setter： 属性是一个SetterBaseCollection 的集合。

   **Setter类：**
   Property：获取或设置的属性与其 Value 将应用。（只有依赖属性才有用）

   Value：获取或设置要应用于指定此属性的值 Setter。

   以下代码，指定了属性触发器的使用，由于属性触发一般应用与样式定义中。

   ```csharp
   <Button Content="触发器" x:Name="btn1" Click="Button_Click" >
   <Button.Style>
   <Style>
   <Setter Property="Button.Width" Value="80"></Setter>
   <Setter Property="Button.Height" Value="100"></Setter>
   <Style.Triggers>
   <Trigger Property="Button.IsMouseOver" Value="true">
   <Trigger.Setters>
   <Setter Property="Button.Width" Value="200"></Setter>
   </Trigger.Setters>
   </Trigger>
   </Style.Triggers>
   </Style>
   </Button.Style>
   </Button> 
   ```

2. 多属性触发器MultiTrigger

   多属性触发器，是之一个或者多个样式发生变化时候，才会触发的触发器，其有一个重要属性Condition，用于统计条件，MultiTrigger.Conditions是一个Condition的集合，做一个简单案例，就能说明：

   ```csharp
    <Style>
         <Setter Property="Button.Width" Value="80"></Setter>
         <Setter Property="Button.Height" Value="100"></Setter>
         <Style.Triggers>
                 <MultiTrigger>
                  <MultiTrigger.Conditions>
                           <Condition Property="Control.IsFocused" Value="true"></Condition>
                           <Condition Property="Control.IsMouseOver" Value="true"></Condition>
                      </MultiTrigger.Conditions>
                  <Setter Property="Button.Width" Value="300"></Setter>
                 </MultiTrigger>
          </Style.Triggers>
    </Style>
   ```

3. 事件触发器EventTrigger

   事件触发器，是由控件的操作触发的信息，EventTrigger 属性里面，几个关键属性是：

   RoutedEvent：获取或设置将激活该触发器的 RoutedEvent。

   Actions：获取事件发生时要应用的操作的集合。

   主要用于指定路由事件和Actions,那么Actions是什么呢？其定义如下：

   ```csharp
   public TriggerActionCollection Actions { get; } 
   ```

   它是一个TriggerAction的集合

   **System.Windows.Interactivity.TriggerAction**

   [Microsoft.Expression.Interactivity.Core.CallMethodAction](https://msdn.microsoft.com/zh-cn/library/microsoft.expression.interactivity.core.callmethodaction(v=expression.40).aspx)

   [Microsoft.Expression.Interactivity.Media.PlaySoundAction](https://msdn.microsoft.com/zh-cn/library/microsoft.expression.interactivity.media.playsoundaction(v=expression.40).aspx)

   [Microsoft.Expression.Interactivity.Media.StoryboardAction](https://msdn.microsoft.com/zh-cn/library/microsoft.expression.interactivity.media.storyboardaction(v=expression.40).aspx)

   [System.Windows.Interactivity.InvokeCommandAction](https://msdn.microsoft.com/zh-cn/library/system.windows.interactivity.invokecommandaction(v=expression.40).aspx)

   所以事件触发器，只能调用CallMethodAction，PlaySoundAction，StoryboardAction，InvokeCommandAction，所以事件触发器一般应用与动画中，我们以StoryboardAction为例，我们知道StoryboardAction是Storyboard的一个封装，其主要是封装了动作BeginStoryboard，该动作相当于调用BeginAnimation方法，我们案例如下：

   ```csharp
      <Button Content="触发器"   x:Name="btn1"    Click="Button_Click" >
               <Button.Style>
                   <Style>
                       <Setter Property="Button.Width" Value="80"></Setter>
                       <Setter Property="Button.Height" Value="80"></Setter>
                       <Style.Triggers>
                           <Trigger Property="Button.IsMouseOver" Value="true">
                               <Trigger.Setters>
                                   <Setter Property="Button.Width" Value="300"></Setter>
                               </Trigger.Setters>
                           </Trigger>
                       </Style.Triggers>
                   </Style>
               </Button.Style>
           </Button>
   ```

4. 数据触发DataTrigger

   数据触发器，是使用在数据改变的触发，DataTrigger也有两个重要的属性

   Binding：获取或设置产生数据对象的属性值的绑定。

   Value：获取或设置要与此数据对象的属性值进行比较的值。

   案例代码如下：

   ```csharp
   <Style>
        <Style.Triggers>
           <DataTrigger Binding="{Binding RelativeSource={RelativeSource Self},Path=Text}" Value="8">
               <Setter Property="Button.Foreground" Value="Sienna"></Setter>
               <Setter Property="Button.FontWeight" Value="Bold"></Setter>
               <Setter Property="Button.FontSize" Value="30"></Setter>
            </DataTrigger>
        </Style.Triggers>
   </Style>
   ```

5. 多数据触发器MultiDataTrigger

   多数据触发器，是对数据触发器的扩展，需要同时满足多个数据改变的情况下才执行。

   我们对5种触发器，在4个触发环境中，我进行了简单的分类，虽然有些触发器在有的触发方式中可以使用，但并不代表一定有作用，这个在使用中根据情况进行区分，分类如下：

   | 触发方式     | 可使用的触发器                                             | 说明                     |
   | ------------ | ---------------------------------------------------------- | ------------------------ |
   | 控件触发     | 必须使用EventTrigger                                       | 用于调整界面，实现动画等 |
   | 样式触发     | TriggerEventTriggerMultiTriggerDataTriggerMultiDataTrigger | 可使用所有触发器         |
   | 控件模板触发 | TriggerEventTriggerMultiTriggerDataTriggerMultiDataTrigger | 可使用所有触发器         |
   | 数据模板触发 | TriggerEventTriggerMultiTriggerDataTriggerMultiDataTrigger | 可使用所有触发器         |
