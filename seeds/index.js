const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "5ffa6d9ab6b62826b89b5f2e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/ddr8z9vfc/image/upload/v1609939331/YelpCamp/d6ppignvz046hsdzxnn4.jpg",
          filename: "YelpCamp/d6ppignvz046hsdzxnn4",
        },
        {
          url:
            "https://res.cloudinary.com/ddr8z9vfc/image/upload/v1609939128/YelpCamp/jdgfpimg2h2tvlek0vpu.jpg",
          filename: "YelpCamp/jdgfpimg2h2tvlek0vpu.jpg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A nam hic ipsam error, tempora, molestias amet consectetur voluptatem tempore sequi voluptatibus cumque et unde illo repellendus doloremque! Sunt, repellendus omnis.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
