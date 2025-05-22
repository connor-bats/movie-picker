const express = require('express')
const router = express.Router()
const { getBucketList, addBucketListItem, randomBucketListItem, deleteBucketListItem, updateBucketListItem} = require('../controllers/bucketlist_controller')

router.get('/getAllItems', getBucketList);
router.post('/addItem', addBucketListItem);
router.get('/randomItem', randomBucketListItem);
router.delete('/deleteItem', deleteBucketListItem);
router.patch('/updateItem', updateBucketListItem);

module.exports = router