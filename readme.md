若要访问此网站，请问访问网站下jsPlumbDraw文件下的index.html，并且将`index.html`文件中，layui的的`base路径改成绝对路径或者域名`，此网站为静态网站

网站体验网址: [✈️ 流程图绘制](https://inequable.github.io/drawFlow/jsPlumbDraw/)

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

2019-2-19
1. 增加容器右键 `菜单` 中 `编辑节点信息` 的功能
2. 增加线的连接类型（正常流程逻辑线（与签）、正常流程逻辑线（或签）、判断流程逻辑线（YES）、判断流程逻辑线（NO）、回退/驳回线）
3. 设计数据库表单
```
CREATE TABLE `workflow_step` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT入与最后一次更新的时间',
  `flowId` int(11) NOT NULL DEFAULT '0' COMMENT '流程id',
  `listorder` tinyint(3) NOT NULL DEFAULT '0' COMMENT '整个流程第一步，为1，其余为0',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '步骤名称',
  `shape` varchar(50) NOT NULL DEFAULT '' COMMENT '图形名称',
  `top` int(11) NOT NULL DEFAULT '0' COMMENT '定位的top',
  `left` int(11) NOT NULL DEFAULT '0' COMMENT '定位的left',
  `operatorType` tinyint(3) NOT NULL DEFAULT '0' COMMENT '操作类型 1->部门 2->人员',
  `operator` text NOT NULL COMMENT '操作人，一般是以id和逗号分隔',
  `mark` text COMMENT '备注',
  `timeout` tinyint(3) NOT NULL DEFAULT '0' COMMENT '操作超时时间 0 无限 单位 时',
  `itemJson` text COMMENT '步骤表单组合JSON',
  `status` tinyint(3) NOT NULL DEFAULT '0' COMMENT '状态 -1 删除 0 禁用 1 启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='步骤表';
```

```
CREATE TABLE `workflow_flow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '流程名称',
  `type` varchar(100) NOT NULL DEFAULT '' COMMENT '流程类型',
  `mark` text COMMENT '流程备注信息',
  `status` tinyint(3) NOT NULL DEFAULT '0' COMMENT '状态 -1 删除 1启用 0禁用 2预存/未发布',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程';
```

```
CREATE TABLE `workflow_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程类型存储表';
```

```
CREATE TABLE `workflow_list_step_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flowId` int(11) NOT NULL DEFAULT '0' COMMENT '流程ID',
  `parentStep` int(11) NOT NULL DEFAULT '0' COMMENT '上级步骤ID',
  `childStep` int(11) NOT NULL DEFAULT '0' COMMENT '子级步骤ID',
  `relationType` tinyint(3) DEFAULT '1' COMMENT '关联关系 1分发 2判断 3驳回/回退',
  `relationFlag` tinyint(3) DEFAULT '0' COMMENT '判断条件 1通过 -1 不通过',
  `relationAndOr` tinyint(3) DEFAULT '0' COMMENT '分发条件 1 或  2 与',
  `defaultBack` tinyint(3) NOT NULL DEFAULT '1' COMMENT '自动生成回退到上一步的标识，0：需要设置默认回退但不划线，1是需要划线',
  `status` tinyint(3) DEFAULT '1' COMMENT '1 有效 -1 无效',
  PRIMARY KEY (`id`),
  KEY `flowId` (`flowId`,`parentStep`,`childStep`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程步骤关系表';

```

```
CREATE TABLE `workflow_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `demandId` int(11) NOT NULL COMMENT '需求ID',
  `stepId` int(11) NOT NULL COMMENT '步骤ID',
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  `actionContentJson` text COMMENT '内容',
  `actionType` int(5) DEFAULT '0' COMMENT '类型 1领取 2指派 3驳回 4完成 5备注 6派发',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `demandId` (`demandId`),
  KEY `stepId` (`stepId`),
  KEY `userId` (`userId`,`actionType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程操作表';
```

```
CREATE TABLE `workflow_demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(250) NOT NULL,
  `userId` int(11) NOT NULL COMMENT '发起人',
  `flowId` int(11) NOT NULL,
  `level` tinyint(2) DEFAULT '0' COMMENT '0 无优先级 1不重要 2次要 3 普通 4紧急 5 非常紧急',
  `status` tinyint(2) DEFAULT '1' COMMENT '1 启用 0未启用 -1 删除',
  `startTime` datetime DEFAULT NULL COMMENT '计划开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '计划结束时间',
  PRIMARY KEY (`id`),
  KEY `flowID` (`flowId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='发布需求表';
```

```
CREATE TABLE `workflow_demand_step_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `demandId` int(11) NOT NULL,
  `flowId` int(11) NOT NULL,
  `stepId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '-1 删除 ',
  `type` int(5) DEFAULT '0' COMMENT '0 参与者 1 领取 -1 无效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='需求用户操作的步骤';
```

2019-2-20
1. 修改顶栏 `菜单` 的 `保存` 功能，将节点信息和线的逻辑信息分成两个数组保存起来
2. 修改了一下圆角矩形的圆角弧度从20px改成15px
3. 增加容器右键 `菜单` 中 `连线类别` 已完成
4. 增加程序在点击保存时，自动辨别第一步是哪个步骤，如果出现环路的情况，程序会让用户自己选择哪一步是第一步的步骤
5. _jsPlumb_connector这个类名中的z-index会影响到hover到某条线的显示情况

往后开发需要注意的是：
1. 删除的线需要做记录
2. 删除的节点需要做记录
3. 数据回显作图时，要区别新的节点和线
4. 需要做一些数据缓存，可以有些页面跳转需要用localStrong
（全完成）

2019-2-21
1. 增加一些提示性文本，如：复制（提示：节点已复制）
2. 调整一下代码的位置
3. 数据回显作图完成
4. 将连线后线数据信息放置在 parameters 参数中，可以方便取用，以及判断
5. 删除的线和节点都记录下来了

注意:
1. 前端静态数据回显绘图没问题，后台数据回显绘图有问题，报：Uncaught TypeError: Cannot read property 'add' of undefined

2019-2-22
1. 减少重新绘图时，出现代码报错的几率（主要会报错还是出现在后端数据回显时，线无法正常重绘）
2. 修改判断是回显的绘图数据还是重新手工添加的数据，如果是空对象（ $.isEmptyObject(conn.getParameters()) ），那么需要重新设置Parameters（ conn.setParameters({ }) ）进去，连线后的逻辑

2019-2-25
1. 新增一个表单编辑器（还未完成）
