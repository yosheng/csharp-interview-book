// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="basic/basic.html"><strong aria-hidden="true">1.</strong> 基础语法</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="basic/keyword.html"><strong aria-hidden="true">1.1.</strong> 关键字</a></li><li class="chapter-item expanded "><a href="basic/string.html"><strong aria-hidden="true">1.2.</strong> 字符串</a></li><li class="chapter-item expanded "><a href="basic/datatype.html"><strong aria-hidden="true">1.3.</strong> 数据类型</a></li></ol></li><li class="chapter-item expanded "><a href="object-oriented/object-oriented.html"><strong aria-hidden="true">2.</strong> 面向对象</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="object-oriented/constructor.html"><strong aria-hidden="true">2.1.</strong> 构造函数</a></li><li class="chapter-item expanded "><a href="object-oriented/design-pattern.html"><strong aria-hidden="true">2.2.</strong> 设计模式</a></li></ol></li><li class="chapter-item expanded "><a href="collection.html"><strong aria-hidden="true">3.</strong> 集合</a></li><li class="chapter-item expanded "><a href="generics.html"><strong aria-hidden="true">4.</strong> 泛型</a></li><li class="chapter-item expanded "><a href="exception.html"><strong aria-hidden="true">5.</strong> 异常</a></li><li class="chapter-item expanded "><a href="memory.html"><strong aria-hidden="true">6.</strong> 内存管理</a></li><li class="chapter-item expanded "><a href="delegate.html"><strong aria-hidden="true">7.</strong> 委托与事件</a></li><li class="chapter-item expanded "><a href="web-communication.html"><strong aria-hidden="true">8.</strong> 网路与通信</a></li><li class="chapter-item expanded "><a href="orm/orm.html"><strong aria-hidden="true">9.</strong> 对象关系映射</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="orm/ef.html"><strong aria-hidden="true">9.1.</strong> Entity Framework</a></li><li class="chapter-item expanded "><a href="orm/ado.html"><strong aria-hidden="true">9.2.</strong> ADO.NET</a></li></ol></li><li class="chapter-item expanded "><a href="thread/thread-async.html"><strong aria-hidden="true">10.</strong> 多线程与异步</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="thread/task-async.html"><strong aria-hidden="true">10.1.</strong> Task与异步</a></li><li class="chapter-item expanded "><a href="thread/task-parallel.html"><strong aria-hidden="true">10.2.</strong> Task与并行</a></li></ol></li><li class="chapter-item expanded "><a href="reflection.html"><strong aria-hidden="true">11.</strong> 反射</a></li><li class="chapter-item expanded "><a href="dotnet/dotnet.html"><strong aria-hidden="true">12.</strong> .NET</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="dotnet/webform.html"><strong aria-hidden="true">12.1.</strong> WebForm</a></li><li class="chapter-item expanded "><a href="dotnet/mvc.html"><strong aria-hidden="true">12.2.</strong> ASP.NET MVC</a></li><li class="chapter-item expanded "><a href="dotnet/dotnet-core.html"><strong aria-hidden="true">12.3.</strong> ASP.NET CORE</a></li></ol></li><li class="chapter-item expanded "><a href="wpf.html"><strong aria-hidden="true">13.</strong> WPF</a></li><li class="chapter-item expanded "><a href="winform.html"><strong aria-hidden="true">14.</strong> WinForm</a></li><li class="chapter-item expanded "><a href="algorithm.html"><strong aria-hidden="true">15.</strong> 常见的算法</a></li><li class="chapter-item expanded "><a href="database/database.html"><strong aria-hidden="true">16.</strong> 数据库</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="database/redis.html"><strong aria-hidden="true">16.1.</strong> Redis</a></li><li class="chapter-item expanded "><a href="database/database-search.html"><strong aria-hidden="true">16.2.</strong> 数据库查询</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
