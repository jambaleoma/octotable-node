const express = require("express");
const router = express.Router();
const widgetController = require("../controllers/widgetController");

// Definizione delle route per i Widgets
router.get("/", widgetController.getAllWidgets);
router.get("/:id", widgetController.getWidgetById);
router.post("/", widgetController.createWidget);
router.put("/:id", widgetController.updateWidget);
router.delete("/:id", widgetController.deleteWidget);

module.exports = router;
