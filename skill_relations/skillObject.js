/**
 * This forms the basis of the skill object itsel
 * id: location in the main skill category array
 * Name; Human name of the category, like Java programming
 * Array of the subset of skill objects. 
 */



let skill_object =
{
    id: 0,
    name: "",
    abilities: [],
}



module.exports = {
    newSkillObject: function(newId,newName)
    {
        return {id: newId, name: newName, abilities: skill_object.abilities}
    }
} 

