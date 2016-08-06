const fs = require('fs');
const path = require('path');

function travel(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);
                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1)
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}

travel(process.argv[2], function (pathname, next) {
    console.log(pathname);
    next();
}, function () {
    console.log('finish.')
});