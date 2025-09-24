import dotenv from "dotenv";
dotenv.config();


export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City Is Required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json({ error: data.message });
  }
}