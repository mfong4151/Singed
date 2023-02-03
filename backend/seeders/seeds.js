const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const easySeeds = require('./easySeedsJS2');
const User = require('../models/User');
const Group = require('../models/Group');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');

// // Create users
// const users = [];

// users.push(
//   new User ({
//     username: 'asian_salty_noshellfish_onlyvegan',
//     email: 'asian_salty_noshellfish_onlyvegan@gmail.com',
//     hashedPassword: bcrypt.hashSync('password', 10),
//     flavorProfile: [0,1,0,0,0],
//     genre: [1,0,0,0],
//     allergies: [false, false, true],
//     diet: [false, false, true],
//     groupIds: [1]
//   })
// )

// users.push(
//   new User ({
//     username: 'american_sweet_nofish_nan',
//     email: 'american_sweet_nofish_nan@gmail.com',
//     hashedPassword: bcrypt.hashSync('password', 10),
//     flavorProfile: [0,0,0,0,1],
//     genre: [0,1,0,0],
//     allergies: [true, false, false],
//     diet: [false, false, false],
//     groupIds: [1]
//   })
// )

// // Create groups
// const groups = [];
// groups.push(
//   new Group({
//     name: 'test group',
//     flavorProfile: [5,5,5,5,5],
//     genre: [1,0,0,0],
//     allergies: [true, false, true],
//     diet: [true, true, false],
//     userIds: [users[0]._id, users[1]._id]
//   })
// )

// // Create restaurants
// const restaurantRelativePath = 'seed_files/restaurant_seeds.csv'
// // const restaurantsRaw = easySeeds.formatSeeds(`./${restaurantRelativePath}`) // local
// // const restaurantsRaw = easySeeds.formatSeeds(process.cwd().concat(`/seeders/seed_files/restaurant_seeds.csv`))
// const restaurantsRaw = easySeeds.formatSeeds(process.cwd().concat(`/backend/seeders/${restaurantRelativePath}`)) // render
// restaurantsImageUrls = [
//   'https://source.unsplash.com/HvhinFxq4_s',
//   'https://source.unsplash.com/tCBJQSj11os',
//   'https://source.unsplash.com/YBfbVXvUsog',
//   'https://source.unsplash.com/OkhcMbf3vQ0',
//   'https://source.unsplash.com/o_XkavUaGEw',
//   'https://source.unsplash.com/GkVVDr2U1I8',
//   'https://source.unsplash.com/o3_hQkTvcB8',
//   'https://source.unsplash.com/VLdwMOp6K5g',
//   'https://source.unsplash.com/PjPpj2fsSfI',
//   'https://source.unsplash.com/G67R_ZRRNKk',
//   'https://source.unsplash.com/dTp7Kw51g0o',
//   'https://source.unsplash.com/r0DMK-9HVWk',
//   'https://source.unsplash.com/j5GMGjk1yo0',
//   'https://source.unsplash.com/xzTP4w1X2pk',
//   'https://source.unsplash.com/RRua5nyP9_Q',
//   'https://source.unsplash.com/DIyJHmsppmA',
//   'https://source.unsplash.com/0fPNdlxaDpg',
//   'https://source.unsplash.com/IjXZbIQ5e4w',
//   'https://source.unsplash.com/PQJ2TfARs1w'
// ]
// const restaurants = []
// for (let i = 0; i < restaurantsRaw.length; i++) {
//   restaurants.push(
//     new Restaurant({
//       name: restaurantsRaw[i][0],
//       address: restaurantsRaw[i][1],
//       rating: restaurantsRaw[i][2],
//       city: restaurantsRaw[i][3],
//       stateCode: restaurantsRaw[i][4],
//       longitude: restaurantsRaw[i][5],
//       latitude: restaurantsRaw[i][6],
//       cuisine_type: restaurantsRaw[i][7],
//       // imageUrl: restaurantsImageUrls[Math.floor(Math.random()*restaurantsImageUrls.length)],
//       imageUrl: restaurantsImageUrls[i],
//       flavorProfile: [5,5,5,5,5],
//       genre: [5,5,5,5],
//       allergies: [true, true, true],
//       diet: [true, true, true]
//     })
//   )
// }

