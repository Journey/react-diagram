import {ElementHelper} from "./ElementHelper";
import {StoreHelper} from "./StoreHelper";
import {generateUUID} from "./UUID";
export const DefaultValues = (() => {
    var tabIndex = 1;
    var _singleTypes = [{id:1,name:"遥测"},{id:2,name:"遥信"},{id:3,name:"遥控"},{id:4,name:"遥调"}];
    return {
	getPapers: () => {
	    var _paper = DefaultValues.getDefaultPaper();
	    return {
		[_paper.key]:_paper
	    };
	},
        getSvgProperties: () => {
	    if(StoreHelper.hasStore()){
		return StoreHelper.getSvgProperties();
	    }
            return {
                width: 1000,
                height: 1000,
                gridSize: 10,
                scaleX: 1,
                scaleY: 1,
                zoomLevel: 1
		
            };
        },
        getOperator: () => {
            return {
                id: null, //selected element id
                x: 100000,
                y: 100000,
                width: 10000,
                height: 10000,
                lineId: null //selected line id
            };
        },
        getDefaultPaper: (() => {
            var id = generateUUID();
            return () => {
                return {
                    key: id,
                    paperName: "默认",
                    paperType: 1, // 普通页面
                    order: 0,
                    svgProperties: DefaultValues.getSvgProperties(),
                    elements: {},
                    links: {},
                    properties: {}
                };
            };
        })(),
        generatePaper: (uuid, paperId, paperName, paperType) => {
            return {
                uuid: uuid,
                key: paperId,
                paperName: paperName,
                paperType: paperType,
                svgProperties: DefaultValues.getSvgProperties(),
                elements: {},
                links: {},
                properties: {},
                operator: DefaultValues.getOperator(),
                order: StoreHelper.getNextPageOrder()
            };
        },
        getDefaultPapers: () => {
            var defaultPaper = DefaultValues.getDefaultPaper();
            return {
                [defaultPaper.key]: defaultPaper
            };
        },
        getDefaultState: () => {
            var defaultPaper = DefaultValues.getDefaultPaper();
            var operator = DefaultValues.getOperator();
            return {
                selectedPaperId: defaultPaper.key,
                svgProperties: defaultPaper.svgProperties,
                elements: defaultPaper.elements,
                properties: defaultPaper.properties,
                links: defaultPaper.links,
                operator: operator,
                papers: {
                    [defaultPaper.key]: defaultPaper
                }
            };
        },
        getDefaultTextProperties: () => {
            return {
                text: "文字元素"
            };
        },
        getDefaultGroupProperties: () => {
            return {
                bindingId: ""
            };
        },
        getDefaultPlaceholderProperties: () => {
            return {
                bindingId: ""
            };
        },
        getDefaultProperties: (elementTypeId) => {
            let _oProperties;
            if (ElementHelper.isText(elementTypeId)) {
                _oProperties = DefaultValues.getDefaultTextProperties();
            } else if (ElementHelper.isGroup(elementTypeId)) {
                _oProperties = DefaultValues.getDefaultGroupProperties();
            } else if (ElementHelper.isPlaceHolder(elementTypeId)) {
                _oProperties = DefaultValues.getDefaultPlaceholderProperties();
            } else {
                _oProperties = {
                    deviceInfo: DefaultValues.getDeviceInfo(),
                    measurePointInfos: [DefaultValues.getMeasurePointInfo()]
                };
            }
            _oProperties.elementTypeId = elementTypeId;
            return _oProperties;
        },
        getPalletDatas: () => {
            //todo::
        },
        getDeviceInfo: () => {
            return {
                name: "",
                serialNumber: ""
            };
        },
        getMeasurePointInfo: () => {
            return {
                name: "",
                identifier: "",
                type: "1"
            };
        },
	get signalTypes(){
	    return _singleTypes;
	}
    };
})();
