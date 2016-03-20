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
    SAVE_SVG_PROPERTIES,
    SAVE_ELEMENT_PROPERTIES,
    ADD_MEASURE_POINT,
    REMOVE_MEASURE_POINT
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

export const propertyAction = (id) => {
    return {
	type:"TEST_PROPERTY",
	content:id
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

export const selectElement = (elementId) => {
    return {
	type: SELECT_ELEMENT,
	id: elementId
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

