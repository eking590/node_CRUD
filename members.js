
const express = require('express') //import the express module 
const uuid = require('uuid'); 

const router = express.Router(); //we have to import the router 

//call or import the Members.js module
const members = require('../../Members'); 

//create a route to get all members 
router.get('/',(req, res)=>
    res.json(members)
); 
//get single member 
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //this check if the member(id) is on the list using some method which returns true or false 

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))

    } else  {
        res.status(400).json({ msg: `the member with id of ${req.params.id} is not found`}); 
    }

    ; 
}); 

//create a new member 
router.post('/', (req, res) =>{
    const newMember = {
        id: uuid.v4(), 
        name: req.body.name, 
        email: req.body.email, 
        status:'active'

    }

    if (!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'please include a name and email' }); 
    } 
    members.push(newMember); 
    res.json(members); 
})

//update member 
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //this check if the member(id) is on the list using some method which returns true or false 

    if (found) {
       const updateMember = req.body; 
       members.forEach(member => {
        if(member.id === parseInt(req.params.id)){ 
            member.name = updateMember.name ? updateMember.name : member.name;
            member.email = updateMember.email ? updateMember.email : member.email; 

            res.json({ msg: "Member updated", member }); 

        }
       });

    } else  {
        res.status(400).json({ msg: `the member with id of ${req.params.id} is not found`}); 
    }

    ; 
}); 


//delete member 
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //this check if the member(id) is on the list using some method which returns true or false 

    if (found) {
        res.json({ msg: 'member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})

    } else  {
        res.status(400).json({ msg: `the member with id of ${req.params.id} is not found`}); 
    }

    ; 
});  


module.exports = router; 