import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Support __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

app.use(
  '/leaflet',
  express.static(path.join(__dirname, 'node_modules/leaflet/dist'))
);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
