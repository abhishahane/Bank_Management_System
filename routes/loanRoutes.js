const { Router } = require('express');
const loanController = require('../controllers/loanController');
const { requireAuth } = require('../middleware/auth');

const router = Router();

// //loan routes
router.post('/loan', requireAuth, loanController.applyLoan_post);
router.get('/loan', requireAuth, loanController.getLoans);
// router.delete('/loan/:id', requireAuth, loanController.deleteLoan);
// router.put('/loan/:id', requireAuth, loanController.updateLoan);

module.exports = router;
