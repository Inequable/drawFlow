layui.define(function(exp) {
    // 设置jsplumb默认配置项，分为全局默认参数和连线默认参数，
    // 参考文档：https://www.cnblogs.com/leomYili/p/6346526.html?utm_source=itdadao&utm_medium=referral
    //  Anchor : "BottomCenter", // 端点的定位点的位置声明（锚点）：left，top，bottom等
    //  Anchors : [ null, null ], // 多个锚点的位置声明
    //  ConnectionsDetachable   : true, // 连接是否可以使用鼠标默认分离
    //  ConnectionOverlays  : [], // 附加到每个连接的默认重叠
    //  Connector : "Bezier", // 要使用的默认连接器的类型：折线，流程等
    //  Container : null, // 设置父级的元素，一个容器
    //  DoNotThrowErrors  : false, // 如果请求不存在的Anchor，Endpoint或Connector，是否会抛出
    //  DragOptions : { }, // 用于配置拖拽元素的参数
    //  DropOptions : { }, // 用于配置元素的drop行为的参数
    //  Endpoint : "Dot", // 端点（锚点）的样式声明（Dot）
    //  Endpoints : [ null, null ], // 多个端点的样式声明（Dot）
    //  EndpointOverlays : [ ], // 端点的重叠
    //  EndpointStyle : { fill : "#456" }, // 端点的css样式声明
    //  EndpointStyles : [ null, null ], // 同上
    //  EndpointHoverStyle : null, // 鼠标经过样式
    //  EndpointHoverStyles : [ null, null ], // 同上
    //  HoverPaintStyle : null, // 鼠标经过线的样式
    //  LabelStyle : { color : "black" }, // 标签的默认样式。
    //  LogEnabled : false, // 是否打开jsPlumb的内部日志记录
    //  Overlays : [ ], // 重叠
    //  MaxConnections : 1, // 最大连接数
    //  PaintStyle : { lineWidth : 8, stroke : "#456" }, // 连线样式
    //  ReattachConnections : false, // 是否重新连接使用鼠标分离的线
    //  RenderMode : "svg", // 默认渲染模式
    //  Scope : "jsPlumb_DefaultScope" // 范围，标识

    // jsplumb line config
    var config = {
        endpoint: ['Dot', {
            radius: 4,
        }],
        connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#61B7CF',
            joinstyle: 'round',
            fill: 'pink',
            outlineColor: '',
            outlineWidth: ''
        },
        connectorHoverStyle: {
            lineWidth: 2,
            strokeStyle: 'red',
            outlineWidth: 10,
            outlineColor: ''
        },
        paintStyle: {
            strokeStyle: '#1e8151',
            stroke: '#7AB02C',
            fill: 'pink',
            fillStyle: '#1e8151',
            radius: 5,
            lineWidth: 3
        }, // 连接线样式
        hoverPaintStyle: {
            strokeStyle: 'red',
            stroke: 'blue'
        }, // 连接线端点悬停样式
        isSource: true, // 是否可以拖动（作为连线起点）
        connector: ['Flowchart', {
            gap: 10,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }],
        isTarget: true, // 是否可以放置（作为连线终点）
        maxConnections: -1,
        connectorOverlays: [ // 附加到每个连接的默认重叠
            ['Arrow', {
                width: 10,
                length: 10,
                location: 1
            }],
            // ['Arrow', {
            //     width: 10,
            //     length: 10,
            //     location: 0.2
            // }],
            // ['Arrow', {
            //     width: 10,
            //     length: 10,
            //     location: 0.7
            // }],
            ['Label', {
            //     label: '', // 文本,这里会使文本重叠
            //     cssClass: 'jsplumb-label', // jsplumb-label
            //     events: {
            //         click: function (_labelOverlay, _originalEvent) {
            //             // console.log('click on label overlay for :', _labelOverlay.component)
            //         }
            //     }
            }]
        ]
    };

    exp('draw', {config, /*draw*/});
});