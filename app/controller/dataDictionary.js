const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class DataDictionaryController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.DataDictionary.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.DataDictionary.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const dictionary = await ctx.DataDictionary.User.create({ createdAt, updatedAt, ...rest });
    ctx.status = 201;
    ctx.body = dictionary;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const dictionary = await ctx.model.DataDictionary.findById(id);
    if (!dictionary) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updatedAt = Date.now();
    await dictionary.update({ updatedAt, ...rest });
    ctx.body = dictionary;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const dictionary = await ctx.model.DataDictionary.findById(id);
    if (!dictionary) {
      ctx.status = 404;
      return;
    }

    await dictionary.destroy();
    ctx.status = 200;
  }
}

module.exports = DataDictionaryController;