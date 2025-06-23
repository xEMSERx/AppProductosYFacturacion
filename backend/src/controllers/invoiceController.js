const db = require('../config/db');

exports.createInvoice = (req, res) => {
  const { products, total_ars, total_usd, exchange_rate } = req.body;
  const date = new Date();

  db.query(
    'INSERT INTO invoices (fecha, total_ars, total_usd, tipo_de_cambio) VALUES (?, ?, ?, ?)',
    [date, total_ars, total_usd, exchange_rate],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      const invoiceId = result.insertId;

      const values = products.map(p => [invoiceId, p.id, p.nombre, p.cantidad, p.precio]);
      db.query(
        'INSERT INTO invoice_products (id_factura, id_producto, nombre, cantidad, precio_unitario) VALUES ?',
        [values],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2 });
          res.status(201).json({ message: 'Invoice saved', invoiceId });
        }
      );
    }
  );
};