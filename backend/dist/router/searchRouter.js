"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controller/searchController");
const router = express_1.default.Router();
router.get("/search", searchController_1.getSearchResultController);
router.get("/freeBoard", searchController_1.getFreeBoardSearchController);
exports.default = router;
