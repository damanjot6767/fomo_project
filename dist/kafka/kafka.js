"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessages = exports.produceMessage = exports.connectKafka = void 0;
const kafkajs_1 = require("kafkajs");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("../redis/redis");
const caCertPath = path_1.default.resolve(__dirname, './ca.pem');
// Kafka setup
const kafkaInstance = new kafkajs_1.Kafka({
    brokers: [process.env.KAFKA_URL],
    ssl: {
        ca: [fs_1.default.readFileSync(caCertPath, 'utf-8')],
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain',
    },
    retry: {
        retries: 8, // Increase the number of retries
        factor: 0.2, // Factor to multiply the backoff
    },
});
const producer = kafkaInstance.producer();
const consumer = kafkaInstance.consumer({ groupId: 'chat-group' });
const connectKafka = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.connect();
        yield consumer.connect();
        console.log('Kafka connected');
    }
    catch (error) {
        console.error('Error connecting Kafka:', error);
    }
});
exports.connectKafka = connectKafka;
const produceMessage = ({ topic, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
    console.log('Produced message to Kafka', res);
});
exports.produceMessage = produceMessage;
const consumeMessages = ({ topic, callBack }) => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.subscribe({ topic, fromBeginning: true });
    yield consumer.run({
        eachMessage: ({ topic, partition, message, pause }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = JSON.parse(message.value.toString()).data;
                const res = yield callBack(data);
                yield redis_1.redisInstance.rpop(data.chatId);
            }
            catch (error) {
                consumer.pause([{ topic: topic }]);
                setTimeout(() => {
                    consumer.resume([{ topic: topic }]);
                }, 5000);
                console.log("someting went wront to store data");
            }
        }),
    });
});
exports.consumeMessages = consumeMessages;
