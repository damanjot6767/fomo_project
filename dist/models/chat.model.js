"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChatById = exports.deleteChatById = exports.createChat = exports.getChatById = exports.getChatByUserIds = exports.getAggregationChatById = exports.getChatsByUserId = exports.getAggregationChatsByUserId = exports.ChatModel = exports.chatSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants");
const api_error_1 = require("../utils/api-error");
exports.chatSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    chatType: {
        type: String,
        enum: Object.values(constants_1.ChatType),
        default: constants_1.ChatType.INDIVIDUAL
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users"
    },
    userIds: [
        {
            isChatDelete: {
                type: Boolean,
                default: false
            },
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Users"
            }
        }
    ],
    messageIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Messages"
        }
    ],
    latestMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Messages",
        default: null
    }
}, {
    timestamps: true
});
exports.ChatModel = mongoose_1.default.model('Chat', exports.chatSchema);
// Chat Services
const getAggregationChatsByUserId = (userId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield exports.ChatModel.aggregate([
            {
                $match: {
                    userIds: {
                        $elemMatch: { userId: new mongoose_1.default.Types.ObjectId(userId) }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: "$userIds.userId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$userId"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: 'messages',
                    let: {
                        messageIds: "$messageIds"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$messageIds"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "messages"
                }
            },
            {
                $project: {
                    "users.password": 0,
                    "users.refreshToken": 0
                }
            }
        ]);
        return chat;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding chats by user id");
    }
});
exports.getAggregationChatsByUserId = getAggregationChatsByUserId;
const getChatsByUserId = (userId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield exports.ChatModel.find({
            userIds: {
                $elemMatch: { userId: new mongoose_1.default.Types.ObjectId(userId) }
            }
        });
        return chat;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding chats by user id");
    }
});
exports.getChatsByUserId = getChatsByUserId;
const getAggregationChatById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield exports.ChatModel.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: "$userIds.userId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$userId"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: 'messages',
                    let: {
                        messageIds: "$messageIds"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$messageIds"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "messages"
                }
            },
            {
                $project: {
                    "users.password": 0,
                    "users.refreshToken": 0
                }
            }
        ]);
        if (!chat.length)
            throw new api_error_1.ApiError(401, 'Chat not found ');
        return chat[0];
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding chat by id");
    }
});
exports.getAggregationChatById = getAggregationChatById;
const getChatByUserIds = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield exports.ChatModel.aggregate([
            {
                $match: {
                    userIds: {
                        $all: userIds.map(userId => ({ $elemMatch: { userId: new mongoose_1.default.Types.ObjectId(userId) } }))
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: "$userIds.userId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$userId"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: 'messages',
                    let: {
                        messageIds: "$messageIds"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id",
                                        "$$messageIds"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "messages"
                }
            },
            {
                $project: {
                    "users.password": 0,
                    "users.refreshToken": 0
                }
            }
        ]);
        return chat;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding chat by id");
    }
});
exports.getChatByUserIds = getChatByUserIds;
const getChatById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const isCache = await getChatByIdRedis(id); 
        // if(isCache) return isCache;
        const response = yield exports.ChatModel.findOne({ _id: id });
        // await setChatByIdRedis(response)
        return response;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding chat by id");
    }
});
exports.getChatById = getChatById;
const createChat = (values) => exports.ChatModel.create(values);
exports.createChat = createChat;
const deleteChatById = (id) => exports.ChatModel.findOneAndDelete({ _id: id });
exports.deleteChatById = deleteChatById;
const updateChatById = (id, values) => exports.ChatModel.findByIdAndUpdate(id, values, { new: true });
exports.updateChatById = updateChatById;
