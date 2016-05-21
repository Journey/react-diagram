import {combineReducers} from "redux";
import groups from "./PalletReducer";
import {svgProperties,elements,links,operator,secondLevelPage} from "./CanvasReducer";
import properties from "./PropertyReducer";
import {papers,selectedPaperId} from "./TabsReducer";
import {selects} from "./SelectsReducer";

const componentReducers = combineReducers({
    papers,
    selects,
    properties,
    svgProperties,
    groups,
    elements,
    links,
    operator,
    selectedPaperId,
    secondLevelPage
});
export default componentReducers;
