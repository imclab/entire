var debug = require("debug")("entire-sort");

var SORT = module.exports = function(modules){

	var moduleNames = Object.keys(modules);

	debug("START ORDER: "+JSON.stringify(moduleNames));

	var allParents = {};

	for(var i=0; i<moduleNames.length; i++){
		allParents[moduleNames[i]] = modules[moduleNames[i]].extends || [];
	}

	for(var i=0; i<moduleNames.length; i++){
		var moduleName = moduleNames[i];
		var parents = allParents[moduleName];

		for(var j=0; j<parents.length; j++){
			var grandParents = allParents[parents[j]];
			console.log(moduleName, parents[j], grandParents)
			for(var k=0; k<grandParents.length; k++){
				if(parents.indexOf(grandParents[k])==-1){
					parents.push(grandParents[k]);
				}
			}
		}
	}

	debug(JSON.stringify(allParents));

	moduleNames.sort(function(a, b){
		return (allParents[a].length<allParents[b].length) ? 0 : 1;
	});

	debug("END ORDER: "+JSON.stringify(moduleNames));

	var out = {};

	for(var i=0; i<moduleNames.length; i++){
		out[moduleNames[i]] = modules[moduleNames[i]];
	}

	return out;
	
}