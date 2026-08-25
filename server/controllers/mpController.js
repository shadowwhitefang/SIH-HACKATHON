/**
 * MP Controller
 * Thin controller forwarding requests to mpService.
 */

const mpService = require('../services/mpService');
const { parsePaginationParams } = require('../validators/mpValidator');
const { sendSuccess } = require('../utils/apiResponse');

async function getMPs(req, res, next) {
  try {
    const pagination = parsePaginationParams(req.query);
    const filters = {
      search: req.query.search,
      state: req.query.state,
      constituency: req.query.constituency,
      party: req.query.party
    };

    const result = await mpService.listMPs(filters, pagination);
    return sendSuccess(res, result.data, 200, result.pagination);
  } catch (error) {
    return next(error);
  }
}

async function getMPById(req, res, next) {
  try {
    const mp = await mpService.getMPById(req.params.id);
    return sendSuccess(res, mp, 200);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMPs,
  getMPById
};
