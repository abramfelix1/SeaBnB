"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        //1
        ownerId: 2,
        address: "124 Conch Street",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 1.0,
        lng: 1.0,
        name: "Sponebob's Pineapple House",
        description:
          "Welcome to SpongeBob's Pineapple House! Immerse yourself in Bikini Bottom's vibrant world. Discover a nautical-themed living room, fully equipped kitchen, cozy bedroom, and quirky bathroom. Enjoy breathtaking views from the deck. Nearby attractions include the Krusty Krab and Jellyfish Fields. Book now for an unforgettable underwater adventure!",
        price: 123.0,
      },
      {
        //2
        ownerId: 3,
        address: "120 Conch Street",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 2.0,
        lng: 2.0,
        name: "Patrick's Rock",
        description:
          "Welcome to Patrick's Rock! Relax in Bikini Bottom's cozy starfish-shaped house. Enjoy a casual living room, functional kitchen, serene bedroom, and coastal-themed bathroom. Unwind on the rock-shaped patio. Close to Jellyfish Fields and the Krusty Krab. Book now for a carefree getaway!",
        price: 5.0,
      },
      {
        //3
        ownerId: 4,
        address: "124 Conch Street",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Squidward's Oasis",
        description:
          "Welcome to Squidward's Oasis! Experience sophistication and tranquility in Bikini Bottom's most refined octopus-inspired dwelling. Relax in the elegant living room, indulge in gourmet creations in the modern kitchen, rejuvenate in the luxurious bedroom, and revel in the chic bathroom. Immerse yourself in the artistic ambiance. Close to cultural hotspots and the Krusty Krab. Book now for an elevated underwater retreat!",
        price: 450.99,
      },
      {
        //4
        ownerId: 5,
        address: "15 Sand Rd",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Sandy's Tree Dome",
        description:
          "Welcome to Sandy's Tree Dome! Embrace the best of both worlds in this unique above-water oasis. Enjoy a spacious living area, fully equipped kitchen, comfortable bedroom, and modern bathroom. Step outside to a private backyard for outdoor adventures. Close to Goo Lagoon and Jellyfish Fields. Book now for a perfect blend of land and sea!",
        price: 321.5,
      },
      {
        //5
        ownerId: 6,
        address: "2219 Anchor St",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Mr. Krabs' Anchor",
        description:
          "Welcome to Mr. Krabs' Anchor House! Dive into a maritime haven with a touch of luxury. Experience the opulent living room, savor seafood delights in the gourmet kitchen, rest in the lavish bedroom, and indulge in the exquisite bathroom. Enjoy panoramic views from the rooftop deck. Close to the Krusty Krab and treasure-hunting spots. Book now for a priceless underwater getaway!",
        price: 4999.99,
      },
      {
        //6
        ownerId: 7,
        address: "1000 Sand Rd",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "The Chum Bucket",
        description:
          "Welcome to Plankton's Chum Bucket! Discover a quirky hideaway in the heart of Bikini Bottom. Unleash your inner mad scientist in the laboratory, relax in the cozy living area, and experiment in the compact kitchen. The bedroom offers a compact yet comfortable space. Ideal for adventurous souls. Book now for an unconventional experience!",
        price: 799.99,
      },
      {
        //7
        ownerId: 8,
        address: "Ship Graveyard",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "The Flying Dutchman",
        description:
          "Welcome to the Flying Dutchman's Ship! Set sail on a ghostly adventure in this haunted vessel. Experience the eerie ambiance in the spectral cabin, gather around the cursed dining table, and rest in the ghostly quarters. Enjoy breathtaking views from the ghostly deck. Close to Davy Jones' Locker and haunted treasures. Book now for a spine-chilling nautical experience!",
        price: 300.0,
      },
      {
        //8
        ownerId: 9,
        address: "500 Sand Mountain",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Sand Mountain Home",
        description:
          "Welcome to the Sand Mountain Home! Embrace the sandy paradise in this beachfront getaway. Experience the open-concept living space, cook up a storm in the beach-inspired kitchen, and sleep to the soothing sound of the waves in the cozy bedroom. Lounge on the sun-soaked patio with ocean views. Close to Goo Lagoon and sandy adventures. Book now for a coastal retreat!",
        price: 265.0,
      },
      {
        //9
        ownerId: 9,
        address: "100 Downtown",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Shady Shoals",
        description:
          "Welcome to the Shady Shoals Home! Relax in this tranquil retirement community. Enjoy the cozy living room, prepare meals in the fully equipped kitchen, and rest in the comfortable bedroom. Take a dip in the community pool or play shuffleboard with fellow retirees. Close to Jellyfish Fields and the Salty Spitoon. Book now for a peaceful getaway!",
        price: 265.0,
      },
      {
        //10
        ownerId: 9,
        address: "400 Downtown",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Downtown House 1",
        description:
          "Welcome to Downtown Bikini Bottom Home! Immerse yourself in the vibrant city life of Bikini Bottom. Experience the modern living space, whip up meals in the stylish kitchen, and unwind in the trendy bedroom. Explore nearby attractions, dine at the Krusty Krab, or shop at Goo Lagoon Mall. Book now for an exciting urban getaway in the heart of SpongeBob's world!",
        price: 165.0,
      },
      {
        //11
        ownerId: 9,
        address: "367 Downtown",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Downtown House 2",
        description:
          "Welcome to Downtown Bikini Bottom Home! Immerse yourself in the vibrant city life of Bikini Bottom. Experience the modern living space, whip up meals in the stylish kitchen, and unwind in the trendy bedroom. Explore nearby attractions, dine at the Krusty Krab, or shop at Goo Lagoon Mall. Book now for an exciting urban getaway in the heart of SpongeBob's world!",
        price: 325.0,
      },
      {
        //12
        ownerId: 9,
        address: "390 Downtown",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Downtown House 3",
        description:
          "Welcome to Downtown Bikini Bottom Home! Immerse yourself in the vibrant city life of Bikini Bottom. Experience the modern living space, whip up meals in the stylish kitchen, and unwind in the trendy bedroom. Explore nearby attractions, dine at the Krusty Krab, or shop at Goo Lagoon Mall. Book now for an exciting urban getaway in the heart of SpongeBob's world!",
        price: 85.0,
      },
      {
        //13
        ownerId: 9,
        address: "410 Downtown",
        city: " Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States",
        lat: 3.0,
        lng: 3.0,
        name: "Downtown House 4",
        description:
          "Welcome to Downtown Bikini Bottom Home! Immerse yourself in the vibrant city life of Bikini Bottom. Experience the modern living space, whip up meals in the stylish kitchen, and unwind in the trendy bedroom. Explore nearby attractions, dine at the Krusty Krab, or shop at Goo Lagoon Mall. Book now for an exciting urban getaway in the heart of SpongeBob's world!",
        price: 115.0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
