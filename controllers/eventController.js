const Event = require('../models/event');
const { sendRegistrationEmail } = require('../services/emailService');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  const events = await Event.find().populate('organizer participants', 'name email');
  res.json(events);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.organizer.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });

  Object.assign(event, req.body);
  await event.save();

  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.organizer.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });

  await event.deleteOne();
  res.json({ message: 'Event removed' });
};

exports.registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.participants.includes(req.user._id))
    return res.status(400).json({ message: 'Already registered' });

  event.participants.push(req.user._id);
  await event.save();

  await sendRegistrationEmail(req.user.email, event.title);

  res.json({ message: 'Registered successfully' });
};