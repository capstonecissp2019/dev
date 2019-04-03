
/** Skills are represented as a single point object with an id, name, value and parents.
 * id: serves both as the location in the skills array and the identifier of the individual skill
 * name: represents the human name of the skill
 * value: binary 1 for mastered 0 for not mastered
 * parents: the parents of the individual skill node, note this is what creates the "tree Object" not the main skill categories hence this object is for the most part not a tree but rather a heap.
 */


let skill = {
    id: 0,
    name: "",
    value: 0,
    parents: []
    };

module.exports = {
    newSkill: function(newid,newname,newvalue,newparents)
    {
        return {id: newid, name:newname, value: newvalue, parents: newparents};
    },
};


