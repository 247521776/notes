/**
 * Created by yanglei on 2016/4/21.
 */
var express = require('express');
var app = express();

app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use("/test", (req, res, next) => {
    function* study(name) {
        for(var key of name) {
            yield findOne(req, key);
        }
    }
    var findOne = function(req, name) {
        return new Promise((resolve, reject) => {
            //查库操作
            req.models[name].find({}, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    };
    var start = study(["Count", "Log"]),
        array = [],
        p = null;
        for(var key of start) {
            p = toArray(key, array);
        }
        p.then((data) => {
            res.json({
                result : data
            });
        });
        function toArray(p, a) {
            return p.then((data) => {
                a.push(data);
                return a;
            });
        }
    });
app.listen('7878');

console.log("项目已启动");