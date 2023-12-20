const router= require('express').Router();
const multer= require('multer');
const PostTache= require('../Controllers/PostTache.controllers')
const GetAllTache= require('../Controllers/PostTache.controllers')
const GetOneTache= require('../Controllers/PostTache.controllers')
const UpdatesTache= require('../Controllers/PostTache.controllers')
const DeleteTache= require('../Controllers/PostTache.controllers')
const UploadFile= require('../Controllers/Upload.controllers')
const TacheModel= require('../Models/Tache.models')


router.get('/get', GetAllTache.Geter)
router.get('/:id',GetOneTache.Geters )
router.post('/post', PostTache.Poster)
router.put('/:id', UpdatesTache.Update)
router.delete('/:id', DeleteTache.Delete)

//uploader les fichiers images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/public/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    TacheModel.findByIdAndUpdate(
        req.body.tacheId,
        {$set: {picture:"./images/public/image/" + req.file.filename}},
        {new: true, upsert: true, setDefaultsOnInsert: true},
        (err, docs)=>{
            if(!err) return res.send(docs)
            else return res.status(500).send({message: err})
        })
    
});

module.exports= router