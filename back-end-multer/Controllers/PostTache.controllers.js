const TacheModel= require('../Models/Tache.models')
const ObjectId= require('mongoose').Types.ObjectId
// affichers toutes le taches a l'ecran
module.exports.Geter= async(req, res)=>{
    const tache=await TacheModel.find().sort({
        updatedAt:-1});
    res.status(200).json(tache)
}
// afficher une tache specifique grace a on ID
module.exports.Geters=async(req,res)=>{
    console.log(req.params);
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID incorrect: '+ req.params.id)

    TacheModel.findById(req.params.id, (err, data)=>{
        if(!err) res.send(data)
        else console.log(err);
    })
}
// ajouter une tache
module.exports.Poster= async(req,res)=>{
    
    if(!req.body.titre&&!req.body.contenue){
        res.status(400).json({message: 'merci de remplir avant'})
    }
    if(req.body.titre===''){
        req.body.titre='Titre!!!'
    }

    const tache= await TacheModel.create({
        titre: req.body.titre,
        contenue: req.body.contenue
    })
    res.status(200).json(tache)
}
// modifier ou mettre a jour une tache deja existante grace a sonID
module.exports.Update= async(req, res)=>{
    const up= await TacheModel.findById(req.params.id)
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID incorrect: '+ req.params.id)

    const Update= await TacheModel.findByIdAndUpdate(up, req.body,{
        new: true
    })
    res.status(200).json(Update)
}
// supprimer une tache existante grace a son ID
module.exports.Delete= async(req, res)=>{
    const det= await TacheModel.findById(req.params.id)
    await det.remove()
    res.status(200).json({message:"la tache a ete supprimer"+ det})
}