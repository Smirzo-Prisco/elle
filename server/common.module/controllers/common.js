'use strict';

module.exports = function(common) {
    common.buidTreeFromArray = function (nodesArray) {
        var stack = [];
        var tree = [];

        //Inserisco i nodi di primo livello nello stack
        for(var j = 0; j < nodesArray.length; j++){
            //nodesArray[j] = nodesArray[j].toObject();
            if(nodesArray[j].parent_id == null){
                stack.push(nodesArray[j]);
            }
        }

        var padre = Object();

        while (stack.length > 0) {
            var currentnode = stack.pop();
            var node = currentnode;
            node.children = [];
            var childrenNumber = 0;

            //cerco i figli del nodo corrente e li
            //inserisco nella proprietà children del nodo corrente
            for(var i = 0; i < nodesArray.length; i++){
                if(JSON.stringify(nodesArray[i].parent_id) === JSON.stringify(currentnode.item._id)){
                    childrenNumber++;
                    if(nodesArray[i].value > 0){
                        node.children.unshift(nodesArray[i]);
                        nodesArray[i].in = true;
                        stack.push(nodesArray[i]);
                    }
                }
            }

            //se il nodo non è stato inserito come children di
            //un altro nodo, lo inserisco nel tree
            if(!currentnode.in) {
                //controllo il mio val
                if(node.value > 0){
                    if(((childrenNumber > 0) && (node.children.length > 0))||(childrenNumber === 0)){
                        delete node.in;
                        tree.push(node);
                    }
                }
            }
        }
        return tree;
    };
};