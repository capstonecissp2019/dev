//required skills

const skill = require('./skills/skill.js');
const skills = require('./skills/skillObject.js');

// Creates Skill Tree Object
let skillTree1 = [];
let skillTree2 = [];
//adds Elements to first location in the Array
skillTree1[0] = skills.newSkillObject(0, "Java");
skillTree1[0].abilities = []; //some reason this is required?
skillTree1[0].abilities[0] = skill.newSkill(0, "skill1", 0, []);
skillTree1[0].abilities[1] = skill.newSkill(1, "skill2", 0, []);
skillTree1[0].abilities[2] = skill.newSkill(2, "skill3", 1, []);

//Adds Elements to the 4th location in the Array
skillTree1[1] = skills.newSkillObject(1, "Java 2");
skillTree1[1].abilities = [];
skillTree1[1].abilities[0] = skill.newSkill(0, "skill1", 0, [{ tid: 0, id: 1 }]);
skillTree1[1].abilities[1] = skill.newSkill(1, "skill2", 0, []);
skillTree1[1].abilities[2] = skill.newSkill(2, "skill2", 1, []);

skillTree1[2] = skills.newSkillObject(1, "Java 3");
skillTree1[2].abilities = [];
skillTree1[2].abilities[0] = skill.newSkill(0, "skill1", 1, [{ tid: 1, id: 0 }]);
skillTree1[2].abilities[1] = skill.newSkill(1, "skill2", 0, []);
skillTree1[2].abilities[2] = skill.newSkill(2, "skill2", 1, []);




/**
 * Created 2nd Array element to test array comparitors
 * 
 */
//adds Elements to first location in the Array
skillTree2[0] = skills.newSkillObject(0, "Java");
skillTree2[0].abilities = []; //some reason this is required?
skillTree2[0].abilities[0] = skill.newSkill(0, "skill1", 0, []);
skillTree2[0].abilities[1] = skill.newSkill(1, "skill2", 1, []);
skillTree2[0].abilities[2] = skill.newSkill(2, "skill3", 1, []);

//Adds Elements to the 4th location in the Array
skillTree2[1] = skills.newSkillObject(1, "Java 2");
skillTree2[1].abilities = [];
skillTree2[1].abilities[0] = skill.newSkill(0, "skill1", 1, [{ tid: 0, id: 1 }]);
skillTree2[1].abilities[1] = skill.newSkill(1, "skill2", 1, []);
skillTree2[1].abilities[2] = skill.newSkill(2, "skill2", 1, []);

skillTree2[2] = skills.newSkillObject(1, "Java 3");
skillTree2[2].abilities = [];
skillTree2[2].abilities[0] = skill.newSkill(0, "skill1", 0, [{ tid: 1, id: 0 }]);
skillTree2[2].abilities[1] = skill.newSkill(1, "skill2", 1, []);
skillTree2[2].abilities[2] = skill.newSkill(2, "skill2", 1, []);






//Adds Elements to the stree for testing
//Console logs out the skill tree 
console.log("Tree Object");
console.log(skillTree1[0].abilities);
console.log("Specific object");
console.log(skillTree1[1].abilities);
console.log(skillTree1[2].abilities);


treeUpdate(2, skillTree1);
console.log("Tree Object");
console.log(skillTree1[0].abilities);
console.log("Specific object");
console.log(skillTree1[1].abilities);
console.log(skillTree1[2].abilities);

console.log(seperationDistanceTester());




/** Allows for updates and permutations to be processsed */

function treeUpdate(tid, skillTree) {
    if (typeof skillTree[tid] !== 'undefined' && typeof skillTree[tid].abilities !== 'undefined' && typeof skillTree[tid].abilities !== 'null') {
        for (let i = 0; i < skillTree[tid].abilities.length; i++) {
            if (typeof skillTree[tid].abilities[i] !== 'undefined') {
                treeUpdateHelper(skillTree[tid].abilities[i], skillTree);
            }
        }
    }


};

function treeUpdateHelper(skill, skillTree) {
    if (skill.value > 0 && skill.parents.length > 0)
        for (let i = 0; i < skill.parents.length; i++) {
            if (typeof skillTree[skill.parents[i].tid] !== 'undefined' && typeof skillTree[skill.parents[i].tid].abilities[skill.parents[i].id] !== 'undefined') {
                skillTree[skill.parents[i].tid].abilities[skill.parents[i].id].value = skill.value;
                treeUpdateHelper(skillTree[skill.parents[i].tid].abilities[skill.parents[i].id], skillTree);
            }
        }
};

function seperationDistanceHelper(tid, id, master, slave, tested) {
    let seperation = 0;
    if (typeof master[tid].abilities[id].parents !== 'undefined' && master[tid].abilities[id].parents.length) {
        for (let indexParents = 0; indexParents < master[tid].abilities[id].parents.length; indexParents++) {
            if (0 > tested.findIndex(x => x.tid === master[tid].abilities[id].parents[indexParents].tid && x.id === master[tid].abilities[id].parents[indexParents].id)) {
                tested.push(master[tid].abilities[id].parents[indexParents]);
                seperation += seperationDistanceHelper(master[tid].abilities[id].parents[indexParents].tid, master[tid].abilities[id].parents[indexParents].id, master, slave, tested)
            }
        }

    }

    if (master[tid].abilities[id].value > slave[tid].abilities[id].value && master[tid].abilities[id].id == slave[tid].abilities[id].id) {
        return seperation++;
    }

    else {
        return seperation;

    }


};

function seperationDistance(baseNodes, master, slave) {
    let tested = baseNodes;
    let seperation = 0;

    for (let i = 0; i < baseNodes.length; i++) {
        seperation += seperationDistanceHelper(baseNodes[i].tid, baseNodes[i].id, master, slave, tested);
    }

    return {distance: seperation, nodes: tested.length};
}

function seperationDistanceTester() {
    let baseNodes = [{ tid: 2, id: 0 }];


}
seperationDistanceTester();