// // Create dishes
// const dishRelativePath = 'seed_files/menu_item_seeds.csv'
// // const dishesRaw = easySeeds.formatSeeds(`./${dishRelativePath}`) // local
// // const dishesRaw = easySeeds.formatSeeds(process.cwd().concat(`/seeders/seed_files/menu_item_seeds.csv`))
// const dishesRaw = easySeeds.formatSeeds(process.cwd().concat(`/backend/seeders/seed_files/menu_item_seeds.csv`)) //for render
// dishesImageUrls = [
//   'https://miro.medium.com/max/1400/1*dVF2ZfgHLqLGCVyRBJ2BjA.jpeg',
//   'https://www.siftandsimmer.com/wp-content/uploads/2021/07/pork-mazesoba-ramen-noodles3.jpg',
//   'https://www.crunchycreamysweet.com/wp-content/uploads/2020/06/kimchi-fried-rice-feat.jpg',
//   'https://thewoksoflife.com/wp-content/uploads/2021/07/eggplant-unagidon-9.jpg',
//   'https://life-in-the-lofthouse.com/wp-content/uploads/2015/07/Chicken-Fried-Rice1_new.jpg',
//   'https://www.cherryonmysundae.com/wp-content/uploads/2018/11/unagi-don-final-4.jpg',
//   'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/fettuccine-alfredo.jpg',
//   'https://deliziosetentazionidivale.it/wp-content/uploads/2020/02/salsicce-e-patate-al-forno.jpg',
//   'https://2.bp.blogspot.com/-z7d0qCiZ1Bg/VhtD4lTsBFI/AAAAAAAAIxM/xoZnI3d7Wfg/s1600/IMG_1899.JPG',
//   'https://assets.epicurious.com/photos/54b876f04bf78b800d89a1d8/master/pass/51244210_pizza-bianca_1x1.jpg',
//   'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg',
//   'https://i.ytimg.com/vi/a19EY3YNStA/maxresdefault.jpg',
//   'https://thetoastykitchen.com/wp-content/uploads/2019/09/best-philly-cheesesteak-recipe-toasty-kitchen-14.jpg',
//   'https://www.simplyrecipes.com/thmb/WXzv7XkTQvFEpYnyyk4x5HRMtVc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Grilled-Chicken-LEAD-SEO-Horizontal-1b86ef1e115444ba8b6fb216f2810c7c.jpg',
//   'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/ycnhamqo/9c6053ee-f446-4fb9-b51d-500b7a7c8ac1.jpg',
//   'https://www.willcookforsmiles.com/wp-content/uploads/2021/01/Surf-and-Turf-8.jpg',
//   'https://www.thecandidcooks.com/wp-content/uploads/2022/05/california-burrito-close-feature.jpg',
//   'https://www.fromvalerieskitchen.com/wordpress/wp-content/uploads/2021/04/Easy-Ground-Beef-Tacos-edit-40.jpg',
//   'https://vancouverwithlove.com/wp-content/uploads/2022/06/how-to-go-vegan-10.jpg',
//   'https://aubreyskitchen.com/wp-content/uploads/2022/09/traeger-smoked-salmon.jpg',
//   'https://www.saborbrasil.it/wp-content/uploads/2021/06/romeu-e-julieta.jpg',
//   'https://simplelivingrecipes.com/wp-content/uploads/2022/09/brigadeiro-recipe-s.jpg',
//   'https://d332juqdd9b8hn.cloudfront.net/wp-content/uploads/2021/02/MARGHERITA-PIZZA.jpg',
//   'https://natashaskitchen.com/wp-content/uploads/2020/09/Calzones-Recipe-4.jpg',
//   'https://www.foodandwine.com/thmb/r6iPQLCsuv_TrL2YCHG9A320wjE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201304-xl-sauce-simmered-spaghetti-al-pomodoro-2000-b60bbe3cc6ad4b029fcc75844c33b9dd.jpg',
//   'https://www.culinaryhill.com/wp-content/uploads/2022/06/Chicken-Scallopini-Culinary-Hill-1200x800-1-500x500.jpg',
//   'https://s.hdnux.com/photos/01/21/40/57/21367792/16/1200x0.jpg',
//   'https://www.seriouseats.com/thmb/7LUkXGhkz212LqnfZAkHSZYEyIs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20191002-san-francisco-burritos-TaqueriaGuadalejara-lori-eanes-9762fdae2ecd47e6927d51805760b1b1.jpg',
//   'https://www.carolinescooking.com/wp-content/uploads/2022/11/chicken-flautas-featured-pic-sq.jpg',
//   'https://www.gimmesomeoven.com/wp-content/uploads/2015/06/enchiladas-4.jpg',
//   'https://www.nimanranch.com/wp-content/uploads/2019/10/Spinach-and-pancetta-salad-1.jpeg',
//   'https://aisforappleau.com/wp-content/uploads/2022/11/pasta-with-eggplant-1.jpg',
//   'https://www.staysnatched.com/wp-content/uploads/2021/04/leftover-ham-panini-sandwich-10-1.jpg',
//   'https://www.myforkinglife.com/wp-content/uploads/2021/01/crab-bisque-7.jpg',
//   'http://www.kaluhiskitchen.com/wp-content/uploads/2018/05/how-to-cook-tilapia_tilapia-recipe_kaluhiskitchen-tilapia-recipe_easy-tilapia-recipe_tilapia-recipe-kenya_chili-lemon-garlic-tilapia_kaluhiskitchen.com9_-1.jpg',
//   'https://www.everylastbite.com/wp-content/uploads/2020/02/DSC_0062-2-scaled.jpg',
//   'https://www.platingsandpairings.com/wp-content/uploads/2018/06/pad-kee-mao-recipe-7-scaled.jpg',
//   'https://www.crowdedkitchen.com/wp-content/uploads/2020/08/pumpkin-curry.jpg',
//   'https://izzycooking.com/wp-content/uploads/2020/05/Anchovy-Pizza-thumbnail.jpg',
//   'https://www.grocery.coop/sites/default/files/wp-content/uploads/2013/03/Breakfast_Egg_Margherita_Pizza_0.jpg',
//   'https://duyt4h9nfnj50.cloudfront.net/resized/70b30d000a36be80800fb4de3246a97d-w2880-ad.jpg',
//   'https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_9221_30478.jpg',
//   'https://www.foodnetwork.com/content/dam/images/food/fullset/2012/2/16/1/0133541_mini-meatball-hero_s4x3.jpg',
//   'https://misophat.com/wp-content/uploads/2020/05/ikuranigiri.jpg',
//   'https://sushiguide.me/wp-content/uploads/2018/09/sushiguide.me-ichi-sushi-bincho-toro-nigiri.jpg',
//   'https://i.ytimg.com/vi/VFgYKwBtqUo/maxresdefault.jpg',
//   'https://live.staticflickr.com/2695/4117433931_cfeba1404f_b.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-s/11/bd/1f/74/fiocchi-di-pera.jpg',
//   'https://images.otstatic.com/prod1/43498429/3/huge.jpg',
//   'https://assets.bonappetit.com/photos/57ace8e5f1c801a1038bc8dd/master/pass/chi-spaccas-bistecca-fiorentina.jpg',
//   'https://theplantbasedschool.com/wp-content/uploads/2020/03/Eggplant-Parmigiana-1-2.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/ca/c4/c7/trecciolina-salad.jpg',
//   'https://www.cookingclassy.com/wp-content/uploads/2018/06/pear-salad-1.jpg',
//   'https://i.ytimg.com/vi/5NOVNLn-DXg/maxresdefault.jpg',
//   'https://www.ricettedalmondo.it/images/foto-ricette/p/32744-polpo-alla-griglia-4.jpg',
//   'https://www.recipetineats.com/wp-content/uploads/2016/09/Wontons_1-1.jpg',
//   'https://thehealthyepicurean.com/wp-content/uploads/2018/05/Chinese-Pork-Potstickers-1.jpg',
//   'https://busybutcooking.com/wp-content/uploads/2021/11/Pork-Wontons-with-Sauce-2.jpg',
//   'https://redhousespice.com/wp-content/uploads/2017/05/Beijing-Zha-Jiang-Mian-Noodles.jpg',
//   'https://kaijunoodlehouse.com/wp-content/uploads/2020/06/PHO-BRISKET-TRIPE-TENDON-IMG_2323-scaled.jpg',
//   'https://www.ambitiouskitchen.com/wp-content/uploads/2020/12/Curry-Chicken-Noodle-Soup-4.jpg',
//   'https://www.cookeatworld.com/wp-content/uploads/2022/04/Pork-Rib-Soup-3.jpg',
//   'https://www.acouplecooks.com/wp-content/uploads/2020/04/Pan-Fried-Tofu-010.jpg',
//   'https://hips.hearstapps.com/hmg-prod/images/assortment-of-fresh-heirloom-tomatoes-royalty-free-image-484339944-1533762530.jpg',
//   'https://s.hdnux.com/photos/01/27/24/70/22892038/6/1200x0.jpg',
//   'https://cookingtheglobe.com/wp-content/uploads/2016/06/churros-con-chocolate.jpg',
//   'https://s.hdnux.com/photos/06/70/72/1805995/10/1200x0.jpg',
//   'https://panlasangpinoy.com/wp-content/uploads/2009/07/Ginisang-Ampalaya-with-Eggs.jpg',
//   'https://recipeideashop.com/wp-content/uploads/2020/02/sauteed-bitter-greens.jpg',
//   'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2022%2F09%2F09%2Fpureed-broccoli-soup-hero-4.jpg',
//   'https://harvesttotable.com/wp-content/uploads/2007/05/bigstock-Fresh-Celery-Sliced-For-Salad-283922755-scaled.jpg',
//   'https://www.budgetbytes.com/wp-content/uploads/2022/08/Sour-Cream-chips-above.jpg',
//   'https://m.media-amazon.com/images/I/91eTT8-wO5L.jpg',
//   'https://i5.walmartimages.com/asr/73407496-a6a1-4c11-9648-b10020b223b8.ca909c92ad3b3046da0a7dd4c7230caf.jpeg',
//   'https://m.media-amazon.com/images/I/91aau1BXjkL.jpg',
//   'https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Szechuan-Chicken-Square-FS-18.jpg',
//   'https://www.mashed.com/img/gallery/spicy-thai-fried-rice-recipe/l-intro-1623682771.jpg',
//   'https://c8.alamy.com/comp/2H69EEJ/red-hot-spicy-chilli-peppers-swimming-in-world-famous-sichuan-hotpot-2H69EEJ.jpg',
//   'https://i.ytimg.com/vi/LONMPL2_m_E/maxresdefault.jpg',
//   'https://joyfoodsunshine.com/wp-content/uploads/2020/06/homemade-chocolate-ice-cream-recipe-7.jpg',
//   'https://www.thespruceeats.com/thmb/gUK5X_xiflUn1PmokTjb62SSBak=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PeanutButterPopcorn8-0cfa29f9a74f44b1bf22d26ef9668547.jpg',
//   'https://assets.bonappetit.com/photos/58e2844b65366d7ba90812ea/1:1/w_2560%2Cc_limit/0417-Brown-Butter-Toffee-ChocolateChip%2520Cookie-group.jpg',
//   'https://rusticfamilyrecipes.com/wp-content/uploads/2022/04/Mochi-Donuts-02.jpg'
// ]
// const dishes = [];
// let foreignKey = 1;
// let dishesCount = 0;
// let flavorProfileSum = [0,0,0,0,0];
// let genreSum = [0,0,0,0]
// let restaurant = restaurants[0];

