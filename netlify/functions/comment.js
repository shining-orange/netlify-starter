const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify', 
  forbiddenWords: ['习近平', '毛泽东','免费节点','屌','逼','傻','臭'], //违禁词
  disallowIPList: [''], // 黑名单
  // async preUpdate(comment) {
  //   return '你无法更新评论数据';
  // },
  async postUpdate(comment) {
    console.log(`${comment.objectId} 评论已更新!`);
  },
  async avatarUrl(comment) {
    const regq = new RegExp('^[1-9][0-9]{4,10}$');
    const reg = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    const nick = comment.nick;
    if (regq.test(nick)) {
        return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + nick + '&spec=4';
    }
    if (reg.test(mail)) {
      const q = mail.replace(/@qq\.com/i, '').toLowerCase();
      if (regq.test(q)) {
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
      }
    }
  },
    mailTemplateAdmin: `<div style="
    border-radius: 10px 10px 10px 10px;
    font-size: 13px;
    color: #555555;
    width: 666px;
    margin: 50px auto;
    border: 1px solid #eee;
    max-width: 100%;
    background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);">
    <div style="
    background:#49BDAD;
    color:#ffffff;
    border-radius: 10px 10px 0 0;
    background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));
    background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));
    height: 66px;">
        <p style="font-size:15px;
        word-break:break-all;
        padding: 23px 32px;
        margin:0;
        background-color: hsla(0,0%,100%,.4);
        border-radius: 10px 10px 0 0;">
            您的<a style="text-decoration:none;
            color: #ffffff;" href="{{site.url}}" target="_blank">CatOi的个人星球🪐</a>有了新评论啦！
        </p>
    </div>
    <div style="margin:20px auto;width:90%">
        <p><strong >{{self.nick}}</strong> 同学 给您的评论如下：</p>
        <div style="background: #f5f5f5;
        margin:20px 0;
        padding:15px;
        border-radius:5px;
        font-size:14px;">
            <p >{{self.comment | safe}}</p>
        </div>
	<div style="padding:0px 38px 30px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td align="center">
                    <a href="{{site.postUrl}}" target="_blank" style="display:inline-block;padding:12px 40px;background-image: linear-gradient(135deg,#f7f0ac,#acf7f0,#f0acf7);color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;letter-spacing:0.3px;">查看完整评论</a>
                </td>
            </tr>
        </table></div>
        <div style="color: #8c8c8c; font-size: 10px;width: 100%;text-align: center;word-wrap: break-word;">
            <p style="margin:0;font-size:11px;color:#a0a0a8;font-style:italic;line-height:1.65;">喧闹任其喧闹，自由我自为之。我自风情万种，与世无争。——陈果</p>
        </div>
    </div>
</div>`,
    mailTemplate: `<div style="
    border-radius: 10px 10px 10px 10px;
    font-size: 13px;
    color: #555555;
    width: 666px;
    margin: 50px auto;
    border: 1px solid #eee;
    max-width: 100%;
    background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);">
    <div style="
    background:#49BDAD;
    color:#ffffff;
    border-radius: 10px 10px 0 0;
    background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));
    background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));
    height: 66px;">
       <!-- <p style="font-size:15px;
        word-break:break-all;
        padding: 23px 32px;
        margin:0;
        background-color: hsla(0,0%,100%,.4);
        border-radius: 10px 10px 0 0;">
            您在<a style="text-decoration:none;
            color:#12addb;" href="http://xcodey.com/" target="_blank">橘子🍊个人博客</a>上的留言有新回复啦！
        </p>-->
        <p style="font-size:15px;
        word-break:break-all;
        padding: 23px 32px;
        margin:0;
        background-color: hsla(0,0%,100%,.4);
        border-radius: 10px 10px 0 0;">
            您在<a style="text-decoration:none;
            color:#12addb;" href="{{site.url}}" target="_blank">CatOi的个人星球🪐</a>上的留言有新回复啦！
        </p>
    </div>
    <div style="margin:20px auto;width:90%">
        <p><strong >😊Hi，{{parent.nick}}，</strong> 同学，您曾在<a href="{{site.postUrl}}" style="text-decoration: none;
        color:#12addb"></a>上发表评论：</p>
        <div style="background: #f5f5f5;
        margin:20px 0;
        padding:15px;
        border-radius:5px;
        font-size:14px;">
            <p>{{parent.comment | safe}}</p>
        </div>
        <p><strong >{{self.nick}}</strong> 给您的回复如下：</p>
        <div style="background: #f5f5f5;
        margin:20px 0;
        padding:15px;
        border-radius:5px;
        font-size:14px;">
            <p>{{self.comment | safe}}</p>
        </div>
	<div style="padding:0px 38px 30px;">
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td align="center">
                    <a href="{{site.postUrl}}" target="_blank" style="display:inline-block;padding:12px 40px;background-image: linear-gradient(135deg,#f7f0ac,#acf7f0,#f0acf7);color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;letter-spacing:0.3px;">查看完整回复</a>
                </td>
            </tr>
        </table></div>
        <div style="color: #8c8c8c; font-size: 10px;width: 100%;text-align: center;word-wrap: break-word;">
            <p style="margin:0;font-size:11px;color:#a0a0a8;font-style:italic;line-height:1.65;">书上说,天下没有不散的宴席.书上还说,人生何处不相逢.</p>
        </div>
    </div>
</div>`
});

module.exports.handler = serverless(http.createServer(app));
