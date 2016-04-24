import {PalletData} from "../Utility";
let _defaultGroups = [
	{
	    id:1,
	    groupName:"Group 1",
	    items:[
		{
		    id:1,
		    name:"element one",
		    image:"css/1.jpg",
		    width: 50,
		    height: 50
		},
		{
		    id:2,
		    name:"element two",
		    image:"css/2.jpg",
		    width: 50,
		    height: 50
		}
	    ]
	},
	{
	    id: 2,
	    groupName:"Group 2",
	    items:[{
		id:3,
		name:"element three",
		image:"css/3.jpg",
		width: 50,
		height: 50
	    },
		  {
		id:10,
		name:"text",
		image:"css/3.jpg",
		width: 50,
		height: 50
		  },
		  {
		id:11,
		name:"place holder",
		image:"css/3.jpg",
		width: 50,
		height: 50
		  },{
		id:12,
		name:"group",
		image:"css/3.jpg",
		width: 50,
		height: 50
	    }]
	}
    ];
/**
 * the data of the pallet component
 * @param {Object} state the data of the pallet element includes group infomation
 * @param {null} action no action
 * @returns {Object} the pallet element infomation
 */
const groups = (state = _defaultGroups,action) => {
    //todo::should request from from the server
    PalletData.set(state);
    return state;
};
export default groups;
