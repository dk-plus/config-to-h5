'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { userInfo } = ctx;

    if (!userInfo) {
      ctx.redirect('/login');
      return;
    }
    
    await ctx.render('home.tpl', {
      title: '运营搭积木配置H5系统',
      user: 'dkplus'
    });
  }

  async login() {
    const { ctx } = this;
    await ctx.render('home.tpl', {
      title: '登录',
    });
  }

  async test() {
    const { ctx } = this;
    console.log(ctx.query)
    ctx.body = {
      returnCode: '0',
      returnValue: {
        content: [{
          type: 1,
          sort: 1,
          data: {
            url: 'http://baidu.com',
            title: '百度',
            desc: '这是百度的地址',
          }
        }, {
          type: 2,
          sort: 2,
          data: {
            url: 'http://baidu.com',
            title: '图片',
          }
        }],
      }
    };
  }
}

module.exports = HomeController;