// for (let i = 0; i < dishesRaw.length; i++) {
//   if (parseInt(dishesRaw[i][4]) == foreignKey) {
//     // iterate over the dishes from the same
//     dishesCount += 1;
//     flavorProfileSum = flavorProfileSum.map((num, idx) => num + dishesRaw[i][5][idx])
//     genreSum = genreSum.map((num, idx) => num + dishesRaw[i][6][idx])

//   } else {
//     // calculate normalized then reset
//     flavorProfileSumSquareSum = flavorProfileSum.reduce((partialSum, a) => partialSum + a**2, 0)
//     flavorProfileResult = flavorProfileSum.map(num => num/Math.sqrt(flavorProfileSumSquareSum));
//     genreResult  = genreSum.map(num => num/dishesCount); // division since all the same
//     allergiesResult  = [false, false, false] // assume good for everyone, ideally majority vote
//     dietResult  = [true, true, true] // assume good for everyone, ideally majority vote
//     restaurant['flavorProfile'] = flavorProfileResult;
//     restaurant['genre'] = genreResult;
//     restaurant['allergies'] = allergiesResult;
//     restaurant['diet'] = dietResult;

//     flavorProfileSum = [0,0,0,0,0];
//     genreSum = [0,0,0,0]
//     foreignKey = parseInt(dishesRaw[i][4]);
//     dishesCount = 0
//     restaurant = restaurants[parseInt(dishesRaw[i][4])-1];
//   }

