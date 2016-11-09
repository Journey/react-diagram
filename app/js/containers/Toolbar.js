//depends on bootstrap.js
import {
    connect
}
from 'react-redux';
import {
    generateUUID, StoreHelper
}
from "../Utility";
import {
    papers as Papers
}
from "../Util/PaperHelper";
import {
    callbacks
}
from "../ext/callbacks";
import Toolbar from "../components/Toolbar.jsx";
import {
    OperationHistory
}
from "../Util/OperationHistory";
import {
    UNDO_REDO_ELEMENTS, UNDO_REDO_LINKS, UNDO_REDO_SVGPROPERTIES
}
from "../consts";
import {
    zoomIn, zoomOut, redo, undo, createSubPage, deleteSubPage, undoRedoSVGProerties, undoRedoLinks, undoRedoElements
}
from "../actions";
import {OperationWrapper} from "../Util/OperationHistory";

const mapStateToProps = (state) => {
    return {
        selectedPaperId: state.selectedPaperId,
        papers: state.papers
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
        onZoomIn: (evt) => {
            dispatch(zoomIn());
        },
        onZoomOut: () => {
            dispatch(zoomOut());
        },
        onRedo: (event) => {
	    var operation = OperationWrapper.popRedo();
            if (operation) {
                switch (operation.type) {
                case UNDO_REDO_LINKS:
		    OperationWrapper.addUndoLinks();
                        dispatch(undoRedoLinks(operation.data));
                        break;
                    case UNDO_REDO_SVGPROPERTIES:
                        dispatch(undoRedoSVGProerties(operation.data));
                        break;
                case UNDO_REDO_ELEMENTS:
		    OperationWrapper.addUndoElements();
                        dispatch(undoRedoElements(operation.data));
                        break;
                }
            }
        },
        onUndo: (event) => {
            var operation = OperationWrapper.popUndo();
            if (operation) {
                switch (operation.type) {
                    case UNDO_REDO_SVGPROPERTIES:
                        dispatch(undoRedoSVGProerties(operation.data));
                        break;
                case UNDO_REDO_ELEMENTS:
		    OperationWrapper.addRedoElements();
                        dispatch(undoRedoElements(operation.data));
                        break;
                case UNDO_REDO_LINKS:
		    OperationWrapper.addRedoLinks();
                        dispatch(undoRedoLinks(operation.data));
                        break;
                }
            }
        },
        onCreateSubPage: (event) => {
            var containerEle = event.target.parentElement.parentElement;
            var overlayEle = containerEle.querySelector("div.modal");
	    $(overlayEle).modal('show');
        },
        onSaveSubPage: (event) => {
	    //get root elements of the modal dialogue
            var subCreateEle = event.target.parentElement.parentElement.parentElement.parentElement;
            var typeEle = subCreateEle.querySelector("select");
            var nameEle = subCreateEle.querySelector("input[name=name]");
            var name = nameEle.value;
            var paperType = parseInt(typeEle.value);
            if (!name) {
                return;
            }
            var id = "";
            var uuid = generateUUID();
            dispatch(createSubPage({
                name: name,
                type: paperType,
                key: id,
                uuid: uuid
            }));
            
            nameEle.value = "";
	    //depends on bootstrap
	    $(subCreateEle).modal('hide');
        },
        onCancelSubPage: (event) => {
	    //get root element of the modal, depends on bootstrap
            var overlayEle = event.target.parentElement.parentElement.parentElement.parentElement;
            $(overlayEle).modal('hide');
        },
        onSave: (event) => {
            StoreHelper.storeData();
            var oValideResult = Papers.validateData();
            if (oValideResult.isValide) {
                console.log(JSON.stringify(StoreHelper.getPapers(), function(key, value) {
                    return value;
                }));
                oValideResult.data = StoreHelper.getPapers();
                console.log(StoreHelper.getPapers());
                callbacks.saveDiagram && callbacks.saveDiagram(oValideResult);
            } else {
                console.log(oValideResult);
		callbacks.saveDiagram && callbacks.saveDiagram(oValideResult);
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Toolbar);
