//index.cjs

const Waline = require("@waline/vercel");
module.exports = Waline({
  // 设置插件
  plugins: [],
  // 设置安全域名
  secureDomains: 'mingtechpro.top',
  // 设置关键词过滤
  forbiddenWords: ["习近平", "毛泽东", "快递", "空包", "代发", "垃圾", "傻逼", "SB", "Sb", "sB", "sb",],
  // 设置禁止访问的IP
  disallowIPList: [],
  // 未登录的匿名用户评论需要审核
  preSave(comment) {
    const { userInfo } = this.ctx.state;
    comment.status = think.isEmpty(userInfo) ? 'waiting' : 'approved';
  },
  // 自动替换使用 QQ 头像
  async avatarUrl(comment) {
    const reg = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    if (reg.test(mail)) {
      const q = mail.replace(/@qq\.com/i, '').toLowerCase();
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
    }
  },
  // 自定义新评论邮件标题
  mailSubjectAdmin: '『{{site.name}}』上收到了来自 {{self.nick}} 的新评论',
  // 自定义新评论邮件模板
  mailTemplateAdmin: `
  <div style="width: 550px;height: auto;border-radius: 5px;margin:0 auto;box-shadow: 0px 0px 20px #888888;position: relative;padding-bottom: 5px;">
  <div style="background-image: url(https://jsd.012700.xyz/gh/MingTechPro/drawing-bed/avatar-bg_url/202405051659906.jpg);width:550px;height: 250px;background-size: cover;background-repeat: no-repeat;border-radius: 5px 5px 0px 0px;"></div>
  <div style="background-color:white;line-height:180%;padding:0 15px 12px;width:520px;margin:10px auto;color:#555555;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size:12px;margin-bottom: 0px;">
      <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"><span style="color: #12ADDB;font-weight: bold;">&gt; </span>您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}{{self.url}}" target="_blank">文章</a>有了新的回复~</h2>
      <div style="padding:0 12px 0 12px;margin-top:18px">
          <p>💬 <strong>{{self.nick}}</strong>&nbsp;给您的评论：</p>
          <div style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">{{self.comment|safe}}</div>
          <div style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">📫 邮箱：{{self.mail}}</div>
          <div style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">🏠 主页：{{self.link}}</div>
      </div>
  </div>
  <a style="text-decoration: none;color: rgb(255, 255, 255);width: 25%;text-align: center;background-color: rgb(75, 176, 248);height: 40px;line-height: 40px;box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);display: block;margin: auto;" href="{{site.postUrl}}" target="_blank">查看完整內容</a>
  <div style="color:#8c8c8c;;font-family: 'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size: 10px;width: 100%;text-align: center;margin-top: 30px;">
      <p>本邮件为系统自动发送，请勿直接回复</p>
  </div>
  <div style="color:#8c8c8c;;font-family: 'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size: 10px;width: 100%;text-align: center;">
      <p>©2024 Copyright {{site.name}}</p>
  </div>
</div>
`,
  // 自定义回复邮件标题
  mailSubject: '{{parent.nick}}，您在『{{site.name}}』上发表的评论收到了来自 {{self.nick}} 的回复',
  // 自定义回复邮件模板
  mailTemplate: `
  <div style="width: 550px;height: auto;border-radius: 5px;margin:0 auto;box-shadow: 0px 0px 20px #888888;position: relative;padding-bottom: 5px;">
  <div style="background-image: url(https://jsd.012700.xyz/gh/MingTechPro/drawing-bed/avatar-bg_url/202405051659906.jpg);width:550px;height: 250px;background-size: cover;background-repeat: no-repeat;border-radius: 5px 5px 0px 0px;"></div>
  <div style="width: 200px;height: 40px;background-color: rgb(75, 176, 248);margin-top: -20px;margin-left: 20px;box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);color: rgb(255, 255, 255);text-align: center;line-height: 40px;">Hi {{parent.nick}},</div>
  <div style="background-color:white;line-height:180%;padding:0 15px 12px;width:520px;margin:30px auto;color:#555555;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size:12px;margin-bottom: 0px;">  
      <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"><span style="color: #12ADDB;font-weight: bold;">&gt; </span>您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的评论有了新的回复~</h2>  
      <div style="padding:0 12px 0 12px;margin-top:18px">         
          <p>💬 您的评论：</p>  
          <div style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">{{parent.comment|safe}}</div>  
          <p>💬 <strong>{{self.nick}}</strong>&nbsp;给您的回复：</p>  
          <div style="background-color: #f5f5f5;border: 0px solid #DDD;padding: 10px 15px;margin:18px 0">{{self.comment|safe}}</div>  
      </div>  
  </div>
  <a style="text-decoration:none; color:#FFF;width: 25%;text-align: center;background-color: rgb(75, 176, 248);height: 40px;line-height: 35px;box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.30);margin: -10px auto;display: block;" href="{{site.postUrl}}" target="_blank">查看完整內容</a>
  <div style="color:#8c8c8c;;font-family: 'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size: 10px;width: 100%;text-align: center;margin-top: 30px;">
      <p>本邮件为系统自动发送，请勿直接回复</p>
  </div>
  <div style="color:#8c8c8c;;font-family: 'Century Gothic','Trebuchet MS','Hiragino Sans GB','Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size: 10px;width: 100%;text-align: center;">
      <p>©2024 Copyright {{site.name}}</p>
  </div>
</div>   
`,
});
