#supertest使用
  
###问题一
  
**WTF**官网居然没有`post`一个完整的示例,尼玛,作为一个新手坑爹有木有  
`post`示例
<pre><code>request(app)
    .post("/xx/xx")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('X-HTTP-Method-Override', 'POST')
    .send({
        xxx: "xxx",
        xxx: "xxx"
    })
    .expect(200)
    .end(fn)</code></pre>  

想要测试一个`post`接口,需要先设置一下`header`头,然后通过`send`方法把请求参数发送出去,哒哒哒,一个`post`接口就这些可以测试了。