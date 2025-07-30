const mongoose = require("mongoose");
const Listing = require("../models/listing");
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  await updateListingsWithGeometry();
  mongoose.connection.close();
}

async function updateListingsWithGeometry() {
  const listings = await Listing.find({ geometry: { $exists: false } }); // only those without geometry

  for (let listing of listings) {
    try {
      const geoData = await geocodingClient
        .forwardGeocode({
          query: listing.location,
          limit: 1,
        })
        .send();

      const geometry = geoData.body.features[0]?.geometry;

      if (geometry) {
        listing.geometry = geometry;
        await listing.save();
        console.log(`Updated: ${listing.title} (${listing.location})`);
      } else {
        console.warn(`No geometry found for: ${listing.title}`);
      }
    } catch (err) {
      console.error(`Error updating ${listing.title}:`, err.message);
    }
  }

  console.log("All listings updated.");
}
