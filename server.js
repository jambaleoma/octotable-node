const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importiamo i router delle API
const widgetRoutes = require("./routes/widgets");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/widgets", widgetRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione su http://localhost:${PORT}`);
});
