// Define the Map object
const objectMap =  new Map({
	'1706708654124' : { botId: 1706708654124, category: '', successor: [ 1714021238258 ] },
	'1706708658612' : { botId: 1706708658612, category: '', successor: [] },
	'1706854731180' : {
	  botId: 1706854731180,
	  category: 'Automatic',
	  successor: [ 1718564438889 ]
	},
	'1707208733182' : {
	  botId: 1707208733182,
	  category: 'Manual',
	  successor: [ 1715334786457 ]
	},
	'1709260595204' : {
	  botId: 1709260595204,
	  category: 'Automatic',
	  successor: [ 1706854731180 ]
	},
	'1709287544264' : {
	  botId: 1709287544264,
	  category: 'Automatic',
	  successor: [ 1712038459921 ]
	},
	'1709353733149' : {
	  botId: 1709353733149,
	  category: 'Automatic',
	  successor: [ 1711019855545 ]
	},
	'1709862436010' : {
	  botId: 1709862436010,
	  category: 'Automatic',
	  successor: [ 1711014769631 ]
	},
	'1710142388795' : {
	  botId: 1710142388795,
	  category: 'Automatic',
	  successor: [ 1706708658612 ]
	},
	'1710917046698' : {
	  botId: 1710917046698,
	  category: 'Automatic',
	  successor: [ 1709287544264 ]
	},
	'1711014855337' : {
	  botId: 1711014855337,
	  category: 'conditional',
	  successor: [ 1710142388795, 1711012381889 ]
	},
	'1711019855545' : {
	  botId: 1711019855545,
	  category: 'conditional',
	  successor: [ 1709261899714, 1710142388795 ]
	},
	'1712038459921' : {
	  botId: 1712038459921,
	  category: 'conditional',
	  successor: [ 1709260595204, 1718564438889 ]
	},
	'1713766291111' : {
	  botId: 1713766291111,
	  category: 'Automatic',
	  successor: [ 1713766324472 ]
	},
	'1714021238258' : {
	  botId: 1714021238258,
	  category: 'Automatic',
	  successor: [ 1714021338345 ]
	},
	'1714021338345' : {
	  botId: 1714021338345,
	  category: 'conditional',
	  successor: [ 1714021671952, 1710917046698 ]
	},
	'1715234600279' : {
	  botId: 1715234600279,
	  category: 'Automatic',
	  successor: [ 1715948505845 ]
	},
	'1715334786457' : {
	  botId: 1715334786457,
	  category: 'Automatic',
	  successor: [ 1715335002528 ]
	},
	'1715335002528' : {
	  botId: 1715335002528,
	  category: 'conditional',
	  successor: [ 1715234600279, 1713766291111 ]
	},
	'1715948505845' : {
	  botId: 1715948505845,
	  category: 'conditional',
	  successor: [ 1709353733149, 1706708658612 ]
	},
	'1718564438889' : {
	  botId: 1718564438889,
	  category: 'conditional',
	  successor: [ 1707208733182, 1718563518792 ]
	},
	'1718702666232' : {
	  botId: 1718702666232,
	  category: 'Automatic',
	  successor: [ 1718702708832 ]
	},
	'1718702708832' : {
	  botId: 1718702708832,
	  category: 'Automatic',
	  successor: [ 1715334786457 ]
	},
	'1718908746984' : {
	  botId: 1718908746984,
	  category: 'conditional',
	  successor: [ 1718563521624, 1711013654369 ]
	}
  }
)
//   const objectMap = new Map(data.map(obj : [obj.botId.toString(), obj]));
	
const stackStoreBotId = new Map();
const manualCategoryObjects = [];

		const findManualCategory = (botId, baseBotId) => {
			 stack = [{ botId, successorIndex: 0 }];
			while (stack.length > 0) {

				const current = stack[stack.length - 1];
				const currentObject = objectMap.get(current.botId);
				
				if (currentObject.category === "Manual" ) {
					manualCategoryObjects.push(`${currentObject.botId} Manual`);
				}
	
				// console.log(stack)
				while (currentObject.successor.length > 0 && current.successorIndex < currentObject.successor.length) {
					const nextBotId = currentObject.successor[current.successorIndex].toString();
					const nextObject = objectMap.get(nextBotId);
					if (!nextObject) {
						console.log(!nextBotId, nextBotId)
						console.log(`Bot ID ${nextBotId}  found in the data ++`);
						current.successorIndex++;
						continue;
					}
	
					// if (nextObject.category === "Manual") {
					// 	manualCategoryObjects.push(nextObject);
					// }
	
					stackStoreBotId.set(current.botId, currentObject.successor.map(s => s.toString()));
					console.log(nextBotId)
					stack.push({ botId: nextBotId, successorIndex: 0 });
					break;
				}
	
				if (current.successorIndex >= currentObject.successor.length) {
					stack.pop();
					if (stack.length > 0) {
						stack[stack.length - 1].successorIndex++;
					}
				}
			}
	
			return null;
		};
	
		const initialBotId = '1707208733182'; // Update with the starting botId
		findManualCategory(initialBotId, initialBotId);