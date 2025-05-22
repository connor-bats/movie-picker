const e = require('express')
const mongoose = require('mongoose')

const bucketListModel = require('../models/BucketListItemModel')


const getBucketList = (req, res) =>{
    bucketListModel.find().sort({'added_on' : 1})
        .then(data => {
            console.log(data)     
            res.status(200).json({
                    success : true,
                    data : data
            })                
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err
            })
        })
}


const addBucketListItem = (req, res) => {
    const newItem = new bucketListModel({
        name : req.body.name,
        added_by : req.body.username

    })

    newItem.save()
        .then(data => {
            console.log(data)
            return res.status(200).json({
                success : true,
                data : data 
            })
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err 
            })
        })
}


const randomBucketListItem =async (req, res) => {

    try{
    const qty = await bucketListModel.count();

    var skip_var = Math.floor(Math.random() * qty)

    const data = await bucketListModel.findOne().skip(skip_var)

    console.log(data)
    return res.status(200).json({
        success : true,
        data: data
    })
    
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success : false,
            err : err
        })
    }


}

const deleteBucketListItem = (req, res) => {
    const id = req.body.id
    //console.log('Rishi :', id)
    bucketListModel.findByIdAndDelete(id)
        .then(data => {
            console.log(data)
            if(data == null){
                return res.status(400).json({
                    success : false,
                    err : 'Item not found'
                })
            }
            return res.status(200).json({
                success : true,
                data : data
            })
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err
            })
        })
}
const updateBucketListItem = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const watched = req.body.watched

    bucketListModel.findByIdAndUpdate(id, {name : name, watched : watched}, {new : true})
        .then(data => {
            console.log(data)
            if(data == null){
                return res.status(400).json({
                    success : false,
                    err : 'Item not found'
                })
            }
            return res.status(200).json({
                success : true,
                data : data
            })
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err
            })
        })
}




module.exports = {
    getBucketList,
    addBucketListItem, 
    randomBucketListItem,
    deleteBucketListItem,
    updateBucketListItem
}