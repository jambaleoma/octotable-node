const fs = require("fs");
const path = require("path");

const WIDGETS_FILE = path.join(__dirname, "../data/widgets.json");

// Funzione per leggere il file JSON
const readWidgets = () => {
  try {
    const data = fs.readFileSync(WIDGETS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Errore nella lettura del file JSON:", error);
    return [];
  }
};

// Funzione per scrivere nel file JSON
const writeWidgets = (widgets) => {
  try {
    fs.writeFileSync(WIDGETS_FILE, JSON.stringify(widgets, null, 2), "utf8");
    console.log("✅ Dati salvati nel file widgets.json");
  } catch (error) {
    console.error("❌ Errore nella scrittura del file JSON:", error);
  }
};

// Funzione per generare un ID casuale
const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

// ✅ Ottenere tutti i widgets
exports.getAllWidgets = (req, res) => {
  console.log("📌 [GET] Richiesta per ottenere tutti i widget");
  const widgets = readWidgets();
  res.json({ success: true, data: widgets });
};

// ✅ Ottenere un widget per ID
exports.getWidgetById = (req, res) => {
  const widgets = readWidgets();
  const id = parseInt(req.params.id);
  console.log(`📌 [GET] Richiesta per ottenere il widget con ID: ${id}`);

  const widget = widgets.find(w => w.id === id);
  if (widget) {
    console.log(`✅ Widget trovato: ${JSON.stringify(widget, null, 2)}`);
    res.json({ success: true, data: [widget] });
  } else {
    console.error(`❌ Errore: Widget con ID ${id} non trovato`);
    res.status(404).json({ success: false, data: [], error: { message: "Widget non trovato", code: 404 } });
  }
};

// ✅ Creare un nuovo widget con ID casuale
exports.createWidget = (req, res) => {
  const widgets = readWidgets();
  const newWidget = {
    id: generateRandomId(), 
    ...req.body
  };

  widgets.push(newWidget);
  writeWidgets(widgets);

  console.log("📌 [POST] Creazione nuovo widget:", newWidget);
  res.status(201).json({ success: true, data: [newWidget] });
};

// ✅ Modificare un widget
exports.updateWidget = (req, res) => {
  let widgets = readWidgets();
  const id = parseInt(req.params.id);
  console.log(`📌 [PUT] Richiesta per aggiornare il widget con ID: ${id}`);

  const index = widgets.findIndex(w => w.id === id);
  if (index !== -1) {
    widgets[index] = { ...widgets[index], ...req.body };
    writeWidgets(widgets);
    console.log(`✅ Widget aggiornato: ${JSON.stringify(widgets[index], null, 2)}`);
    res.json({ success: true, data: [widgets[index]] });
  } else {
    console.error(`❌ Errore: Widget con ID ${id} non trovato`);
    res.status(404).json({ success: false, data: [], error: { message: "Widget non trovato", code: 404 } });
  }
};

// ✅ Eliminare un widget
exports.deleteWidget = (req, res) => {
  let widgets = readWidgets();
  const id = parseInt(req.params.id);
  console.log(`📌 [DELETE] Richiesta per eliminare il widget con ID: ${id}`);

  const index = widgets.findIndex(w => w.id === id);
  if (index !== -1) {
    const deletedWidget = widgets.splice(index, 1);
    writeWidgets(widgets);
    console.log(`✅ Widget eliminato: ${JSON.stringify(deletedWidget, null, 2)}`);
    res.json({ success: true, data: deletedWidget });
  } else {
    console.error(`❌ Errore: Widget con ID ${id} non trovato`);
    res.status(404).json({ success: false, data: [], error: { message: "Widget non trovato", code: 404 } });
  }
};
