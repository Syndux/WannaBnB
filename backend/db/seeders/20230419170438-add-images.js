"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/da26a96a-a642-48c0-89a2-2ee1f4932cdc/Swiss+Interior+Grandeur+Park+Shan-9464.png?format=1500w",
          preview: false,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1640973251/wordpress_assets/53575-CityLoft-GreekVilla-TrBlack-GrandCanal-a/53575-CityLoft-GreekVilla-TrBlack-GrandCanal-a.jpg?_i=AA",
          preview: true,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://www.windermere.com/files/2022/06/Contemporary-2.jpg",
          preview: false,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/07/Contemporary-interior-design-and-decor-Urbanology-Designs.jpg",
          preview: false,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/4442cb44672379.581a21d3dd3df.jpg",
          preview: false,
          imageableId: 1,
          imageableType: "Spot",
        },
        {
          url: "https://hommes.studio/wp-content/uploads/5-etheral-projects-by-remarkable-international-interior-designers-1.png",
          preview: false,
          imageableId: 2,
          imageableType: "Spot",
        },
        {
          url: "https://cdn.sanity.io/images/32lej2m6/production/6e51ae5090f4dd46e25438a9f29f991a5763f806-1024x760.jpg?auto=format",
          preview: true,
          imageableId: 2,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/42e6001e-dd49-403b-b0cd-9dd390307262/Fairmont%2C+4+Bedder+Condominium+Kitchen+9.jpg?format=500w",
          preview: false,
          imageableId: 3,
          imageableType: "Spot",
        },
        {
          url: "https://res.cloudinary.com/brickandbatten/image/upload/c_scale,w_464,h_324,dpr_2/f_auto,q_auto/v1641000863/wordpress_assets/22826-ModContemporary-Accents_w-GauntletGray-a-ok.jpg?_i=AA",
          preview: true,
          imageableId: 3,
          imageableType: "Spot",
        },
        {
          url: "https://media.architecturaldigest.com/photos/571e97c5741fcddb16b559c9/master/w_1280%2Cc_limit/modernist-decor-inspiration-01.jpg",
          preview: false,
          imageableId: 4,
          imageableType: "Spot",
        },
        {
          url: "https://jewkesdesign.com/wp-content/uploads/2023/04/Jewkes-Design_Black-Modern-House_04.jpg",
          preview: true,
          imageableId: 4,
          imageableType: "Spot",
        },
        {
          url: "https://media.architecturaldigest.com/photos/571e97ce818277135ff91620/master/w_1280%2Cc_limit/modernist-decor-inspiration-07.jpg",
          preview: false,
          imageableId: 5,
          imageableType: "Spot",
        },
        {
          url: "https://st.hzcdn.com/simgs/pictures/exteriors/gray-s-crossing-mountain-modern-golf-course-home-in-house-builders-img~caa191290a8fab76_14-8692-1-7195ae8.jpg",
          preview: true,
          imageableId: 5,
          imageableType: "Spot",
        },
        {
          url: "https://media.architecturaldigest.com/photos/571e97c5741fcddb16b559c9/master/w_1280%2Cc_limit/modernist-decor-inspiration-15.jpg",
          preview: false,
          imageableId: 6,
          imageableType: "Spot",
        },
        {
          url: "https://i.pinimg.com/originals/62/77/38/62773802f988fbe872ae82076b3ab153.jpg",
          preview: true,
          imageableId: 6,
          imageableType: "Spot",
        },
        {
          url: "https://design-authority.com/wp-content/uploads/2021/09/Modern-Luxury-Interior-Design-by-Fusion-Design-Limited.jpg",
          preview: false,
          imageableId: 7,
          imageableType: "Spot",
        },
        {
          url: "https://www.home-designing.com/wp-content/uploads/2017/05/three-level-exterior-house-ideas.jpg",
          preview: true,
          imageableId: 7,
          imageableType: "Spot",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1593438791070-1G65M9ZG9HH37W2KUREA/Blk%2B663B%2BPunggol%2BDrive%2B-%2B5-Room%2BBTO%2B%287%2Bof%2B8%29.jpg?format=1500w",
          preview: false,
          imageableId: 1,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1614703087956-VJRUHRC3K23E73K9266H/Blk%2B663B%2BPunggol%2BDrive%2B-%2B5-Room%2BBTO%2B%281%2Bof%2B8%29.jpg?format=1000w",
          preview: true,
          imageableId: 1,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/46fb2917-a316-47b4-b430-ee33fc61dd14/413C+Northshore+Drive%2C+4+Room+BTO+Flat+Study+Area+2.jpg?format=1500w",
          preview: false,
          imageableId: 2,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/b73339e4-f0c6-43c5-b4ab-2e04ce77f35e/413C%2BNorthshore%2BDrive%2C%2B4Room%2BBTO%2BFlat%2BLiving%2BRoom%2B5.jpeg?format=1000w",
          preview: true,
          imageableId: 2,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1625637706535-EUD1ZWAVJU9R1305C8HV/Blk+313C+Sumang+Link+5Room+HDB+Resale+%2815%29.jpg?format=1500w",
          preview: false,
          imageableId: 3,
          imageableType: "Review",
        },
        {
          url: "https://images.squarespace-cdn.com/content/v1/5c3c4ca8365f02e708cc7c8c/1635413252746-QD0NPL91813Z527GPSKA/Blk+313C+Sumang+Link+5Room+HDB+Resale%2B%289%29.jpeg?format=1500w",
          preview: true,
          imageableId: 3,
          imageableType: "Review",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
