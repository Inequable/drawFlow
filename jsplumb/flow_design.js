/**
 * 流程设计
 * tom
 * https://jsplumbtoolkit.com/docs.html
 */
layui.config({
	base: '/'
}).extend({
	jqui: 'js/workflow/jQueryUI.min',
	jsPlumb: 'js/workflow/jquery_jsplumb_forlayui.min'
}).define(['jsPlumb', 'jqui', 'laytpl', 'comm'], function(exp) {
	var $ = layui.jquery, jsPlumb = layui.jsPlumb, laytpl = layui.laytpl, comm = layui.comm;

	// 基本连接线样式
	var lineConfig = {
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
		hoverPaintStyle: { strokeStyle: 'red',stroke: 'blue' }, // 连接线端点悬停样式
		isSource: false,
		connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true }], 
		isTarget: false,
		maxConnections: -1,
		connectorOverlays: [ // 附加到每个连接的默认重叠
			['Arrow', { width: 10, length: 10, location: 1 }],
			['Arrow', { width: 10, length: 10, location: 0.2 }],
			['Arrow', { width: 10, length: 10, location: 0.7 }],
			['Label', {
				label: '', // 文本,这里会使文本重叠
				cssClass: 'jsplumb-label', // jsplumb-label
				events: {
					click: function (_labelOverlay, _originalEvent) {
						// console.log('click on label overlay for :', _labelOverlay.component)
					}
				}
			}]
		]
	};

	// 定义模板html，模板中的内容需要改一下
	var tplHtml = '<div id="node_{{ d.rand }}" data_nodeName="{{ d.name }}" data-id="{{ d.id }}" data-stepid="{{ d.stepId }}" data-lsid="{{ d.lsid }}" style="top: {{ d.top }}px; left: {{ d.left }}px;cursor: Move;" class="item">\
						<span class="stepNum">{{ d.orderlist }}</span>\
						<span class="nodeName">{{ d.name }}</span>\
						{{# if(d.close){ }}\
						<i class="layui-icon layui-icon-close-fill"></i>\
						{{# } }}\
					</div>';

	// 设置容器默认样式 
	var setContainerStyle = {
		"min-height": "600px",
		"background-image": "linear-gradient(90deg, rgba(156, 144, 144, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(105, 99, 99, 0.15) 10%, rgba(0, 0, 0, 0) 10%)",
		"background-size": "10px 10px",
		"position": "relative",
		"overflow": "auto"
	};

	// selector 和 node data json 还有 rel data json
	var el, dataset, relDataset;

	var allNodeJson = []; // 定义一个全局变量，渲染后的节点json数据

	// jsplumb实例调用方法
	var drawFlow = {
		init: function(_el, _data, _relData) {
			if (!_el) {
				comm.msg_error('请设置selector');
				return false;
			}
			if (_data && typeof(_data) === 'string') {
				dataset = JSON.parse(_data);
			} else {
				comm.msg_error('请设置节点数据，必须是json');
				return false;
			}
			if (_relData && typeof(_relData) === 'string') {
				relDataset = JSON.parse(_relData);
			} else {
				comm.msg_error('请设置节点关联关系数据，必须是json');
				return false;
			}
			el = _el;
			el.css(setContainerStyle);
			jsPlumb.ready(drawFlow.main);
			jsPlumb.importDefaults({
				ConnectionsDetachable: false
			});
		},
		main: function() {
			console.log('已接入jsPlumb插件的主方法');
			jsPlumb.setContainer(el);
			drawFlow.initAllNode();
			// 竖向，当容器中最后一个节点的top高度大于容器最小高度时，采用节点的top高度
			if (el.children('div:last-child')[0].offsetTop > parseInt(setContainerStyle["min-height"])) {
				setContainerStyle["height"] = el.children('div:last-child')[0].offsetTop + 40;
				el.css(setContainerStyle);
			}
			var line = drawFlow.handleRel();
			// console.log(line);
			for (var i = 0; i < line.length; i++) {
				var st = line[i];
				if (st === null) {
					break;
				}
				drawFlow.connNode(st.source, st.target, st);
			}
			el.css({
				"-webkit-transform":"scale(0.95)",
				"-moz-transform":"scale(0.95)",
				"-ms-transform":"scale(0.95)",
				"-o-transform":"scale(0.95)",
				"transform":"scale(0.95)"
			});
			jsPlumb.setZoom(0.95);
			// console.log(el.outerWidth()); // 容器宽度
			// console.log(el.outerHeight()); // 容器高度
		},
		renderTplNode: function(_data) {
			var data = $.extend({
				id: 1,
				rand: (new Date()) * 1,
				top: 0,
				left: 0,
				name: '',
				orderlist: 1,
				close: false, // 表示是否需要显示关闭的icon
				open: false // 表示正在执行的步骤标识
			}, _data);
			laytpl(tplHtml).render(data, function (_html) {
				el.append(_html);
			});
		},
		initAllNode: function() {
			for (var i = 0; i < dataset.length; i++) {
				var data = dataset[i];
				data.rand = ((new Date()) * 1) + '_' + data.id;
				data.orderlist = data.listorder;
				drawFlow.renderTplNode(data);
				allNodeJson.push(data);
				// console.log($('#node_' + data.rand).outerWidth()); // 步骤节点渲染完以后才有的宽度
				// console.log($('#node_' + data.rand).outerHeight()); // 步骤节点渲染完以后才有的高度
			}
			// console.log(allNodeJson);
		},
		initNodePoint: function(_sEl, _tEl, _line) {
			// 节点可移动
			jsPlumb.draggable($('.item'), {
				containment:"parent"
			});
			var out_ = '', in_ = '';
			switch(_line.relationType) {
				case '1':
					out_ = 'Bottom';
					in_ = 'Top';
					if (_line.relationAndOr === '1') {
						lineConfig.connectorOverlays[3][1].label = '或';
					} else {
						lineConfig.connectorOverlays[3][1].label = '并';
					}
					break;
				case '2':
					if (_line.relationFlag === '1') {
						out_ = 'Left';
						in_ = 'Left'
						lineConfig.connectorOverlays[3][1].label = 'YES';
					}else{
						out_ = 'Right';
						in_ = 'Right';
						lineConfig.connectorOverlays[3][1].label = 'NO';
					}
					break;
				case '3':
					out_ = 'Bottom';
					in_ = 'Top';
					lineConfig.connectorOverlays[3][1].label = '驳回/回退';
					break;
				default:
					out_ = 'Bottom';
					in_ = 'Top';
					break;
			};
			jsPlumb.addEndpoint(_sEl, {
				uuid: _sEl+'_out',
				anchors: out_
			}, lineConfig);
			jsPlumb.addEndpoint(_tEl, {
				uuid: _tEl+'_in',
				anchors: in_
			}, lineConfig);
		},
		handleRel: function() {
			var relLine = [];
			for (var i = 0; i < relDataset.length; i++) {
				var rel = relDataset[i];
				if (!rel) {
					continue;
				}
				if (rel.childStep === '0' || !rel.childStep) {
					relDataset.splice(i, 1);
					i = i - 1;
					continue;
				}
				$.each(allNodeJson, function(_i, _v) {
					if (_v.stepId === 'undefined' || !_v.stepId) {
						if (rel.childStep === _v.id) {
							relDataset[i].target = 'node_' + _v.rand;
						}
						if (rel.parentStep === _v.id) {
							relDataset[i].source = 'node_' + _v.rand;
						}
					}else{
						if (rel.childStep === _v.stepId) {
							relDataset[i].target = 'node_' + _v.rand;
						}
						if (rel.parentStep === _v.stepId) {
							relDataset[i].source = 'node_' + _v.rand;
						}
					}
				});
			}
			return relDataset;
		},
		connNode: function(_source, _target, _line) {
			if (_line.defaultBack == '0' && _line.relationType == '3') {
				return false;
			}
			drawFlow.initNodePoint(_source, _target, _line);
			jsPlumb.connect({
				uuids: [_source+'_out', _target+'_in'],
				detachable: false // 端点不拖放链接
			});
		}
	};

	// window.localStorage.clear()
	exp('drawFlow', drawFlow);
});
