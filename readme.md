若要访问此网站，请问访问网站下jsPlumbDraw文件下的index.html，并且将`index.html`文件中，layui的的`base路径改成绝对路径或者域名`，此网站为静态网站

- 运用的技术：HTML、jQuery、JavaScript（目前是纯静态资源）
- 框架：layui、jsplumb
- 学习layui网址：https://www.layui.com/ （官网）
- 学习jsplumb网址： https://jsplumbtoolkit.com// （官网）
                   https://www.cnblogs.com/leomYili/p/7145445.html （他人博客参考）
                   http://blog.51cto.com/luischen/2070573 （他人博客参考）
                   https://www.cnblogs.com/leomYili/p/6346526.html?utm_source=itdadao&  utm_medium=referral （他人博客参考）

目前处在开发中...

2019-2-14
1. 修改flow_design.css中jsplumb内置样式，_jsPlumb_connector（连接线的样式类）、_jsPlumb_endpoint（连接点的样式类）
2. 修改layui中的内置样式layui-icon-close-fill（layui-icon关闭图标的）
3. 更改shape（图形样式）按比例缩小到长和宽之比为2:1，且最小是100:50，并将shape的样式放置在shape.css文件中
4. index中删除了普通按钮的clone到容器的代码，如需参考在index的备份中有

2019-2-15
1. 对某一图形右键点击时触发`菜单`弹出
2. 更改拖动图形时的鼠标形状并增加`菜单`样式
3. 增加`菜单`··删除节点··功能

2019-2-16
1. 增加快捷键 `delete` 删除节点的功能
2. 增加 `菜单` 功能中编辑节点的名称（与双击节点文本时一样，能改变文本信息）
3. 禁用了拖动删除线的操作，增加双击删除线的操作
4. 增加在容器右键出现 `菜单` 功能（粘贴和剪贴板，操作逻辑未完成）
5. 完成 `复制节点` 的功能，但是右键点击 `复制节点` 时会在原来的节点进行复制和粘贴一个新的节点，与原来的节点重叠在一起

2019-2-17
1. 增加连接线时的判断，防止两个节点回环，如：1-2 变成 2-1
2. 修改 `菜单` 中复制和粘贴的逻辑，复制完模板后，用户可以在右键的位置上粘贴节点，并且只会复制剪贴板中的第一个
3. 增加 `菜单` 中剪贴板的功能，已完成弹出层，相关逻辑未完成

2019-2-18
1. 增加快捷键 `Ctrl+C` 和 `Ctrl+V` 的操作，复制粘贴高亮显示的节点到容器中，并且粘贴的节点时距离容器左上角的原点 [20, 20] 的距离
2. 可以打开剪贴板粘贴任意模板到容器中
3. 增加选择线的类型，YES、NO、回退/驳回、正常流程的线
