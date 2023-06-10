"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        //1
        review:
          "Wow, SpongeBob's Pineapple House was like a dream come true! The colorful decor made me feel right at home. The bubble-shaped chairs were perfect for my lounging needs. The jellyfish-shaped lights added a whimsical touch. The views from the deck were breathtaking. I highly recommend staying here for an underwater adventure!",
        stars: 5,
      },
      {
        //2
        review:
          "Squidward's Oasis was...interesting. The fancy decor and sophisticated vibe were a bit too fancy for me, but the seashell-shaped sofas were comfy. The bathroom was nice, but I couldn't find any coral bits in the kitchen. Overall, it's a classy place, just not my cup of tea. Squidward seemed happy, though!",
        stars: 4,
      },
      {
        //3
        review:
          "Sandy's Tree Dome was the coolest place ever! It was like being in two worlds at once. The living area was spacious, and the kitchen had everything we needed for squirrel-sized adventures. The bedroom was cozy and comfy. And the backyard, wow! So much fun! It's the perfect mix of land and sea. Sandy knows how to make a great home!",
        stars: 5,
      },
      {
        //4
        review:
          "Mr. Krabs' Anchor House was a treasure trove! The living room was so fancy, I was afraid to touch anything. The kitchen had the best seafood ever, but it was a bit pricey. The bedroom was fit for a captain, and the rooftop deck had amazing views! It's a bit expensive, but hey, it's Mr. Krabs we're talking about. Worth it for a taste of the high life!",
        stars: 5,
      },
      {
        //5
        review:
          "Plankton's Chum Bucket was a weird experience, but in a good way! The lab was full of crazy gadgets, and the living area had a quirky charm. The kitchen was small, but Plankton cooked up some interesting meals. The bedroom was cozy, but I couldn't stop thinking about the secret formula. Definitely a unique stay for those who love a bit of chaos!",
        stars: 4,
      },
      {
        //6
        review:
          "Flying Dutchman's Ship was the spookiest adventure! The ghostly cabin had an eerie vibe, but the dining table was perfect for a spectral feast. The ghostly quarters had a surprisingly comfortable bed. The deck had breathtaking views, but it was a bit cold and foggy. Definitely a unique stay for thrill-seekers, just watch out for ghostly surprises!",
        stars: 3,
      },
      {
        //7
        review:
          "Sand Mountain Home was the ultimate sandy paradise! The open-concept living space was perfect for sand castle building. The beach-inspired kitchen had all the tools for sandy snacks. Falling asleep to the sound of waves in the cozy bedroom was amazing. The sun-soaked patio was great for tanning. Close to Goo Lagoon, it's a dream beach getaway!",
        stars: 5,
      },
      {
        //8
        review:
          "Shady Shoals Home was the perfect place to relax and unwind! The cozy living room was great for napping. The kitchen had everything I needed to make my favorite rock-shaped snacks. The comfortable bedroom helped me sleep like a starfish. The community pool was refreshing, and shuffleboard was a blast. A peaceful getaway for retirees and anyone seeking tranquility!",
        stars: 4,
      },
      {
        //9
        review:
          "Patrick's Rock was the ultimate chill spot! The laid-back vibe and seashell sofas were perfect for hanging out. The kitchen had everything we needed for jellyfishing snacks. The bedroom was cozy, just like a warm hug from Patrick. The backyard was a sandy playground. It's the best place for carefree fun and spending time with your best buddy. Rock on, Patrick!",
        stars: 5,
      },
      {
        //10
        review:
          "Squidward's Oasis was like a sophisticated underwater paradise! The elegant decor and artwork were inspiring. The living room was so fancy, I felt like a refined sponge. The kitchen had all the utensils for culinary creativity. The luxurious bedroom was a serene escape. It's a classy retreat for those who appreciate the finer things. Squidward's taste is as impeccable as his clarinet skills!",
        stars: 5,
      },
      {
        //11
        review:
          "Sandy's Tree Dome was the perfect blend of land and sea! The spacious living area made me feel right at home. The beach-inspired kitchen had all the tools for undersea cooking adventures. The bedroom was cozy, like a sandy slumber party. The backyard was a playground of excitement. It's the ideal place for outdoor fun and scientific discoveries. Thanks, Sandy, for an unforgettable stay!",
        stars: 5,
      },
      {
        //12
        review:
          "Mr. Krabs' Anchor House was a treasure trove of fun! The living room was filled with nautical charm and money-saving tips. The kitchen had everything for a Krabby Patty feast. The bedroom was cozy, just like a warm hug from me money. The rooftop deck had amazing views of Bikini Bottom. It's a bit pricey, but worth every penny for a taste of the Krusty Krab life!",
        stars: 4,
      },
      {
        //13
        review:
          "Plankton's Chum Bucket was a quirky and exciting adventure! The lab had all sorts of wild inventions. The living area had a unique charm, even though it was a bit small. The kitchen served up interesting chum cuisine. The bedroom was cozy, but I couldn't stop thinking about the secret formula. Definitely an unconventional stay for those who crave a taste of chaos and creativity!",
        stars: 3,
      },
      {
        //14
        review:
          "Flying Dutchman's Ship was the spookiest and most thrilling experience ever! The ghostly cabin had an eerie charm. The dining table had a ghostly feast atmosphere. The quarters were surprisingly cozy, considering the ghostly aura. The deck offered breathtaking views, even if it was a bit misty. A unique stay for adventurers seeking a hauntingly good time! Just watch out for the Flying Dutchman's tricks!",
        stars: 4,
      },
      {
        //15
        review:
          "Sand Mountain Home was an absolute sandy paradise! The open-concept living space made me feel like I was on a never-ending beach day. The beach-inspired kitchen had everything I needed for sandy snacks. The cozy bedroom let me sleep to the soothing sound of waves. The sun-soaked patio was perfect for sandy adventures. Close to Goo Lagoon, it's a dream come true for beach-loving sponge! I can't wait to come back!",
        stars: 5,
      },
      {
        //16
        review:
          "Shady Shoals Home was a peaceful and rejuvenating retreat! The cozy living room was perfect for relaxation. The kitchen had all the essentials for preparing snacks. The bedroom provided a comfortable night's sleep. The community pool was refreshing, and shuffleboard added a fun touch. A serene getaway for anyone seeking tranquility and a break from the jellyfishing adventures of Bikini Bottom!",
        stars: 5,
      },
      {
        //17
        review:
          "SpongeBob's Pineapple House was an absolute nightmare! The bright and garish decor assaulted my senses. The living room was a chaotic mess, the kitchen was a disaster zone, and the bedroom was an explosion of SpongeBob's eccentricities. The constant laughter from neighbors was unbearable. This place is not for anyone seeking peace and quiet. I would never recommend it to my worst enemy!",
        stars: 1,
      },
      {
        //18
        review:
          "Patrick's Rock was a complete disaster! The lack of any proper furniture or basic amenities was absurd. The living room consisted of nothing but rocks, the kitchen was non-existent, and the bedroom was just a pile of sand. The constant smell of jellyfish jelly was nauseating. This place is an absolute nightmare for anyone with a sense of taste and refinement. Avoid at all costs!",
        stars: 1,
      },
      {
        //19
        review:
          "Sandy's Tree Dome was an...interesting experience. The constant presence of sand made it challenging to keep a clean and tidy living space. The unconventional furniture and high-tech gadgets in the kitchen were not to my taste. However, I must admit, the unique concept and closeness to nature could appeal to those seeking a rustic and adventurous stay. It's definitely not for those who prefer a more refined and comfortable environment.",
        stars: 3,
      },
      {
        //20
        review:
          "Mr. Krabs' Anchor House was an...interesting choice. The constant penny-pinching atmosphere was suffocating. The overly simplistic living room lacked any sense of comfort or style. The kitchen, while equipped, was dominated by a focus on cheap ingredients. This place is ideal for those solely concerned with saving a few coins, but not recommended for anyone seeking a tasteful and enjoyable vacation.",
        stars: 2,
      },
      {
        //21
        review:
          "Plankton's Chum Bucket was a unique experience, to say the least. The cramped and chaotic space left much to be desired. The constant smell of chum was overwhelming and unpleasant. The lack of any decent amenities or comforts made it difficult to relax. This place might appeal to those with a taste for chaos, but it's definitely not suited for anyone seeking a peaceful and comfortable getaway.",
        stars: 2,
      },
      {
        //22
        review:
          "The Flying Dutchman's Ship was a haunting experience I'd rather forget. The ghostly atmosphere was unsettling, and the constant tricks and scares were exhausting. The lack of any comfortable accommodations made it impossible to relax. This place might appeal to thrill-seekers, but for those seeking a peaceful and comfortable retreat, look elsewhere. It's definitely not for the faint of heart or those seeking a serene getaway.",
        stars: 1,
      },
      {
        //23
        review:
          "Sand Mountain Home was surprisingly tolerable. The open-concept living space had a certain charm, and the beach-inspired kitchen, though basic, had its own rustic appeal. The cozy bedroom provided a decent night's rest. While the sandy surroundings weren't my ideal, the sun-soaked patio offered a pleasant spot for relaxation. Suitable for those seeking a beach getaway, but perhaps not for those with a refined taste.",
        stars: 4,
      },
      {
        //24
        review:
          "Shady Shoals Home was an underwhelming experience. The community-oriented atmosphere was a bit too friendly for my taste. The living room lacked any sense of style or sophistication. The amenities were basic and uninspiring. It might suit retirees looking for a peaceful retreat, but for anyone seeking excitement or a vibrant atmosphere, this place falls short. Not my ideal choice for a memorable vacation.",
        stars: 3,
      },
      {
        //25
        review:
          "SpongeBob's Pineapple House was an absolute delight! The vibrant decor and cheerful ambiance perfectly matched SpongeBob's personality. The bubble-shaped chairs were a fun touch. The fully equipped kitchen allowed for Krabby Patty adventures. The bedroom was cozy and filled with whimsical charm. The deck offered stunning views. A joyful and unforgettable stay in SpongeBob's world!",
        stars: 5,
      },
      {
        //26
        review:
          "Patrick's Rock was a laid-back haven! The simplicity of the rock-shaped abode was surprisingly calming. The absence of fancy furnishings allowed for true relaxation. The cozy living space provided a tranquil retreat. Close to nature, it offered a peaceful escape from the hustle and bustle of Bikini Bottom. Perfect for those seeking a carefree and uncomplicated stay!",
        stars: 4,
      },
      {
        //27
        review:
          "Squidward's Oasis had a unique charm. The sophisticated decor and artistic ambiance created an interesting contrast. The living room offered a refined space to unwind. The kitchen, though small, had its own elegance. The bedroom provided a peaceful sanctuary. It's a place for those seeking a touch of sophistication in Bikini Bottom, with a hint of SpongeBob's whimsy.",
        stars: 4,
      },
      {
        //28
        review:
          "Mr. Krabs' Anchor House was a fascinating experience! The nautical-themed decor captured the essence of Bikini Bottom. The living room had a cozy charm, and the kitchen, while simple, had all the essentials. The bedroom provided a comfortable rest. The rooftop deck offered breathtaking views. It's a place for those who appreciate the maritime spirit and want to immerse themselves in Mr. Krabs' world!",
        stars: 4,
      },
      {
        //29
        review:
          "Plankton's Chum Bucket was a disappointment. The cramped space and overpowering smell of chum made it unbearable. The lack of proper amenities or comfort made for a challenging stay. Not recommended for anyone seeking a pleasant vacation experience. It might appeal to those with a taste for chaos, but for those seeking cleanliness and convenience, look elsewhere.",
        stars: 1,
      },
      {
        //30
        review:
          "The Flying Dutchman's Ship was a terrifying nightmare. The constant ghostly presence and unsettling atmosphere were too much to handle. The lack of any basic comforts or amenities made it impossible to relax. Not recommended for anyone seeking a peaceful and enjoyable stay. Only suitable for thrill-seekers or those who enjoy being frightened. Proceed with caution!",
        stars: 1,
      },
      {
        //31
        review:
          "Sand Mountain Home was an absolute beach lover's paradise! The open-concept living space allowed for easy movement and a carefree vibe. The beach-inspired kitchen was perfect for whipping up sandy snacks. The cozy bedroom ensured a peaceful night's sleep. The sun-soaked patio offered a delightful spot to soak up the rays. Close to Goo Lagoon, it's a dream come true for sandy adventures!",
        stars: 1,
      },
      {
        //32
        review:
          "Shady Shoals Home was a tranquil retreat! The community atmosphere created a friendly and welcoming environment. The cozy living room provided a comfortable space to relax. The amenities were basic yet functional. The community pool offered a refreshing escape. Ideal for retirees or those seeking a peaceful getaway. It's a place to unwind and enjoy the serene surroundings of Bikini Bottom!",
        stars: 5,
      },
      {
        //33
        review:
          "SpongeBob's Pineapple House was... interesting. The vibrant and cheerful decor was a bit overwhelming for my taste. The living room had a lively atmosphere, but the bubble-shaped chairs seemed more playful than practical. The kitchen, however, was equipped with everything needed for cooking up a profitable meal. It's a unique stay that perfectly embodies SpongeBob's exuberant personality.",
        stars: 5,
      },
      {
        //34
        review:
          "Patrick's Rock was a disaster! The complete lack of any proper amenities or furnishings was utterly disappointing. The absence of a functional kitchen made it impossible to prepare a decent meal. The living space consisted of nothing but rocks, providing no comfort whatsoever. This place is not suitable for anyone seeking a comfortable and enjoyable stay. Don't waste your hard-earned money on this rock!",
        stars: 1,
      },
      {
        //35
        review:
          "Squidward's Oasis was surprisingly decent. The sophisticated decor and artistic touches added a touch of class. The living room was comfortable enough for a relaxing evening. The kitchen, while lacking a bit in size, had the essentials for a good meal. The bedroom provided a quiet escape. It's a place for those seeking a more refined stay in Bikini Bottom, with a hint of SpongeBob's whimsy.",
        stars: 4,
      },
      {
        //36
        review:
          "Sandy's Tree Dome was an intriguing experience! The unique blend of land and sea was a refreshing change. The living space had a rustic charm that reminded me of my Krusty Krab days. The kitchen, though specialized for a squirrel, was surprisingly functional. The bedroom offered a cozy retreat. It's a place for nature lovers and those seeking a different kind of coastal adventure.",
        stars: 4,
      },
      {
        //37
        review:
          "Plankton's Chum Bucket was a disaster! The cramped space and overpowering smell of chum made it unbearable. The lack of any decent amenities or comfort was downright disappointing. Not recommended for anyone seeking a pleasant stay or a decent meal. It's a place to avoid if you value your taste buds and sanity. Don't waste your money on this sorry excuse for a home!",
        stars: 4,
      },
      {
        //38
        review:
          "The Flying Dutchman's Ship was a horrifying nightmare! The constant ghostly presence and eerie atmosphere were unbearable. The lack of any creature comforts or basic necessities made it impossible to enjoy a decent stay. Not recommended for anyone seeking a peaceful or pleasant experience. Only suitable for those with a morbid fascination or a love for fright. Stay away if you value your sanity!",
        stars: 1,
      },
      {
        //39
        review:
          "Sand Mountain Home was an absolute treasure trove! The open-concept living space was perfect for a quick getaway. The beach-inspired kitchen allowed for tasty seafood creations. The cozy bedroom ensured a good night's sleep. The sun-soaked patio provided a delightful spot to soak up the sun. Close to Goo Lagoon, it's a golden opportunity for sandy adventures! Worth every penny!",
        stars: 4,
      },
      {
        //40
        review:
          "Shady Shoals Home was an average stay. The community atmosphere had its charms, but the living space lacked the luxurious touch I prefer. The amenities were decent, but nothing stood out as exceptional. Suitable for retirees or those seeking a peaceful retreat, but not the kind of place that would make me dive into my treasure chest. Decent, but not remarkable.",
        stars: 4,
      },
      {
        //41
        review:
          "SpongeBob's Pineapple House was an annoyance! The vibrant decor and constant laughter were enough to drive any scheming mastermind mad. The kitchen, though equipped, lacked the technology I need. The bedroom was like sleeping in a clown's nightmare. SpongeBob and his wife Karen's presence was overwhelming. Not recommended for those seeking peace and quiet or privacy. Stick to your own plans!",
        stars: 2,
      },
      {
        //42
        review:
          "Patrick's Rock was an absolute disaster! The lack of any basic amenities or intelligent conversation made it unbearable. The kitchen was nonexistent, leaving no hope for a decent meal. The bedroom was as empty as my success rate against Krabs. SpongeBob and his wife Karen's absence was a blessing. Not recommended for anyone seeking a comfortable or stimulating stay. Total waste of my time!",
        stars: 2,
      },
      {
        //43
        review:
          "Squidward's Oasis was... tolerable. The sophisticated decor and artistic ambiance were mildly interesting. The living room provided a subdued escape from Bikini Bottom chaos. The kitchen, though lacking in culinary innovation, had the essentials. The bedroom offered a quiet respite. SpongeBob and his wife Karen's absence was a relief. It's a place for those seeking a touch of refinement, but not exactly a thrilling escape for a tiny genius like me.",
        stars: 3,
      },
      {
        //44
        review:
          "Sandy's Tree Dome was an interesting experience. The land and sea concept offered a unique twist. The living space, though unfamiliar to a creature of the deep, had its own rustic charm. The kitchen, designed for a land-dwelling squirrel, had limited use for me. The bedroom provided a decent rest. SpongeBob and his wife Karen's absence was both a relief and a disappointment. Suitable for nature enthusiasts, but not particularly advantageous for a cunning strategist like me.",
        stars: 3,
      },
      {
        //45
        review:
          "Krabs' Anchor House was a disaster! The excessive penny-pinching atmosphere was suffocating. The living room was more about showcasing his obsession with money than providing any comfort. The kitchen lacked any trace of culinary expertise. The bedroom had no respite from the constant clinking of coins. SpongeBob and his wife Karen's presence was a constant reminder of the secret formula's vulnerability. Not recommended for anyone seeking a relaxing or secure stay. Better off finding a place with tighter security!",
        stars: 1,
      },
      {
        //46
        review:
          "The Flying Dutchman's Ship was a hauntingly good experience! The ghostly ambiance and eerie atmosphere added a thrilling touch. The living space, though unconventional, had a mysterious charm. The kitchen, though lacking my ideal equipment, had a certain otherworldly allure. The bedroom provided a restful night's sleep, with just the right amount of spooky vibes. SpongeBob and his wife Karen's absence was a relief, allowing for a truly immersive ghostly adventure. Highly recommended for thrill-seekers and those seeking a unique stay!",
        stars: 5,
      },
      {
        //47
        review:
          "Sand Mountain Home was a decent experience. The open-concept living space, though not tailored to my size, offered a unique beachy charm. The kitchen, while more suited for sandy snacks than scientific experiments, had the essentials. The bedroom provided a comfortable enough rest. SpongeBob and his wife Karen's absence was a plus. It's a place for those seeking a sandy getaway, but not particularly advantageous for a mastermind like me. Keep searching for a better strategic hideout!",
        stars: 3,
      },
      {
        //48
        review:
          "Shady Shoals Home was a decent retreat. The community atmosphere had its perks, offering a sense of camaraderie. The living space, though not luxurious, provided a comfortable enough stay. The amenities were basic but functional. SpongeBob and his wife Karen's absence was a relief. Suitable for those seeking a peaceful and relaxed environment. It's a place to unwind and enjoy the company of fellow retirees. Just be prepared for a slower pace of life.",
        stars: 3,
      },
      {
        //49
        review:
          "SpongeBob's Pineapple House was a pathetic excuse for accommodations. As the mighty Flying Dutchman, I couldn't even fit inside that tiny dwelling! There was nothing of use for a ghostly being like me, and the furnishings were downright bizarre. SpongeBob clearly has no understanding of the needs of a supernatural creature. A complete waste of my time and a terrible choice for anyone seeking a suitable place to haunt.",
        stars: 2,
      },
      {
        //50
        review:
          "Patrick's Rock was a laughable attempt at providing suitable accommodations. As the mighty Flying Dutchman, I couldn't even squeeze my pinky toe into that minuscule rock! There was nothing of use for a ghostly being like me, and the furnishings were a haphazard mess. Patrick clearly has no understanding of the needs of supernatural guests. A complete waste of time and an embarrassment for anyone seeking a proper haunt.",
        stars: 1,
      },
      {
        //51
        review:
          "Squidward's Oasis was a pitiful excuse for a home. As the mighty Flying Dutchman, I couldn't even fit one tentacle inside that puny abode! There was nothing of use for a ghostly being like me, and the furnishings were ridiculously pretentious. Squidward clearly has no clue about the needs of supernatural guests. A complete waste of time and an insult to anyone seeking proper accommodations for a haunting presence.",
        stars: 1,
      },
      {
        //52
        review:
          "Sandy's Tree Dome was an absolute joke! As the mighty Flying Dutchman, I couldn't even squeeze one ghostly toe into that oversized acorn! There was nothing of use for a supernatural being like me, and the furnishings were just plain bizarre. Sandy clearly has no understanding of the needs of ghostly guests. A total waste of time and an embarrassment for anyone seeking proper accommodations for a haunting presence.",
        stars: 2,
      },
      {
        //53
        review:
          "Krabs' Anchor House was a surprisingly decent stay. The anchor-inspired decor caught my attention and added a touch of nostalgia. The living space was compact but cozy, offering a comfortable retreat. The kitchen had the essentials for a ghostly meal. SpongeBob's absence was a pleasant surprise. Suitable for those seeking a seafaring atmosphere. The anchor theme added a charming touch for a spectral guest like me.",
        stars: 4,
      },
      {
        //54
        review:
          "Plankton's Chum Bucket was an intriguing experience. As the mighty Flying Dutchman, I towered over the small establishment. The confusing technology and microscopic amenities left me scratching my ethereal head. However, the sheer ambition and determination of Plankton impressed me. Despite the size constraints, it's a testament to his tenacity. A unique stay for those seeking a glimpse into the world of a small-time schemer.",
        stars: 3,
      },
      {
        //55
        review:
          "Sand Mountain Home was a pathetic attempt at accommodating a ghostly being like myself. As the mighty Flying Dutchman, I couldn't even fit one toe inside that tiny sandcastle! There was nothing of use for someone of my supernatural stature, and the furnishings were utterly bizarre. Clearly, this place is better suited for land-dwellers. A complete waste of time for anyone seeking proper accommodations for a haunting presence.",
        stars: 3,
      },
      {
        //56
        review:
          "Shady Shoals Home was a laughable attempt at accommodating a ghostly being like me. As the mighty Flying Dutchman, I could hardly squeeze through the miniature door! There was nothing of use for someone of my supernatural stature, and the furnishings were downright absurd. This place is clearly meant for retirees, not spectral beings. A disappointing stay that left me feeling cramped and underwhelmed.",
        stars: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
