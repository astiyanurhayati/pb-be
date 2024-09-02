import db from "../models/index.js"; 

const Purchase = db.Purchase;

export const createPurchase = async (req, res) => {
  try {
    const { design_uuid, user_uuid, status, date } = req.body;

    const purchase = await Purchase.create({
      design_uuid,
      user_uuid,
      status,
      date,
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found!" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const { design_uuid, user_uuid, status, date } = req.body;

    const purchase = await Purchase.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found!" });
    }

    await purchase.update({
      design_uuid,
      user_uuid,
      status,
      date,
    });

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found!" });
    }

    await purchase.destroy();
    res.status(200).json({ message: "Purchase successfully deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
