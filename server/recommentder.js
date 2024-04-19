const ContentBasedRecommender = require("content-based-recommender");
const { products, descriptions, categories } = require("./models");
const fs = require("fs");

const recommender = new ContentBasedRecommender({
  minScore: 0.35,
  maxSimilarDocuments: 100,
});

trainModel = async () => {
  const data = await products.findAll({
    include: [
      {
        model: descriptions,
        attributes: ["id", "description"],
      },
      categories,
    ],
  });
  const formatedData = await data.map((item) => ({
    id: item.id + "",
    content:
      item.descriptions
        .reduce((res, item) => {
          return [...res, item.description];
        }, [])
        .join("") +
      " " +
      item.category.name +
      " " +
      item.category.name +
      " " +
      item.category.name,
  }));

  recommender.train(formatedData);
  const similarDocuments = recommender.getSimilarDocuments("1", 0, 10);

  console.log(similarDocuments);

  const model = recommender.export();
  await fs.writeFileSync("model.json", JSON.stringify(model));
};
trainModel();
