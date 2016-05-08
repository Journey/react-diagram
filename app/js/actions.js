import {
    PALLET_ELEMENT_DRAG_START,
    ADD_ELEMENT,
    MOVE_ELEMENT,
    CLEAR_SELECTION,
    CANVAS_ELEMENT_DRAG_START,
    ADD_LINE,
    UPDATE_LINES,
    SELECT_ELEMENT,
    SELECT_CANVAS,
    SELECT_LINE,
    SAVE_SVG_PROPERTIES,
    SAVE_ELEMENT_PROPERTIES,
    SAVE_MEASURE_POINT_VALUE,
    ADD_MEASURE_POINT,
    REMOVE_MEASURE_POINT,
    REMOVE_LINES,
    REMOVE_LINE,
    REMOVE_ELEMENT,
    ZOOM_IN,
    ZOOM_OUT,
    REDO_OPERATION,
    UNDO_OPERATION,
    CREATE_SUB_PAPGER,
    DELETE_SUB_PAPGER,
    UPDATE_GEOMETRIC_DATA,
    SWITCH_SUB_PAPER,
    UPDATE_TEXT_ELEMENT,
    OPEN_SUB_PAGE,
    CLOSE_SUB_PAGE,
    UPDATE_ELEMENT_DATAS,
    UI_DATA_UPDATE
} from "./consts";
export const palletElementDragStart = (id) => {
    return {
	type:PALLET_ELEMENT_DRAG_START,
	id:id
    };
};
export const canvasElementDragStart = (key) => {
    return {
	type: CANVAS_ELEMENT_DRAG_START,
	key: key
    };
};

export const clearSelection = () => {
    return {
	type: CLEAR_SELECTION
    };
};
/**
 * action creator for add an canvas elment
 * @param {id} elementId the element id from the pallet
 * @param {Number} x the x postion of the new element
 * @param {Number} y the y position of the new element
 * @returns {Object}  the action object
 */
export const addElement = (elementId, x, y) => {
    return {
	type: ADD_ELEMENT,
	id: elementId,
	x,
	y
    };
};
/**
 * move the canvas element
 * @param {string} elementId the uuid of the canvas element
 * @param {int} x the x postion of the canvas element
 * @param {int} y the y postion of the canvas element
 * @returns {object}  the action object
 */
export const moveElement = (elementId,x,y) => {
    return {
	type: MOVE_ELEMENT,
	id: elementId,
	x,
	y
    };
};

/**
 * action creator for remove an canvas element
 * @param {string} elementId the key of the canvas element
 * @returns {object} the action object
 */
export const removeElement = (elementId) => {
    return {
	type: REMOVE_ELEMENT,
	id: elementId
    };
};

export const addLine = (startPort,endPort) => {
    return {
	type: ADD_LINE,
	startPort,
	endPort
    };
};

export const updateLines = (elementId) => {
    return {
	type: UPDATE_LINES,
	id: elementId
    };
};

/**
 * remove lines which related with the element
 * @param {} elementKey
 * @returns {} 
 */
export const removeLines = (elementKey) => {
    return {
	type: REMOVE_LINES,
	id: elementKey
    };
};

export const removeLine = (lineId) => {
    return {
	type: REMOVE_LINE,
	id: lineId
    };
};

export const selectElement = (elementId,x,y,width,height) => {
    return {
	type: SELECT_ELEMENT,
	id: elementId,
	x: x,
	y: y,
	width: width,
	height: height
    };
};

export const selectLine = (lineId) => {
    return {
	type: SELECT_LINE,
	id: lineId
    };
};

export const selectCanvas = (width,height,gridSize) => {
    return {
	type: SELECT_CANVAS,
	width: width,
	height: height,
	gridSize: gridSize
    };
};

export const saveSvgProperties = (width,height,gridSize) => {
    return {
	type: SAVE_SVG_PROPERTIES,
	width,
	height,
	gridSize
    };
};

export const saveElementProperties = (newProperties) => {
    return {
	type: SAVE_ELEMENT_PROPERTIES,
	properties: newProperties
    };
};

export const addMeasurePoint = () => {
    return {
	type: ADD_MEASURE_POINT
    };
};

export const removeMeasurePoint = (index) => {
    return {
	type: REMOVE_MEASURE_POINT,
	index: index
    };
};

export const saveMeasurePointValue = (index,key,value) => {
    return {
	type: SAVE_MEASURE_POINT_VALUE,
	index: index,
	key: key,
	value: value
    };
};

export const updateElementGeometricData = (id,width,height,x,y) => {
    return {
	type: UPDATE_GEOMETRIC_DATA,
	id: id,
	width: width,
	height: height,
	x: x,
	y: y
    };
};

export const zoomIn = () => {
    return {
	type: ZOOM_IN
    };
};

export const zoomOut = () => {
    return {
	type: ZOOM_OUT
    };
};

export const redo = () => {
    return {
	type: REDO_OPERATION
    };  
};
export const undo = () => {
    return {
	type: UNDO_OPERATION
    };  
};
export const createSubPage = ({name,type,key,uuid}) => {
    return {
	type: CREATE_SUB_PAPGER,
	paperName: name,
	paperType: type,
	paperId: key,
	uuid: uuid
    };
};
export const switchSubPage = (paper) => {
    return {
	type: SWITCH_SUB_PAPER,
	paper: paper
    };  
};
export const deleteSubPage = (paperId) => {
    return {
	type: DELETE_SUB_PAPGER,
	paperId: paperId
    };
};

export const updateTextElement = (elementId,text) => {
    return {
	type: UPDATE_TEXT_ELEMENT,
	elementId: elementId,
	text: text
    };  
};

export const openSubPage = (paper) => {
    return {
	type: OPEN_SUB_PAGE,
	paper: paper
    };
};

export const closeSubPage = () => {
    return {
	type: CLOSE_SUB_PAGE
    };  
};

export const updateElementDatas = (data) => {
    return {
	type: UPDATE_ELEMENT_DATAS,
	data: data
    };
};

export const updateBindingData = (data) => {
    return {
	type: UI_DATA_UPDATE,
	data: data
    };
};
export const updateStatus = (data) => {
    return {
	type: UI_STATUS_UPDATE,
	data: data
    };
};
