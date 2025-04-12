const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://awnishsinha462:pYSdq65TyEzdOqE7@cluster1.qnvruaq.mongodb.net/";

const client = new MongoClient(url);

const dbName = "FirstDb";

let data = {
  firstName: "Ayush",
  lastName: "Kumar",
  city: "Aurangabad",
  age: "22",
};

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // let data={
  //     firstName:"Ayush",
  //     lastName:"Kumar",
  //     city:"Aurangabad",
  //     age:"22"
  // }
  // const insertResult = await collection.insertMany([data]);
  // console.log('Inserted documents =>', insertResult);

  //   const updateData = await collection.updateOne(
  //     { firstName: "Awnish" },
  //     { $set: { firstName: "Aman" } }
  //   );
  //   console.log("Updated documents =>", updateData);

  const deleteResult = await collection.deleteMany({ firstName: "Aman" });
  console.log("Deleted documents =>", deleteResult);

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
