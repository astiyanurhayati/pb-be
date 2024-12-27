import db from "../models/index.js";

const Address = db.Address;

export const createAddress = async (req, res) => {
    try {
        const { user_uuid, city, province, postal_code, address } = req.body;

        const newAddress = await Address.create({
            user_uuid,
            city,
            province,
            postal_code,
            address,
        });

        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({
            where: {
                user_uuid: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    as: "user",
                    
                },
            ],
        });

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { city, province, postal_code, address } = req.body;

        const existingAddress = await Address.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!existingAddress) {
            return res.status(404).json({ message: "Address not found!" });
        }

        await existingAddress.update({
            city,
            province,
            postal_code,
            address,
        });

        res.status(200).json(existingAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }

        await address.destroy();
        res.status(200).json({ message: "Address successfully deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
