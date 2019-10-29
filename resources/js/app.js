var formApp = angular.module('formApp', ['ionic', 'ngSanitize']);

formApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.post['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS';
    $httpProvider.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

});

//过滤器
formApp.filter('timeFilter', function () {
    return function (obj) {
        if(obj === ''){
            return '';
        }else{
            return obj.substring(11, 16);
        }

    };
}).filter('sportsTimeFilter', function () {
    return function (obj) {
        if(obj < 60){
            return obj + '分钟';
        }else{
            return obj/60 + '小时';
        }

    }
}).filter('formLabelFilter', function () {
    return function (obj) {
        var ItemDisplay = obj.ItemDisplay;
        var json = JSON.parse(ItemDisplay);
        var type = json.type;
        var html;

        if(type === undefined || type === null || type === ''){
            html = '<p class="form-aggregate-label-div-p">' + obj.DisplayName + '</p>';
            return html;
        }else{
            switch (type) {
                case 'custom':
                    var TagHtmlContext = json.TagHtmlContext;

                    if(TagHtmlContext === '' || TagHtmlContext === undefined){
                        return '';
                    }else{
                        html = '<p class="form-aggregate-label-div-p">' + unescape(TagHtmlContext) + '</p>';
                        return html;
                    }
                    break;
                case 'image':
                    var imgList = json.imgList[0];
                    var ImgSrc = imgList.ImgSrc;
                    html = '<img ' +
                        'src="' + ImgSrc + '" ' +
                        'style="width: 100%;height: auto;border-radius: 5px;" />';
                    return html;
                    break;
            }
        }

    }
}).filter('formAnnotationFilter', function () {
    return function (obj) {
        var TagHtmlContext = obj;

        if(TagHtmlContext === '' || TagHtmlContext === undefined){
            return '';
        }else{
            return unescape(TagHtmlContext);
        }

    }
}).filter('formToFloatFilter', function () {
    return function (obj) {
        return parseFloat(obj);
    }
}).filter('formPlaceHolderFilter', function () {
    return function (obj) {
        if(obj === undefined || obj === '' || obj === null){
            return '请输入';
        }else{
            var json = JSON.parse(obj);
            if(json.Placehold === undefined || json.Placehold === '' || json.Placehold === null){
                return '请输入';
            }else{
                return json.Placehold;
            }

        }

    }
}).filter('formLabelValue', function () {
    return function (obj) {
        var json = JSON.parse(obj);
        if(json.type === undefined || json.type === '' || json.type === null){
            return '';
        }else{
            var type = json.type;
            if(type === 'custom'){
                return json.Plaintext;
            }else if(type === 'image'){
                var imgList = json.imgList;
                if(imgList.length === 0){
                    return '';
                }else{
                    var ImgSrc = imgList[0].ImgSrc;
                    var Height = imgList[0].Height;
                    var Width = imgList[0].Width;
                    return '<img src="' + ImgSrc + '" width="' + Width + '" height="' + Height + '" />';
                }
            }else{
                return '';
            }
        }

    }

});