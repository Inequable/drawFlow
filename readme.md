若要访问此网站，请问访问网站下jsPlumbDraw文件下的index.html，并且将`index.html`文件中，layui的的`base路径改成绝对路径或者域名`，此网站为静态网站

目前处在开发中...

2019-2-14
1.修改flow_design.css中jsplumb内置样式，_jsPlumb_connector（连接线的样式类）、_jsPlumb_endpoint（连接点的样式类）
2.修改layui中的内置样式layui-icon-close-fill（layui-icon关闭图标的）
3.更改shape（图形样式）按比例缩小到长和宽之比为2:1，且最小是100:50，并将shape的样式放置在shape.css文件中
4.index中删除了普通按钮的clone到容器的代码，如需参考在index的备份中有