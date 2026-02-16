const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');

router.get('/', auth, getEvents);
router.post('/', auth, role('organizer'), createEvent);
router.put('/:id', auth, role('organizer'), updateEvent);
router.delete('/:id', auth, role('organizer'), deleteEvent);
router.post('/:id/register', auth, registerForEvent);

module.exports = router;