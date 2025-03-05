const { addTable, updateTable, getTable } = require('../controllers/table.Controller');
const { isVerifiedUser } = require('../middleware/tokenVerification');

const router = require('express').Router();

router.post('/',isVerifiedUser, addTable);
router.get('/',isVerifiedUser, getTable);
router.put('/:id',isVerifiedUser, updateTable)

module.exports = router;

