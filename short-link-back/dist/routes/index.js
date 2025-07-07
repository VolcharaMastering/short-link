"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("../errors/notFound"));
const urlValidation_1 = require("../middlewares/urlValidation");
const zodValidate_1 = require("../utils/zodValidate");
const shortenLink_1 = require("../controllers/shortenLink");
const getAllUrlsData_1 = require("../controllers/getAllUrlsData");
const router = express_1.default.Router();
router.post('/shorten', (0, zodValidate_1.zodValidate)(urlValidation_1.urlValidationSchema), shortenLink_1.shortenLink);
router.get('/', getAllUrlsData_1.getAllUrlsData);
router.all('/*', (req, res, next) => {
    next((0, notFound_1.default)('Page not found'));
});
exports.default = router;