//   flavorProfileSumSquareSum = flavorProfileSum.reduce((partialSum, a) => partialSum + a**2, 0)
//   flavorProfileResult = flavorProfileSum.map(num => num/Math.sqrt(flavorProfileSumSquareSum));
//   genreResult  = genreSum.map(num => num/dishesCount); // division since all the same
//   allergiesResult  = [false, false, false] // assume good for everyone
//   dietResult  = [true, true, true] // assume good for everyone
//   restaurant['flavorProfile'] = flavorProfileResult;
//   restaurant['genre'] = genreResult;
//   restaurant['allergies'] = allergiesResult;
//   restaurant['diet'] = dietResult;


//   dishes.push(
//     new Dish({
//       name: dishesRaw[i][0],
//       description: dishesRaw[i][1],
//       price: dishesRaw[i][2],
//       header: dishesRaw[i][3],
//       imageUrl: dishesImageUrls[i],
//       // imageUrl: dishesImageUrls[Math.floor(Math.random()*dishesImageUrls.length)],
//       flavorProfile: dishesRaw[i][5],
//       genre: dishesRaw[i][6],
//       allergies: dishesRaw[i][7],
//       diet: dishesRaw[i][8],
//       restaurantId: restaurants[parseInt(dishesRaw[i][4])-1]._id
//     })
//   )
// }

const insertSeeds = () => {
  // console.log("Resetting db and seeding users...");
  // console.log("Resetting db and seeding users and tweets...");

  // User.collection.drop()
  //                .then(() => 
  // Group.collection.drop()
                //   .then(() => Dish.collection.drop())
                //  Dish.collection.drop()
                //  .then(() => Restaurant.collection.drop())
                //  // insert
                // //  .then(() => User.insertMany(users))
                // //  .then(() => Group.insertMany(groups))
                //  .then(() => Restaurant.insertMany(restaurants))
                //  .then(() => Dish.insertMany(dishes))
                //  .then(() => {
                //    console.log("Done!");
                //    mongoose.disconnect();
                //  })
                //  .catch(err => {
                //    console.error(err.stack);
                //    process.exit(1);
                //  });
}

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
