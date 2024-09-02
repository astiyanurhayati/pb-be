import db from "../models/index.js";

const Shipment = db.Shipment;

export const createShipment = async (req, res) => {
  try {
    const { purchase_uuid, user_uuid, status, date } = req.body;

    const shipment = await Shipment.create({
      purchase_uuid,
      user_uuid,
      status,
      date,
    });

    res.status(201).json(shipment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll();

    res.status(200).json(shipments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment tidak ditemukan!" });
    }

    res.status(200).json(shipment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateShipment = async (req, res) => {
  try {
    const { purchase_uuid, user_uuid, status, date } = req.body;

    const shipment = await Shipment.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment tidak ditemukan!" });
    }

    await shipment.update({
      purchase_uuid,
      user_uuid,
      status,
      date,
    });

    res.status(201).json(shipment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment tidak ditemukan!" });
    }

    await shipment.destroy();
    res.status(200).json({ message: "Berhasil menghapus shipment!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
