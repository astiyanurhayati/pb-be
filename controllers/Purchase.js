import db from "../models/index.js";
import midtransClient from 'midtrans-client';
const { Snap } = midtransClient;
import CryptoJS from "crypto-js";


const Purchase = db.Purchase;
const PurchaseTemp = db.PurchaseTemp;

const snap = new Snap({
    isProduction: false, // Gunakan true jika di production
    serverKey: process.env.SERVER_KEY_MIDTRANS,
    clientKey: process.env.CLIENT_KEY_MIDTRANS,
});

export const createPurchase = async (req, res) => {
  try {
    const { design_uuid, user_uuid, status, shipping, name, postal_code, address, city  } = req.body;

    const purchase = await Purchase.create({
      design_uuid,
      user_uuid,
      status,
      shipping,
      name,
      date: new Date(),
      postal_code,
      address,
      city
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll(
      {
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
      }
    );

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

export const getUserPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: {
        user_uuid: req.params.id,
      },
    });

    return res.status(200).json(purchases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


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

export const paymentMethods = async(req, res) => {
  const {
    order_id,
    gross_amount,
    customer_details,
    hmacRequest,
    purchaseData
  } =req.body;
  try {
      const data = `${order_id}:${Number(gross_amount)}`;
      const hmac = CryptoJS.HmacSHA256(data, process.env.HMAC_SECRET_KEY).toString();

      // compare hmac with hmacrequest
      if(hmac !== hmacRequest) {
        return res.status(400).json({message: "Encryption not valid"});
      }
      
      // create data temporary order
      await PurchaseTemp.create(purchaseData)

      const transactionPayload = {
          transaction_details: {
              order_id,
              gross_amount,
          },
          customer_details,
          expiry: {
              start_time: new Date().toISOString().replace('T', ' ').split('.')[0] + ' +0000',
              unit: "days",
              duration: 1,
          },
      };

      const transaction = await snap.createTransaction(transactionPayload);
      
      return res.status(200).json({
        data: {
          token: transaction.token,
        }
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


export const doProccessWebhookMidtrans = async(req, res)=>{
  const webhookData = req.body;
  try {
    if(webhookData.transaction_status === 'settlement') {
      const orderDataTemp = await PurchaseTemp.findOne({
        where:{
          order_id: webhookData.order_id
        }
      });
      if(!orderDataTemp) return res.status(400).json({message: "Something wrong when search order data"}); 
      
      // create purchase data from temp
      await Purchase.create({
        ...orderDataTemp.dataValues,
        status: "Waiting Confirmation",
        amount:webhookData.gross_amount
      });

      // Then delete data temporary
      orderDataTemp.destroy()
      return res.status(200).json({message: "Webhook received!"})      
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}