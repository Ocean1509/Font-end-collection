const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://localhost:27017';
// 数据库名
const database = 'test'

let client;
let db;

module.exports = {
    // 数据库连接
    connect() {
        MongoClient.connect(url, {
            useNewUrlParser:
                true
        }, (err, _client) => {
            if (err) throw err;
            client = _client;
            db = client.db(database)
            console.log('数据库连接成功')
        })
    },

    // 插入单个数据
    async insertOne(collectionName, query) {
        let collection = db.collection(collectionName);
        return collection.insertOne(query)
    },

    // 插入多个数据
    async insertMany(collectionName, query) {
        let collection = db.collection(collectionName);
        if (Array.isArray(query)) {
            return collection.insertMany(query, {
                forceServerObjectId: true
            });
        }
    },

    // 删除单个数据
    async deleteOne(collectionName, query) {
        let collection = db.collection(collectionName);
        return collection.deleteOne(query)
    },

    // 删除多个数据
    async deleteMany(collectionName, query) {
        let collection = db.collection(collectionName);
        return collection.deleteMany(query)
    },

    // 更新数据
    async updateOne(collectionName, query, data) {
        let collection = db.collection(collectionName);
        return collection.updateOne(query, {
            $set: data,
            $currentDate: {
                lastModified: true // 加入更新时间
            }
        })
    },

    // 查询数据
    async find(collectionName, query, sort = '_id', asc = true) {
        let order = asc ? 1 : -1;
        let collection = db.collection(collectionName)
        return collection.find(query).toArray().sort({ [sort]: order })
    },

    // 关闭数据库
    close() {
        if (!client) return
        client.close();
        console.log('数据库关闭连接')
    }
}