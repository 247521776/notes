# elasticsearch

## 聚合

-  分组查询语句
<pre><code>GET logstash-adev_app_bigdataapp_api-2017.07.05/_search
{
  "aggs": {
    "username": {
      "terms": {
        "field": "username"
      }
    }
  }
}</code></pre>

**返回结果**
<pre><code>{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 9253,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "username": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 959,
      "buckets": [
      	 {
          "key": "lihailin-ds",
          "doc_count": 3040
        }
      ]
    }
  }
}</code></pre>

**返回结果注释**  
  
 字段 | 意义 
 --- | --- 
took | 运行时间 
timed_out | 是否超时
_shards | 查询分片信息
hits | 满足条件的所有数据
aggregations | 查询结果  

_shards中字段 | 意义
--- | ---
total | 查询分片总个数
successful | 成功个数
failed | 失败个数
  
<span style="color:red">如不想`hits`返回数据在`_search`后追加`?search_type=count`或者首位条件`size`为0</span>  
  
使用`terms`聚合可能数据不稳定，[详情点击这里](http://www.cnblogs.com/xing901022/p/4947436.html)
  
如果需要全量数据，设置`size`为0。
