const { MongoClient,ObjectId } = require("mongodb");
// const uri = process.env.ATLAS_URI;
const uri = "mongodb://127.0.0.1:27017/";
 
var _db;

const client = new MongoClient(uri);

async function addRecordsToCollection(newListing){
  const result = await client.db("Inventory_management").collection("inventory").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  return result.insertedId
}

async function addRecordsToUsersCollection(newListing){
  const result = await client.db("Inventory_management").collection("users").insertOne(newListing);
  console.log(`New listing created to the users with the following id: ${result.insertedId}`);
  return result.insertedId
}

const getDatabases = async() =>{
  await client.connect();
  databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

const getRecords = async() =>{
  await client.connect();
  const query = { "name": "xyz" };
  const result = await client.db("Inventory_management").collection("inventory").find(query);
  return  result.toArray();
}

const getUsers = async() =>{
  await client.connect();
  const query = { "name": "xyz" };
  const result = await client.db("Inventory_management").collection("users").find({});
  return  result.toArray();
}

const getAllRecordsData = async() =>{
  await client.connect();
  const result = await client.db("Inventory_management").collection("inventory").find({});
  return  result.toArray();

}
const deleteRecordData = async(data) =>{
  await client.connect();
  // const result = await client.db("Inventory_management").collection("inventory").find({});
    const result = await client.db("Inventory_management").collection("inventory").deleteOne({_id : new ObjectId(data._id) });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      return "Successfully deleted one document."
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      return "No documents matched the query. Deleted 0 documents."
    }
  // return  result.toArray();

}

const updateRecordData =  async(data) =>{
  console.log("update record",data._id,data.name)
  const options = { upsert:false};
  const y = { $set: { "name" : data.name, "quantity": data.quantity, "image": data.image}}
  await client.connect();
  const result = await client.db("Inventory_management").collection("inventory").updateOne({_id : new ObjectId(data._id) }, y,options);
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  if(result.matchedCount == result.modifiedCount){
    return "updated"
  }
  else{
    return "not updated"
  }
}

module.exports = {
  listDatabases : async function(callback){
    await getDatabases();
  },
  connectToServer: async function (callback) {
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      console.log("connection established successfully");
  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
  },
  addRecord: async (data) => {
    const x = await addRecordsToCollection(data);
    return x;
  },
  getRecord: async (data) => {
   const x =  await getRecords(data);
   return x;
  },
  getUsers: async (data) => {
    const x =  await getUsers(data);
    return x;
   },
  getInventoryData: async () =>{
    const x =  await getAllRecordsData();
   return x;
  },
  updateRecord: async (data) =>{
    const x =  await updateRecordData(data);
   return x;
  },
  deleteRecord : async (data) => {
    const x =  await deleteRecordData(data);
   return x;
  },
  addUser : async (data) =>{
    const x = await addRecordsToUsersCollection(data);
    return x;
  },
  getDb: function () {
    return _db;
  },
};