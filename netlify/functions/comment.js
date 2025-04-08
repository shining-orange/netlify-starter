const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify', 
  forbiddenWords: ['习近平', '毛泽东','免费节点','屌','逼','傻','臭'], //违禁词
  disallowIPList: [''], // 黑名单
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} 回复了你的评论!`,
    });
  },
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} 回复了你的评论!`,
    });
  },
  async preUpdate(comment) {
    return '你无法更新评论数据';
  },
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
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
    }
  },
    mailTemplateAdmin: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}"target="_blank">CatOi的个人星球🪐</a>上的文章有了新的评论</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p><strong>{{self.nick}}</strong> 回复说：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p style="text-align:center;position: relative;z-index: 99;">您可以点击<a style="text-decoration:none;color:#cf5c83" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">书上说,天下没有不散的宴席.书上还说,人生何处不相逢.</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`,
    mailTemplate: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;z-index:-100;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}">『CatOi的个人星球🪐』</a>上的留言有新回复啦！</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p>😊Hi，{{parent.nick}}，您曾在文章上发表评论：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{parent.comment | safe}}</div>
			<p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p>您可以点击<a style="text-decoration:none; color:#cf5c83" href="{{site.postUrl}}" target="_blank"> 查看回复的完整內容 </a>，欢迎再次光临<a style="text-decoration:none; color:#cf5c83" href="{{site.url}}" target="_blank"> {{CatOi的个人星球🪐}} </a>。<hr />
			<p style="font-size:14px;color:#b7adad;text-align:center;position: relative;z-index: 99;">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。<br />{{site.url}}</p>
			</p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">
			<p class="bottomhr" style="font-size:12px;text-align:center;color:#999">书上说,天下没有不散的宴席.书上还说,人生何处不相逢.</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`
});

module.exports.handler = serverless(http.createServer(app));
