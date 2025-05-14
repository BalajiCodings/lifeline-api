import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
    try {
        const { name, phone, relation } = req.body;
        const contact = await Contact.create({
            user: req.user.userId,
            name,
            phone,
            relation
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Failed to create contact balaji" });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.userId });
        res.json(contacts);
    } catch (err) {
        res.status(500).json("Failed to fetch contacts");
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: "Failed to update contact" });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        }); 
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete contact" });
    }
};