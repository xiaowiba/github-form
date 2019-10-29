/**
 * sqlserver
 * 182.92.100.57
 * kwjq
 * 16640f4758b3996ad5ac2f1f93339981
 * XHYY 库
 * CRF_Publish表
 */
formApp.controller('appController', function ($scope, $state, $http, $filter, $timeout, $sce, $compile) {
    mui.showLoading('正在加载..', 'div');

    /*******************************************************方法-start***********************************************************/
    //初始化数据
    $scope.INIT = function () {
        //http://mdruby.natapp4.cc/views/H5/form/index.html?addaUrl=https://apidevelop.mdruby.cn&platformUrl=https://xhyydevelop.mdruby.cn&accessKey=42b891cd&account=gh_02ff1d3275f0&openId=oTcawv3SIFf9MGgsMnm1hPdoD8vM&crfnos=23&patientId=16042&doctorId=217&CRFPublishID=18377&CRFDataID=0&sendCRFNo=3&sendCRFSubmitMessage=1&scene=0&clicktime=1556261811
        //$scope.vConsole = new VConsole();
        $scope.addaUrl      = common.getUrlParam('addaUrl');
        $scope.accessKey    = common.getUrlParam('accessKey');
        $scope.account      = common.getUrlParam('account');
        $scope.openId       = common.getUrlParam('openId');
        $scope.crfnos       = common.getUrlParam('crfnos');
        $scope.patientId    = common.getUrlParam('patientId');
        $scope.doctorId     = common.getUrlParam('doctorId');
        $scope.CRFPublishID = common.getUrlParam('CRFPublishID');
        $scope.CRFDataID    = common.getUrlParam('CRFDataID');
        $scope.SendCRFNo    = common.getUrlParam('sendCRFNo');
        $scope.SendCRFSubmitMessage = common.getUrlParam('sendCRFSubmitMessage');
        $scope.platformUrl  = common.getUrlParam('platformUrl');
        $scope.WechatUrl    = window.location.host;

        /*if($scope.addaUrl === '' || $scope.addaUrl === undefined || $scope.addaUrl === null){
            window.location.href = 'error.html?msg=addaUrl';
        }

        if($scope.accessKey === '' || $scope.accessKey === undefined || $scope.accessKey === null){
            window.location.href = 'error.html?msg=accessKey';
        }

        if($scope.account === '' || $scope.account === undefined || $scope.account === null){
            window.location.href = 'error.html?msg=account';
        }

        if($scope.openId === '' || $scope.openId === undefined || $scope.openId === null){
            window.location.href = 'error.html?msg=openId';
        }

        if($scope.crfnos === '' || $scope.crfnos === undefined || $scope.crfnos === null){
            window.location.href = 'error.html?msg=crfnos';
        }

        if($scope.patientId === '' || $scope.patientId === undefined || $scope.patientId === null){
            window.location.href = 'error.html?msg=patientId';
        }

        if($scope.doctorId === '' || $scope.doctorId === undefined || $scope.doctorId === null){
            window.location.href = 'error.html?msg=doctorId';
        }

        if($scope.CRFDataID === '' || $scope.CRFDataID === undefined || $scope.CRFDataID === null){
            window.location.href = 'error.html?msg=CRFDataID';
        }

        if($scope.SendCRFNo === '' || $scope.SendCRFNo === undefined || $scope.SendCRFNo === null){
            window.location.href = 'error.html?msg=SendCRFNo';
        }

        if($scope.SendCRFSubmitMessage === '' || $scope.SendCRFSubmitMessage === undefined || $scope.SendCRFSubmitMessage === null){
            window.location.href = 'error.html?msg=SendCRFSubmitMessage';
        }*/

        $scope.dtPickerBeginYear = 1898;
        $scope.dtPickerEndYear = 3000;
        $scope.addPickerIds = [];
        $scope.entryType = {
            10000002:'标签',
            10006719:'数值框',
            10000001:'单行文本框',
            10000009:'多行文本框',
            10000003:'下拉单选',
            10001196:'下拉多选',
            10000005:'单选按钮',
            10000004:'多选框',
            //10000006:'普通按钮',
            10000008:'日期',
            10000007:'日期和时间',
            10000876:'集合',
            10001132:'表格',
            //10005000:'矩阵',
            10000028:'文件上传',
            //10002285:'超链接'
            10000045:'其他',
            10000012:'整数',
            10000015:'小数'
        };
        $scope.imgLength = [0,1,2,3];

    };

    //获取CRFDataID
    $scope.getCrfId = function () {
        $.ajax({
            async:false,
            method:'post',
            //url:$scope.addaUrl + '/rest/crf/crfdataid/wx/' + $scope.accessKey + '/' + $scope.CRFPublishID,
            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crf.crfdataid.wx.42b891cd.18692.json',
            success:function (Data) {
                var data = Data.data;
                $scope.CRFDataID = data.CRFDataID;
            },
            error:function (err) {
                mui.toast('获取CRFDataID异常');
                //window.location.href = 'error.html?msg=获取CRFDataID异常';
            }
        });
    };

    //判断是否已经提交
    $scope.isSubmit = function () {
        $.ajax({
            async:false,
            method:'post',
            //url:$scope.addaUrl + '/rest/crf/issubmit/wx/' + $scope.accessKey + '/' + $scope.CRFPublishID,
            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crf.issubmit.wx.42b891cd.18692.json',
            success:function (Data) {
                if(Data.data === true){
                    window.location.href = $scope.platformUrl + '/CRF/CRFReader' + '?Device=wx' + '&crfdataId=' + $scope.CRFDataID;
                }

            },
            error:function (err) {
                mui.toast('是否提交接口异常');
                //window.location.href = 'error.html?msg=是否提交接口异常';
            }
        });
    };

    //判断是否跳老表单
    $scope.isSupport = function () {
        $.ajax({
            async:false,
            method:'post',
            //url:$scope.addaUrl + '/rest/crf/ishastable/wx/' + $scope.accessKey + '/' + $scope.crfnos,
            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crf.ishastable.wx.42b891cd.34.json',
            success:function (Data) {
                //true 代表不支持新版   false代表可以用新版
                var data = Data.data;

                if(data === true){
                    if($scope.CRFDataID === 0){
                        window.location.href = $scope.platformUrl + '/CRF/FollowCRFRender' +
                            '?WechatUrl=' + $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                            '&crfNo=' + $scope.crfnos +
                            '&openId=' + $scope.openId +
                            '&pid=' + $scope.patientId +
                            '&Device=wx' +
                            '&encType=1' +
                            '&id=' + $scope.CRFPublishID +
                            '&SendCRFNo=' + $scope.SendCRFNo +
                            '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                    }else{
                        window.location.href = $scope.platformUrl + '/CRF/FollowCRFEdit' +
                            '?WechatUrl='+ $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                            '&openId=' + $scope.openId +
                            '&providerID=' + $scope.doctorId +
                            '&Device=wx' +
                            '&encType=1' +
                            '&id=' + $scope.CRFDataID +
                            '&SendCRFNo=' + $scope.SendCRFNo +
                            '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                    }

                }else{
                    //判断为电脑微信时跳老表单
                    if(isWeiXin() === true){
                        if($scope.CRFDataID === 0){
                            window.location.href = $scope.platformUrl + '/CRF/FollowCRFRender' +
                                '?WechatUrl=' + $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                                '&crfNo=' + $scope.crfnos +
                                '&openId=' + $scope.openId +
                                '&pid=' + $scope.patientId +
                                '&Device=wx' +
                                '&encType=1' +
                                '&id=' + $scope.CRFPublishID +
                                '&SendCRFNo=' + $scope.SendCRFNo +
                                '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                        }else{
                            window.location.href = $scope.platformUrl + '/CRF/FollowCRFEdit' +
                                '?WechatUrl='+ $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                                '&openId=' + $scope.openId +
                                '&providerID=' + $scope.doctorId +
                                '&Device=wx' +
                                '&encType=1' +
                                '&id=' + $scope.CRFDataID +
                                '&SendCRFNo=' + $scope.SendCRFNo +
                                '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                        }
                    }else{
                        console.log($scope.CRFDataID);
                        if($scope.CRFDataID === 0){
                            var a = $scope.platformUrl + '/CRF/FollowCRFRender' +
                                '?WechatUrl=' + $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                                '&crfNo=' + $scope.crfnos +
                                '&openId=' + $scope.openId +
                                '&pid=' + $scope.patientId +
                                '&Device=wx' +
                                '&encType=1' +
                                '&id=' + $scope.CRFPublishID +
                                '&SendCRFNo=' + $scope.SendCRFNo +
                                '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                        }else{
                            var b = $scope.platformUrl + '/CRF/FollowCRFEdit' +
                                '?WechatUrl='+ $scope.WechatUrl + '/webH5Api/FirstFollowupCallBack' +
                                '&openId=' + $scope.openId +
                                '&providerID=' + $scope.doctorId +
                                '&Device=wx' +
                                '&encType=1' +
                                '&id=' + $scope.CRFDataID +
                                '&SendCRFNo=' + $scope.SendCRFNo +
                                '&SendCRFSubmitMessage=' + $scope.SendCRFSubmitMessage;
                        }
                    }
                }
            },
            error:function (err) {
                mui.toast('是否支持表单异常');
                //window.location.href = 'error.html?msg=是否支持接口异常';
            }
        });
    };

    //获取表单数据
    $scope.initForm = function () {
        $.ajax({
            async:false,
            method:'post',
            //url:$scope.addaUrl + '/rest/crf/formjson/wx/' + $scope.accessKey + '/' + $scope.crfnos + '/' + $scope.CRFDataID,
            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crf.formjson.wx.42b891cd.34.8517.json',
            success:function (Data) {
                //mui.hideLoading();
                var data = Data.data;
                if(data === null || data === '' || data === undefined){
                    mui.hideLoading();
                    mui.toast('服务器开小差了,请稍后再试');
                    $('#title').html('暂无数据');
                    //window.location.href = 'error.html?msg=获取表单异常';
                }else{
                    var CRFs = data.CRFs;
                    $scope.CRFs = CRFs[0];
                    if($scope.CRFs === null){
                        mui.hideLoading();
                        mui.toast('服务器开小差了,请稍后再试');
                        //window.location.href = 'error.html?msg=获取表单异常';
                        return false;
                    }
                    $scope.CRFNo = $scope.CRFs.CRFNo;
                    $scope.Pages = $scope.CRFs.Pages;
                    $scope.PageNo = $scope.Pages[0].PageNo;//第一次加载出来的都是第一个，所以这里没毛病
                    $('#title').html($scope.CRFs.DisplayName);
                }

            },
            error:function (err) {
                mui.toast('获取表单异常');
                //window.location.href = 'error.html?msg=获取表单异常';
            }
        });

    };

    /**
     * 点击滚动导航的方法
     * @param id
     */
    $scope.getTab = function (id) {
        mui.showLoading('正在加载..', 'div');
        var current = $scope.PageNo;//当前模块
        var target = id;//目标模块
        if($scope.PageNo === id){
            mui.hideLoading();
        }else{
            $timeout(function () {
                var CRFNo = $scope.CRFs.CRFNo;
                var PageNo = $scope.PageNo;
                var Items = [];
                var fillItems = [];
                var container = $('.form-result');

                //取出结果
                container.each(function () {
                    var that = $(this);
                    var IsDisplay = that.is(':visible');

                    //只存展示的，隐藏的不传
                    if(IsDisplay === true){
                        var ItemNo = that.attr('data-ItemNo');
                        var Value = that.attr('data-Value');
                        var SectionNo = that.attr('data-SectionNo');
                        var OtherValue = that.attr('data-OtherValue');
                        var MapPath = that.attr('data-MapPath');
                        var RowNum = that.attr('data-RowNum');
                        var Unit = that.attr('data-Unit');

                        if(Value === ''){

                        }else{
                            Items.push({
                                SectionNo:SectionNo,
                                ItemNo:ItemNo,
                                Value:Value,
                                OtherValue:OtherValue,
                                MapPath:MapPath,
                                RowNum:RowNum,
                                Unit:Unit
                            });
                        }

                        fillItems.push({
                            Value:Value
                        });

                    }

                });

                var Unfilled = [];
                for(var p=0;p<fillItems.length;p++){
                    var ItemsItem = fillItems[p];
                    var ItemsValue = ItemsItem.Value;
                    if(ItemsValue === ''){
                        Unfilled.push(p);
                    }
                }

                var nowPageNo = $('#form-tab-' + $scope.PageNo);

                //全填了
                if(Unfilled.length === 0){
                    nowPageNo.addClass('form-complete');
                }else{
                    nowPageNo.removeClass('form-complete');
                }

                /****************************************组织数据格式-start*****************************************/
                var arr = Items;
                var map = {},
                    dest = [];
                for(var i = 0; i < arr.length; i++){
                    var ai = arr[i];
                    if(!map[ai.SectionNo]){
                        dest.push({
                            SectionNo: ai.SectionNo,
                            Items: [ai]
                        });
                        map[ai.SectionNo] = ai;
                    }else{
                        for(var j = 0; j < dest.length; j++){
                            var dj = dest[j];
                            if(dj.SectionNo === ai.SectionNo){
                                dj.Items.push(ai);
                                break;
                            }
                        }
                    }
                }

                console.log(dest);
                /****************************************组织数据格式-end*****************************************/

                if(dest.length === 0){

                }else{
                    $scope.RES = {
                        IsSubmit:false,
                        WechatUrl:$scope.WechatUrl,
                        openId:$scope.openId,
                        CRFNo:CRFNo,
                        PageNo:$scope.PageNo,
                        PatientId:$scope.patientId,
                        DoctorId:$scope.doctorId,
                        CRFDataID:$scope.CRFDataID,
                        PublishID:$scope.CRFPublishID,
                        SendCRFNo:$scope.SendCRFNo,
                        SendCRFSubmitMessage:$scope.SendCRFSubmitMessage,
                        Sections:dest
                    };

                    console.log($scope.RES);

                    $.ajax({
                        async:false,
                        method:'post',
                        //url:$scope.addaUrl + '/rest/crfdata/submit/wx/' + $scope.accessKey,
                        url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crfdata.submit.wx.42b891cd.json',
                        dataType:'json',
                        data:$scope.RES,
                        success:function (Data) {
                            var data = Data.data;
                            var result = Data.result;
                            var message = Data.message;

                            if(result === 200){
                                $scope.CRFDataID = data.CRFDataID;
                                //mui.toast('已保存');
                                console.log('保存成功');

                            }else{
                                mui.toast(message);
                            }

                            mui.hideLoading();

                        },
                        error:function (err) {
                            console.log(err);
                            mui.toast('保存异常');
                            mui.hideLoading();

                        }
                    });
                }

                $scope.PageNo = id;

                for(var h=0;h<$scope.Pages.length;h++){
                    var PAGENO = $scope.Pages[h].PageNo;
                    if(id === PAGENO){
                        $('#form-page-' + PAGENO).show();
                    }else{
                        $('#form-page-' + PAGENO).hide();
                    }
                }

                //将页面滑动到最顶部
                $scope.toTop();

                mui.hideLoading();

                }, 500);

        }

    };

    //页面元素加载完前的动作
    $scope.loadFormTabBefore = function() {
        //加载完tab之前的动作
    };

    //页面元素加载完后的动作
    angular.element(window).bind('load', function() {
        $('#form-tab').navbarscroll({
            defaultSelect: 0,
            scrollerWidth: 6,
            fingerClick: 1,
            endClickScroll:function(obj){
                //console.log(obj);
                //console.log(obj.text());
            }
        });

        //渲染页面元素
        $scope.initPage();

    });

    //渲染页面元素
    $scope.initPage = function () {
        $timeout(function () {
            //对集合头和表格头的picker的单独循环
            $(".form-aggregate-picker-container").each(function(){
                var that = $(this);
                var id = that.attr('id');

                //判断是否为表格 是：'1';不是：''
                var IsTable = that.attr('data-IsTable');

                //层级
                var layer = that.attr('data-layer');
                layer = parseInt(layer);

                //选项内容
                var ValuesetConcepts = that.attr('data-Valueset-Concepts');
                ValuesetConcepts = JSON.parse(ValuesetConcepts);

                //逻辑跳转值
                var HYNExpandVal = that.attr('data-HYNExpandVal');

                var setData = [];

                for(var i=0;i<ValuesetConcepts.length;i++){
                    var arr = ValuesetConcepts[i];
                    var Code = arr.Code;
                    var DisplayName = arr.DisplayName;

                    setData.push({value:Code,text:DisplayName});
                }

                that.on('tap', function() {
                    var picker = new mui.PopPicker({layer:layer});
                    picker.setData(setData);
                    picker.show(function(items) {
                        //that.val(items[0].value);
                        var res = items[0].text;
                        var value = items[0].value;

                        var html = '<span class="form-picker-span-res">' + res + '</span>';

                        $scope.setAttr('picker-' + id, 'Value', value);
                        $scope.setAttr('picker-' + id, 'DisplayName', res);

                        $('#' + id).html(html);

                        /********************************逻辑跳转-start********************************/

                        /*****************点击隐藏属性的时候,下面的所有值要清空-start******************/
                        var Items = $scope.getAttr('form-aggregate-' + id, 'Children');
                        Items = JSON.parse(Items);

                        var ItemNo = Items.ItemNo;
                        var Childs = Items.Childs;

                        //如果不是表格的
                        if(IsTable === '' || IsTable === undefined || IsTable === null){

                            if(HYNExpandVal === value){

                            }else{
                                for(var i=0;i<Childs.length;i++){
                                    var itemChilds = Childs[i];
                                    var itemUIType = itemChilds.UIType.Code;
                                    var itemItemNo = itemChilds.ItemNo;
                                    var _id = ItemNo + '-' + itemItemNo;

                                    switch (true) {
                                        //数字文本框
                                        case itemUIType === '10006719':
                                            $scope.setAttr('input-' + _id, 'Value', '');
                                            $scope.setAttr('input-' + _id, 'OtherValue', '');
                                            $('#input-' + _id + ' input[type=number]').val('');
                                            $('#input-getAutoCalc-' + _id).html('点击计算');
                                            break;
                                        //单行文本框
                                        case itemUIType === '10000001':
                                            $scope.setAttr('input-' + _id, 'Value', '');
                                            $scope.setAttr('input-' + _id, 'OtherValue', '');
                                            $('#input-' + _id + ' input[type=text]').val('');
                                            break;
                                        //多行文本框
                                        case itemUIType === '10000009':
                                            $scope.setAttr('input-' + _id, 'Value', '');
                                            $scope.setAttr('input-' + _id, 'OtherValue', '');
                                            $('#input-multiline-' + _id).val('');
                                            break;
                                        //单选
                                        case itemUIType === '10000005' || itemUIType === '10000003':
                                            $scope.setAttr('picker-' + _id, 'Value', '');
                                            $scope.setAttr('picker-' + _id, 'OtherValue', '');
                                            $scope.setAttr('picker-' + _id, 'DisplayName', '');
                                            $('#' + _id + ' span').html('<span class="form-picker-span">请选择</span>');
                                            $('#picker-' + _id).removeClass('form-top-left-right-border');
                                            $('#long-picker-' + _id).hide().html('');
                                            $('#other-picker-' + _id).hide();
                                            $('#other-picker-' + _id + ' textarea').val('');
                                            break;
                                        //多选
                                        case itemUIType === '10000004' || itemUIType === '10001196':
                                            $scope.setAttr('checkbox-' + _id, 'Value', '');
                                            $scope.setAttr('checkbox-' + _id, 'OtherValue', '');
                                            $scope.setAttr('checkbox-' + _id, 'DisplayName', '');
                                            $('#other-checkbox-' + _id).hide();
                                            $('#other-checkbox-' + _id + ' textarea').val('');
                                            $('#checkbox-' + _id + ' input[type=checkbox]').prop('checked', false);
                                            $('#checkbox-' + _id + ' label').removeClass('blue');
                                            break;
                                        //日期||时间
                                        case itemUIType === '10000008' || itemUIType === '10000007':
                                            $scope.setAttr('dtPicker-' + _id, 'Value', '');
                                            $scope.setAttr('dtPicker-' + _id, 'OtherValue', '');
                                            $('#' + _id + ' span').html('<span class="form-picker-span">请选择</span>');
                                            break;
                                        //图片
                                        case itemUIType === '10000028':
                                            $scope.setAttr('form-img-up-' + _id, 'Value', '');
                                            $scope.setAttr('form-img-up-' + _id, 'OtherValue', '');
                                            $scope.setAttr('form-img-up-' + _id, 'Res', '');

                                            for(var m=0;m<4;m++){
                                                $('#form-img-up-img-' + _id + '-' + m).attr('src', '').css('display', 'none');
                                                $('#' + _id + '-' + m).show();
                                                $('#' + 'form-img-up-del-' + _id + '-' + m).hide();
                                            }
                                            break;
                                        //集合
                                        case itemUIType === '10000876':
                                            var ChildsItemChilds = itemChilds.Childs;
                                            var ChildsItemNo = itemChilds.ItemNo;
                                            /****************集合头的是否不祥取消选择-start*****************/
                                            $scope.setAttr('picker-' + _id, 'Value', '');
                                            $scope.setAttr('picker-' + _id, 'DisplayName', '');
                                            $scope.setAttr('picker-' + _id, 'OtherValue', '');
                                            $('#' + _id).html('<span class="form-picker-span">请选择</span>');
                                            /****************集合头的是否不祥取消选择-end*****************/
                                            for(var j=0;j<ChildsItemChilds.length;j++){
                                                var ItemChildsItemChilds = ChildsItemChilds[j];
                                                var ChildsItemUIType = ItemChildsItemChilds.UIType.Code;
                                                var ChildsItemItemNo = ItemChildsItemChilds.ItemNo;
                                                var __id = ChildsItemNo + '-' + ChildsItemItemNo;
                                                switch (true) {
                                                    //数字文本框
                                                    case ChildsItemUIType === '10006719':
                                                        $scope.setAttr('input-' + __id, 'Value', '');
                                                        $scope.setAttr('input-' + __id, 'OtherValue', '');
                                                        $('#input-' + __id + ' input[type=number]').val('');
                                                        $('#input-getAutoCalc-' + __id).html('点击计算');
                                                        break;
                                                    //单行文本框
                                                    case ChildsItemUIType === '10000001':
                                                        $scope.setAttr('input-' + __id, 'Value', '');
                                                        $scope.setAttr('input-' + __id, 'OtherValue', '');
                                                        $('#input-' + __id + ' input[type=text]').val('');
                                                        break;
                                                    //多行文本框
                                                    case ChildsItemUIType === '10000009':
                                                        $scope.setAttr('input-' + __id, 'Value', '');
                                                        $scope.setAttr('input-' + __id, 'OtherValue', '');
                                                        $('#input-multiline-' + __id).val('');
                                                        break;
                                                    //单选
                                                    case ChildsItemUIType === '10000005' || ChildsItemUIType === '10000003':
                                                        $scope.setAttr('picker-' + __id, 'Value', '');
                                                        $scope.setAttr('picker-' + __id, 'OtherValue', '');
                                                        $scope.setAttr('picker-' + __id, 'DisplayName', '');
                                                        $('#' + __id + ' span').html('<span class="form-picker-span">请选择</span>');
                                                        $('#picker-' + __id).removeClass('form-top-left-right-border');
                                                        $('#long-picker-' + __id).hide().html('');
                                                        $('#other-picker-' + __id).hide();
                                                        $('#other-picker-' + __id + ' textarea').val('');
                                                        break;
                                                    //多选
                                                    case ChildsItemUIType === '10000004' || ChildsItemUIType === '10001196':
                                                        $scope.setAttr('checkbox-' + __id, 'Value', '');
                                                        $scope.setAttr('checkbox-' + __id, 'OtherValue', '');
                                                        $scope.setAttr('checkbox-' + __id, 'DisplayName', '');
                                                        $('#other-checkbox-' + __id).hide();
                                                        $('#other-checkbox-' + __id + ' textarea').val('');
                                                        $('#checkbox-' + __id + ' input[type=checkbox]').prop('checked', false);
                                                        $('#checkbox-' + __id + ' label').removeClass('blue');
                                                        break;
                                                    //日期||时间
                                                    case ChildsItemUIType === '10000008' || ChildsItemUIType === '10000007':
                                                        $scope.setAttr('dtPicker-' + __id, 'Value', '');
                                                        $scope.setAttr('dtPicker-' + __id, 'OtherValue', '');
                                                        $('#' + __id + ' span').html('<span class="form-picker-span">请选择</span>');
                                                        break;
                                                    //图片
                                                    case ChildsItemUIType === '10000028':
                                                        $scope.setAttr('form-img-up-' + __id, 'Value', '');
                                                        $scope.setAttr('form-img-up-' + __id, 'OtherValue', '');
                                                        $scope.setAttr('form-img-up-' + __id, 'Res', '');

                                                        for(var n=0;n<4;n++){
                                                            $('#form-img-up-img-' + __id + '-' + n).attr('src', '').css('display', 'none');
                                                            $('#' + __id + '-' + n).show();
                                                            $('#' + 'form-img-up-del-' + __id + '-' + n).hide();
                                                        }
                                                        break;
                                                    //集合
                                                    case ChildsItemUIType === '10000876':
                                                        //不支持解析
                                                        break;
                                                }

                                            }
                                            break;
                                        //表格
                                        case itemUIType === '10001132':
                                            /****************表格头的是否不祥取消选择-start*****************/
                                            $scope.setAttr('picker-' + _id, 'Value', '');
                                            $scope.setAttr('picker-' + _id, 'DisplayName', '');
                                            $scope.setAttr('picker-' + _id, 'OtherValue', '');
                                            $('#' + _id).html('<span class="form-picker-span">请选择</span>');
                                            /****************表格头的是否不祥取消选择-end*****************/
                                            var DefaultChilds = Childs[i].DefaultChilds[0].Childs;
                                            var formCopyContainer = $('.form-copy-container-' + _id);
                                            var CRFRelIDArr = [];

                                            for(var w=0;w<formCopyContainer.length;w++){
                                                var formCopyContainerW = formCopyContainer[w];
                                                var formCopyContainerWId = formCopyContainerW.id;
                                                var CRFRelID = formCopyContainerWId.split('-')[5];
                                                CRFRelIDArr.push(CRFRelID);
                                            }

                                            for(var v=0;v<CRFRelIDArr.length;v++){
                                                var _CRFRelID = CRFRelIDArr[v];
                                                for(var u=0;u<DefaultChilds.length;u++){
                                                    var DefaultChildsItem = DefaultChilds[u];
                                                    var UIType = DefaultChildsItem.UIType;
                                                    var UITypeCode = UIType.Code;
                                                    var tableItemNo = DefaultChildsItem.ItemNo;
                                                    var tableParentItemNo = DefaultChildsItem.ParentItemNo;
                                                    var tableId = tableParentItemNo + '-' + tableItemNo + '-' + _CRFRelID;
                                                    switch (true) {
                                                        //数值框
                                                        case UITypeCode === '10006719':
                                                            $scope.setAttr('input-' + tableId, 'Value', '');
                                                            $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                            $('#input-' + tableId + ' input[type=number]').val('');
                                                            $('#input-getAutoCalc-' + tableId).html('点击计算');
                                                            break;
                                                        //单行文本
                                                        case UITypeCode === '10000001':
                                                            $scope.setAttr('input-' + tableId, 'Value', '');
                                                            $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                            $('#input-' + tableId + ' input[type=text]').val('');
                                                            break;
                                                        //多行文本
                                                        case UITypeCode === '10000009':
                                                            $scope.setAttr('input-' + tableId, 'Value', '');
                                                            $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                            $('#input-multiline-' + tableId).val('');
                                                            break;
                                                        //单选
                                                        case UITypeCode === '10000005' || UITypeCode === '10000003':
                                                            $scope.setAttr('picker-' + tableId, 'Value', '');
                                                            $scope.setAttr('picker-' + tableId, 'OtherValue', '');
                                                            $scope.setAttr('picker-' + tableId, 'DisplayName', '');
                                                            $('#' + tableId + ' span').html('<span class="form-picker-span">请选择</span>');
                                                            $('#picker-' + tableId).removeClass('form-top-left-right-border');
                                                            $('#long-picker-' + tableId).hide().html('');
                                                            $('#other-picker-' + tableId).hide();
                                                            $('#other-picker-' + tableId + ' textarea').val('');
                                                            break;
                                                        //多选
                                                        case UITypeCode === '10000004' || UITypeCode === '10001196':
                                                            $scope.setAttr('checkbox-' + tableId, 'Value', '');
                                                            $scope.setAttr('checkbox-' + tableId, 'OtherValue', '');
                                                            $scope.setAttr('checkbox-' + tableId, 'DisplayName', '');
                                                            $('#other-checkbox-' + tableId).hide();
                                                            $('#other-checkbox-' + tableId + ' textarea').val('');
                                                            $('#checkbox-' + tableId + ' input[type=checkbox]').prop('checked', false);
                                                            $('#checkbox-' + tableId + ' label').removeClass('blue');
                                                            break;
                                                        //日期 || 时间
                                                        case UITypeCode === '10000008' || UITypeCode === '10000007':
                                                            $scope.setAttr('dtPicker-' + tableId, 'Value', '');
                                                            $scope.setAttr('dtPicker-' + tableId, 'OtherValue', '');
                                                            $('#' + tableId + ' span').html('<span class="form-picker-span">请选择</span>');
                                                            break;
                                                        //图片上传
                                                        case UITypeCode === '10000028':
                                                            $scope.setAttr('form-img-up-' + tableId, 'Value', '');
                                                            $scope.setAttr('form-img-up-' + tableId, 'OtherValue', '');
                                                            $scope.setAttr('form-img-up-' + tableId, 'Res', '');

                                                            for(var m=0;m<4;m++){
                                                                $('#form-img-up-img-' + tableParentItemNo + '-' + tableItemNo + '-' + m + '-' + _CRFRelID).attr('src', '').css('display', 'none');
                                                                $('#' + tableParentItemNo + '-' + tableItemNo + '-' + m + '-' + _CRFRelID).show();
                                                                $('#' + 'form-img-up-del-' + tableParentItemNo + '-' + _CRFRelID + '-' + m + '-' + _CRFRelID).hide();
                                                            }
                                                            break;

                                                    }

                                                }
                                            }
                                            break;
                                    }

                                }
                            }

                            /*****************点击隐藏属性的时候,下面的所有值要清空-end******************/

                            /*****************点击隐藏属性的时候,下面的该隐藏的要隐藏-start******************/
                            if(HYNExpandVal === value){
                                $('#form-aggregate-container-' + id).show();
                                // 对于有逻辑跳转的本来隐藏但是选择了展示的，对此需要进行隐藏
                                for(var q=0;q<Childs.length;q++){
                                    var itemChilds = Childs[q];
                                    var itemUIType = itemChilds.UIType.Code;
                                    var itemItemNo = itemChilds.ItemNo;
                                    var _id = ItemNo + '-' + itemItemNo;

                                    switch (true) {
                                        //数字文本框
                                        case itemUIType === '10006719':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //单行文本框
                                        case itemUIType === '10000001':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //多行文本框
                                        case itemUIType === '10000009':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //单选
                                        case itemUIType === '10000005' || itemUIType === '10000003':
                                            var _IsDisplay = $scope.getAttr('picker-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#picker-' + _id).hide();
                                            }
                                            break;
                                        //多选
                                        case itemUIType === '10000004' || itemUIType === '10001196':
                                            var _IsDisplay = $scope.getAttr('checkbox-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#checkbox-' + _id).hide();
                                            }
                                            break;
                                        //日期||时间
                                        case itemUIType === '10000008' || itemUIType === '10000007':
                                            var _IsDisplay = $scope.getAttr('dtPicker-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#dtPicker-' + _id).hide();
                                            }
                                            break;
                                        //图片
                                        case itemUIType === '10000028':
                                            var _IsDisplay = $scope.getAttr('form-img-up-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#form-img-up-' + _id).hide();
                                            }
                                            break;
                                        //集合
                                        case itemUIType === '10000876':
                                            var ChildsItemChilds = itemChilds.Childs;
                                            var ChildsItemNo = itemChilds.ItemNo;

                                            //集合下的集合，没有【是否不祥】的不作处理，有的话把他下面的孩子隐藏起来
                                            if(itemChilds.HYNValueset === undefined || itemChilds.HYNValueset === '' || itemChilds.HYNValueset === null || itemChilds.HYNValueset.Concepts === undefined || itemChilds.HYNValueset.Concepts === '' || itemChilds.HYNValueset.Concepts === null){

                                            }else{
                                                $('#form-aggregate-container-' + ChildsItemNo).hide();
                                            }

                                            break;
                                    }
                                }
                            }else{
                                $('#form-aggregate-container-' + id).hide();
                                for(var p=0;p<Childs.length;p++){
                                    var itemChilds = Childs[p];
                                    var itemUIType = itemChilds.UIType.Code;
                                    var itemItemNo = itemChilds.ItemNo;
                                    var _id = ItemNo + '-' + itemItemNo;

                                    switch (true) {
                                        //数字文本框
                                        case itemUIType === '10006719':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //单行文本框
                                        case itemUIType === '10000001':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //多行文本框
                                        case itemUIType === '10000009':
                                            var _IsDisplay = $scope.getAttr('input-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#input-' + _id).hide();
                                            }
                                            break;
                                        //单选
                                        case itemUIType === '10000005' || itemUIType === '10000003':
                                            var _IsDisplay = $scope.getAttr('picker-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#picker-' + _id).hide();
                                            }
                                            break;
                                        //多选
                                        case itemUIType === '10000004' || itemUIType === '10001196':
                                            var _IsDisplay = $scope.getAttr('checkbox-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#checkbox-' + _id).hide();
                                            }
                                            break;
                                        //日期||时间
                                        case itemUIType === '10000008' || itemUIType === '10000007':
                                            var _IsDisplay = $scope.getAttr('dtPicker-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#dtPicker-' + _id).hide();
                                            }
                                            break;
                                        //图片
                                        case itemUIType === '10000028':
                                            var _IsDisplay = $scope.getAttr('form-img-up-' + _id, 'IsDisplay');
                                            if(_IsDisplay === 'false'){
                                                $('#form-img-up-' + _id).hide();
                                            }
                                            break;
                                        //集合
                                        case itemUIType === '10000876':
                                            var ChildsItemChilds = itemChilds.Childs;
                                            var ChildsItemNo = itemChilds.ItemNo;
                                            var ChildsParentItemNo = itemChilds.ParentItemNo;
                                            $('#form-aggregate-container-' + ChildsParentItemNo + '-' + ChildsItemNo).hide();
                                            for(var q=0;q<ChildsItemChilds.length;q++){
                                                var ItemChildsItemChilds = ChildsItemChilds[q];
                                                var ChildsItemUIType = ItemChildsItemChilds.UIType.Code;
                                                var ChildsItemItemNo = ItemChildsItemChilds.ItemNo;
                                                var __id = ChildsItemNo + '-' + ChildsItemItemNo;
                                                switch (true) {
                                                    //数字文本框
                                                    case ChildsItemUIType === '10006719':
                                                        var __IsDisplay = $scope.getAttr('input-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#input-' + __id).hide();
                                                        }
                                                        break;
                                                    //单行文本框
                                                    case ChildsItemUIType === '10000001':
                                                        var __IsDisplay = $scope.getAttr('input-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#input-' + __id).hide();
                                                        }
                                                        break;
                                                    //多行文本框
                                                    case ChildsItemUIType === '10000009':
                                                        var __IsDisplay = $scope.getAttr('input-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#input-' + __id).hide();
                                                        }
                                                        break;
                                                    //单选
                                                    case ChildsItemUIType === '10000005' || ChildsItemUIType === '10000003':
                                                        var __IsDisplay = $scope.getAttr('picker-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#picker-' + __id).hide();
                                                        }
                                                        break;
                                                    //多选
                                                    case ChildsItemUIType === '10000004' || ChildsItemUIType === '10001196':
                                                        var __IsDisplay = $scope.getAttr('checkbox-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#checkbox-' + __id).hide();
                                                        }
                                                        break;
                                                    //日期||时间
                                                    case ChildsItemUIType === '10000008' || ChildsItemUIType === '10000007':
                                                        var __IsDisplay = $scope.getAttr('dtPicker-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#dtPicker-' + __id).hide();
                                                        }
                                                        break;
                                                    //图片
                                                    case ChildsItemUIType === '10000028':
                                                        var __IsDisplay = $scope.getAttr('form-img-up-' + __id, 'IsDisplay');
                                                        if(__IsDisplay === 'false'){
                                                            $('#form-img-up-' + __id).hide();
                                                        }
                                                        break;
                                                    //集合
                                                    case ChildsItemUIType === '10000876':
                                                        //不支持解析
                                                        break;
                                                }

                                            }
                                            break;
                                        //表格
                                        case itemUIType === '10001132':
                                            var ChildsItemNo = itemChilds.ItemNo;
                                            var ChildsParentItemNo = itemChilds.ParentItemNo;
                                            $('#form-aggregate-container-' + ChildsParentItemNo + '-' + ChildsItemNo).hide();
                                            break;
                                    }

                                }
                            }
                            /********************************逻辑跳转-end**********************************/

                        }else{//如果是表格

                            if(HYNExpandVal === value){
                                $('#form-aggregate-container-' + id).show();

                            }else{
                                $('#form-aggregate-container-' + id).hide();

                                /******************************表格里的数据要清空-start**********************************/
                                var ItemNo = Items.ItemNo;
                                var Childs = Items.Childs;
                                var DefaultChilds = Items.DefaultChilds[0].Childs;
                                var formCopyContainer = $('.form-copy-container-' + id);
                                var CRFRelIDArr = [];

                                for(var w=0;w<formCopyContainer.length;w++){
                                    var formCopyContainerW = formCopyContainer[w];
                                    var formCopyContainerWId = formCopyContainerW.id;
                                    var CRFRelID = formCopyContainerWId.split('-')[5];
                                    CRFRelIDArr.push(CRFRelID);
                                }

                                for(var v=0;v<CRFRelIDArr.length;v++){
                                    var _CRFRelID = CRFRelIDArr[v];
                                    for(var u=0;u<DefaultChilds.length;u++){
                                        var DefaultChildsItem = DefaultChilds[u];
                                        var UIType = DefaultChildsItem.UIType;
                                        var UITypeCode = UIType.Code;
                                        var tableItemNo = DefaultChildsItem.ItemNo;
                                        var tableParentItemNo = DefaultChildsItem.ParentItemNo;
                                        var tableId = tableParentItemNo + '-' + tableItemNo + '-' + _CRFRelID;
                                        switch (true) {
                                            //数值框
                                            case UITypeCode === '10006719':
                                                $scope.setAttr('input-' + tableId, 'Value', '');
                                                $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                $('#input-' + tableId + ' input[type=number]').val('');
                                                $('#input-getAutoCalc-' + tableId).html('点击计算');
                                                break;
                                            //单行文本
                                            case UITypeCode === '10000001':
                                                $scope.setAttr('input-' + tableId, 'Value', '');
                                                $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                $('#input-' + tableId + ' input[type=text]').val('');
                                                break;
                                            //多行文本
                                            case UITypeCode === '10000009':
                                                $scope.setAttr('input-' + tableId, 'Value', '');
                                                $scope.setAttr('input-' + tableId, 'OtherValue', '');
                                                $('#input-multiline-' + tableId).val('');
                                                break;
                                            //单选
                                            case UITypeCode === '10000005' || UITypeCode === '10000003':
                                                $scope.setAttr('picker-' + tableId, 'Value', '');
                                                $scope.setAttr('picker-' + tableId, 'OtherValue', '');
                                                $scope.setAttr('picker-' + tableId, 'DisplayName', '');
                                                $('#' + tableId + ' span').html('<span class="form-picker-span">请选择</span>');
                                                $('#picker-' + tableId).removeClass('form-top-left-right-border');
                                                $('#long-picker-' + tableId).hide().html('');
                                                $('#other-picker-' + tableId).hide();
                                                $('#other-picker-' + tableId + ' textarea').val('');
                                                break;
                                            //多选
                                            case UITypeCode === '10000004' || UITypeCode === '10001196':
                                                $scope.setAttr('checkbox-' + tableId, 'Value', '');
                                                $scope.setAttr('checkbox-' + tableId, 'OtherValue', '');
                                                $scope.setAttr('checkbox-' + tableId, 'DisplayName', '');
                                                $('#other-checkbox-' + tableId).hide();
                                                $('#other-checkbox-' + tableId + ' textarea').val('');
                                                $('#checkbox-' + tableId + ' input[type=checkbox]').prop('checked', false);
                                                $('#checkbox-' + tableId + ' label').removeClass('blue');
                                                break;
                                            //日期 || 时间
                                            case UITypeCode === '10000008' || UITypeCode === '10000007':
                                                $scope.setAttr('dtPicker-' + tableId, 'Value', '');
                                                $scope.setAttr('dtPicker-' + tableId, 'OtherValue', '');
                                                $('#' + tableId + ' span').html('<span class="form-picker-span">请选择</span>');
                                                break;
                                            //图片上传
                                            case UITypeCode === '10000028':
                                                $scope.setAttr('form-img-up-' + tableId, 'Value', '');
                                                $scope.setAttr('form-img-up-' + tableId, 'OtherValue', '');
                                                $scope.setAttr('form-img-up-' + tableId, 'Res', '');

                                                for(var m=0;m<4;m++){
                                                    $('#form-img-up-img-' + tableParentItemNo + '-' + tableItemNo + '-' + m + '-' + _CRFRelID).attr('src', '').css('display', 'none');
                                                    $('#' + tableParentItemNo + '-' + tableItemNo + '-' + m + '-' + _CRFRelID).show();
                                                    $('#' + 'form-img-up-del-' + tableParentItemNo + '-' + _CRFRelID + '-' + m + '-' + _CRFRelID).hide();
                                                }
                                                break;

                                        }

                                    }
                                }
                                /******************************表格里的数据要清空-end**********************************/

                            }

                        }
                        /*****************点击隐藏属性的时候,下面的该隐藏的要隐藏-end******************/

                        $scope.$applyAsync();

                        //MUI大坑！去掉多余的
                        $scope.removeMuiPoppicker();

                        picker.dispose();

                    });

                });

            });

            //对集合头的孩子的展示隐藏判断
            $('.form-aggregate-div').each(function () {
                var that = $(this);
                var id = that.attr('id');
                var ItemNo = id.split('-')[2];
                var ChildrenNo = id.split('-')[3];
                var dataCRFItemValue = $scope.getAttr(id, 'CRFItemValue') ? $scope.getAttr(id, 'CRFItemValue') : '';
                var dataHYNExpandVal = $scope.getAttr(id, 'HYNExpandVal') ? $scope.getAttr(id, 'HYNExpandVal') : '';
                if(dataCRFItemValue === dataHYNExpandVal){
                    $('#form-aggregate-container-' + ItemNo + '-' + ChildrenNo).show();
                }else{
                    $('#form-aggregate-container-' + ItemNo + '-' + ChildrenNo).hide();
                }

            });

            //对picker的单独循环
            $(".form-picker-container").each(function(){
                var that = $(this);
                var id = that.attr('id');
                var pid = 'picker-' + id;
                var parent = $('#' + pid);
                var PARENT = $('#picker-div-' + id);
                var dataValue = $scope.getAttr(pid, 'Value');
                var dataDisplayName = $scope.getAttr(pid, 'DisplayName');
                var dataOtherValue = $scope.getAttr(pid, 'OtherValue');
                var valueLength = dataDisplayName.length;
                var dataIsDisplay = $scope.getAttr(pid, 'IsDisplay');
                var dataRowNum = $scope.getAttr(pid, 'RowNum');

                if(dataIsDisplay === 'false'){
                    PARENT.hide();
                }else{
                    PARENT.show();
                }

                //没有其他，没有值
                if(valueLength === 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                    //隐藏当前的其他输入框
                    $('#other-picker-' + id).hide();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                //没有其他，有值
                }else if(valueLength !== 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                    //隐藏当前的其他输入框
                    $('#other-picker-' + id).hide();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                //有其他值
                }else if(dataOtherValue !== '' && (dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1) ){
                    //展示当前的其他输入框
                    $('#other-picker-' + id).show();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

                }

                //层级
                var layer = that.attr('data-layer');
                layer = parseInt(layer);

                //选项内容
                var ValuesetConcepts = that.attr('data-Valueset-Concepts');
                //console.log(ValuesetConcepts);
                ValuesetConcepts = JSON.parse(ValuesetConcepts);

                //逻辑跳转
                var Logic = that.attr('data-Logic');
                if(Logic !== '' && Logic !== undefined && Logic !== null){
                    Logic = JSON.parse(Logic);
                }else{
                    Logic = [];
                }

                var setData = [];
                var ScoreArr = [];

                /**********************组织选择项-start**********************/
                for(var i=0;i<ValuesetConcepts.length;i++){
                    var arr = ValuesetConcepts[i];
                    var Code = arr.Code;
                    var DisplayName = (arr.DisplayName).replace(' ', '');//选项里还有空格，什么鬼
                    var Score = arr.Score ? arr.Score : '';

                    setData.push({value:Code,text:DisplayName,Score:Score});

                    if(Code === dataValue){
                        ScoreArr.push(Score);
                    }
                }

                //加个清空操作,md
                setData.push({value:'empty',text:'清空',Score:''});
                /**********************组织选择项-end**********************/

                var dataScore = '';
                if(ScoreArr.length > 0){
                    dataScore = ScoreArr[0];
                }else{
                    dataScore = '';
                }

                $scope.setAttr(pid, 'Score', dataScore);

                that.on('tap', function() {
                    var picker = new mui.PopPicker({layer:layer});
                    picker.setData(setData);
                    //$scope.beforeRemoveMuiPoppicker();
                    picker.show(function(items) {
                        console.log(items[0]);
                        var res = items[0].text;
                        var value = items[0].value;
                        var score = items[0].Score ? items[0].Score : '';

                        var html = '';

                        if(res.substr(0, 2).indexOf('其它') !== -1 || res.substr(0, 2).indexOf('其他') !== -1 ){//为其他
                            html = '<span class="form-picker-span-res">' + res + '</span>';
                            $('#long-picker-' + id).hide();
                            $('#other-picker-' + id).show();
                            $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

                            //$('#other-picker-' + id + ' textarea').focus();

                        }else if(res.substr(0, 2).indexOf('其它') === -1 && res.substr(0, 2).indexOf('其他') === -1 ){//不为其他

                            if(res === '清空' && value === 'empty'){
                                html = '<span class="form-picker-span">请选择</span>';
                            }else{
                                html = '<span class="form-picker-span-res">' + res + '</span>';
                            }

                            $('#long-picker-' + id).hide();
                            $('#other-picker-' + id).hide();
                            $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                            $scope.setAttr('picker-' + id, 'OtherValue', '');
                            $('#other-picker-' + id + ' textarea').val('');

                        }

                        if(res === '清空' && value === 'empty'){
                            $scope.setAttr('picker-' + id, 'Value', '');
                            $scope.setAttr('picker-' + id, 'DisplayName', '');
                            $scope.setAttr('picker-' + id, 'Score', '');
                        }else{
                            $scope.setAttr('picker-' + id, 'Value', value);
                            $scope.setAttr('picker-' + id, 'DisplayName', res);
                            $scope.setAttr('picker-' + id, 'Score', score);
                        }

                        $('#' + id).html(html);

                        /**********************************逻辑跳转判断-start********************************/
                        /**
                         * 逻辑跳转的最多支持3层
                         */

                        var LogicArr = [];//需要显示的数组
                        var LogicBrr = [];//需要隐藏的数组
                        var LogicCrr = [];//必须隐藏的数据
                        for(var i=0;i<Logic.length;i++){
                            var arr = Logic[i];
                            var TriggerVal = arr.TriggerVal;    //触发值
                            var TargetItemNo = arr.TargetItemNo;//目标id
                            var parentNo = (id.split('-'))[0];

                            if(TriggerVal === value){
                                LogicArr.push(TargetItemNo);
                            }else{
                                LogicBrr.push(TargetItemNo);
                            }

                        }

                        LogicArr = $scope.uniqArr(LogicArr);
                        LogicBrr = $scope.uniqArr(LogicBrr);
                        LogicCrr = $scope.compareArr(LogicBrr, LogicArr);//绝对隐藏的数组

                        for(var j=0;j<LogicArr.length;j++){
                            var brr = LogicArr[j];
                            $scope.displayHide(parentNo, brr, 'show', dataRowNum);
                        }

                        for(var k=0;k<LogicCrr.length;k++){
                            var crr = LogicCrr[k];
                            $scope.displayHide(parentNo, crr, 'hide', dataRowNum);
                        }

                        var idArr = id.split('-');
                        var ITEMNO = idArr[0];
                        console.log(ITEMNO);//父级ID
                        console.log(LogicArr);//需要显示的数组
                        console.log(LogicBrr);//需要隐藏的数组
                        console.log(LogicCrr);//必须要隐藏的数据

                        //对下下级的Logic判断
                        if(LogicCrr.length > 0){
                            for(var m=0;m<LogicCrr.length;m++){
                                var drr = LogicCrr[m];
                                var LOGIC = '';
                                if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                                    LOGIC = $scope.getAttr(ITEMNO + '-' + drr, 'Logic');
                                }else{
                                    LOGIC = $scope.getAttr(ITEMNO + '-' + drr + '-' + dataRowNum, 'Logic');
                                }

                                if(LOGIC === '' || LOGIC === undefined || LOGIC === null){

                                }else{
                                    LOGIC = JSON.parse(LOGIC);
                                }

                                if(LOGIC === undefined || LOGIC === '' || LOGIC === null){

                                }else{
                                    for(var n=0;n<LOGIC.length;n++){
                                        var itemLOGIC = LOGIC[n];
                                        var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
                                        $scope.displayHide(ITEMNO, itemLOGICTargetItemNo, 'hide', dataRowNum);
                                    }
                                }

                                /*******************对多选的logic的判断-start*******************/
                                var LOGIC2 = '';
                                if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                                    LOGIC2 = $scope.getAttr('checkbox-' + ITEMNO + '-' + drr, 'Logic');
                                }else{
                                    LOGIC2 = $scope.getAttr('checkbox-' + ITEMNO + '-' + drr + '-' + dataRowNum, 'Logic');
                                }

                                if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){

                                }else{
                                    LOGIC2 = JSON.parse(LOGIC2);
                                }

                                if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){

                                }else{
                                    for(var p=0;p<LOGIC2.length;p++){
                                        var itemLOGIC2 = LOGIC2[p];
                                        var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
                                        $scope.displayHide(ITEMNO, itemLOGICTargetItemNo2, 'hide', dataRowNum);
                                    }
                                }
                                /*******************对多选的logic的判断-end*******************/

                            }
                        }

                        /**********************************逻辑跳转判断-end**********************************/

                        //MUI大坑！去掉多余的
                        $scope.removeMuiPoppicker();

                        $scope.$applyAsync();

                        picker.dispose();

                    });

                });

            });

            //对dtPicker的单独循环
            $(".form-dtPicker-container").each(function(){
                var that = $(this);
                var id = that.attr('id');
                var type = that.attr('data-type');
                var options = {
                    type:type,
                    beginYear:$scope.dtPickerBeginYear,
                    endYear:$scope.dtPickerEndYear
                };

                /*对展示隐藏的判断-start*/
                var dataIsDisplay = getAttr('dtPicker-' + id, 'IsDisplay');
                if(dataIsDisplay === true){
                    $('#dtPicker-' + id).show();
                }else{
                    $('#dtPicker-' + id).hide();
                }

                that.on('tap', function() {
                    var picker = new mui.DtPicker(options);
                    picker.show(function(items) {
                        console.log(items);
                        var html = '<span class="form-picker-span-res">' + items.value + '</span>';
                        $scope.setAttr('dtPicker-' + id, 'Value', items.value);
                        $('#' + id).html(html);
                        //MUI大坑！去掉多余的
                        $scope.removeMuiPoppicker();
                        picker.dispose();

                    });

                });

            });

            //对checkbox的单独循环
            $('.form-checkbox-div').each(function () {
                var that = $(this);
                var id = that.attr('id');
                var idArr = id.split('-');
                var ItemsNo = idArr[1];
                var childrenNo = idArr[2];
                var dataValue = $scope.getAttr(id, 'Value');
                var dataDisplayName = $scope.getAttr(id, 'DisplayName');
                var dataOtherValue = $scope.getAttr(id, 'OtherValue');
                var dataRowNum = $scope.getAttr(id, 'RowNum');

                /*对展示隐藏的判断-start*/
                var dataIsDisplay = $scope.getAttr(id, 'IsDisplay');

                if(dataIsDisplay === 'false'){
                    that.hide();
                }else{
                    that.show();
                }
                /*对展示隐藏的判断-end*/

                var arr = dataValue.split('&');

                for(var i=0;i<arr.length;i++){
                    var Code = arr[i];
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code).prop('checked', true);
                        $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code).addClass('blue');
                    }else{
                        $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).prop('checked', true);
                        $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).addClass('blue');
                    }

                }

                //对其他，其它的判断
                if(dataOtherValue !== '' || dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1){
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo).show();
                    }else{
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).show();
                    }

                }else{
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo).hide();
                    }else{
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).hide();
                    }
                }

            });

            //对图片的展示
            $('.form-img-up-containter').each(function () {
                var that = $(this);
                var id = that.attr('id');
                var idArr = id.split('-');
                var ItemsNo = idArr[3];
                var ChildrenNo = idArr[4];

                var CRFRelID = '';
                if(idArr[5] === undefined || idArr[5] === null || idArr[5] === ''){
                    CRFRelID = '';
                }else{
                    CRFRelID = idArr[5];
                }

                var dataValue = $scope.getAttr(id, 'Value');
                var res = [];
                var arr = dataValue.split('&');

                for(var i=0;i<4;i++){
                    var path = arr[i];
                    if(path === '' || path === null || path === undefined){
                        continue;
                    }

                    if(CRFRelID === ''){
                        res.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + i);

                        $('#form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + i).attr('src', path).css('display', 'block');
                        $('#' + ItemsNo + '-' + ChildrenNo + '-' + i).hide();
                        $('#' + 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + i).show();
                    }else{
                        res.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID);

                        $('#form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).attr('src', path).css('display', 'block');
                        $('#' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).hide();
                        $('#' + 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).show();
                    }
                }

                res = res.join('&');

                $scope.setAttr(id, 'Res', res);

            });

            //对数值输入框，文本输入框，多行文本框，日期时间，图片的展示隐藏判断
            var divArr = [
                'form-aggregate-label-div',
                'form-input-div',
                'form-time-div',
                'form-img-up-div',
                'form-aggregate-div'
            ];

            for(var f=0;f<divArr.length;f++){
                var divArrItem = divArr[f];
                $('.' + divArrItem).each(function () {
                    var that = $(this);
                    var id = that.attr('id');
                    var dataIsDisplay = $scope.getAttr(id, 'IsDisplay');

                    if(dataIsDisplay === 'false'){
                        that.hide();
                    }else{
                        that.show();
                    }

                });

            }

            //这是一个新增表单
            /*if($scope.crfdataid === 0){
                $('.form-scroller-li').addClass('form-nocomplete');
            }else{

            }*/

            //获取当前单页的数据填写情况
            $scope.getSituation();

            //将页面滑动到最顶部
            $scope.toTop();

            //MUI大坑！去掉多余的
            $scope.removeMuiPoppicker();

            //调整样式
            $scope.initCss();

            //初始化图片插件
            $scope.initImg();

            mui.hideLoading();

            for(var h=0;h<$scope.Pages.length;h++){
                var PAGENO = $scope.Pages[h].PageNo;
                if($scope.PageNo === PAGENO){
                    $('#form-page-' + PAGENO).show();
                }else{
                    $('#form-page-' + PAGENO).hide();
                }
            }

            console.log($scope.Pages);

        }, true);

    };

    /**
     * 展示数字框的单位
     * @param children
     */
    $scope.showDanWei = function (children) {
        var Unit = children.Unit;
        if(Unit === '' || Unit === null || Unit === undefined){

        }else{
            var DisplayName = children.Unit.DisplayName;
            if(DisplayName === '' || DisplayName === null || DisplayName === undefined){

            }else{
                if(DisplayName.length > 7){
                    mui.alert('<span style="color: #007aff;font-weight: 900;">' + DisplayName + '</span>',
                        '单位',
                        function() {
                            //TODO
                        });
                }
            }
        }

    };

    /**
     * 自动计算
     * @param children
     * @param SectionNo
     * @param CRFRelID
     */
    $scope.getAutoCalc = function (children, SectionNo, CRFRelID) {
        var AutoCalc = children.AutoCalc;
        if(AutoCalc === '' || AutoCalc === null || AutoCalc === undefined){
            return false;
        }

        mui.showLoading('正在加载..', 'div');

        var CRFNo = $scope.CRFs.CRFNo;
        var PageNo = $scope.PageNo;

        AutoCalc = children.AutoCalc;
        var AutoCalcID = AutoCalc.AutoCalcID;
        var CalcDependItems = AutoCalc.CalcDependItems;
        var ParentItemNo = AutoCalc.ParentItemNo;
        var ItemNo = AutoCalc.ItemNo;
        var MapPath = AutoCalc.MapPath;
        var pid = '';
        var res = [];

        //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
        setTimeout(function () {
            for(var i=0;i<CalcDependItems.length;i++){
                var arr = CalcDependItems[i];
                var DependItemNo = arr.DependItemNo;
                var VarName = arr.VarName;
                var CRFUIType = arr.CRFUIType;
                var container = '';
                var value = '';
                var score = '';

                switch (CRFUIType) {
                    //数值框
                    case '10006719':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'input-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        break;
                    //单选
                    case '10000003':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        //score = $scope.getAttr(pid, 'Score');
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        /*if(score === '' || score === null || score === undefined){
                            value = $scope.getAttr(pid, 'Value');
                        }else{
                            value = score;
                        }*/
                        break;
                    //单选
                    case '10000005':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        //score = $scope.getAttr(pid, 'Score');
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        /*if(score === '' || score === null || score === undefined){
                            value = $scope.getAttr(pid, 'Value');
                        }else{
                            value = score;
                        }*/
                        break;
                    //多选
                    case '10000004':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        //score = $scope.getAttr(pid, 'Score');
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        break;
                    //多选
                    case '10001196':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        //score = $scope.getAttr(pid, 'Score');
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        break;
                    //时间
                    case '10000007':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        break;
                    //日期
                    case '10000008':
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }
                        value = $scope.getAttr(pid, 'Value');
                        MapPath = getAttr(pid, 'MapPath');
                        break;
                    //表格
                    case '10001132':
                        mui.hideLoading();
                        return false;
                        break;
                }

                if(value === '' || value === undefined || value === null){

                }else{
                    res.push({
                        DependItemNo:DependItemNo,
                        VarName:VarName,
                        MapPath:MapPath,
                        CRFNo:CRFNo,
                        PageNo:PageNo,
                        SectionNO:SectionNo,
                        Value:value,
                        CRFUIType:CRFUIType,
                        CRFRelID:CRFRelID
                    });
                }

            }

            console.log(res);

            /***************************************无输入或选中值时的判断-start******************************************/
            var resZero = [];
            for(var r=0;r<res.length;r++){
                var resItem = res[r];
                var resItemValue = resItem.Value;
                if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                    resZero.push(r);
                }
            }

            console.log(resZero.length, res.length);

            if(resZero.length === res.length){
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    $scope.setAttr('input-' + ParentItemNo + '-' + ItemNo, 'Value', '');
                    $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo).html('点击计算');
                }else{
                    $scope.setAttr('input-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID, 'Value', '');
                    $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID).html('点击计算');
                }
                //mui.toast('没有值进行计算');
                mui.hideLoading();
                return false;
            }
            /***************************************无输入或选中值时的判断-end******************************************/

            var AutoCalcModel = {
                AutoCalcID:AutoCalcID,
                CalcDependItems:res
            };

            console.log(res);

            $.ajax({
                async:true,
                method:'post',
                dataType:'json',
                //url:$scope.addaUrl + '/rest/autocalc/calc/wx/' + $scope.accessKey,
                url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                data:AutoCalcModel,
                success:function (Data) {
                    mui.hideLoading();

                    var result = Data.result;

                    if(result === 200){
                        var data = Data.data;
                        var DependItemNo = data.DependItemNo;
                        var MapPath = data.MapPath;
                        var Value = data.Value ? data.Value : '';
                        console.log(Value);

                        var id = '';
                        var getAutoCalcId = '';
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            id = 'input-' + ParentItemNo + '-' + DependItemNo;
                            getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo;
                        }else{
                            id = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                            getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        }

                        $scope.setAttr(id, 'Value', Value);
                        //$('#' + id + ' input').val(Value);
                        if(Value === ''){
                            $('#' + getAutoCalcId).html('点击计算');
                        }else{
                            $('#' + getAutoCalcId).html(Value);
                        }

                    }else{
                        mui.toast('自动计算异常');
                    }

                },
                error:function (err) {
                    //console.log(err);
                    mui.toast('自动计算异常');
                    mui.hideLoading();

                }
            });

        }, 500);

    };

    /**
     * 代替点击
     * @param id
     */
    $scope.triggerTap = function (id) {
        $('#' + id).trigger('tap');
    };

    /**
     * MUI大坑！去掉多余的.mui-poppicker
     */
    $scope.removeMuiPoppicker = function () {
        var crr = $('.mui-poppicker');
        for(var j=0;j<crr.length;j++){
            var drr = crr[j];
            drr.remove();
        }

        var err = $('.mui-backdrop');
        for(var k=0;k<err.length;k++){
            var frr = err[k];
            frr.remove();
        }

    };

    $scope.beforeRemoveMuiPoppicker = function () {
        var crr = $('.mui-poppicker');
        for(var j=0;j<crr.length;j++){
            var drr = crr[j];
            if(j !== 0){
                drr.remove();
            }
        }

        var err = $('.mui-backdrop');
        for(var k=0;k<err.length;k++){
            var frr = err[k];
            if(k !== 0){
                frr.remove();
            }
        }

    };

    /**
     * 多选点击方法
     * @param checkbox
     * @param children 父亲集
     * @param childrens 当前集
     * @param $event
     * @param CRFRelID 表格的行号
     */
    $scope.getCheckbox = function (checkbox, children, childrens, $event, CRFRelID) {
        var Code = checkbox.Code;
        var childrensItemNo = children.ItemNo;  //父级id

        /****对单一组件的判断-start****/
        if(children.ItemNo === undefined || children.ItemNo === '' || children.ItemNo === null){
            childrensItemNo = '';
        }
        /****对单一组件的判断-end****/

        var childrenItemNo = childrens.ItemNo;  //当前id
        var checked = $event.target.checked;

        if(childrens.Logic !== undefined && childrens.Logic !== '' && childrens.Logic !== null){
            var Logic = childrens.Logic;            //逻辑跳转问题
            Logic = JSON.parse(Logic);
        }else{
            Logic = [];
        }

        //console.log(childrensItemNo, childrenItemNo, Code, Logic);

        var pid = '';
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            pid = 'checkbox-' + childrensItemNo + '-' + childrenItemNo;
        }else{
            pid = 'checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID;
        }

        /*******用不到，先留着-start*******/
        var parent = $('#checkbox-' + childrensItemNo + '-' + childrenItemNo);
        var dataValue = $scope.getAttr(pid, 'Value');
        var that = $('#checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code);
        /*******用不到，先留着-end*******/

        /*******本来这里要自己计算的，现在不用了-start*******/
        var dataDisplayName = '';
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            dataDisplayName = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code, 'DisplayName');
        }else{
            dataDisplayName = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID, 'DisplayName');
        }
        /*******本来这里要自己计算的，现在不用了-end*******/

        var arr = '';
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            arr = $('input[name="checkbox-name-' + childrensItemNo + '-' + childrenItemNo + '"]');
        }else{
            arr = $('input[name="checkbox-name-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID + '"]');
        }

        var CodeArr = [];
        var DisplayNameArr = [];
        var ScoreArr = [];
        var OtherArr = [];

        arr.each(function () {
            var that = $(this)[0];
            var _checked = that.checked;
            var _id = that.id;
            var _idArr = _id.split('-');
            _id = _idArr[4];
            var _dataDisplayName = '';
            var _dataScore = '';

            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                _dataDisplayName = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id, 'DisplayName');
                _dataScore = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id, 'Score');
            }else{
                _dataDisplayName = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id + '-' + CRFRelID, 'DisplayName');
                _dataScore = $scope.getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id + '-' + CRFRelID, 'Score');
            }

            if(_checked === true){
                CodeArr.push(_id);
                DisplayNameArr.push(_dataDisplayName);
                ScoreArr.push(_dataScore);
            }

            if(_checked === true && (_dataDisplayName.substr(0, 2).indexOf('其它') !== -1 || _dataDisplayName.substr(0, 2).indexOf('其他') !== -1) ){
                OtherArr.push(_id);
            }else{
                OtherArr = [];
            }

        });

        var dataValueRes = CodeArr.join('&');
        var DisplayNameRes = DisplayNameArr.join('&');
        var ScoreRes = ScoreArr.join('&');

        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'Value', dataValueRes);
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'DisplayName', DisplayNameRes);
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'Score', ScoreRes);
        }else{
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'Value', dataValueRes);
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'DisplayName', DisplayNameRes);
            $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'Score', ScoreRes);
        }

        if(OtherArr.length !== 0){
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo).show();
            }else{
                $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).show();
            }
        }else{
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'OtherValue', '');
                $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo).val('');
                $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo).hide();
            }else{
                $scope.setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'OtherValue', '');
                $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).val('');
                $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).hide();
            }
        }

        if(checked === true){
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code).addClass('blue');
            }else{
                $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID).addClass('blue');
            }
        }else{
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code).removeClass('blue');
            }else{
                $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID).removeClass('blue');
            }
        }

        //注释掉，不然真机会产生不可描述的问题
        /*if(checked === true && (dataDisplayName.substr(0, 2).indexOf('其它') !== -1 || dataDisplayName.substr(0, 2).indexOf('其他') !== -1)){
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo).focus();
            }else{
                $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).focus();
            }
        }*/

        /******************************************多选的逻辑跳转-start******************************************/
        var LogicArr = [];//需要显示的数组
        var LogicBrr = [];//需要隐藏的数组（全部需要显示的数组）
        var LogicCrr = [];//当没有选择时，必须隐藏的数组

        for(var p=0;p<CodeArr.length;p++){
            var _Code = CodeArr[p];

            for(var i=0;i<Logic.length;i++){
                var TriggerVal = Logic[i].TriggerVal;    //触发值
                var TargetItemNo = Logic[i].TargetItemNo;//目标id
                if(TriggerVal === _Code){
                    LogicArr.push(TargetItemNo);
                }

                LogicBrr.push(TargetItemNo);
            }

        }

        for(var i=0;i<Logic.length;i++){
            var TargetItemNo = Logic[i].TargetItemNo;//目标id
            LogicCrr.push(TargetItemNo);
        }

        LogicBrr = $scope.uniqArr(LogicBrr);
        LogicCrr = $scope.uniqArr(LogicCrr);

        for(var k=0;k<LogicBrr.length;k++){
            var crr = LogicBrr[k];
            //$scope.displayHide(childrensItemNo, crr, 'hide', CRFRelID);
        }

        for(var j=0;j<LogicArr.length;j++){
            var brr = LogicArr[j];
            $scope.displayHide(childrensItemNo, brr, 'show', CRFRelID);
        }

        if(CodeArr.length === 0){
            for(var j=0;j<LogicCrr.length;j++){
                var drr = LogicCrr[j];
                $scope.displayHide(childrensItemNo, drr, 'hide', CRFRelID);
            }
        }

        var LogicDrr = $scope.compareArr(LogicBrr, LogicArr);//绝对隐藏的数组
        for(var s=0;s<LogicDrr.length;s++){
            var err = LogicDrr[s];
            $scope.displayHide(childrensItemNo, err, 'hide', CRFRelID);
        }

        if(checked === true){
            console.log('选中的值:' + CodeArr);//选中的值
            //console.log('需要隐藏的数组:' + LogicBrr);//需要隐藏的数组
            console.log('需要显示的数组:' + LogicArr);//需要显示的数组
            console.log('当没有选择时，必须隐藏的数组:' + LogicCrr);//当没有选择时，必须隐藏的数组
            console.log('需要隐藏的数组:' + LogicDrr);
        }

        //当没有全部都不选但是有不选中的时候
        if(checked === false){
            if(CodeArr.length === 0){
                //如果没有选中值时才使用[当没有选择时，必须隐藏的数组]
            }else{
                LogicCrr = [];
            }
            console.log('选中的值:' + CodeArr);//选中的值
            //console.log('需要隐藏的数组:' + LogicBrr);//需要隐藏的数组
            console.log('需要显示的数组:' + LogicArr);//需要显示的数组
            console.log('当没有选择时，必须隐藏的数组:' + LogicCrr);//当没有选择时，必须隐藏的数组
            console.log('需要隐藏的数组:' + LogicDrr);
            for(var m=0;m<LogicDrr.length;m++){
                var checkboxId = '';
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    checkboxId = 'checkbox-' + childrensItemNo + '-' + LogicDrr[m];
                }else{
                    checkboxId = 'checkbox-' + childrensItemNo + '-' + LogicDrr[m] + '-' + CRFRelID;
                }

                var LOGIC = $scope.getAttr(checkboxId, 'Logic');

                if(LOGIC === '' || LOGIC === undefined || LOGIC === null){

                }else{
                    LOGIC = JSON.parse(LOGIC);
                }

                if(LOGIC === undefined || LOGIC === '' || LOGIC === null){

                }else{
                    for(var n=0;n<LOGIC.length;n++){
                        var itemLOGIC = LOGIC[n];
                        var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
                        $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo, 'hide', CRFRelID);
                    }
                }

                /*************************对单选logic的判断-start************************/
                var checkboxId3 = '';
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    checkboxId3 = childrensItemNo + '-' + LogicDrr[m];
                }else{
                    checkboxId3 = childrensItemNo + '-' + LogicDrr[m] + '-' + CRFRelID;
                }

                var LOGIC3 = $scope.getAttr(checkboxId3, 'Logic');

                if(LOGIC3 === '' || LOGIC3 === undefined || LOGIC3 === null){

                }else{
                    LOGIC3 = JSON.parse(LOGIC3);
                }

                if(LOGIC3 === undefined || LOGIC3 === '' || LOGIC3 === null){

                }else{
                    for(var r=0;r<LOGIC3.length;r++){
                        var itemLOGIC3 = LOGIC3[r];
                        var itemLOGICTargetItemNo3 = itemLOGIC3.TargetItemNo;
                        $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo3, 'hide', CRFRelID);
                    }
                }
                /*************************对单选logic的判断-end************************/

            }

            /************************对下级再进行判断-start***************************/
            //对没有全不选的Logic判断
            if(LogicDrr.length > 0){
                for(var x=0;x<LogicDrr.length;x++){
                    var drr1 = LogicDrr[x];
                    var LOGIC1 = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        LOGIC1 = $scope.getAttr('checkbox-' + childrensItemNo + '-' + drr1, 'Logic');
                    }else{
                        LOGIC1 = $scope.getAttr('checkbox-' + childrensItemNo + '-' + drr1 + '-' + CRFRelID, 'Logic');
                    }

                    if(LOGIC1 === '' || LOGIC1 === undefined || LOGIC1 === null){

                    }else{
                        LOGIC1 = JSON.parse(LOGIC1);
                    }

                    if(LOGIC1 === undefined || LOGIC1 === '' || LOGIC1 === null){

                    }else{
                        for(var y=0;y<LOGIC1.length;y++){
                            var itemLOGIC1 = LOGIC1[y];
                            var itemLOGICTargetItemNo1 = itemLOGIC1.TargetItemNo;
                            $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo1, 'hide', CRFRelID);
                        }
                    }

                    /*************************对单选logic的判断-start************************/
                    var LOGIC4 = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        LOGIC4 = $scope.getAttr(childrensItemNo + '-' + drr1, 'Logic');
                    }else{
                        LOGIC4 = $scope.getAttr(childrensItemNo + '-' + drr1 + '-' + CRFRelID, 'Logic');
                    }

                    if(LOGIC4 === '' || LOGIC4 === undefined || LOGIC4 === null){

                    }else{
                        LOGIC4 = JSON.parse(LOGIC4);
                    }

                    if(LOGIC4 === undefined || LOGIC4 === '' || LOGIC4 === null){

                    }else{
                        for(var t=0;t<LOGIC4.length;t++){
                            var itemLOGIC4 = LOGIC4[t];
                            var itemLOGICTargetItemNo4 = itemLOGIC4.TargetItemNo;
                            $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo4, 'hide', CRFRelID);
                        }
                    }
                    /*************************对单选logic的判断-end************************/

                }

            }else{
                //对有全不选的Logic判断
                if(LogicCrr.length > 0){
                    for(var a=0;a<LogicCrr.length;a++){
                        var drr2 = LogicCrr[a];
                        var LOGIC2 = '';
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            LOGIC2 = $scope.getAttr('checkbox-' + childrensItemNo + '-' + drr2, 'Logic');
                        }else{
                            LOGIC2 = $scope.getAttr('checkbox-' + childrensItemNo + '-' + drr2 + '-' + CRFRelID, 'Logic');
                        }

                        if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){

                        }else{
                            LOGIC2 = JSON.parse(LOGIC2);
                        }

                        if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){

                        }else{
                            for(var b=0;b<LOGIC2.length;b++){
                                var itemLOGIC2 = LOGIC2[b];
                                var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
                                $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo2, 'hide', CRFRelID);
                            }
                        }

                        /*************************对单选logic的判断-start************************/
                        var LOGIC5 = '';
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            LOGIC5 = $scope.getAttr(childrensItemNo + '-' + drr2, 'Logic');
                        }else{
                            LOGIC5 = $scope.getAttr(childrensItemNo + '-' + drr2 + '-' + CRFRelID, 'Logic');
                        }

                        if(LOGIC5 === '' || LOGIC5 === undefined || LOGIC5 === null){

                        }else{
                            LOGIC5 = JSON.parse(LOGIC5);
                        }

                        if(LOGIC5 === undefined || LOGIC5 === '' || LOGIC5 === null){

                        }else{
                            for(var s=0;s<LOGIC5.length;s++){
                                var itemLOGIC5 = LOGIC5[s];
                                var itemLOGICTargetItemNo5 = itemLOGIC5.TargetItemNo;
                                $scope.displayHide(childrensItemNo, itemLOGICTargetItemNo5, 'hide', CRFRelID);
                            }
                        }
                        /*************************对单选logic的判断-end************************/

                    }
                }
            }

        }
        /************************对下级再进行判断-end***************************/

        /******************************************多选的逻辑跳转-end******************************************/

        //最后再清空，防止污染
        //其实也没啥事
        CodeArr = [];
        DisplayNameArr = [];
        OtherArr = [];

    };

    /**
     * 比较两个数组取不同的值
     * @param array
     * @param array2
     * @returns {Array}
     */
    $scope.compareArr = function (array, array2) {
        var arr3 = [];
        for(var key in array) {
            var stra = array[key];
            var count = 0;
            for(var j = 0; j < array2.length; j++) {
                var strb = array2[j];
                if(stra == strb) {
                    count++;
                }
            }
            if(count === 0) { //表示数组1的这个值没有重复的，放到arr3列表中
                arr3.push(stra);
            }
        }

        return arr3;

    };

    /**
     * 数组去重
     * @param array
     * @returns {Array}
     */
    $scope.uniqArr = function(array){
        var temp = [];
        var index = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
            for(var j = i + 1; j < l; j++){
                if (array[i] === array[j]){
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
            index.push(i);
        }
        return temp;
    };

    //将页面滑动到最顶部
    $scope.toTop = function () {
        $('html, body').animate({
            scrollTop: 0
        }, 0);

    };

    //初始化折叠面板
    $scope.initPanel = function () {
        //自定义展开后不需要将同级元素折叠
        //bug太多，不能用
        mui('body').on('tap','.form-li',function(e){
            this.classList.toggle('mui-active');
            return false;//可以取消继续执行默认绑定事件

        });

    };

    /**
     * 输入框的失去焦点
     * @param $event
     * @param children 小
     * @param Items 大
     * @param CRFRelID 表格中的行号
     * @returns {boolean}
     */
    $scope.inputBlur = function ($event, children, Items, CRFRelID) {
        var formCopyClass = '';
        var formCopyLength = '';//表格的个数
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){

        }else{
            formCopyClass = 'form-copy-container-' + Items.ParentItemNo + '-' + Items.ItemNo;
            formCopyLength = $('.' + formCopyClass).length;//表格的个数
        }

        var Childs = Items.Childs;              //该模块内容的所有孩子

        /****对单一组件的判断-start****/
        if(Items.Childs === undefined || Items.Childs === '' || Items.Childs === null){
            Childs = Items.Items;
        }
        /****对单一组件的判断-end****/

        var noNums = /^[\u4e00-\u9fa5]{0,}$/;   //判断是汉字,英文,字母等其他非数字
        var decimal = /^(\d+(\.\d{1,2})?)$/;    //精确到后2位
        var integer = /^[0-9]*[1-9][0-9]*$/;    //整数
        var UITypeCode = children.UIType.Code;  //类型Code
        var DataType = children.DataType.Code;  //输入类型Code
        var ItemNo = '';

        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            ItemNo = 'input-' + Items.ItemNo + '-' + children.ItemNo;
        }else{
            ItemNo = 'input-' + Items.ItemNo + '-' + children.ItemNo + '-' + CRFRelID;
        }

        /****对单一组件的判断-start****/
        if(Items.Childs === undefined || Items.Childs === '' || Items.Childs === null){
            ItemNo = 'input--' + children.ItemNo;
        }
        /****对单一组件的判断-end****/

        var input = $('#' + ItemNo + ' input'); //输入框盒子
        var value = input.val();                //输入框的值

        /****值为空的判断****/
        if(value === '' || value === undefined || value === null){
            value = '';
            $scope.setAttr(ItemNo, 'Value', value);
            input.val('');

            /*************************判断有逻辑计算的输入框的需清空-start**************************/
            var IsAuto = [];//是否需要参与计算判断数组
            var IsGetAutoCalcId = [];//是否需要参与计算div判断数组
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){

            }else{
                Childs = Childs[0].Childs;
            }
            for(var i=0;i<Childs.length;i++){
                var ChildsItem = Childs[i];
                if(ChildsItem.AutoCalc !== undefined && ChildsItem.AutoCalc !== '' && ChildsItem.AutoCalc !== null){
                    var AutoCalc = ChildsItem.AutoCalc;
                    var CalcDependItems = AutoCalc.CalcDependItems;
                    var AutoItemNo = AutoCalc.ItemNo;
                    var AutoParentItemNo = AutoCalc.ParentItemNo;
                    for(var j=0;j<CalcDependItems.length;j++){
                        var CalcDependItemsItem = CalcDependItems[j];
                        var DependItemNo = CalcDependItemsItem.DependItemNo;
                        if(children.ItemNo === DependItemNo){
                            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                IsAuto.push('input-' + AutoParentItemNo + '-' + AutoItemNo);
                                IsGetAutoCalcId.push('input-getAutoCalc-' + AutoParentItemNo + '-' + AutoItemNo);
                            }else{
                                IsAuto.push('input-' + AutoParentItemNo + '-' + AutoItemNo + '-' + CRFRelID);
                                IsGetAutoCalcId.push('input-getAutoCalc-' + AutoParentItemNo + '-' + AutoItemNo + '-' + CRFRelID);
                            }

                        }

                    }

                }
            }

            for(var k=0;k<IsAuto.length;k++){
                var IsAutoItem = IsAuto[k];
                $scope.setAttr(IsAutoItem, 'Value', '');
                //$('#' + IsAutoItem + ' input[type=number]').val('');
            }

            //对应的div要清空并赋值为 点击计算
            for(var d=0;d<IsGetAutoCalcId.length;d++){
                var IsGetAutoCalcIdItem = IsGetAutoCalcId[d];
                //$scope.setAttr(IsAutoItem, 'Value', '');
                $('#' + IsGetAutoCalcIdItem).html('点击计算');
            }

            if(UITypeCode === '10006719'){
                //mui.showLoading('正在加载..', 'div');

                //表格中的跨级计算CTMB
                var TargetItemNo = '';
                if(children.TargetItemNo === undefined || children.TargetItemNo === '' || children.TargetItemNo === null){
                    mui.hideLoading();
                }else{
                    var TargetItemArr = [];
                    //跨级计算的模板id
                    TargetItemNo = +(children.TargetItemNo);
                    var formItemId = 'form-aggregate-' + Items.ParentItemNo + '-' + Items.ItemNo;
                    var ITEMS = $scope.getAttr(formItemId, 'Items');
                    ITEMS = JSON.parse(ITEMS);
                    var TargetChilds = ITEMS.Childs;
                    var DefaultChilds = Items.DefaultChilds[0].Childs;
                    for(var h=0;h<TargetChilds.length;h++){
                        var TargetChildsItem = TargetChilds[h];
                        if(TargetItemNo === TargetChildsItem.ItemNo){
                            var TargetChildsItemItemNo = TargetChildsItem.ItemNo;
                            var TargetChildsItemParentItemNo = TargetChildsItem.ParentItemNo;
                            var TargetChildsItemAutoCalc = TargetChildsItem.AutoCalc;
                            var TargetChildsItemAutoCalcID = TargetChildsItemAutoCalc.AutoCalcID;
                            var TargetChildsItemCalcDependItems = TargetChildsItemAutoCalc.CalcDependItems[0];
                            var TargetChildsItemVarName = TargetChildsItemCalcDependItems.VarName;
                            TargetItemArr.push({
                                TargetChildsItemItemNo:TargetChildsItemItemNo,
                                TargetChildsItemParentItemNo:TargetChildsItemParentItemNo,
                                TargetChildsItemAutoCalcID:TargetChildsItemAutoCalcID,
                                //TargetChildsItemAutoCalc:TargetChildsItemAutoCalc,
                                //TargetChildsItemCalcDependItems:TargetChildsItemCalcDependItems,
                                TargetChildsItemVarName:TargetChildsItemVarName
                            });
                        }

                    }

                    var _TargetChildsItemVarName = TargetItemArr[0].TargetChildsItemVarName;
                    _TargetChildsItemVarName = JSON.parse(_TargetChildsItemVarName);
                    var TargetItem = [];
                    for(var f=0;f<_TargetChildsItemVarName.length;f++){
                        var idx = _TargetChildsItemVarName[f].idx;
                        var varName = _TargetChildsItemVarName[f].varName;
                        //循环孩子找出需要计算的孩子子
                        for(var q=0;q<DefaultChilds.length;q++){
                            if(q === +idx){
                                DefaultChilds[q].varName = varName;
                                TargetItem.push(DefaultChilds[q]);
                            }
                        }

                    }

                    var res = [];
                    var CRFNo = $('#CRFNo').val();
                    var PageNo = $('#PageNo').val();

                    //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
                    setTimeout(function () {
                        for(var t=0;t<formCopyLength;t++){
                            for(var i=0;i<TargetItem.length;i++){
                                var arr = TargetItem[i];
                                var DependItemNo = arr.ItemNo;
                                var ParentItemNo = arr.ParentItemNo;
                                var VarName = arr.varName;
                                var CRFUIType = arr.UIType.Code;
                                var value = '';
                                var MapPath = '';
                                var pid = '';

                                switch (CRFUIType) {
                                    //数值框
                                    case '10006719':
                                        pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //单选
                                    case '10000003':
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //单选
                                    case '10000005':
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //多选
                                    case '10000004':
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //多选
                                    case '10001196':
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //时间
                                    case '10000007':
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //日期
                                    case '10000008':
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                }

                                if(value === '' || value === undefined || value === null){

                                }else{
                                    res.push({
                                        DependItemNo:DependItemNo,
                                        VarName:VarName,
                                        MapPath:MapPath,
                                        CRFNo:CRFNo,
                                        PageNo:PageNo,
                                        SectionNO:$scope.SectionNo,
                                        Value:value,
                                        CRFUIType:CRFUIType,
                                        CRFRelID:(t+1)
                                    });
                                }

                            }
                        }

                        console.log(res);

                        /***************************************无输入或选中值时的判断-start******************************************/
                        var resZero = [];
                        for(var r=0;r<res.length;r++){
                            var resItem = res[r];
                            var resItemValue = resItem.Value;
                            if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                                resZero.push(r);
                            }
                        }

                        console.log(resZero.length, res.length);

                        if(resZero.length === res.length){
                            setAttr('input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo, 'Value', '');
                            $('#input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo).html('点击计算');
                            //mui.toast('没有值进行计算');
                            mui.hideLoading();
                            return false;
                        }
                        /***************************************无输入或选中值时的判断-end******************************************/

                        var AutoCalcModel = {
                            AutoCalcID:TargetItemArr[0].TargetChildsItemAutoCalcID,
                            CalcDependItems:res
                        };

                        console.log(res);

                        $.ajax({
                            async:true,
                            method:'post',
                            dataType:'json',
                            //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                            data:AutoCalcModel,
                            success:function (Data) {
                                mui.hideLoading();

                                var result = Data.result;

                                if(result === 200){
                                    var data = Data.data;
                                    var DependItemNo = data.DependItemNo;
                                    var MapPath = data.MapPath;
                                    var Value = data.Value ? data.Value : '';
                                    console.log(Value);

                                    var id = 'input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;
                                    var getAutoCalcId = 'input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;

                                    setAttr(id, 'Value', Value);
                                    //$('#' + id + ' input').val(Value);
                                    if(Value === ''){
                                        $('#' + getAutoCalcId).html('点击计算');
                                    }else{
                                        $('#' + getAutoCalcId).html(Value);
                                    }

                                }else{
                                    mui.toast('自动计算异常');
                                }

                            },
                            error:function (err) {
                                //console.log(err);
                                mui.toast('自动计算异常');
                                mui.hideLoading();

                            }
                        });

                    }, 500);

                }

            }
            /*************************判断有逻辑计算的输入框的需清空-end**************************/
            return false;
        }

        var string = value.toString();

        switch (UITypeCode) {
            //数字
            case '10006719':
                if(string.length > 10){
                    string = string.substring(0, 10);
                }

                //不用判断数字啥的，根本输入不进去
                if (noNums.test(value)) {
                    mui.alert('格式限定为数字', '提示', function() {
                        $scope.setAttr(ItemNo, 'Value', value);
                        input.val('');
                    });
                    return false;
                }

                if(DataType === '10000012'){//整数
                    if (!integer.test(value)) {
                        mui.alert('格式限定为整数', '提示', function() {
                            $scope.setAttr(ItemNo, 'Value', value);
                            input.val('');
                        });
                        return false;
                    }
                    value = parseInt(string);
                    //value = parseInt(value);

                }else if(DataType === '10000015'){//小数
                    /*if (!decimal.test(value)) {
                        mui.alert('格式限定为小数后2位', '提示', function() {
                            $scope.setAttr(ItemNo, 'Value', value);
                            input.val('');
                        });
                        return false;
                    }*/
                    value = parseFloat(string);
                    //value = parseFloat(value);

                }

                /************************************start*****************************************
                 * 真正的自动计算逻辑
                 * 单独的组件下没有逻辑计算
                 * @type {Array}
                 */
                var ItemsChilds = [];
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    ItemsChilds = Items.Childs;
                }else{
                    ItemsChilds = Items.DefaultChilds[0].Childs;
                }

                var blurAutoCalcArr = [];

                for(var t=0;t<ItemsChilds.length;t++){
                    var blurItem = ItemsChilds[t];
                    if(blurItem.AutoCalc === undefined || blurItem.AutoCalc === '' || blurItem.AutoCalc === null){

                    }else{
                        var blurAutoCalc = blurItem.AutoCalc;
                        var blurCalcDependItems = blurAutoCalc.CalcDependItems;
                        for(var s=0;s<blurCalcDependItems.length;s++){
                            var blurDependItemNo = blurCalcDependItems[s].DependItemNo;
                            if(blurDependItemNo === children.ItemNo){
                                blurAutoCalcArr.push(children.ItemNo);
                            }
                        }

                        var CalcDependItems = blurCalcDependItems;
                    }
                }

                //说明需要进行自动计算
                if(blurAutoCalcArr.length !== 0){
                    var res = [];
                    var CRFNo = $('#CRFNo').val();
                    var PageNo = $('#PageNo').val();
                    setTimeout(function () {
                        for(var i=0;i<CalcDependItems.length;i++){
                            var arr = CalcDependItems[i];
                            var DependItemNo = arr.DependItemNo;
                            var ParentItemNo = children.ParentItemNo;//(arr.MapPath).split('_')[0];
                            var VarName = arr.VarName;
                            var CRFUIType = arr.CRFUIType;
                            var value = '';
                            var MapPath = '';
                            var pid = '';

                            switch (CRFUIType) {
                                //数值框
                                case '10006719':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'input-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //单选
                                case '10000003':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    //score = $scope.getAttr(pid, 'Score');
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    /*if(score === '' || score === null || score === undefined){
                                        value = $scope.getAttr(pid, 'Value');
                                    }else{
                                        value = score;
                                    }*/
                                    break;
                                //单选
                                case '10000005':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    //score = $scope.getAttr(pid, 'Score');
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    /*if(score === '' || score === null || score === undefined){
                                        value = $scope.getAttr(pid, 'Value');
                                    }else{
                                        value = score;
                                    }*/
                                    break;
                                //多选
                                case '10000004':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    //score = $scope.getAttr(pid, 'Score');
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //多选
                                case '10001196':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    //score = $scope.getAttr(pid, 'Score');
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //时间
                                case '10000007':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //日期
                                case '10000008':
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }
                                    value = $scope.getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //表格
                                case '10001132':
                                    mui.hideLoading();
                                    return false;
                                    break;
                            }

                            if(value === '' || value === undefined || value === null){

                            }else{
                                res.push({
                                    DependItemNo:DependItemNo,
                                    VarName:VarName,
                                    MapPath:MapPath,
                                    CRFNo:CRFNo,
                                    PageNo:PageNo,
                                    SectionNO:$scope.SectionNo,
                                    Value:value,
                                    CRFUIType:CRFUIType,
                                    CRFRelID:CRFRelID
                                });
                            }

                        }

                        console.log(res);

                        /***************************************无输入或选中值时的判断-start******************************************/
                        var resZero = [];
                        for(var r=0;r<res.length;r++){
                            var resItem = res[r];
                            var resItemValue = resItem.Value;
                            if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                                resZero.push(r);
                            }
                        }

                        console.log(resZero.length, res.length);

                        if(resZero.length === res.length){
                            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                $scope.setAttr('input-' + ParentItemNo + '-' + ItemNo, 'Value', '');
                                $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo).html('点击计算');
                            }else{
                                $scope.setAttr('input-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID, 'Value', '');
                                $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID).html('点击计算');
                            }
                            //mui.toast('没有值进行计算');
                            mui.hideLoading();
                            return false;
                        }
                        /***************************************无输入或选中值时的判断-end******************************************/

                        var AutoCalcModel = {
                            AutoCalcID:blurAutoCalc.AutoCalcID,
                            CalcDependItems:res
                        };

                        console.log(res);

                        $.ajax({
                            async:true,
                            method:'post',
                            dataType:'json',
                            //url:$scope.addaUrl + '/rest/autocalc/calc/wx/' + $scope.accessKey,
                            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                            data:AutoCalcModel,
                            success:function (Data) {
                                mui.hideLoading();

                                var result = Data.result;

                                if(result === 200){
                                    var data = Data.data;
                                    var DependItemNo = data.DependItemNo;
                                    var MapPath = data.MapPath;
                                    var Value = data.Value ? data.Value : '';
                                    console.log(Value);

                                    var id = '';
                                    var getAutoCalcId = '';
                                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                        id = 'input-' + ParentItemNo + '-' + DependItemNo;
                                        getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo;
                                    }else{
                                        id = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                        getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    }

                                    $scope.setAttr(id, 'Value', Value);
                                    //$('#' + id + ' input').val(Value);
                                    if(Value === ''){
                                        $('#' + getAutoCalcId).html('点击计算');
                                    }else{
                                        $('#' + getAutoCalcId).html(Value);
                                    }

                                }else{
                                    mui.toast('自动计算异常');
                                }

                            },
                            error:function (err) {
                                //console.log(err);
                                mui.toast('自动计算异常');
                                mui.hideLoading();

                            }
                        });

                    }, 500);
                }

                /************************************end*****************************************/

                break;
            //文字
            case '10000001':
                //文字的输入字数已经在html判断了
                break;
        }

        input.val(value);
        $scope.setAttr(ItemNo, 'Value', value);
        console.log(value, string, string.length);

        if(UITypeCode === '10006719'){
            //mui.showLoading('正在加载..', 'div');

            //表格中的跨级计算CTMB
            var TargetItemNo = '';
            if(children.TargetItemNo === undefined || children.TargetItemNo === '' || children.TargetItemNo === null){
                mui.hideLoading();
            }else{
                var TargetItemArr = [];
                //跨级计算的模板id
                TargetItemNo = +(children.TargetItemNo);
                var formItemId = 'form-aggregate-' + Items.ParentItemNo + '-' + Items.ItemNo;
                var ITEMS = $scope.getAttr(formItemId, 'Items');
                ITEMS = JSON.parse(ITEMS);
                var TargetChilds = ITEMS.Childs;
                var DefaultChilds = Items.DefaultChilds[0].Childs;
                for(var h=0;h<TargetChilds.length;h++){
                    var TargetChildsItem = TargetChilds[h];
                    if(TargetItemNo === TargetChildsItem.ItemNo){
                        var TargetChildsItemItemNo = TargetChildsItem.ItemNo;
                        var TargetChildsItemParentItemNo = TargetChildsItem.ParentItemNo;
                        var TargetChildsItemAutoCalc = TargetChildsItem.AutoCalc;
                        var TargetChildsItemAutoCalcID = TargetChildsItemAutoCalc.AutoCalcID;
                        var TargetChildsItemCalcDependItems = TargetChildsItemAutoCalc.CalcDependItems[0];
                        var TargetChildsItemVarName = TargetChildsItemCalcDependItems.VarName;
                        TargetItemArr.push({
                            TargetChildsItemItemNo:TargetChildsItemItemNo,
                            TargetChildsItemParentItemNo:TargetChildsItemParentItemNo,
                            TargetChildsItemAutoCalcID:TargetChildsItemAutoCalcID,
                            //TargetChildsItemAutoCalc:TargetChildsItemAutoCalc,
                            //TargetChildsItemCalcDependItems:TargetChildsItemCalcDependItems,
                            TargetChildsItemVarName:TargetChildsItemVarName
                        });
                    }

                }

                var _TargetChildsItemVarName = TargetItemArr[0].TargetChildsItemVarName;
                _TargetChildsItemVarName = JSON.parse(_TargetChildsItemVarName);
                var TargetItem = [];
                for(var f=0;f<_TargetChildsItemVarName.length;f++){
                    var idx = _TargetChildsItemVarName[f].idx;
                    var varName = _TargetChildsItemVarName[f].varName;
                    //循环孩子找出需要计算的孩子子
                    for(var q=0;q<DefaultChilds.length;q++){
                        if(q === +idx){
                            DefaultChilds[q].varName = varName;
                            TargetItem.push(DefaultChilds[q]);
                        }
                    }

                }

                var res = [];
                var CRFNo = $('#CRFNo').val();
                var PageNo = $('#PageNo').val();

                //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
                setTimeout(function () {
                    for(var t=0;t<formCopyLength;t++){
                        for(var i=0;i<TargetItem.length;i++){
                            var arr = TargetItem[i];
                            var DependItemNo = arr.ItemNo;
                            var ParentItemNo = arr.ParentItemNo;
                            var VarName = arr.varName;
                            var CRFUIType = arr.UIType.Code;
                            var value = '';
                            var MapPath = '';
                            var pid = '';

                            switch (CRFUIType) {
                                //数值框
                                case '10006719':
                                    pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //单选
                                case '10000003':
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //单选
                                case '10000005':
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //多选
                                case '10000004':
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //多选
                                case '10001196':
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //时间
                                case '10000007':
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //日期
                                case '10000008':
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                            }

                            if(value === '' || value === undefined || value === null){

                            }else{
                                res.push({
                                    DependItemNo:DependItemNo,
                                    VarName:VarName,
                                    MapPath:MapPath,
                                    CRFNo:CRFNo,
                                    PageNo:PageNo,
                                    SectionNO:$scope.SectionNo,
                                    Value:value,
                                    CRFUIType:CRFUIType,
                                    CRFRelID:(t+1)
                                });
                            }

                        }
                    }

                    console.log(res);

                    /***************************************无输入或选中值时的判断-start******************************************/
                    var resZero = [];
                    for(var r=0;r<res.length;r++){
                        var resItem = res[r];
                        var resItemValue = resItem.Value;
                        if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                            resZero.push(r);
                        }
                    }

                    console.log(resZero.length, res.length);

                    if(resZero.length === res.length){
                        setAttr('input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo, 'Value', '');
                        $('#input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo).html('点击计算');
                        //mui.toast('没有值进行计算');
                        mui.hideLoading();
                        return false;
                    }
                    /***************************************无输入或选中值时的判断-end******************************************/

                    var AutoCalcModel = {
                        AutoCalcID:TargetItemArr[0].TargetChildsItemAutoCalcID,
                        CalcDependItems:res
                    };

                    console.log(res);

                    $.ajax({
                        async:true,
                        method:'post',
                        dataType:'json',
                        //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                        url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                        data:AutoCalcModel,
                        success:function (Data) {
                            mui.hideLoading();

                            var result = Data.result;

                            if(result === 200){
                                var data = Data.data;
                                var DependItemNo = data.DependItemNo;
                                var MapPath = data.MapPath;
                                var Value = data.Value ? data.Value : '';
                                console.log(Value);

                                var id = 'input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;
                                var getAutoCalcId = 'input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;

                                setAttr(id, 'Value', Value);
                                //$('#' + id + ' input').val(Value);
                                if(Value === ''){
                                    $('#' + getAutoCalcId).html('点击计算');
                                }else{
                                    $('#' + getAutoCalcId).html(Value);
                                }

                            }else{
                                mui.toast('自动计算异常');
                            }

                        },
                        error:function (err) {
                            //console.log(err);
                            mui.toast('自动计算异常');
                            mui.hideLoading();

                        }
                    });

                }, 500);

            }

        }

    };

    /**
     * 单选的其他输入完时
     * @param $event
     * @param children
     * @param Items
     * @param CRFRelID 表格的行号
     */
    $scope.pickBlur = function ($event, children, Items, CRFRelID) {
        var itemsItemNo = Items.ItemNo;

        /****对单一组件的判断-start****/
        if(Items.ItemNo === undefined || Items.ItemNo === '' || Items.ItemNo === null){
            itemsItemNo = '';
        }
        /****对单一组件的判断-end****/

        var ItemNo = children.ItemNo;
        var target = $event.target;
        var value = target.value;
        var id = '';
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            id = itemsItemNo + '-' + ItemNo;
        }else{
            id = itemsItemNo + '-' + ItemNo + '-' + CRFRelID;
        }

        $scope.setAttr('picker-' + id, 'OtherValue', value);

    };

    /**
     * 多行文本框的输入完时
     * @param $event
     * @param children
     * @param CRFRelID 表格的行号
     * @param Items
     */
    $scope.multilinekBlur = function ($event, children, Items, CRFRelID) {
        var itemsItemNo = Items.ItemNo;

        /****对单一组件的判断-start****/
        if(Items.ItemNo === undefined || Items.ItemNo === '' || Items.ItemNo === null){
            itemsItemNo = '';
        }
        /****对单一组件的判断-end****/

        var ItemNo = children.ItemNo;
        var target = $event.target;
        var value = target.value;
        var id = '';

        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            id = itemsItemNo + '-' + ItemNo;
        }else{
            id = itemsItemNo + '-' + ItemNo + '-' + CRFRelID;
        }

        $scope.setAttr('input-' + id, 'Value', value);

    };

    /**
     * 多选的其他输入完时
     * @param $event
     * @param children
     * @param Items
     * @param CRFRelID 表格的行号
     */
    $scope.checkboxBlur = function ($event, children, Items, CRFRelID) {
        var itemsItemNo = Items.ItemNo;

        /****对单一组件的判断-start****/
        if(Items.ItemNo === undefined || Items.ItemNo === '' || Items.ItemNo === null){
            itemsItemNo = '';
        }
        /****对单一组件的判断-end****/

        var ItemNo = children.ItemNo;
        var target = $event.target;
        var value = target.value;
        var id = '';
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            id = itemsItemNo + '-' + ItemNo;
        }else{
            id = itemsItemNo + '-' + ItemNo + '-' + CRFRelID;
        }

        $scope.setAttr('checkbox-' + id, 'OtherValue', value);

    };

    //获取当前单页的数据填写情况
    $scope.getSituation = function () {
        var PageNo = $scope.PageNo;

        var Items = [];

        setTimeout(function () {
            var container = $('.form-result');

            //取出结果
            container.each(function () {
                var that = $(this);
                var IsDisplay = that.is(':visible');

                //只存展示的，隐藏的不传
                if(IsDisplay === true){
                    var Value = that.attr('data-Value');
                    Items.push({
                        Value:Value
                    });

                }

            });

            var Unfilled = [];
            for(var i=0;i<Items.length;i++){
                var ItemsItem = Items[i];
                var ItemsValue = ItemsItem.Value;
                if(ItemsValue === ''){
                    Unfilled.push(i);
                }
            }

            var nowPageNo = $('#form-tab-' + PageNo);

            //全填了
            if(Unfilled.length === 0){
                //nowPageNo.removeClass('form-nocomplete');
                nowPageNo.addClass('form-complete');
            }else{
                nowPageNo.removeClass('form-complete');
                //nowPageNo.addClass('form-nocomplete');
            }

        }, 500);

    };

    //保存
    $scope.save = function () {
        mui.showLoading('正在加载..', 'div');

        $scope.getSituation();

        var CRFNo = $scope.CRFs.CRFNo;
        var PageNo = $scope.PageNo;
        var Items = [];

        $timeout(function () {
            var container = $('.form-result');

            //取出结果
            container.each(function () {
                var that = $(this);
                var IsDisplay = that.is(':visible');

                //只存展示的，隐藏的不传
                if(IsDisplay === true){
                    var ItemNo = that.attr('data-ItemNo');
                    var Value = that.attr('data-Value');
                    var SectionNo = that.attr('data-SectionNo');
                    var OtherValue = that.attr('data-OtherValue');
                    var MapPath = that.attr('data-MapPath');
                    var RowNum = that.attr('data-RowNum');
                    var Unit = that.attr('data-Unit');

                    if(Value === ''){

                    }else{
                        Items.push({
                            SectionNo:SectionNo,
                            ItemNo:ItemNo,
                            Value:Value,
                            OtherValue:OtherValue,
                            MapPath:MapPath,
                            RowNum:RowNum,
                            Unit:Unit
                        });
                    }

                }

            });

            /****************************************组织数据格式-start*****************************************/
            var arr = Items;
            var map = {},
                dest = [];
            for(var i = 0; i < arr.length; i++){
                var ai = arr[i];
                if(!map[ai.SectionNo]){
                    dest.push({
                        SectionNo: ai.SectionNo,
                        Items: [ai]
                    });
                    map[ai.SectionNo] = ai;
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.SectionNo === ai.SectionNo){
                            dj.Items.push(ai);
                            break;
                        }
                    }
                }
            }

            console.log(dest);
            /****************************************组织数据格式-end*****************************************/

            if(dest.length === 0){
                mui.hideLoading();
                return false;
            }

            $scope.RES = {
                IsSubmit:false,
                WechatUrl:$scope.WechatUrl,
                openId:$scope.openId,
                CRFNo:CRFNo,
                PageNo:PageNo,
                PatientId:$scope.patientId,
                DoctorId:$scope.doctorId,
                CRFDataID:$scope.CRFDataID,
                PublishID:$scope.CRFPublishID,
                SendCRFNo:$scope.SendCRFNo,
                SendCRFSubmitMessage:$scope.SendCRFSubmitMessage,
                Sections:dest
            };

            console.log($scope.RES);

            $.ajax({
                async:false,
                method:'post',
                //url:$scope.addaUrl + '/rest/crfdata/submit/wx/' + $scope.accessKey,
                url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crfdata.submit.wx.42b891cd.json',
                dataType:'json',
                data:$scope.RES,
                success:function (Data) {
                    var data = Data.data;
                    var result = Data.result;
                    var message = Data.message;

                    if(result === 200){
                        $scope.CRFDataID = data.CRFDataID;
                        mui.toast('已保存');
                        console.log('保存成功');
                    }else{
                        mui.toast(message);
                    }

                    mui.hideLoading();

                },
                error:function (err) {
                    console.log(err);
                    mui.toast('保存异常');
                    mui.hideLoading();

                }
            });

        }, 500);

    };

    //提交
    $scope.submit = function () {
        mui.confirm(
            '',
            '提交后不可修改,请确认您已完成随访报告',
            ['继续填写', '确认提交'],
            function(e) {
                if (e.index === 1) {
                    mui.showLoading('正在加载..', 'div');

                    $scope.getSituation();
                    var CRFNo = $scope.CRFs.CRFNo;
                    var PageNo = $scope.PageNo;
                    var Items = [];
                    setTimeout(function () {
                        var container = $('.form-result');

                        //取出结果
                        container.each(function () {
                            var that = $(this);
                            var IsDisplay = that.is(':visible');

                            //只存展示的，隐藏的不传
                            if(IsDisplay === true){
                                var ItemNo = that.attr('data-ItemNo');
                                var Value = that.attr('data-Value');
                                var SectionNo = that.attr('data-SectionNo');
                                var OtherValue = that.attr('data-OtherValue');
                                var MapPath = that.attr('data-MapPath');
                                var RowNum = that.attr('data-RowNum');
                                var Unit = that.attr('data-Unit');

                                if(Value === ''){

                                }else{
                                    Items.push({
                                        SectionNo:SectionNo,
                                        ItemNo:ItemNo,
                                        Value:Value,
                                        OtherValue:OtherValue,
                                        MapPath:MapPath,
                                        RowNum:RowNum,
                                        Unit:Unit
                                    });
                                }

                            }

                        });

                        /****************************************组织数据格式-start*****************************************/
                        var arr = Items;
                        var map = {},
                            dest = [];
                        for(var i = 0; i < arr.length; i++){
                            var ai = arr[i];
                            if(!map[ai.SectionNo]){
                                dest.push({
                                    SectionNo: ai.SectionNo,
                                    Items: [ai]
                                });
                                map[ai.SectionNo] = ai;
                            }else{
                                for(var j = 0; j < dest.length; j++){
                                    var dj = dest[j];
                                    if(dj.SectionNo === ai.SectionNo){
                                        dj.Items.push(ai);
                                        break;
                                    }
                                }
                            }
                        }

                        console.log(dest);
                        /****************************************组织数据格式-end*****************************************/

                        if(dest.length === 0){
                            mui.hideLoading();
                            mui.toast('暂无数据可提交');
                            return false;
                        }

                        $scope.RES = {
                            IsSubmit:true,
                            WechatUrl:$scope.WechatUrl,
                            openId:$scope.openId,
                            CRFNo:CRFNo,
                            PageNo:PageNo,
                            PatientId:$scope.patientId,
                            DoctorId:$scope.doctorId,
                            CRFDataID:$scope.CRFDataID,
                            PublishID:$scope.CRFPublishID,
                            SendCRFNo:$scope.SendCRFNo,
                            SendCRFSubmitMessage:$scope.SendCRFSubmitMessage,
                            Sections:dest
                        };

                        console.log($scope.RES);

                        $.ajax({
                            async:false,
                            method:'post',
                            //url:$scope.addaUrl + '/rest/crfdata/submit/wx/' + $scope.accessKey,
                            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.crfdata.submit.wx.42b891cd.json',
                            dataType:'json',
                            data:$scope.RES,
                            success:function (Data) {
                                var result = Data.result;
                                var message = Data.message;

                                if(result === 200){
                                    mui.toast('提交成功');
                                    setTimeout(function () {
                                        if($scope.CRFDataID === 0 || $scope.CRFDataID === '0'){
                                            wx.closeWindow();
                                        }else{
                                            window.location.href = $scope.platformUrl + '/CRF/CRFReader' + '?Device=wx' + '&crfdataId=' + $scope.CRFDataID;
                                        }

                                    }, 1500);

                                }else{
                                    mui.toast(message);
                                }

                                mui.hideLoading();

                            },
                            error:function (err) {
                                console.log(err);
                                mui.toast('保存异常');
                                mui.hideLoading();

                            }
                        });

                    }, 500);
                }

            });

    };

    /**
     * 对组件的展示与隐藏
     * @param pid
     * @param id
     * @param type show/hide
     * @param dataRowNum 表格行号
     */
    $scope.displayHide = function (pid, id, type, dataRowNum) {
        var _id = '';
        if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
            _id = pid + '-' + id;
        }else{
            _id = pid + '-' + id + '-' + dataRowNum;
        }

        if(type === 'show'){
            $('#label-' + _id).show();
            $('#input-' + _id).show();
            $('#picker-div-' + _id).show();
            $('#picker-' + _id).show();
            $('#checkbox-' + _id).show();
            $('#form-aggregate-' + _id).show();
            $('#dtPicker-' + _id).show();
            $('#form-img-up-' + _id).show();

        }else{
            $('#label-' + _id).hide();
            $('#input-' + _id).hide();
            $('#picker-div-' + _id).hide();
            $('#picker-' + _id).hide();
            $('#checkbox-' + _id).hide();
            $('#form-aggregate-' + _id).hide();
            $('#dtPicker-' + _id).hide();
            $('#form-img-up-' + _id).hide();
            /*****************************隐藏的同时要清空值-start**********************************/

            /*****************************input-number-start**********************************/
            $scope.setAttr('input-' + _id, 'Value', '');
            $scope.setAttr('input-' + _id, 'OtherValue', '');
            $('#input-' + _id + ' input[type=number]').val('');
            $('#input-getAutoCalc-' + _id).html('点击计算');
            /*****************************input-number-start**********************************/

            /*****************************input-text-start**********************************/
            $scope.setAttr('input-' + _id, 'Value', '');
            $scope.setAttr('input-' + _id, 'OtherValue', '');
            $('#input-' + _id + ' input[type=text]').val('');
            /*****************************input-text-start**********************************/

            /*****************************textarea-start**********************************/
            $scope.setAttr('input-' + _id, 'Value', '');
            $scope.setAttr('input-' + _id, 'OtherValue', '');
            $('#input-multiline-' + _id).val('');
            /*****************************textarea-start**********************************/

            /*****************************picker-start**********************************/
            $scope.setAttr('picker-' + _id, 'Value', '');
            $scope.setAttr('picker-' + _id, 'OtherValue', '');
            $scope.setAttr('picker-' + _id, 'DisplayName', '');
            $('#' + _id + ' span').html('<span class="form-picker-span">请选择</span>');//同时对dtPicker也做了判断
            $('#picker-' + _id).removeClass('form-top-left-right-border');
            $('#long-picker-' + _id).hide().html('');
            $('#other-picker-' + _id).hide();
            $('#other-picker-' + _id + ' textarea').val('');
            /*****************************picker-end**********************************/

            /*****************************checkbox-start**********************************/
            $scope.setAttr('checkbox-' + _id, 'Value', '');
            $scope.setAttr('checkbox-' + _id, 'OtherValue', '');
            $scope.setAttr('checkbox-' + _id, 'DisplayName', '');
            $('#other-checkbox-' + _id).hide();
            $('#other-checkbox-' + _id + ' textarea').val('');
            $('#checkbox-' + _id + ' input[type=checkbox]').prop('checked', false);
            $('#checkbox-' + _id + ' label').removeClass('blue');
            /*****************************checkbox-start**********************************/

            /*****************************dtPicker-start**********************************/
            $scope.setAttr('dtPicker-' + _id, 'Value', '');
            $scope.setAttr('dtPicker-' + _id, 'OtherValue', '');
            /*****************************dtPicker-start**********************************/

            /*****************************img-start**********************************/
            $scope.setAttr('form-img-up-' + _id, 'Value', '');
            $scope.setAttr('form-img-up-' + _id, 'OtherValue', '');
            $scope.setAttr('form-img-up-' + _id, 'Res', '');

            for(var i=0;i<4;i++){
                $('#form-img-up-img-' + _id + '-' + i).attr('src', '').css('display', 'none');
                $('#' + _id + '-' + i).show();
                $('#' + 'form-img-up-del-' + _id + '-' + i).hide();
            }
            /*****************************img-start**********************************/

            /*****************************隐藏的同时要清空值-end**********************************/
        }

    };

    /**
     * 获取data-x的值
     * @param id
     * @param name
     * @returns {*|jQuery}
     */
    $scope.getAttr = function (id, name) {
        return $('#' + id).attr('data-' + name);
    };

    /**
     * 给data-x赋值
     * @param id
     * @param name
     * @param value
     */
    $scope.setAttr = function (id, name, value) {
        $('#' + id).attr('data-' + name, value);
    };

    /**
     * 弹出注解
     * @param Items
     * @returns {boolean}
     */
    $scope.getAnnotation = function (Items) {
        var TagHtmlContext = Items.InfoButtonContent;
        var html = '';

        if(TagHtmlContext === '' || TagHtmlContext === undefined){
            return false;
        }else{
            html = unescape(TagHtmlContext);
            mui.alert(html, '提示', function() {
                //TODO
            });
        }

    };

    //图片上传
    $scope.imgUp = function () {
        var defaults = {
            fileType : ["jpg","png","bmp","jpeg"],  // 上传文件的类型
            fileSize : 1024 * 1024 * 5              // 上传文件的大小 5M
        };

        var FILE = $(".file");

        //当为图片预览时，防止点击触发上传操作
        FILE.click(function () {
            var __MUI_PREVIEWIMAGE = $('#__MUI_PREVIEWIMAGE');
            var style__MUI_PREVIEWIMAGE = __MUI_PREVIEWIMAGE.attr('style');

            if(style__MUI_PREVIEWIMAGE === 'display: block;'){
                event.preventDefault();
                event.stopPropagation();
            }

        });

        FILE.change(function(){
            mui.showLoading('正在加载..', 'div');

            var idFile = $(this).attr("id");
            var idArr = idFile.split('-');
            var ItemsNo = idArr[0];
            var ChildrenNo = idArr[1];
            var sort = idArr[2];

            var CRFRelID = '';
            if(idArr[3] === undefined || idArr[3] === null || idArr[3] === ''){
                CRFRelID = '';
            }else{
                CRFRelID = idArr[3];
            }

            var ITEM = '';
            if(CRFRelID === ''){
                ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort);
            }else{
                ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
            }

            ITEM.addClass('loading');

            var file = document.getElementById(idFile);

            //获取的图片文件
            var fileList = file.files;

            //最多同时只能上传一张
            if(fileList.length > 1){
                mui.toast('每次只能上传一张');
                mui.hideLoading();
                ITEM.removeClass('loading');
               return false;
            }

            fileList = validateUp(fileList);

            //未通过图片判断停止继续
            if(fileList.length === 0){
                mui.hideLoading();
                ITEM.removeClass('loading');
                return false;
            }

            var date = new Date().getTime();

            // 压缩图片需要的一些元素和对象
            var reader = new FileReader();
            var img = new Image();

            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            //图片类型,其实用不到
            var fileType = fileList[0].type;

            //图片大小
            var fileSize = fileList[0].size;

            reader.readAsDataURL(fileList[0]);

            reader.onload = function(e) {
                //e.target.result就是图片的base64地址信息
                img.src = e.target.result;
            };

            img.onload = function() {
                EXIF.getData(img, function() {
                    var Orientation = EXIF.getTag(this, 'Orientation');
                    console.log('方向:' + Orientation);
                    console.log('大小:' + fileSize/(1024*1024));

                    if(fileSize < 1024*1024){
                        $scope.submitImgTwo(idFile, img.src, date, CRFRelID);

                    }else{
                        var wph = (img.height*1)/(img.width*1);
                        var hpw = wph.toFixed(2)*1;
                        var square = 700;   //定义画布的大小，也就是图片压缩之后的像素
                        var imageWidth = 0;    //压缩图片的大小
                        var imageHeight = 0;
                        var offsetX = 0;
                        var offsetY = 0;
                        var hsquare = Math.ceil(square*hpw);
                        var u = navigator.userAgent;
                        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                        if(isiOS){
                            if(Orientation === 6){
                                canvas.width = hsquare;
                                canvas.height = square;
                                context.clearRect(0, 0, hsquare, square);
                            }else if(Orientation === 8){
                                canvas.width = hsquare;
                                canvas.height = square;
                            }else{
                                canvas.width = square;
                                canvas.height = hsquare;
                                context.clearRect(0, 0, square, hsquare);
                            }
                        }else{
                            canvas.width = square;
                            canvas.height = hsquare;
                            context.clearRect(0, 0, square, hsquare);
                        }

                        if(isiOS){
                            var degree;
                            switch(Orientation){
                                case 3:
                                    degree = 180;
                                    imageWidth = -square;
                                    imageHeight = -hsquare;
                                    break;
                                case 6:
                                    degree = 90;
                                    imageWidth = square;
                                    imageHeight = -hsquare;
                                    break;
                                case 8:
                                    degree = 270;
                                    imageWidth = -square;
                                    imageHeight = hsquare;
                                    break;
                                default:
                                    degree = 0;
                                    imageWidth = square;
                                    imageHeight = hsquare;
                            }
                            context.rotate(degree * Math.PI / 180.0);
                        }else{
                            if (img.width > img.height) {
                                imageWidth = square;
                                imageHeight = hsquare;
                                offsetX = - Math.round((imageWidth - square) / 2);
                            } else {
                                imageHeight = hsquare;
                                imageWidth = square;
                                offsetY = - Math.round((imageHeight - hsquare) / 2);
                            }
                        }

                        context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);

                        var blob = canvas.toDataURL('image/jpeg', 1.0);
                        //var blob = canvas.toDataURL();

                        $scope.submitImgTwo(idFile, blob, date, CRFRelID);

                    }

                });

            };

            function validateUp(files){
                //替换的文件数组
                var arrFiles = [];

                //不能上传文件名重复的文件
                for(var i = 0, file; file = files[i]; i++){

                    //获取文件上传的后缀名
                    var newStr = file.name.split("").reverse().join("");

                    if(newStr.split(".")[0] != null){
                        var type = newStr.split(".")[0].split("").reverse().join("");

                        if(jQuery.inArray(type, defaults.fileType) > -1){
                            // 类型符合，可以上传
                            if (file.size >= defaults.fileSize) {
                                mui.toast('文件最大不超过5M');

                            } else {
                                // 在这里需要判断当前所有文件中
                                arrFiles.push(file);

                            }

                        }else{
                            mui.toast('上传类型不符合');
                        }

                    }else{
                        mui.toast('没有类型,无法识别');

                    }

                }

                return arrFiles;

            }

        });
    };

    /**
     * 图片删除
     * @param ItemsNo
     * @param ChildrenNo
     * @param sort
     * @param CRFRelID 表格的行号
     */
    $scope.delImg = function (ItemsNo, ChildrenNo, sort, CRFRelID) {
        mui.confirm(
            '',
            '确定要删除吗',
            ['取消', '确定'],
            function(e) {
                if (e.index === 1) {
                    var id = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        id = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                    }else{
                        id = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                    }
                    $('#' + id).css('display', 'none').attr('src', '');

                    var PID = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo;
                    }else{
                        PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo + '-' + CRFRelID;
                    }
                    var dataRes = $scope.getAttr(PID, 'Res');
                    var dataResArr = dataRes.split('&');
                    var dataValue = '';
                    var dataValueArr = [];
                    var input = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        input = ItemsNo + '-' + ChildrenNo + '-' + sort;
                    }else{
                        input = ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                    }

                    var del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                    }else{
                        del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                    }
                    var res = [];

                    for(var i=0;i<dataResArr.length;i++){
                        var arr = dataResArr[i];
                        var brr = arr.split('\1');

                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            if(brr[1] === ItemsNo + '-' + ChildrenNo + '-' + sort){

                            }else{
                                res.push(arr);
                            }
                        }else{
                            if(brr[1] === ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID){

                            }else{
                                res.push(arr);
                            }
                        }
                    }

                    res = res.join('&');
                    $scope.setAttr(PID, 'Res', res);

                    var DataResArr = res.split('&');
                    for(var j=0;j<DataResArr.length;j++){
                        var crr = DataResArr[j];
                        var drr = crr.split('\1');
                        var PATH = drr[0];
                        dataValueArr.push(PATH);
                    }

                    dataValue = dataValueArr.join('&');
                    $scope.setAttr(PID, 'Value', dataValue);

                    $('#' + input).show();
                    $('#' + del).hide();

                }else{

                }

            });

    };

    /**
     * 点击就上传图片的接口
     * @param id
     * @param base64
     * @param date
     * @param CRFRelID 表格的行号
     */
    $scope.submitImgTwo = function (id, base64, date, CRFRelID) {
        var idArr = id.split('-');
        var ItemsNo = idArr[0];
        var ChildrenNo = idArr[1];
        var sort = idArr[2];
        var pid = '';
        var PID = '';
        var input = '';
        var del = '';
        var ITEM = '';
        if(CRFRelID === ''){
            pid = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
            PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo;
            input = ItemsNo + '-' + ChildrenNo + '-' + sort;
            del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
            ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort);
        }else{
            pid = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
            PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo + '-' + CRFRelID;
            input = ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
            del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
            ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
        }

        var pContainer = $('#' + pid);
        var dataRes = $scope.getAttr(PID, 'Res');
        var dataResArr = dataRes.split('&');
        var dataValue = '';
        var dataValueArr = [];
        var blob = $scope.toBlob(base64);
        var fd = new FormData();

        fd.append('name', blob, date + '.jpg');

        $.ajax({
            async:false,
            method:'post',
            processData:false,
            contentType:false,
            // url: 'http://192.168.1.102:7800/rest/crf/41/files/64773/upload',
            url:$scope.addaUrl + '/rest/healthrecord/' + $scope.accessKey + '/' + $scope.patientId + '/' + $scope.doctorId + '/wx/upload/img',
            data:fd,
            success:function (Data) {
                mui.hideLoading();
                var message = Data.message;

                if(Data.result === 200){
                    var data = Data.data[0];
                    var path = data.path;

                    pContainer.attr('src', path).css('display', 'block');
                    if(CRFRelID === ''){
                        dataResArr.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + sort);
                    }else{
                        dataResArr.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
                    }

                    dataRes = dataResArr.join('&');
                    $scope.setAttr(PID, 'Res', dataRes);

                    var DataResArr = dataRes.split('&');
                    for(var i=0;i<DataResArr.length;i++){
                        var arr = DataResArr[i];
                        var brr = arr.split('\1');
                        var PATH = brr[0];
                        dataValueArr.push(PATH);
                    }

                    dataValue = dataValueArr.join('&');
                    $scope.setAttr(PID, 'Value', dataValue);

                    $('#' + input).hide();
                    $('#' + del).show();

                }else{
                    mui.toast(message);
                }

                ITEM.removeClass('loading');

                $scope.$applyAsync();

                //初始化图片插件
                $scope.initImg();

            },
            error:function (err) {
                ITEM.removeClass('loading');
                mui.toast('图片上传异常');
                mui.hideLoading();
            }
        });
    };

    /**
     * base64转blob
     * @param urlData
     * @returns {Blob}
     */
    $scope.toBlob = function (urlData) {
        var bytes = window.atob(urlData.split(',')[1]);
        // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var  ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab],{type : 'image/jpeg'});
    };

    //调整样式
    $scope.initCss = function () {
        //顶部滚动菜单样式调整
        var formTabContainerHeight = $('.form-tab-container').innerHeight();
        $('.form-content-container').css('padding-top', (+formTabContainerHeight - 0.5) + 'px');

        //对单位样式的调整
        /*var danWei = $('.danWei');
        var danWeiHeight = danWei.innerHeight();
        danWei.css('line-height', danWeiHeight + 'px');*/

        //对图片样式的调整
        var formImgUpItem = $('.form-img-up-item');
        formImgUpItem.css('height', formImgUpItem.innerWidth());

        //图片上传
        $scope.imgUp();
    };

    //水波特效
    $scope.initRipple = function () {
        new Ripple({
            opacity : 0.6,      //水波纹透明度
            speed : .5,         //水波纹扩散速度
            bgColor : "#fff",   //水波纹颜色
            cursor : true       //是否显示手型指针
        });

    };

    //初始化图片插件
    $scope.initImg = function () {
        //data-preview-src="" data-preview-group="1"
        mui.previewImage();
    };

    /***********************************表格的逻辑-start*******************************************/

    /**
     * 表格的删除
     * @param ItemsNo
     * @param childrenNo
     * @param index
     */
    $scope.delTable = function (ItemsNo, childrenNo, index) {
        delTableTable(ItemsNo, childrenNo, index);
    };

    /**
     * 表格的添加
     * @param ItemsNo 大
     * @param childrenNo 小
     * @param index
     */
    $scope.addTable = function (ItemsNo, childrenNo, index) {
        addTableTable(ItemsNo, childrenNo, index);
    };

    //初始化手动增加的picker
    $scope.initAddPicker = function (NEWCRFRelID) {
        $timeout(function () {
            $(".form-picker-container-" + NEWCRFRelID).each(function(){
                var that = $(this);
                var id = that.attr('id');
                var pid = 'picker-' + id;
                var parent = $('#' + pid);
                var PARENT = $('#picker-div-' + id);
                var dataValue = $scope.getAttr(pid, 'Value');
                var dataDisplayName = $scope.getAttr(pid, 'DisplayName');
                var dataOtherValue = $scope.getAttr(pid, 'OtherValue');

                var valueLength = 0;
                if(dataDisplayName === '' || dataDisplayName === undefined || dataDisplayName === null){
                    dataDisplayName = '';
                }else{
                    valueLength = dataDisplayName.length;
                }

                var dataIsDisplay = $scope.getAttr(pid, 'IsDisplay');
                var dataRowNum = $scope.getAttr(pid, 'RowNum');

                if(dataIsDisplay === 'false'){
                    PARENT.hide();
                }else{
                    PARENT.show();
                }

                //没有其他，没有值
                if(valueLength === 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                    //隐藏当前的其他输入框
                    $('#other-picker-' + id).hide();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                    //没有其他，有值
                }else if(valueLength !== 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                    //隐藏当前的其他输入框
                    $('#other-picker-' + id).hide();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                    //有其他值
                }else if(dataOtherValue !== '' && (dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1) ){
                    //展示当前的其他输入框
                    $('#other-picker-' + id).show();

                    //隐藏太长时的展示数据
                    $('#long-picker-' + id).hide();

                    $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

                }

                //层级
                var layer = that.attr('data-layer');
                layer = parseInt(layer);

                //选项内容
                var ValuesetConcepts = that.attr('data-Valueset-Concepts');

                ValuesetConcepts = JSON.parse(ValuesetConcepts);

                //逻辑跳转
                var Logic = that.attr('data-Logic');
                if(Logic !== '' && Logic !== undefined && Logic !== null){
                    //Logic = JSON.parse(Logic);
                }else{
                    Logic = [];
                }

                var setData = [];
                var ScoreArr = [];

                /**********************组织选择项-start**********************/
                for(var i=0;i<ValuesetConcepts.length;i++){
                    var arr = ValuesetConcepts[i];
                    var Code = arr.Code;
                    var DisplayName = (arr.DisplayName).replace(' ', '');//选项里还有空格，什么鬼
                    var Score = arr.Score ? arr.Score : '';

                    setData.push({value:Code,text:DisplayName,Score:Score});

                    if(Code === dataValue){
                        ScoreArr.push(Score);
                    }
                }

                //加个清空操作,md
                setData.push({value:'empty',text:'清空',Score:''});
                /**********************组织选择项-end**********************/

                var dataScore = '';
                if(ScoreArr.length > 0){
                    dataScore = ScoreArr[0];
                }else{
                    dataScore = '';
                }

                $scope.setAttr(pid, 'Score', dataScore);

                that.on('tap', function() {
                    var picker = new mui.PopPicker({layer:layer});
                    picker.setData(setData);
                    //$scope.beforeRemoveMuiPoppicker();
                    picker.show(function(items) {
                        console.log(items[0]);
                        var res = items[0].text;
                        var value = items[0].value;
                        var score = items[0].Score ? items[0].Score : '';

                        var html = '';

                        if(res.substr(0, 2).indexOf('其它') !== -1 || res.substr(0, 2).indexOf('其他') !== -1 ){//为其他
                            html = '<span class="form-picker-span-res">' + res + '</span>';
                            $('#long-picker-' + id).hide();
                            $('#other-picker-' + id).show();
                            $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

                            //$('#other-picker-' + id + ' textarea').focus();

                        }else if(res.substr(0, 2).indexOf('其它') === -1 && res.substr(0, 2).indexOf('其他') === -1 ){//不为其他

                            if(res === '清空' && value === 'empty'){
                                html = '<span class="form-picker-span">请选择</span>';
                            }else{
                                html = '<span class="form-picker-span-res">' + res + '</span>';
                            }

                            $('#long-picker-' + id).hide();
                            $('#other-picker-' + id).hide();
                            $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                            $scope.setAttr('picker-' + id, 'OtherValue', '');
                            $('#other-picker-' + id + ' textarea').val('');

                        }

                        if(res === '清空' && value === 'empty'){
                            $scope.setAttr('picker-' + id, 'Value', '');
                            $scope.setAttr('picker-' + id, 'DisplayName', '');
                            $scope.setAttr('picker-' + id, 'Score', '');
                        }else{
                            $scope.setAttr('picker-' + id, 'Value', value);
                            $scope.setAttr('picker-' + id, 'DisplayName', res);
                            $scope.setAttr('picker-' + id, 'Score', score);
                        }

                        $('#' + id).html(html);

                        /**********************************逻辑跳转判断-start********************************/
                        /**
                         * 逻辑跳转的最多支持3层
                         */

                        var LogicArr = [];//需要显示的数组
                        var LogicBrr = [];//需要隐藏的数组
                        var LogicCrr = [];//必须隐藏的数据
                        for(var i=0;i<Logic.length;i++){
                            var arr = Logic[i];
                            var TriggerVal = arr.TriggerVal;    //触发值
                            var TargetItemNo = arr.TargetItemNo;//目标id
                            var parentNo = (id.split('-'))[0];

                            if(TriggerVal === value){
                                LogicArr.push(TargetItemNo);
                            }else{
                                LogicBrr.push(TargetItemNo);
                            }

                        }

                        LogicArr = $scope.uniqArr(LogicArr);
                        LogicBrr = $scope.uniqArr(LogicBrr);
                        LogicCrr = $scope.compareArr(LogicBrr, LogicArr);//绝对隐藏的数组

                        for(var j=0;j<LogicArr.length;j++){
                            var brr = LogicArr[j];
                            $scope.displayHide(parentNo, brr, 'show', dataRowNum);
                        }

                        for(var k=0;k<LogicCrr.length;k++){
                            var crr = LogicCrr[k];
                            $scope.displayHide(parentNo, crr, 'hide', dataRowNum);
                        }

                        var idArr = id.split('-');
                        var ITEMNO = idArr[0];
                        console.log(ITEMNO);//父级ID
                        console.log(LogicArr);//需要显示的数组
                        console.log(LogicBrr);//需要隐藏的数组
                        console.log(LogicCrr);//必须要隐藏的数据

                        //对下下级的Logic判断
                        if(LogicBrr.length > 0){
                            for(var m=0;m<LogicBrr.length;m++){
                                var drr = LogicBrr[m];
                                var LOGIC = $scope.getAttr(ITEMNO + '-' + drr, 'Logic');

                                if(LOGIC === '' || LOGIC === undefined || LOGIC === null){

                                }else{
                                    LOGIC = JSON.parse(LOGIC);
                                }

                                if(LOGIC === undefined || LOGIC === '' || LOGIC === null){

                                }else{
                                    for(var n=0;n<LOGIC.length;n++){
                                        var itemLOGIC = LOGIC[n];
                                        var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
                                        $scope.displayHide(ITEMNO, itemLOGICTargetItemNo, 'hide', dataRowNum);
                                    }
                                }

                                /*******************对多选的logic的判断-start*******************/
                                var LOGIC2 = $scope.getAttr('checkbox-' + ITEMNO + '-' + drr, 'Logic');

                                if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){

                                }else{
                                    LOGIC2 = JSON.parse(LOGIC2);
                                }

                                if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){

                                }else{
                                    for(var p=0;p<LOGIC2.length;p++){
                                        var itemLOGIC2 = LOGIC2[p];
                                        var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
                                        $scope.displayHide(ITEMNO, itemLOGICTargetItemNo2, 'hide', dataRowNum);
                                    }
                                }
                                /*******************对多选的logic的判断-end*******************/

                            }
                        }

                        /**********************************逻辑跳转判断-end**********************************/

                        //MUI大坑！去掉多余的
                        $scope.removeMuiPoppicker();

                        $scope.$applyAsync();

                        picker.dispose();

                    });

                });

            });

        }, true);
    };

    //初始化手动增加的checkbox
    $scope.initAddCheckbox = function (NEWCRFRelID) {
        $timeout(function () {
            $('.form-checkbox-div-' + NEWCRFRelID).each(function () {
                var that = $(this);
                var id = that.attr('id');
                var idArr = id.split('-');
                var ItemsNo = idArr[1];
                var childrenNo = idArr[2];
                var dataValue = $scope.getAttr(id, 'Value');
                var dataDisplayName = $scope.getAttr(id, 'DisplayName');
                var dataOtherValue = $scope.getAttr(id, 'OtherValue');
                var dataRowNum = $scope.getAttr(id, 'RowNum');

                /*对展示隐藏的判断-start*/
                var dataIsDisplay = $scope.getAttr(id, 'IsDisplay');

                if(dataIsDisplay === 'false'){
                    that.hide();
                }else{
                    that.show();
                }
                /*对展示隐藏的判断-end*/

                var arr = dataValue.split('&');

                for(var i=0;i<arr.length;i++){
                    var Code = arr[i];
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code).prop('checked', true);
                        $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code).addClass('blue');
                    }else{
                        $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).prop('checked', true);
                        $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).addClass('blue');
                    }

                }

                //对其他，其它的判断
                if(dataOtherValue !== '' || dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1){
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo).show();
                    }else{
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).show();
                    }

                }else{
                    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo).hide();
                    }else{
                        $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).hide();
                    }
                }

            });
        }, true);
    };

    //初始化手动增加的dtPicker
    $scope.initAddDtPicker = function (NEWCRFRelID) {
        $timeout(function () {
            $(".form-dtPicker-container-" + NEWCRFRelID).each(function(){
                var that = $(this);
                var id = that.attr('id');
                var type = that.attr('data-type');
                var options = {
                    type:type,
                    beginYear:$scope.dtPickerBeginYear,
                    endYear:$scope.dtPickerEndYear
                };

                that.on('tap', function() {
                    var picker = new mui.DtPicker(options);
                    picker.show(function(items) {
                        console.log(items);
                        var html = '<span class="form-picker-span-res">' + items.value + '</span>';
                        $scope.setAttr('dtPicker-' + id, 'Value', items.value);
                        $('#' + id).html(html);
                        //MUI大坑！去掉多余的
                        $scope.removeMuiPoppicker();
                        picker.dispose();

                    });

                });

            });

        }, true);
    };

    //初始化手动增加的img
    $scope.initAddImg = function (NEWCRFRelID) {
        $timeout(function () {
            $('.form-img-up-containter-' + NEWCRFRelID).each(function () {
                var that = $(this);
                var id = that.attr('id');
                var idArr = id.split('-');
                var ItemsNo = idArr[3];
                var ChildrenNo = idArr[4];

                var CRFRelID = '';
                if(idArr[5] === undefined || idArr[5] === null || idArr[5] === ''){
                    CRFRelID = '';
                }else{
                    CRFRelID = idArr[5];
                }

                var dataValue = $scope.getAttr(id, 'Value');
                var res = [];
                var arr = dataValue.split('&');

                for(var i=0;i<4;i++){
                    var path = arr[i];
                    if(path === '' || path === null || path === undefined){
                        continue;
                    }

                    if(CRFRelID === ''){
                        res.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + i);

                        $('#form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + i).attr('src', path).css('display', 'block');
                        $('#' + ItemsNo + '-' + ChildrenNo + '-' + i).hide();
                        $('#' + 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + i).show();
                    }else{
                        res.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID);

                        $('#form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).attr('src', path).css('display', 'block');
                        $('#' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).hide();
                        $('#' + 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + i + '-' + CRFRelID).show();
                    }
                }

                res = res.join('&');

                $scope.setAttr(id, 'Res', res);

            });

        }, true);
    };

    //日期时间插件
    $scope.showDtPicker = function (ItemsNo, ParentItemNo, childrenItemNo, NEWCRFRelID) {
        showDtPickerTable(ItemsNo, ParentItemNo, childrenItemNo, NEWCRFRelID);
    };
    /***********************************表格的逻辑-end*******************************************/

    /*******************************************************方法-end***********************************************************/

    /*******************************************************逻辑-start***********************************************************/
    //初始化数据
    $scope.INIT();

    //获取crfid
    $scope.getCrfId();

    //判断是否已经提交
    $scope.isSubmit();

    //判断是否跳老表单
    $scope.isSupport();

    //获取表单数据
    $scope.initForm();

    //初始化折叠面板
    //$scope.initPanel();

    //水波特效
    $scope.initRipple();

    /*******************************************************逻辑-end***********************************************************/

});

/*******************************************************表格的逻辑-start***********************************************************/

/**
 * 获取data-x的值
 * @param id
 * @param name
 * @returns {*|jQuery}
 */
function getAttr(id, name) {
    return $('#' + id).attr('data-' + name);
}

/**
 * 给data-x赋值
 * @param id
 * @param name
 * @param value
 */
function setAttr(id, name, value) {
    $('#' + id).attr('data-' + name, value);
}

/**
 * 弹出注解
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 * @returns {boolean}
 */
function getAnnotationTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子
    var childrenArr = [];
    for(var m=0;m<DefaultChilds.length;m++){
        var DefaultChildsItem = DefaultChilds[m];
        var DefaultChildsItemItemNo = DefaultChildsItem.ItemNo;
        if(DefaultChildsItemItemNo === parseInt(childrenItemNo)){
            childrenArr.push(DefaultChildsItem);
        }

    }

    var children = childrenArr[0];

    var TagHtmlContext = children.InfoButtonContent;
    var html = '';

    if(TagHtmlContext === '' || TagHtmlContext === undefined){
        return false;
    }else{
        html = unescape(TagHtmlContext);
        mui.alert(html, '提示', function() {
            //TODO
        });
    }

}

/**
 * 展示数字框的单位
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 */
function showDanWeiTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子
    var childrenArr = [];
    for(var m=0;m<DefaultChilds.length;m++){
        var DefaultChildsItem = DefaultChilds[m];
        var DefaultChildsItemItemNo = DefaultChildsItem.ItemNo;
        if(DefaultChildsItemItemNo === parseInt(childrenItemNo)){
            childrenArr.push(DefaultChildsItem);
        }

    }

    var children = childrenArr[0];

    var Unit = children.Unit;
    if(Unit === '' || Unit === null || Unit === undefined){

    }else{
        var DisplayName = children.Unit.DisplayName;
        if(DisplayName === '' || DisplayName === null || DisplayName === undefined){

        }else{
            if(DisplayName.length > 7){
                mui.alert('<span style="color: #007aff;font-weight: 900;">' + DisplayName + '</span>',
                    '单位',
                    function() {
                        //TODO
                    });
            }

        }
    }

}

/**
 * 标签过滤器
 * @param obj
 * @returns {*}
 */
function formLabelFilter(obj) {
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

/**
 * placeholder过滤器
 * @param obj
 * @returns {*}
 */
function formPlaceHolderFilter(obj) {
    if(obj === undefined || obj === '' || obj === null){
        return '请输入';
    }else{
        var json = JSON.parse(obj);
        if(json.Placehold === undefined || json.Placehold === '' || json.Placehold ===null){
            return '请输入';
        }else{
            return json.Placehold;
        }

    }
}

/**
 * 标签结果过滤器
 * @param obj
 * @returns {*}
 */
function formLabelValue(obj) {
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

/**
 * 表格的自动计算
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 * @param CRFNo
 * @param PageNo
 * @returns {boolean}
 */
function getAutoCalcTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID, CRFNo, PageNo){
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子
    var childrenArr = [];
    for(var m=0;m<DefaultChilds.length;m++){
        var DefaultChildsItem = DefaultChilds[m];
        var DefaultChildsItemItemNo = DefaultChildsItem.ItemNo;
        if(DefaultChildsItemItemNo === parseInt(childrenItemNo)){
            childrenArr.push(DefaultChildsItem);
        }

    }

    var children = childrenArr[0];

    var AutoCalc = children.AutoCalc;
    if(AutoCalc === '' || AutoCalc === null || AutoCalc === undefined){
        return false;
    }

    mui.showLoading('正在加载..', 'div');

    // var CRFNo = $scope.CRFs.CRFNo;
    // var PageNo = $scope.PageNo;

    AutoCalc = children.AutoCalc;
    var AutoCalcID = AutoCalc.AutoCalcID;
    var CalcDependItems = AutoCalc.CalcDependItems;
    var ParentItemNo = AutoCalc.ParentItemNo;
    var ItemNo = AutoCalc.ItemNo;
    var MapPath = AutoCalc.MapPath;
    var pid = '';
    var res = [];

    //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
    setTimeout(function () {
        for(var i=0;i<CalcDependItems.length;i++){
            var arr = CalcDependItems[i];
            var DependItemNo = arr.DependItemNo;
            var VarName = arr.VarName;
            var CRFUIType = arr.CRFUIType;
            var container = '';
            var value = '';
            var score = '';

            switch (CRFUIType) {
                //数值框
                case '10006719':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'input-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    break;
                //单选
                case '10000003':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    //score = $scope.getAttr(pid, 'Score');
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    /*if(score === '' || score === null || score === undefined){
                        value = $scope.getAttr(pid, 'Value');
                    }else{
                        value = score;
                    }*/
                    break;
                //单选
                case '10000005':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    //score = $scope.getAttr(pid, 'Score');
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    /*if(score === '' || score === null || score === undefined){
                        value = $scope.getAttr(pid, 'Value');
                    }else{
                        value = score;
                    }*/
                    break;
                //多选
                case '10000004':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    //score = $scope.getAttr(pid, 'Score');
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    break;
                //多选
                case '10001196':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    //score = $scope.getAttr(pid, 'Score');
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    break;
                //时间
                case '10000007':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    break;
                //日期
                case '10000008':
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }
                    value = getAttr(pid, 'Value');
                    MapPath = getAttr(pid, 'MapPath');
                    break;
            }

            if(value === '' || value === undefined || value === null){

            }else{
                res.push({
                    DependItemNo:DependItemNo,
                    VarName:VarName,
                    MapPath:MapPath,
                    CRFNo:CRFNo,
                    PageNo:PageNo,
                    SectionNO:SectionNo,
                    Value:value,
                    CRFUIType:CRFUIType,
                    CRFRelID:CRFRelID
                });
            }

        }

        console.log(res);

        /***************************************无输入或选中值时的判断-start******************************************/
        var resZero = [];
        for(var r=0;r<res.length;r++){
            var resItem = res[r];
            var resItemValue = resItem.Value;
            if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                resZero.push(r);
            }
        }

        console.log(resZero.length, res.length);

        if(resZero.length === res.length){
            if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                setAttr('input-' + ParentItemNo + '-' + ItemNo, 'Value', '');
                $('#input-' + ParentItemNo + '-' + ItemNo + ' input').val('');
            }else{
                setAttr('input-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID, 'Value', '');
                $('#input-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID + ' input').val('');
            }
            //mui.toast('没有值进行计算');
            mui.hideLoading();
            return false;
        }
        /***************************************无输入或选中值时的判断-end******************************************/

        var AutoCalcModel = {
            AutoCalcID:AutoCalcID,
            CalcDependItems:res
        };

        console.log(res);

        $.ajax({
            async:true,
            method:'post',
            dataType:'json',
            //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
            data:AutoCalcModel,
            success:function (Data) {
                mui.hideLoading();

                var result = Data.result;

                if(result === 200){
                    var data = Data.data;
                    var DependItemNo = data.DependItemNo;
                    var MapPath = data.MapPath;
                    var Value = data.Value ? data.Value : '';
                    console.log(Value);

                    var id = '';
                    var getAutoCalcId = '';
                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        id = 'input-' + ParentItemNo + '-' + DependItemNo;
                        getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo;
                    }else{
                        id = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                        getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                    }

                    setAttr(id, 'Value', Value);
                    //$('#' + id + ' input').val(Value);
                    if(Value === ''){
                        $('#' + getAutoCalcId).html('点击计算');
                    }else{
                        $('#' + getAutoCalcId).html(Value);
                    }

                }else{
                    mui.toast('自动计算异常');
                }

            },
            error:function (err) {
                //console.log(err);
                mui.toast('自动计算异常');
                mui.hideLoading();

            }
        });

    }, 500);

}

/**
 * 表格中的输入框的失去焦点
 * @param e
 * @param ItemsNo 大大
 * @param childrenNo 大
 * @param childrenItemNo 当前
 * @param CRFRelID 表格中的行号
 * @returns {boolean}
 */
function inputBlurTable(e, ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    var formCopyClass = 'form-copy-container-' + ItemsNo + '-' + childrenNo;
    var formCopyLength = $('.' + formCopyClass).length;//表格的个数
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子

    var childrenArr = [];
    for(var m=0;m<DefaultChilds.length;m++){
        var DefaultChildsItem = DefaultChilds[m];
        var DefaultChildsItemItemNo = DefaultChildsItem.ItemNo;
        if(DefaultChildsItemItemNo === parseInt(childrenItemNo)){
            childrenArr.push(DefaultChildsItem);
        }

    }

    var children = childrenArr[0];

    console.log(Items);
    console.log(Children);
    console.log(children);
    console.log(ItemsNo, childrenNo, childrenItemNo);

    var Childs = DefaultChilds;              //该模块内容的所有孩子

    /****对单一组件的判断-start****/
    if(Items.Childs === undefined || Items.Childs === '' || Items.Childs === null){
        //Childs = Items.Items;
    }
    /****对单一组件的判断-end****/

    var noNums = /^[\u4e00-\u9fa5]{0,}$/;   //判断是汉字,英文,字母等其他非数字
    var decimal = /^(\d+(\.\d{1,2})?)$/;    //精确到后2位
    var integer = /^[0-9]*[1-9][0-9]*$/;    //整数
    var UITypeCode = children.UIType.Code;  //类型Code
    var DataType = children.DataType.Code;  //输入类型Code
    var ItemNo = '';

    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
        ItemNo = 'input-' + children.ParentItemNo + '-' + children.ItemNo;
    }else{
        ItemNo = 'input-' + children.ParentItemNo + '-' + children.ItemNo + '-' + CRFRelID;
    }

    /****对单一组件的判断-start****/
    if(Items.Childs === undefined || Items.Childs === '' || Items.Childs === null){
        ///ItemNo = 'input--' + children.ItemNo;
    }
    /****对单一组件的判断-end****/

    var input = $('#' + ItemNo + ' input'); //输入框盒子
    var value = input.val();                //输入框的值

    /****值为空的判断****/
    if(value === '' || value === undefined || value === null){
        value = '';
        setAttr(ItemNo, 'Value', value);
        input.val('');

        /*************************判断有逻辑计算的输入框的需清空-start**************************/
        var IsAuto = [];//是否需要参与计算判断数组
        var IsGetAutoCalcId = [];//是否需要参与计算div判断数组
        for(var i=0;i<Childs.length;i++){
            var ChildsItem = Childs[i];
            if(ChildsItem.AutoCalc !== undefined && ChildsItem.AutoCalc !== '' && ChildsItem.AutoCalc !== null){
                var AutoCalc = ChildsItem.AutoCalc;
                var CalcDependItems = AutoCalc.CalcDependItems;
                var AutoItemNo = AutoCalc.ItemNo;
                var AutoParentItemNo = AutoCalc.ParentItemNo;
                for(var j=0;j<CalcDependItems.length;j++){
                    var CalcDependItemsItem = CalcDependItems[j];
                    var DependItemNo = CalcDependItemsItem.DependItemNo;
                    if(children.ItemNo === DependItemNo){
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            IsAuto.push('input-' + AutoParentItemNo + '-' + AutoItemNo);
                            IsGetAutoCalcId.push('input-getAutoCalc-' + AutoParentItemNo + '-' + AutoItemNo);
                        }else{
                            IsAuto.push('input-' + AutoParentItemNo + '-' + AutoItemNo + '-' + CRFRelID);
                            IsGetAutoCalcId.push('input-getAutoCalc-' + AutoParentItemNo + '-' + AutoItemNo + '-' + CRFRelID);
                        }
                    }

                }

            }
        }

        for(var k=0;k<IsAuto.length;k++){
            var IsAutoItem = IsAuto[k];
            setAttr(IsAutoItem, 'Value', '');
            //$('#' + IsAutoItem + ' input[type=number]').val('');
        }

        //对应的div要清空并赋值为 点击计算
        for(var d=0;d<IsGetAutoCalcId.length;d++){
            var IsGetAutoCalcIdItem = IsGetAutoCalcId[d];
            //$scope.setAttr(IsAutoItem, 'Value', '');
            $('#' + IsGetAutoCalcIdItem).html('点击计算');
        }

        if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

        }else{
            if(UITypeCode === '10006719'){
                //mui.showLoading('正在加载..', 'div');

                //表格中的跨级计算CTMB
                var TargetItemNo = '';
                if(children.TargetItemNo === undefined || children.TargetItemNo === '' || children.TargetItemNo === null){
                    mui.hideLoading();
                }else{
                    var TargetItemArr = [];
                    //跨级计算的模板id
                    TargetItemNo = +(children.TargetItemNo);
                    var TargetChilds = Items.Childs;
                    for(var h=0;h<TargetChilds.length;h++){
                        var TargetChildsItem = TargetChilds[h];
                        if(TargetItemNo === TargetChildsItem.ItemNo){
                            var TargetChildsItemItemNo = TargetChildsItem.ItemNo;
                            var TargetChildsItemParentItemNo = TargetChildsItem.ParentItemNo;
                            var TargetChildsItemAutoCalc = TargetChildsItem.AutoCalc;
                            var TargetChildsItemAutoCalcID = TargetChildsItemAutoCalc.AutoCalcID;
                            var TargetChildsItemCalcDependItems = TargetChildsItemAutoCalc.CalcDependItems[0];
                            var TargetChildsItemVarName = TargetChildsItemCalcDependItems.VarName;
                            TargetItemArr.push({
                                TargetChildsItemItemNo:TargetChildsItemItemNo,
                                TargetChildsItemParentItemNo:TargetChildsItemParentItemNo,
                                TargetChildsItemAutoCalcID:TargetChildsItemAutoCalcID,
                                //TargetChildsItemAutoCalc:TargetChildsItemAutoCalc,
                                //TargetChildsItemCalcDependItems:TargetChildsItemCalcDependItems,
                                TargetChildsItemVarName:TargetChildsItemVarName
                            });
                        }

                    }

                    var _TargetChildsItemVarName = TargetItemArr[0].TargetChildsItemVarName;
                    _TargetChildsItemVarName = JSON.parse(_TargetChildsItemVarName);
                    var TargetItem = [];
                    for(var f=0;f<_TargetChildsItemVarName.length;f++){
                        var idx = _TargetChildsItemVarName[f].idx;
                        var varName = _TargetChildsItemVarName[f].varName;
                        //循环孩子找出需要计算的孩子子
                        for(var q=0;q<DefaultChilds.length;q++){
                            if(q === +idx){
                                DefaultChilds[q].varName = varName;
                                TargetItem.push(DefaultChilds[q]);
                            }
                        }

                    }

                    var res = [];
                    var CRFNo = $('#CRFNo').val();
                    var PageNo = $('#PageNo').val();

                    //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
                    setTimeout(function () {
                        for(var t=0;t<formCopyLength;t++){
                            for(var i=0;i<TargetItem.length;i++){
                                var arr = TargetItem[i];
                                var DependItemNo = arr.ItemNo;
                                var ParentItemNo = arr.ParentItemNo;
                                var VarName = arr.varName;
                                var CRFUIType = arr.UIType.Code;
                                var value = '';
                                var MapPath = '';
                                var pid = '';

                                switch (CRFUIType) {
                                    //数值框
                                    case '10006719':
                                        pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //单选
                                    case '10000003':
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //单选
                                    case '10000005':
                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //多选
                                    case '10000004':
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //多选
                                    case '10001196':
                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //时间
                                    case '10000007':
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                    //日期
                                    case '10000008':
                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                        value = getAttr(pid, 'Value');
                                        MapPath = getAttr(pid, 'MapPath');
                                        break;
                                }

                                if(value === '' || value === undefined || value === null){

                                }else{
                                    res.push({
                                        DependItemNo:DependItemNo,
                                        VarName:VarName,
                                        MapPath:MapPath,
                                        CRFNo:CRFNo,
                                        PageNo:PageNo,
                                        SectionNO:SectionNo,
                                        Value:value,
                                        CRFUIType:CRFUIType,
                                        CRFRelID:(t+1)
                                    });
                                }

                            }
                        }

                        console.log(res);

                        /***************************************无输入或选中值时的判断-start******************************************/
                        var resZero = [];
                        for(var r=0;r<res.length;r++){
                            var resItem = res[r];
                            var resItemValue = resItem.Value;
                            if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                                resZero.push(r);
                            }
                        }

                        console.log(resZero.length, res.length);

                        if(resZero.length === res.length){
                            setAttr('input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo, 'Value', '');
                            $('#input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo).html('点击计算');
                            //mui.toast('没有值进行计算');
                            mui.hideLoading();
                            return false;
                        }
                        /***************************************无输入或选中值时的判断-end******************************************/

                        var AutoCalcModel = {
                            AutoCalcID:TargetItemArr[0].TargetChildsItemAutoCalcID,
                            CalcDependItems:res
                        };

                        console.log(res);

                        $.ajax({
                            async:true,
                            method:'post',
                            dataType:'json',
                            //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                            data:AutoCalcModel,
                            success:function (Data) {
                                mui.hideLoading();

                                var result = Data.result;

                                if(result === 200){
                                    var data = Data.data;
                                    var DependItemNo = data.DependItemNo;
                                    var MapPath = data.MapPath;
                                    var Value = data.Value ? data.Value : '';
                                    console.log(Value);

                                    var id = 'input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;
                                    var getAutoCalcId = 'input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;

                                    setAttr(id, 'Value', Value);
                                    //$('#' + id + ' input').val(Value);
                                    if(Value === ''){
                                        $('#' + getAutoCalcId).html('点击计算');
                                    }else{
                                        $('#' + getAutoCalcId).html(Value);
                                    }

                                }else{
                                    mui.toast('自动计算异常');
                                }

                            },
                            error:function (err) {
                                //console.log(err);
                                mui.toast('自动计算异常');
                                mui.hideLoading();

                            }
                        });

                    }, 500);

                }

            }
        }

        /*************************判断有逻辑计算的输入框的需清空-end**************************/
        return false;
    }

    var string = value.toString();

    switch (UITypeCode) {
        //数字
        case '10006719':
            if(string.length > 10){
                string = string.substring(0, 10);
            }

            //不用判断数字啥的，根本输入不进去
            if (noNums.test(value)) {
                mui.alert('格式限定为数字', '提示', function() {
                    setAttr(ItemNo, 'Value', value);
                    input.val('');
                });
                return false;
            }

            if(DataType === '10000012'){//整数
                if (!integer.test(value)) {
                    mui.alert('格式限定为整数', '提示', function() {
                        setAttr(ItemNo, 'Value', value);
                        input.val('');
                    });
                    return false;
                }
                value = parseInt(string);
                //value = parseInt(value);

            }else if(DataType === '10000015'){//小数
                /*if (!decimal.test(value)) {
                    mui.alert('格式限定为小数后2位', '提示', function() {
                        $scope.setAttr(ItemNo, 'Value', value);
                        input.val('');
                    });
                    return false;
                }*/
                value = parseFloat(string);
                //value = parseFloat(value);

            }

            /************************************start*****************************************
             * 真正的自动计算逻辑
             * 单独的组件下没有逻辑计算
             * @type {Array}
             */
            var ItemsChilds = Children.DefaultChilds[0].Childs;

            var blurAutoCalcArr = [];

            for(var t=0;t<ItemsChilds.length;t++){
                var blurItem = ItemsChilds[t];
                if(blurItem.AutoCalc === undefined || blurItem.AutoCalc === '' || blurItem.AutoCalc === null){

                }else{
                    var blurAutoCalc = blurItem.AutoCalc;
                    var blurCalcDependItems = blurAutoCalc.CalcDependItems;
                    for(var s=0;s<blurCalcDependItems.length;s++){
                        var blurDependItemNo = blurCalcDependItems[s].DependItemNo;
                        if(blurDependItemNo === children.ItemNo){
                            blurAutoCalcArr.push(children.ItemNo);
                        }
                    }

                    var CalcDependItems = blurCalcDependItems;
                }
            }

            //说明需要进行自动计算
            if(blurAutoCalcArr.length !== 0){
                var res = [];
                var CRFNo = $('#CRFNo').val();
                var PageNo = $('#PageNo').val();
                setTimeout(function () {
                    for(var i=0;i<CalcDependItems.length;i++){
                        var arr = CalcDependItems[i];
                        var DependItemNo = arr.DependItemNo;
                        var ParentItemNo = children.ParentItemNo;//(arr.MapPath).split('_')[0];
                        var VarName = arr.VarName;
                        var CRFUIType = arr.CRFUIType;
                        var value = '';
                        var MapPath = '';
                        var pid = '';

                        switch (CRFUIType) {
                            //数值框
                            case '10006719':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'input-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                break;
                            //单选
                            case '10000003':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                //score = $scope.getAttr(pid, 'Score');
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                /*if(score === '' || score === null || score === undefined){
                                    value = $scope.getAttr(pid, 'Value');
                                }else{
                                    value = score;
                                }*/
                                break;
                            //单选
                            case '10000005':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                //score = $scope.getAttr(pid, 'Score');
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                /*if(score === '' || score === null || score === undefined){
                                    value = $scope.getAttr(pid, 'Value');
                                }else{
                                    value = score;
                                }*/
                                break;
                            //多选
                            case '10000004':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                //score = $scope.getAttr(pid, 'Score');
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                break;
                            //多选
                            case '10001196':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                //score = $scope.getAttr(pid, 'Score');
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                break;
                            //时间
                            case '10000007':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                break;
                            //日期
                            case '10000008':
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }
                                value = getAttr(pid, 'Value');
                                MapPath = getAttr(pid, 'MapPath');
                                break;
                            //表格
                            case '10001132':
                                mui.hideLoading();
                                return false;
                                break;
                        }

                        if(value === '' || value === undefined || value === null){

                        }else{
                            res.push({
                                DependItemNo:DependItemNo,
                                VarName:VarName,
                                MapPath:MapPath,
                                CRFNo:CRFNo,
                                PageNo:PageNo,
                                SectionNO:SectionNo,
                                Value:value,
                                CRFUIType:CRFUIType,
                                CRFRelID:CRFRelID
                            });
                        }

                    }

                    console.log(res);

                    /***************************************无输入或选中值时的判断-start******************************************/
                    var resZero = [];
                    for(var r=0;r<res.length;r++){
                        var resItem = res[r];
                        var resItemValue = resItem.Value;
                        if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                            resZero.push(r);
                        }
                    }

                    console.log(resZero.length, res.length);

                    if(resZero.length === res.length){
                        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                            setAttr('input-' + ParentItemNo + '-' + ItemNo, 'Value', '');
                            $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo).html('点击计算');
                        }else{
                            setAttr('input-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID, 'Value', '');
                            $('#input-getAutoCalc-' + ParentItemNo + '-' + ItemNo + '-' + CRFRelID).html('点击计算');
                        }
                        //mui.toast('没有值进行计算');
                        mui.hideLoading();
                        return false;
                    }
                    /***************************************无输入或选中值时的判断-end******************************************/

                    var AutoCalcModel = {
                        AutoCalcID:blurAutoCalc.AutoCalcID,
                        CalcDependItems:res
                    };

                    console.log(res);

                    $.ajax({
                        async:true,
                        method:'post',
                        dataType:'json',
                        //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                        url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                        data:AutoCalcModel,
                        success:function (Data) {
                            mui.hideLoading();

                            var result = Data.result;

                            if(result === 200){
                                var data = Data.data;
                                var DependItemNo = data.DependItemNo;
                                var MapPath = data.MapPath;
                                var Value = data.Value ? data.Value : '';
                                console.log(Value);

                                var id = '';
                                var getAutoCalcId = '';
                                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                                    id = 'input-' + ParentItemNo + '-' + DependItemNo;
                                    getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo;
                                }else{
                                    id = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                    getAutoCalcId = 'input-getAutoCalc-' + ParentItemNo + '-' + DependItemNo + '-' + CRFRelID;
                                }

                                setAttr(id, 'Value', Value);
                                //$('#' + id + ' input').val(Value);
                                if(Value === ''){
                                    $('#' + getAutoCalcId).html('点击计算');
                                }else{
                                    $('#' + getAutoCalcId).html(Value);
                                }

                            }else{
                                mui.toast('自动计算异常');
                            }

                        },
                        error:function (err) {
                            //console.log(err);
                            mui.toast('自动计算异常');
                            mui.hideLoading();

                        }
                    });

                }, 500);
            }

            /************************************end*****************************************/

            break;
        //文字
        case '10000001':
            //文字的输入字数已经在html判断了
            break;
    }

    input.val(value);
    setAttr(ItemNo, 'Value', value);
    console.log(value, string, string.length);

    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        if(UITypeCode === '10006719'){
            //mui.showLoading('正在加载..', 'div');

            //表格中的跨级计算CTMB
            var TargetItemNo = '';
            if(children.TargetItemNo === undefined || children.TargetItemNo === '' || children.TargetItemNo === null){
                mui.hideLoading();
            }else{
                var TargetItemArr = [];
                //跨级计算的模板id
                TargetItemNo = +(children.TargetItemNo);
                var TargetChilds = Items.Childs;
                for(var h=0;h<TargetChilds.length;h++){
                    var TargetChildsItem = TargetChilds[h];
                    if(TargetItemNo === TargetChildsItem.ItemNo){
                        var TargetChildsItemItemNo = TargetChildsItem.ItemNo;
                        var TargetChildsItemParentItemNo = TargetChildsItem.ParentItemNo;
                        var TargetChildsItemAutoCalc = TargetChildsItem.AutoCalc;
                        var TargetChildsItemAutoCalcID = TargetChildsItemAutoCalc.AutoCalcID;
                        var TargetChildsItemCalcDependItems = TargetChildsItemAutoCalc.CalcDependItems[0];
                        var TargetChildsItemVarName = TargetChildsItemCalcDependItems.VarName;
                        TargetItemArr.push({
                            TargetChildsItemItemNo:TargetChildsItemItemNo,
                            TargetChildsItemParentItemNo:TargetChildsItemParentItemNo,
                            TargetChildsItemAutoCalcID:TargetChildsItemAutoCalcID,
                            //TargetChildsItemAutoCalc:TargetChildsItemAutoCalc,
                            //TargetChildsItemCalcDependItems:TargetChildsItemCalcDependItems,
                            TargetChildsItemVarName:TargetChildsItemVarName
                        });
                    }

                }

                var _TargetChildsItemVarName = TargetItemArr[0].TargetChildsItemVarName;
                _TargetChildsItemVarName = JSON.parse(_TargetChildsItemVarName);
                var TargetItem = [];
                for(var f=0;f<_TargetChildsItemVarName.length;f++){
                    var idx = _TargetChildsItemVarName[f].idx;
                    var varName = _TargetChildsItemVarName[f].varName;
                    //循环孩子找出需要计算的孩子子
                    for(var q=0;q<DefaultChilds.length;q++){
                        if(q === +idx){
                            DefaultChilds[q].varName = varName;
                            TargetItem.push(DefaultChilds[q]);
                        }
                    }

                }

                var res = [];
                var CRFNo = $('#CRFNo').val();
                var PageNo = $('#PageNo').val();

                //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
                setTimeout(function () {
                    for(var t=0;t<formCopyLength;t++){
                        for(var i=0;i<TargetItem.length;i++){
                            var arr = TargetItem[i];
                            var DependItemNo = arr.ItemNo;
                            var ParentItemNo = arr.ParentItemNo;
                            var VarName = arr.varName;
                            var CRFUIType = arr.UIType.Code;
                            var value = '';
                            var MapPath = '';
                            var pid = '';

                            switch (CRFUIType) {
                                //数值框
                                case '10006719':
                                    pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //单选
                                case '10000003':
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //单选
                                case '10000005':
                                    pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //多选
                                case '10000004':
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //多选
                                case '10001196':
                                    pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //时间
                                case '10000007':
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                                //日期
                                case '10000008':
                                    pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                    value = getAttr(pid, 'Value');
                                    MapPath = getAttr(pid, 'MapPath');
                                    break;
                            }

                            if(value === '' || value === undefined || value === null){

                            }else{
                                res.push({
                                    DependItemNo:DependItemNo,
                                    VarName:VarName,
                                    MapPath:MapPath,
                                    CRFNo:CRFNo,
                                    PageNo:PageNo,
                                    SectionNO:SectionNo,
                                    Value:value,
                                    CRFUIType:CRFUIType,
                                    CRFRelID:(t+1)
                                });
                            }

                        }
                    }

                    console.log(res);

                    /***************************************无输入或选中值时的判断-start******************************************/
                    var resZero = [];
                    for(var r=0;r<res.length;r++){
                        var resItem = res[r];
                        var resItemValue = resItem.Value;
                        if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                            resZero.push(r);
                        }
                    }

                    console.log(resZero.length, res.length);

                    if(resZero.length === res.length){
                        setAttr('input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo, 'Value', '');
                        $('#input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo).html('点击计算');
                        //mui.toast('没有值进行计算');
                        mui.hideLoading();
                        return false;
                    }
                    /***************************************无输入或选中值时的判断-end******************************************/

                    var AutoCalcModel = {
                        AutoCalcID:TargetItemArr[0].TargetChildsItemAutoCalcID,
                        CalcDependItems:res
                    };

                    console.log(AutoCalcModel);

                    $.ajax({
                        async:true,
                        method:'post',
                        dataType:'json',
                        url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                        data:AutoCalcModel,
                        success:function (Data) {
                            mui.hideLoading();

                            var result = Data.result;

                            if(result === 200){
                                var data = Data.data;
                                var DependItemNo = data.DependItemNo;
                                var MapPath = data.MapPath;
                                var Value = data.Value ? data.Value : '';
                                console.log(Value);

                                var id = 'input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;
                                var getAutoCalcId = 'input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;

                                setAttr(id, 'Value', Value);
                                //$('#' + id + ' input').val(Value);
                                if(Value === ''){
                                    $('#' + getAutoCalcId).html('点击计算');
                                }else{
                                    $('#' + getAutoCalcId).html(Value);
                                }

                            }else{
                                mui.toast('自动计算异常');
                            }

                        },
                        error:function (err) {
                            //console.log(err);
                            mui.toast('自动计算异常');
                            mui.hideLoading();

                        }
                    });

                }, 500);

            }

        }
    }

}

/**
 * 表格中的多行文本框的输入完时
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 */
function multilinekBlurTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    // var itemsItemNo = ItemsNo;
    //
    // /****对单一组件的判断-start****/
    // if(ItemsNo === undefined || ItemsNo === '' || ItemsNo === null){
    //     itemsItemNo = '';
    // }
    // /****对单一组件的判断-end****/
    //
    // var ItemNo = children.ItemNo;
    var id = childrenNo + '-' + childrenItemNo + '-' + CRFRelID;
    var value = $('#input-multiline-' + id).val();

    setAttr('input-' + id, 'Value', value);

}

/**
 * 表格的代替点击
 * @param id
 */
function triggerTapTable(id) {
    $('#' + id).trigger('tap');
}

/**
 * 单选的其他输入完时
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 */
function pickBlurTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    // var itemsItemNo = Items.ItemNo;
    //
    // /****对单一组件的判断-start****/
    // if(Items.ItemNo === undefined || Items.ItemNo === '' || Items.ItemNo === null){
    //     itemsItemNo = '';
    // }
    // /****对单一组件的判断-end****/
    //
    // var ItemNo = children.ItemNo;
    // var target = $event.target;
    // var value = target.value;
    var id = childrenNo + '-' + childrenItemNo + '-' + CRFRelID;
    var value = $('#other-picker-input-' + id).val();

    setAttr('picker-' + id, 'OtherValue', value);
}

/**
 * 表格的复选框点击
 * @param Code 当前选项Code值
 * @param e 当前控件
 * @param ItemsNo 表格id
 * @param childrenNo 父级ID
 * @param childrenItemNo 当前id
 * @param CRFRelID 行号
 * @returns {boolean}
 */
function getCheckboxTable(Code, e, ItemsNo, childrenNo, childrenItemNo, CRFRelID) {
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }

    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子

    var childrenArr = [];
    for(var m=0;m<DefaultChilds.length;m++){
        var DefaultChildsItem = DefaultChilds[m];
        var DefaultChildsItemItemNo = DefaultChildsItem.ItemNo;
        if(DefaultChildsItemItemNo === parseInt(childrenItemNo)){
            childrenArr.push(DefaultChildsItem);
        }

    }

    var children = childrenArr[0];

    var Childs = DefaultChilds;              //该模块内容的所有孩子
    var childrens = children;

    var checkboxInput = $('#checkbox-input-' + childrenNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID);
    var checked = checkboxInput.prop('checked');
    console.log(Items);//表格外的集合
    console.log(Children);//表格
    console.log(Childs);//表格里的孩子
    console.log(children);//当前
    console.log(ItemsNo, childrenNo, childrenItemNo);
    console.log(checkboxInput.prop('checked'));

    //var Code = checkbox.Code;
    var childrensItemNo = childrenNo;  //父级id

    // /****对单一组件的判断-start****/
    // if(children.ItemNo === undefined || children.ItemNo === '' || children.ItemNo === null){
    //     childrensItemNo = '';
    // }
    // /****对单一组件的判断-end****/

    //var childrenItemNo = childrens.ItemNo;  //当前id
    //var checked = e.target.checked;
    var Logic = [];
    if(childrens.Logic !== undefined && childrens.Logic !== '' && childrens.Logic !== null){
        Logic = childrens.Logic;            //逻辑跳转问题
        Logic = JSON.parse(Logic);
    }else{
        Logic = [];
    }

    //console.log(childrensItemNo, childrenItemNo, Code, Logic);

    var pid = '';
    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
        pid = 'checkbox-' + childrensItemNo + '-' + childrenItemNo;
    }else{
        pid = 'checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID;
    }

    /*******用不到，先留着-start*******/
    var parent = $('#checkbox-' + childrensItemNo + '-' + childrenItemNo);
    var dataValue = getAttr(pid, 'Value');
    var that = $('#checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code);
    /*******用不到，先留着-end*******/

    /*******本来这里要自己计算的，现在不用了-start*******/
    var dataDisplayName = '';
    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
        dataDisplayName = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code, 'DisplayName');
    }else{
        dataDisplayName = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID, 'DisplayName');
    }
    /*******本来这里要自己计算的，现在不用了-end*******/

    var arr = '';
    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
        arr = $('input[name="checkbox-name-' + childrensItemNo + '-' + childrenItemNo + '"]');
    }else{
        arr = $('input[name="checkbox-name-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID + '"]');
    }

    var CodeArr = [];
    var DisplayNameArr = [];
    var ScoreArr = [];
    var OtherArr = [];

    arr.each(function () {
        var that = $(this)[0];
        var _checked = that.checked;
        var _id = that.id;
        var _idArr = _id.split('-');
        _id = _idArr[4];
        var _dataDisplayName = '';
        var _dataScore = '';

        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            _dataDisplayName = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id, 'DisplayName');
            _dataScore = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id, 'Score');
        }else{
            _dataDisplayName = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id + '-' + CRFRelID, 'DisplayName');
            _dataScore = getAttr('checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + _id + '-' + CRFRelID, 'Score');
        }

        if(_checked === true){
            CodeArr.push(_id);
            DisplayNameArr.push(_dataDisplayName);
            ScoreArr.push(_dataScore);
        }

        if(_checked === true && (_dataDisplayName.substr(0, 2).indexOf('其它') !== -1 || _dataDisplayName.substr(0, 2).indexOf('其他') !== -1) ){
            OtherArr.push(_id);
        }else{
            OtherArr = [];
        }

    });

    var dataValueRes = CodeArr.join('&');
    var DisplayNameRes = DisplayNameArr.join('&');
    var ScoreRes = ScoreArr.join('&');

    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'Value', dataValueRes);
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'DisplayName', DisplayNameRes);
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'Score', ScoreRes);
    }else{
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'Value', dataValueRes);
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'DisplayName', DisplayNameRes);
        setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'Score', ScoreRes);
    }

    if(OtherArr.length !== 0){
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo).show();
        }else{
            $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).show();
        }
    }else{
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo, 'OtherValue', '');
            $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo).val('');
            $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo).hide();
        }else{
            setAttr('checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID, 'OtherValue', '');
            $('#other-checkbox-input-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).val('');
            $('#other-checkbox-' + childrensItemNo + '-' + childrenItemNo + '-' + CRFRelID).hide();
        }
    }

    if(checked === true){
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code).addClass('blue');
        }else{
            $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID).addClass('blue');
        }
    }else{
        if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
            $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code).removeClass('blue');
        }else{
            $('#checkbox-label-' + childrensItemNo + '-' + childrenItemNo + '-' + Code + '-' + CRFRelID).removeClass('blue');
        }
    }

    /******************************************多选的逻辑跳转-start******************************************/
    var LogicArr = [];//需要显示的数组
    var LogicBrr = [];//需要隐藏的数组
    var LogicCrr = [];//当没有选择时，必须隐藏的数组

    for(var p=0;p<CodeArr.length;p++){
        var _Code = CodeArr[p];

        for(var i=0;i<Logic.length;i++){
            var TriggerVal = Logic[i].TriggerVal;    //触发值
            var TargetItemNo = Logic[i].TargetItemNo;//目标id
            if(TriggerVal === _Code){
                LogicArr.push(TargetItemNo);
            }

            LogicBrr.push(TargetItemNo);
        }

    }

    for(var i=0;i<Logic.length;i++){
        var TargetItemNo = Logic[i].TargetItemNo;//目标id
        LogicCrr.push(TargetItemNo);
    }

    LogicBrr = uniqArrTable(LogicBrr);
    LogicCrr = uniqArrTable(LogicCrr);

    for(var k=0;k<LogicBrr.length;k++){
        var crr = LogicBrr[k];
        //$scope.displayHide(childrensItemNo, crr, 'hide', CRFRelID);
    }

    for(var j=0;j<LogicArr.length;j++){
        var brr = LogicArr[j];
        displayHideTable(childrensItemNo, brr, 'show', CRFRelID);
    }

    if(CodeArr.length === 0){
        for(var j=0;j<LogicCrr.length;j++){
            var drr = LogicCrr[j];
            displayHideTable(childrensItemNo, drr, 'hide', CRFRelID);
        }
    }

    var LogicDrr = compareArrTable(LogicBrr, LogicArr);//绝对隐藏的数组
    for(var s=0;s<LogicDrr.length;s++){
        var err = LogicDrr[s];
        displayHideTable(childrensItemNo, err, 'hide', CRFRelID);
    }

    //当没有全部都不选但是有不选中的时候
    if(checked === false){
        if(CodeArr.length === 0){
            //如果没有选中值时才使用[当没有选择时，必须隐藏的数组]
        }else{
            LogicCrr = [];
        }
        console.log('选中的值:' + CodeArr);//选中的值
        //console.log('需要隐藏的数组:' + LogicBrr);//需要隐藏的数组
        console.log('需要显示的数组:' + LogicArr);//需要显示的数组
        console.log('当没有选择时，必须隐藏的数组:' + LogicCrr);//当没有选择时，必须隐藏的数组
        console.log('需要隐藏的数组:' + LogicDrr);
        for(var m=0;m<LogicDrr.length;m++){
            var checkboxId = 'checkbox-' + childrensItemNo + '-' + LogicDrr[m] + '-' + CRFRelID;

            var LOGIC = getAttr(checkboxId, 'Logic');

            if(LOGIC === '' || LOGIC === undefined || LOGIC === null){

            }else{
                LOGIC = JSON.parse(LOGIC);
            }

            if(LOGIC === undefined || LOGIC === '' || LOGIC === null){

            }else{
                for(var n=0;n<LOGIC.length;n++){
                    var itemLOGIC = LOGIC[n];
                    var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
                    displayHideTable(childrensItemNo, itemLOGICTargetItemNo, 'hide', CRFRelID);
                }
            }

            /*************************对单选logic的判断-start************************/
            var checkboxId3 = childrensItemNo + '-' + LogicDrr[m] + '-' + CRFRelID;

            var LOGIC3 = getAttr(checkboxId3, 'Logic');

            if(LOGIC3 === '' || LOGIC3 === undefined || LOGIC3 === null){

            }else{
                LOGIC3 = JSON.parse(LOGIC3);
            }

            if(LOGIC3 === undefined || LOGIC3 === '' || LOGIC3 === null){

            }else{
                for(var r=0;r<LOGIC3.length;r++){
                    var itemLOGIC3 = LOGIC3[r];
                    var itemLOGICTargetItemNo3 = itemLOGIC3.TargetItemNo;
                    displayHideTable(childrensItemNo, itemLOGICTargetItemNo3, 'hide', CRFRelID);
                }
            }
            /*************************对单选logic的判断-end************************/

        }

        /************************对下级再进行判断-start***************************/
        //对没有全不选的Logic判断
        if(LogicDrr.length > 0){
            for(var x=0;x<LogicDrr.length;x++){
                var drr1 = LogicDrr[x];
                var LOGIC1 = getAttr('checkbox-' + childrensItemNo + '-' + drr1 + '-' + CRFRelID, 'Logic');

                if(LOGIC1 === '' || LOGIC1 === undefined || LOGIC1 === null){

                }else{
                    LOGIC1 = JSON.parse(LOGIC1);
                    LOGIC1 = JSON.parse(LOGIC1);
                }

                if(LOGIC1 === undefined || LOGIC1 === '' || LOGIC1 === null){

                }else{
                    for(var y=0;y<LOGIC1.length;y++){
                        var itemLOGIC1 = LOGIC1[y];
                        var itemLOGICTargetItemNo1 = itemLOGIC1.TargetItemNo;
                        displayHideTable(childrensItemNo, itemLOGICTargetItemNo1, 'hide', CRFRelID);
                    }
                }

                /*************************对单选logic的判断-start************************/
                var LOGIC4 = getAttr(childrensItemNo + '-' + drr1 + '-' + CRFRelID, 'Logic');

                if(LOGIC4 === '' || LOGIC4 === undefined || LOGIC4 === null){

                }else{
                    LOGIC4 = JSON.parse(LOGIC4);
                    LOGIC4 = JSON.parse(LOGIC4);
                }

                if(LOGIC4 === undefined || LOGIC4 === '' || LOGIC4 === null){

                }else{
                    for(var t=0;t<LOGIC4.length;t++){
                        var itemLOGIC4 = LOGIC4[t];
                        var itemLOGICTargetItemNo4 = itemLOGIC4.TargetItemNo;
                        displayHideTable(childrensItemNo, itemLOGICTargetItemNo4, 'hide', CRFRelID);
                    }
                }
                /*************************对单选logic的判断-end************************/

            }

        }else{
            //对有全不选的Logic判断
            if(LogicCrr.length > 0){
                for(var a=0;a<LogicCrr.length;a++){
                    var drr2 = LogicCrr[a];
                    var LOGIC2 = getAttr('checkbox-' + childrensItemNo + '-' + drr2 + '-' + CRFRelID, 'Logic');

                    if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){

                    }else{
                        LOGIC2 = JSON.parse(LOGIC2);
                        LOGIC2 = JSON.parse(LOGIC2);
                    }

                    if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){

                    }else{
                        for(var b=0;b<LOGIC2.length;b++){
                            var itemLOGIC2 = LOGIC2[b];
                            var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
                            displayHideTable(childrensItemNo, itemLOGICTargetItemNo2, 'hide', CRFRelID);
                        }
                    }

                    /*************************对单选logic的判断-start************************/
                    var LOGIC5 = getAttr(childrensItemNo + '-' + drr2 + '-' + CRFRelID, 'Logic');

                    if(LOGIC5 === '' || LOGIC5 === undefined || LOGIC5 === null){

                    }else{
                        LOGIC5 = JSON.parse(LOGIC5);
                        LOGIC5 = JSON.parse(LOGIC5);
                    }

                    if(LOGIC5 === undefined || LOGIC5 === '' || LOGIC5 === null){

                    }else{
                        for(var s=0;s<LOGIC5.length;s++){
                            var itemLOGIC5 = LOGIC5[s];
                            var itemLOGICTargetItemNo5 = itemLOGIC5.TargetItemNo;
                            displayHideTable(childrensItemNo, itemLOGICTargetItemNo5, 'hide', CRFRelID);
                        }
                    }
                    /*************************对单选logic的判断-end************************/

                }
            }
        }

    }
    /************************对下级再进行判断-end***************************/

    /******************************************多选的逻辑跳转-end******************************************/

    //最后再清空，防止污染
    //其实也没啥事
    CodeArr = [];
    DisplayNameArr = [];
    OtherArr = [];
}

/**
 * 多选的其他输入完时
 * @param ItemsNo
 * @param childrenNo
 * @param childrenItemNo
 * @param CRFRelID
 */
function checkboxBlurTable(ItemsNo, childrenNo, childrenItemNo, CRFRelID){
    // var itemsItemNo = Items.ItemNo;
    //
    // /****对单一组件的判断-start****/
    // if(Items.ItemNo === undefined || Items.ItemNo === '' || Items.ItemNo === null){
    //     itemsItemNo = '';
    // }
    // /****对单一组件的判断-end****/

    // var ItemNo = children.ItemNo;
    // var target = $event.target;
    // var value = target.value;
    var id = childrenNo + '-' + childrenItemNo + '-' + CRFRelID;
    var value = $('#other-checkbox-input-' + id).val();

    setAttr('checkbox-' + id, 'OtherValue', value);
}

/**
 * 对组件的展示与隐藏
 * @param pid
 * @param id
 * @param type show/hide
 * @param dataRowNum 表格行号
 */
function displayHideTable(pid, id, type, dataRowNum) {
    var _id = '';
    if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
        _id = pid + '-' + id;
    }else{
        _id = pid + '-' + id + '-' + dataRowNum;
    }

    if(type === 'show'){
        $('#input-' + _id).show();
        $('#picker-div-' + _id).show();
        $('#picker-' + _id).show();
        $('#checkbox-' + _id).show();
        $('#form-aggregate-' + _id).show();
        $('#dtPicker-' + _id).show();
        $('#form-img-up-' + _id).show();

    }else{
        $('#input-' + _id).hide();
        $('#picker-div-' + _id).hide();
        $('#picker-' + _id).hide();
        $('#checkbox-' + _id).hide();
        $('#form-aggregate-' + _id).hide();
        $('#dtPicker-' + _id).hide();
        $('#form-img-up-' + _id).hide();

        /*****************************隐藏的同时要清空值-start**********************************/

        /*****************************input-number-start**********************************/
        setAttr('input-' + _id, 'Value', '');
        setAttr('input-' + _id, 'OtherValue', '');
        $('#input-' + _id + ' input[type=number]').val('');
        $('#input-getAutoCalc-' + _id).html('点击计算');
        /*****************************input-number-start**********************************/

        /*****************************input-text-start**********************************/
        setAttr('input-' + _id, 'Value', '');
        setAttr('input-' + _id, 'OtherValue', '');
        $('#input-' + _id + ' input[type=text]').val('');
        /*****************************input-text-start**********************************/

        /*****************************textarea-start**********************************/
        setAttr('input-' + _id, 'Value', '');
        setAttr('input-' + _id, 'OtherValue', '');
        $('#input-multiline-' + _id).val('');
        /*****************************textarea-start**********************************/

        /*****************************picker-start**********************************/
        setAttr('picker-' + _id, 'Value', '');
        setAttr('picker-' + _id, 'OtherValue', '');
        setAttr('picker-' + _id, 'DisplayName', '');
        $('#' + _id + ' span').html('<span class="form-picker-span">请选择</span>');//同时对dtPicker也做了判断
        $('#picker-' + _id).removeClass('form-top-left-right-border');
        $('#long-picker-' + _id).hide().html('');
        $('#other-picker-' + _id).hide();
        $('#other-picker-' + _id + ' textarea').val('');
        /*****************************picker-end**********************************/

        /*****************************checkbox-start**********************************/
        setAttr('checkbox-' + _id, 'Value', '');
        setAttr('checkbox-' + _id, 'OtherValue', '');
        setAttr('checkbox-' + _id, 'DisplayName', '');
        $('#other-checkbox-' + _id).hide();
        $('#other-checkbox-' + _id + ' textarea').val('');
        $('#checkbox-' + _id + ' input[type=checkbox]').prop('checked', false);
        $('#checkbox-' + _id + ' label').removeClass('blue');
        /*****************************checkbox-start**********************************/

        /*****************************dtPicker-start**********************************/
        setAttr('dtPicker-' + _id, 'Value', '');
        setAttr('dtPicker-' + _id, 'OtherValue', '');
        /*****************************dtPicker-start**********************************/

        /*****************************img-start**********************************/
        setAttr('form-img-up-' + _id, 'Value', '');
        setAttr('form-img-up-' + _id, 'OtherValue', '');
        setAttr('form-img-up-' + _id, 'Res', '');

        for(var i=0;i<4;i++){
            $('#form-img-up-img-' + _id + '-' + i).attr('src', '').css('display', 'none');
            $('#' + _id + '-' + i).show();
            $('#' + 'form-img-up-del-' + _id + '-' + i).hide();
        }
        /*****************************img-start**********************************/

        /*****************************隐藏的同时要清空值-end**********************************/
    }

}

/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
function uniqArrTable(array){
    var temp = [];
    var index = [];
    var l = array.length;
    for(var i = 0; i < l; i++) {
        for(var j = i + 1; j < l; j++){
            if (array[i] === array[j]){
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    return temp;
}

/**
 * 比较两个数组取不同的值
 * @param array
 * @param array2
 * @returns {Array}
 */
function compareArrTable(array, array2) {
    var arr3 = [];
    for(var key in array) {
        var stra = array[key];
        var count = 0;
        for(var j = 0; j < array2.length; j++) {
            var strb = array2[j];
            if(stra == strb) {
                count++;
            }
        }
        if(count === 0) { //表示数组1的这个值没有重复的，放到arr3列表中
            arr3.push(stra);
        }
    }

    return arr3;
}

/**
 * 图片删除
 * @param ItemsNo
 * @param ChildrenNo
 * @param sort
 * @param CRFRelID 表格的行号
 */
function delImgTable(ItemsNo, ChildrenNo, sort, CRFRelID) {
    mui.confirm(
        '',
        '确定要删除吗',
        ['取消', '确定'],
        function(e) {
            if (e.index === 1) {
                var id = '';
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    id = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                }else{
                    id = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                }
                $('#' + id).css('display', 'none').attr('src', '');

                var PID = '';
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo;
                }else{
                    PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo + '-' + CRFRelID;
                }
                var dataRes = getAttr(PID, 'Res');
                var dataResArr = dataRes.split('&');
                var dataValue = '';
                var dataValueArr = [];
                var input = '';
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    input = ItemsNo + '-' + ChildrenNo + '-' + sort;
                }else{
                    input = ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                }

                var del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                    del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
                }else{
                    del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
                }
                var res = [];

                for(var i=0;i<dataResArr.length;i++){
                    var arr = dataResArr[i];
                    var brr = arr.split('\1');

                    if(CRFRelID === '' || CRFRelID === undefined || CRFRelID === null){
                        if(brr[1] === ItemsNo + '-' + ChildrenNo + '-' + sort){

                        }else{
                            res.push(arr);
                        }
                    }else{
                        if(brr[1] === ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID){

                        }else{
                            res.push(arr);
                        }
                    }
                }

                res = res.join('&');
                setAttr(PID, 'Res', res);

                var DataResArr = res.split('&');
                for(var j=0;j<DataResArr.length;j++){
                    var crr = DataResArr[j];
                    var drr = crr.split('\1');
                    var PATH = drr[0];
                    dataValueArr.push(PATH);
                }

                dataValue = dataValueArr.join('&');
                setAttr(PID, 'Value', dataValue);

                $('#' + input).show();
                $('#' + del).hide();

            }else{

            }

        });

}

/**
 * 图片上传
 * @param NEWCRFRelID
 */
function imgUpTable(NEWCRFRelID) {
    var defaults = {
        fileType : ["jpg","png","bmp","jpeg"],  // 上传文件的类型
        fileSize : 1024 * 1024 * 5              // 上传文件的大小 5M
    };

    var FILE = $(".file-" + NEWCRFRelID);

    //当为图片预览时，防止点击触发上传操作
    FILE.click(function () {
        var __MUI_PREVIEWIMAGE = $('#__MUI_PREVIEWIMAGE');
        var style__MUI_PREVIEWIMAGE = __MUI_PREVIEWIMAGE.attr('style');

        if(style__MUI_PREVIEWIMAGE === 'display: block;'){
            event.preventDefault();
            event.stopPropagation();
        }

    });

    FILE.change(function(){
        mui.showLoading('正在加载..', 'div');

        var idFile = $(this).attr("id");
        var idArr = idFile.split('-');
        var ItemsNo = idArr[0];
        var ChildrenNo = idArr[1];
        var sort = idArr[2];

        var CRFRelID = '';
        if(idArr[3] === undefined || idArr[3] === null || idArr[3] === ''){
            CRFRelID = '';
        }else{
            CRFRelID = idArr[3];
        }

        var ITEM = '';
        if(CRFRelID === ''){
            ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort);
        }else{
            ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
        }

        ITEM.addClass('loading');

        var file = document.getElementById(idFile);

        //获取的图片文件
        var fileList = file.files;

        //最多同时只能上传一张
        if(fileList.length > 1){
            mui.toast('每次只能上传一张');
            mui.hideLoading();
            ITEM.removeClass('loading');
            return false;
        }

        fileList = validateUp(fileList);

        //未通过图片判断停止继续
        if(fileList.length === 0){
            mui.hideLoading();
            ITEM.removeClass('loading');
            return false;
        }

        var date = new Date().getTime();

        // 压缩图片需要的一些元素和对象
        var reader = new FileReader();
        var img = new Image();

        // 缩放图片需要的canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        //图片类型,其实用不到
        var fileType = fileList[0].type;

        //图片大小
        var fileSize = fileList[0].size;

        reader.readAsDataURL(fileList[0]);

        reader.onload = function(e) {
            //e.target.result就是图片的base64地址信息
            img.src = e.target.result;
        };

        img.onload = function() {
            EXIF.getData(img, function() {
                var Orientation = EXIF.getTag(this, 'Orientation');
                console.log('方向:' + Orientation);
                console.log('大小:' + fileSize/(1024*1024));

                if(fileSize < 1024*1024){
                    submitImgTwoTable(idFile, img.src, date, CRFRelID);

                }else{
                    var wph = (img.height*1)/(img.width*1);
                    var hpw = wph.toFixed(2)*1;
                    var square = 700;   //定义画布的大小，也就是图片压缩之后的像素
                    var imageWidth = 0;    //压缩图片的大小
                    var imageHeight = 0;
                    var offsetX = 0;
                    var offsetY = 0;
                    var hsquare = Math.ceil(square*hpw);
                    var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                    if(isiOS){
                        if(Orientation === 6){
                            canvas.width = hsquare;
                            canvas.height = square;
                            context.clearRect(0, 0, hsquare, square);
                        }else if(Orientation === 8){
                            canvas.width = hsquare;
                            canvas.height = square;
                        }else{
                            canvas.width = square;
                            canvas.height = hsquare;
                            context.clearRect(0, 0, square, hsquare);
                        }
                    }else{
                        canvas.width = square;
                        canvas.height = hsquare;
                        context.clearRect(0, 0, square, hsquare);
                    }

                    if(isiOS){
                        var degree;
                        switch(Orientation){
                            case 3:
                                degree = 180;
                                imageWidth = -square;
                                imageHeight = -hsquare;
                                break;
                            case 6:
                                degree = 90;
                                imageWidth = square;
                                imageHeight = -hsquare;
                                break;
                            case 8:
                                degree = 270;
                                imageWidth = -square;
                                imageHeight = hsquare;
                                break;
                            default:
                                degree = 0;
                                imageWidth = square;
                                imageHeight = hsquare;
                        }
                        context.rotate(degree * Math.PI / 180.0);
                    }else{
                        if (img.width > img.height) {
                            imageWidth = square;
                            imageHeight = hsquare;
                            offsetX = - Math.round((imageWidth - square) / 2);
                        } else {
                            imageHeight = hsquare;
                            imageWidth = square;
                            offsetY = - Math.round((imageHeight - hsquare) / 2);
                        }
                    }

                    context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);

                    var blob = canvas.toDataURL('image/jpeg', 1.0);
                    //var blob = canvas.toDataURL();

                    submitImgTwoTable(idFile, blob, date, CRFRelID);

                }

            });

        };

        function validateUp(files){
            //替换的文件数组
            var arrFiles = [];

            //不能上传文件名重复的文件
            for(var i = 0, file; file = files[i]; i++){

                //获取文件上传的后缀名
                var newStr = file.name.split("").reverse().join("");

                if(newStr.split(".")[0] != null){
                    var type = newStr.split(".")[0].split("").reverse().join("");

                    if(jQuery.inArray(type, defaults.fileType) > -1){
                        // 类型符合，可以上传
                        if (file.size >= defaults.fileSize) {
                            mui.toast('文件最大不超过5M');

                        } else {
                            // 在这里需要判断当前所有文件中
                            arrFiles.push(file);

                        }

                    }else{
                        mui.toast('上传类型不符合');
                    }

                }else{
                    mui.toast('没有类型,无法识别');

                }

            }

            return arrFiles;

        }

    });
}

/**
 * 点击就上传图片的接口
 * @param id
 * @param base64
 * @param date
 * @param CRFRelID 表格的行号
 */
function submitImgTwoTable(id, base64, date, CRFRelID) {
    var idArr = id.split('-');
    var ItemsNo = idArr[0];
    var ChildrenNo = idArr[1];
    var sort = idArr[2];
    var pid = '';
    var PID = '';
    var input = '';
    var del = '';
    var ITEM = '';
    if(CRFRelID === ''){
        pid = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
        PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo;
        input = ItemsNo + '-' + ChildrenNo + '-' + sort;
        del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort;
        ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort);
    }else{
        pid = 'form-img-up-img-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
        PID = 'form-img-up-' + ItemsNo + '-' + ChildrenNo + '-' + CRFRelID;
        input = ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
        del = 'form-img-up-del-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID;
        ITEM = $('#form-img-up-item-' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
    }

    var pContainer = $('#' + pid);
    var dataRes = getAttr(PID, 'Res');
    var dataResArr = dataRes.split('&');
    var dataValue = '';
    var dataValueArr = [];
    var blob = toBlobTable(base64);
    var fd = new FormData();

    fd.append('name', blob, date + '.jpg');

    $.ajax({
        async:false,
        method:'post',
        processData:false,
        contentType:false,
        // url: 'http://192.168.1.102:7800/rest/crf/41/files/64773/upload',
        url:$('#addaUrl').val() + '/rest/healthrecord/' + $('#accessKey').val() + '/' + $('#patientId').val() + '/' + $('#doctorId').val() + '/wx/upload/img',
        data:fd,
        success:function (Data) {
            mui.hideLoading();
            var message = Data.message;

            if(Data.result === 200){
                var data = Data.data[0];
                var path = data.path;

                pContainer.attr('src', path).css('display', 'block');
                if(CRFRelID === ''){
                    dataResArr.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + sort);
                }else{
                    dataResArr.push(path + '\1' + ItemsNo + '-' + ChildrenNo + '-' + sort + '-' + CRFRelID);
                }

                dataRes = dataResArr.join('&');
                setAttr(PID, 'Res', dataRes);

                var DataResArr = dataRes.split('&');
                for(var i=0;i<DataResArr.length;i++){
                    var arr = DataResArr[i];
                    var brr = arr.split('\1');
                    var PATH = brr[0];
                    dataValueArr.push(PATH);
                }

                dataValue = dataValueArr.join('&');
                setAttr(PID, 'Value', dataValue);

                $('#' + input).hide();
                $('#' + del).show();

            }else{
                mui.toast(message);
            }

            ITEM.removeClass('loading');

            //$scope.$applyAsync();

            //初始化图片插件
            //$scope.initImg();

        },
        error:function (err) {
            ITEM.removeClass('loading');
            mui.toast('图片上传异常');
            mui.hideLoading();
        }
    });
}

/**
 * base64转blob
 * @param urlData
 * @returns {Blob}
 */
function toBlobTable(urlData) {
    var bytes = window.atob(urlData.split(',')[1]);
    // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var  ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab],{type : 'image/jpeg'});
}

/**
 * 表格的删除
 * @param ItemsNo
 * @param childrenNo
 * @param index
 */
function delTableTable (ItemsNo, childrenNo, index) {
    //获取顶部菜单的高度
    var formTabContainerHeight = $('.form-tab-container').innerHeight();
    var formCopyContainer = $('.form-copy-container-' + ItemsNo + '-' + childrenNo);
    var length = formCopyContainer.length;
    var target = '';
    if(index === length){
        target = (length-1);
    }else{
        target = index;
    }

    $('#form-copy-div-' + ItemsNo + '-' + childrenNo + '-' + index)
        .fadeTo('fast', 0.01, function(){//fade
        $(this).slideUp('fast', function() {//slide up
            $(this).remove();//then remove from the DOM
            //行号的修正
            changeRowNumTable(ItemsNo, childrenNo);
            initIsDelTable(ItemsNo, childrenNo);

            $('html, body').animate({
                scrollTop: ($('#form-copy-div-' + ItemsNo + '-' + childrenNo + '-'  + target).offset().top) - formTabContainerHeight - 0.5
            }, 500);

            if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

            }else{
                //删除时对表格中的跨级计算进行判断
                var formItemId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
                var ITEMS = getAttr(formItemId, 'Items');
                var CHILDREN = getAttr(formItemId, 'Children');
                var SectionNo = getAttr(formItemId, 'SectionNo');
                ITEMS = JSON.parse(ITEMS);
                CHILDREN = JSON.parse(CHILDREN);
                var formCopyClass = 'form-copy-container-' + ItemsNo + '-' + childrenNo;
                var formCopyLength = $('.' + formCopyClass).length;//表格的个数

                if(ITEMS.UIType.Code === '10000876'){//集合
                    for(var b=0;b<ITEMS.Childs.length;b++){
                        var ItemChilds = ITEMS.Childs[b];
                        if(ItemChilds.UIType.Code === '10006719'){//数值框
                            if(ItemChilds.AutoCalc === undefined || ItemChilds.AutoCalc === '' || ItemChilds.AutoCalc === null){

                            }else{
                                var CalcDependItems = ItemChilds.AutoCalc.CalcDependItems[0];
                                if(CalcDependItems.CRFUIType === '10001132'){
                                    var TargetItemNo = ItemChilds.AutoCalc.ItemNo;
                                    var TargetItemArr = [];
                                    //跨级计算的模板id
                                    // TargetItemNo = +(children.TargetItemNo);
                                    var TargetChilds = ITEMS.Childs;
                                    var DefaultChilds = CHILDREN.DefaultChilds[0].Childs;
                                    for(var h=0;h<TargetChilds.length;h++){
                                        var TargetChildsItem = TargetChilds[h];
                                        if(TargetItemNo === TargetChildsItem.ItemNo){
                                            var TargetChildsItemItemNo = TargetChildsItem.ItemNo;
                                            var TargetChildsItemParentItemNo = TargetChildsItem.ParentItemNo;
                                            var TargetChildsItemAutoCalc = TargetChildsItem.AutoCalc;
                                            var TargetChildsItemAutoCalcID = TargetChildsItemAutoCalc.AutoCalcID;
                                            var TargetChildsItemCalcDependItems = TargetChildsItemAutoCalc.CalcDependItems[0];
                                            var TargetChildsItemVarName = TargetChildsItemCalcDependItems.VarName;
                                            TargetItemArr.push({
                                                TargetChildsItemItemNo:TargetChildsItemItemNo,
                                                TargetChildsItemParentItemNo:TargetChildsItemParentItemNo,
                                                TargetChildsItemAutoCalcID:TargetChildsItemAutoCalcID,
                                                //TargetChildsItemAutoCalc:TargetChildsItemAutoCalc,
                                                //TargetChildsItemCalcDependItems:TargetChildsItemCalcDependItems,
                                                TargetChildsItemVarName:TargetChildsItemVarName
                                            });
                                        }

                                    }

                                    var _TargetChildsItemVarName = TargetItemArr[0].TargetChildsItemVarName;
                                    _TargetChildsItemVarName = JSON.parse(_TargetChildsItemVarName);
                                    var TargetItem = [];
                                    for(var f=0;f<_TargetChildsItemVarName.length;f++){
                                        var idx = _TargetChildsItemVarName[f].idx;
                                        var varName = _TargetChildsItemVarName[f].varName;
                                        //循环孩子找出需要计算的孩子子
                                        for(var q=0;q<DefaultChilds.length;q++){
                                            if(q === +idx){
                                                DefaultChilds[q].varName = varName;
                                                TargetItem.push(DefaultChilds[q]);
                                            }
                                        }

                                    }

                                    var res = [];
                                    var CRFNo = $('#CRFNo').val();
                                    var PageNo = $('#PageNo').val();

                                    //为什么延迟?为了获取到数值输入框的值,待blur事件触发后才能获取到最新的值
                                    setTimeout(function () {
                                        for(var t=0;t<formCopyLength;t++){
                                            for(var i=0;i<TargetItem.length;i++){
                                                var arr = TargetItem[i];
                                                var DependItemNo = arr.ItemNo;
                                                var ParentItemNo = arr.ParentItemNo;
                                                var VarName = arr.varName;
                                                var CRFUIType = arr.UIType.Code;
                                                var value = '';
                                                var MapPath = '';
                                                var pid = '';

                                                switch (CRFUIType) {
                                                    //数值框
                                                    case '10006719':
                                                        pid = 'input-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //单选
                                                    case '10000003':
                                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //单选
                                                    case '10000005':
                                                        pid = 'picker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //多选
                                                    case '10000004':
                                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //多选
                                                    case '10001196':
                                                        pid = 'checkbox-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //时间
                                                    case '10000007':
                                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                    //日期
                                                    case '10000008':
                                                        pid = 'dtPicker-' + ParentItemNo + '-' + DependItemNo + '-' + (t+1);
                                                        value = getAttr(pid, 'Value');
                                                        MapPath = getAttr(pid, 'MapPath');
                                                        break;
                                                }

                                                if(value === '' || value === undefined || value === null){

                                                }else{
                                                    res.push({
                                                        DependItemNo:DependItemNo,
                                                        VarName:VarName,
                                                        MapPath:MapPath,
                                                        CRFNo:CRFNo,
                                                        PageNo:PageNo,
                                                        SectionNO:SectionNo,
                                                        Value:value,
                                                        CRFUIType:CRFUIType,
                                                        CRFRelID:(t+1)
                                                    });
                                                }

                                            }
                                        }

                                        console.log(res);

                                        /***************************************无输入或选中值时的判断-start******************************************/
                                        var resZero = [];
                                        for(var r=0;r<res.length;r++){
                                            var resItem = res[r];
                                            var resItemValue = resItem.Value;
                                            if(resItemValue === '' || resItemValue === null || resItemValue === undefined){
                                                resZero.push(r);
                                            }
                                        }

                                        console.log(resZero.length, res.length);

                                        if(resZero.length === res.length){
                                            setAttr('input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo, 'Value', '');
                                            $('#input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo).html('点击计算');
                                            //mui.toast('没有值进行计算');
                                            mui.hideLoading();
                                            return false;
                                        }
                                        /***************************************无输入或选中值时的判断-end******************************************/

                                        var AutoCalcModel = {
                                            AutoCalcID:TargetItemArr[0].TargetChildsItemAutoCalcID,
                                            CalcDependItems:res
                                        };

                                        console.log(res);

                                        $.ajax({
                                            async:true,
                                            method:'post',
                                            dataType:'json',
                                            //url:$('#addaUrl').val() + '/rest/autocalc/calc/wx/' + $('#accessKey').val(),
                                            url:'resources/json/shuizhen/https.apidevelop.mdruby.cn.rest.autocalc.calc.wx.42b891cd.json',
                                            data:AutoCalcModel,
                                            success:function (Data) {
                                                mui.hideLoading();

                                                var result = Data.result;

                                                if(result === 200){
                                                    var data = Data.data;
                                                    var DependItemNo = data.DependItemNo;
                                                    var MapPath = data.MapPath;
                                                    var Value = data.Value ? data.Value : '';
                                                    console.log(Value);

                                                    var id = 'input-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;
                                                    var getAutoCalcId = 'input-getAutoCalc-' + TargetItemArr[0].TargetChildsItemParentItemNo + '-' + TargetItemArr[0].TargetChildsItemItemNo;

                                                    setAttr(id, 'Value', Value);
                                                    //$('#' + id + ' input').val(Value);
                                                    if(Value === ''){
                                                        $('#' + getAutoCalcId).html('点击计算');
                                                    }else{
                                                        $('#' + getAutoCalcId).html(Value);
                                                    }

                                                }else{
                                                    mui.toast('自动计算异常');
                                                }

                                            },
                                            error:function (err) {
                                                //console.log(err);
                                                mui.toast('自动计算异常');
                                                mui.hideLoading();

                                            }
                                        });

                                    }, 500);
                                }

                            }
                        }
                    }
                }
            }

        });
    });

}

/**
 * 表格的添加
 * @param ItemsNo 大
 * @param childrenNo 小
 * @param index
 */
function addTableTable (ItemsNo, childrenNo, index) {
    var CRFNo = $('#CRFNo').val();
    var PageNo = $('#PageNo').val();
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子

    //行号的修正
    changeRowNumTable(ItemsNo, childrenNo);

    var formCopyContainer = $('.form-copy-container-' + ItemsNo + '-' + childrenNo);
    var NEWCRFRelID = (formCopyContainer.length) + 1;

    var header = '<div id="form-copy-div-' + ItemsNo + '-' + childrenNo + '-' + NEWCRFRelID + '" ' +
        ' class="form-copy-container-' + ItemsNo + '-' + childrenNo + '">';

    var button = '<div class="form-copy-button" ' +
        ' id="form-copy-button-' + ItemsNo + '-' + childrenNo + '-' + NEWCRFRelID + '">';

    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){
        button += '<div class="mui-btn form-table-button form-table-button-delete"' +
            ' data-ripple="ripple"' +
            " onclick='delTableTable(\"\", " + childrenNo + ", " + NEWCRFRelID + ");'>" +
            '</div>';

        button += '<div class="mui-btn form-table-button form-table-button-add"' +
            ' data-ripple="ripple"' +
            " onclick='addTableTable(\"\", " + childrenNo + ", " + NEWCRFRelID + ");'>" +
            '</div>' +

            '</div>';
    }else{
        button += '<div class="mui-btn form-table-button form-table-button-delete"' +
            ' data-ripple="ripple"' +
            ' onclick="delTableTable(' + ItemsNo + ', ' + childrenNo + ', ' + NEWCRFRelID + ');">' +
            '</div>';

        button += '<div class="mui-btn form-table-button form-table-button-add"' +
            ' data-ripple="ripple"' +
            ' onclick="addTableTable(' + ItemsNo + ', ' + childrenNo + ', ' + NEWCRFRelID + ');">' +
            '</div>' +

            '</div>';
    }

    var interval = '<div class="form-table-interval"></div>';
    var footer = '</div>';
    var main = '';

    for(var i=0;i<DefaultChilds.length;i++){
        var arr = DefaultChilds[i];
        var childrenItemNo  = arr.ItemNo;
        var ParentItemNo    = arr.ParentItemNo;
        var type            = arr.UIType.Code;
        var Concept         = arr.Concept;
        var DisplayName     = arr.DisplayName;
        var Unit            = arr.Unit;
        var danWei          = '';
        if(Unit !== undefined && Unit !== '' && Unit !== null){
            danWei          = Unit.DisplayName;
        }else{
            danWei          = '';
        }
        var IsDisplay       = arr.IsDisplay;
        var AutoCalc        = arr.AutoCalc;
        var CRFDataItemValue = arr.CRFDataItemValue ? arr.CRFDataItemValue : '';
        var CRFItemValue    = CRFDataItemValue.CRFItemValue ? CRFDataItemValue.CRFItemValue : '';
        var CRFItemOtherValue = CRFDataItemValue.CRFItemOtherValue ? CRFDataItemValue.CRFItemOtherValue : '';
        var CRFDisplayName  = CRFDataItemValue.DisplayName ? CRFDataItemValue.DisplayName : '';
        var ItemDisplay     = arr.ItemDisplay;
        var Valueset        = arr.Valueset ? arr.Valueset : '';
        var Concepts        = Valueset.Concepts ? Valueset.Concepts : '';
        var Logic           = arr.Logic ? arr.Logic : '';
        var NameVisible     = arr.NameVisible;
        var InfoButtonContent = arr.InfoButtonContent;
        var triggerId       = '';
        var dataMapPath     = '';
        if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){
            dataMapPath     = ParentItemNo + '_' + childrenItemNo
        }else{
            dataMapPath     = ItemsNo + '_' + ParentItemNo + '_' + childrenItemNo
        }

        switch (true) {
            //标签
            case type === '10000002':
                main += '<div id="label-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '" ' +
                    ' class="form-aggregate-label-div text-align-left"' +
                    ' style="padding: 5px !important;"' +
                    ' data-log="表格-新增标签"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    " data-Value='" + formLabelValue(ItemDisplay) + "' " +
                    ' data-SectionNo="' + SectionNo + '" ' +
                    ' data-OtherValue="" ' +
                    ' data-MapPath="' + dataMapPath + '" ' +
                    ' data-IsDisplay="' + IsDisplay + '" ' +
                    ' data-RowNum="' + NEWCRFRelID + '" ' +
                    ' data-Unit="">' +
                    '<p>' + formLabelFilter(arr) + '</p>' +
                    '</div>';
                break;
            //数字文本框
            case type === '10006719':
                main += '<div ' +
                    ' id="input-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '" ' +
                    ' class="mui-input-row form-height-auto form-result-input form-result form-input-div"' +
                    ' data-log="表格-新增数字文本框"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="">';

                if(AutoCalc === '' || AutoCalc === undefined || AutoCalc === null){
                    main += '<label ' +
                        ' onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );" class="form-label w35">';

                    if(NameVisible === true){
                        main += '<span>' + DisplayName + '</span>';
                    }else{
                        main += '<span>&nbsp;</span>';
                    }

                    main += '</label>';
                }else{
                    main += '<label ' +
                        ' class="form-label w35" ' +
                        ' onclick="getAutoCalcTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' \'' + CRFNo + '\', ' +
                        ' \'' + PageNo + '\' ' +
                        ');"' +
                        ' >';

                    if(NameVisible === true){
                        main += '<span>' + DisplayName + '</span><br>';
                        main += '<span class="f12 red" style="display: none;">[点击计算]</span>';
                    }else{
                        main += '<span>&nbsp;</span>';
                    }

                    main += '</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){
                    main += '<span class="form-annotation-no-span">&nbsp;</span>';
                }else{
                    main += '<span ' +
                        ' onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' );" class="form-annotation-span"></span>';
                }

                if(AutoCalc === '' || AutoCalc === undefined || AutoCalc === null){
                    main += '<input ' +
                        ' ' +
                        ' type="number"' +
                        ' placeholder="' + formPlaceHolderFilter(ItemDisplay) + '"' +
                        ' class="mui-input-clear"' +
                        ' value="' + CRFItemValue + '"' +
                        ' onblur="inputBlurTable(' +
                        ' this, ' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ');" />';

                }else{
                    main += '<div ' +
                        ' ' +
                        ' class="w60 form-getAutoCalc"' +
                        ' id="input-getAutoCalc-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                        ' onclick="getAutoCalcTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' \'' + CRFNo + '\', ' +
                        ' \'' + PageNo + '\' ' +
                        ');" >';

                    if(CRFItemValue === ''){
                        main += '<span>点击计算</span>';
                    }else{
                        main += '<span>' + CRFItemValue + '</span>';
                    }

                    main += '</div>';
                }

                if(danWei.length > 7){
                    main += '<div ' +
                        ' class="danWei f12"' +
                        ' onclick="showDanWeiTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' );" >' +
                        '<div>' + danWei.substring(0, 7) + '..</div>' +
                        '</div>';
                }else{
                    main += '<div ' +
                        ' class="danWei f12" ' +
                        ' onclick="showDanWeiTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' );" >' +
                        '<div>' + danWei + '</div>' +
                        '</div>';
                }

                main += '</div>';
                break;
            //单行文本框
            case type === '10000001':
                main += '<div ' +
                    ' id="input-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' class="mui-input-row form-height-auto form-result-input form-result form-input-div"' +
                    ' data-log="表格-单行文本框"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="" >';

                if(NameVisible === true){
                    main += '<label class="form-label w35">' + DisplayName + '</label>';
                }else{
                    main += '<label class="form-label w35">&nbsp;</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){
                    main += '<span class="form-annotation-no-span">&nbsp;</span>';
                }else{
                    main += '<span ' +
                        'onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\'' +
                        ' );" class="form-annotation-span"></span>';
                }

                main += '<input ' +
                    ' type="text"' +
                    ' placeholder="' + formPlaceHolderFilter(ItemDisplay) + '"' +
                    ' class="mui-input-clear"' +
                    ' style="padding-right: 5px;"' +
                    ' value="' + CRFItemValue + '"' +
                    ' onblur="inputBlurTable(' +
                    ' this, ' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\' ' +
                    ');" />' +

                    '</div>';
                break;
            //多行文本框
            case type === '10000009':
                main += '<div ' +
                    ' id="input-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' class="form-height-auto form-result-multiline form-result form-input-div"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit=""' +
                    ' data-log="表格-多行文本框">' +

                    '<div class="mui-input-row form-height-auto form-top-left-right-border border-bottom-none">';

                if(NameVisible === true){
                    main += '<label class="form-label padding-right-50"' +
                        ' style="width: 100%;">' +
                        '<span>' + DisplayName + '</span>' +
                        '</label>';
                }else{
                    main += '<label class="form-label"' +
                        ' style="width: 100%;">&nbsp;</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){

                }else{
                    main += '<div onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\', ' +
                        ' );" class="form-annotation"></div>';
                }

                main += '</div>';

                main += '<div ' +
                    ' class="form-multiline-div form-bottom-left-right-border form-result-picker-other"' +
                    ' id="other-multiline-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '">' +

                    '<textarea ' +
                    ' class="form-picker-other-textarea" ' +
                    ' onblur="multilinekBlurTable(' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\', ' +
                    ' );"' +
                    ' placeholder="' + formPlaceHolderFilter(ItemDisplay) + '"' +
                    ' id="input-multiline-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '">' + CRFItemValue + '</textarea>' +

                    '</div>' +

                    '</div>';
                break;
            //单选
            case type === '10000005' || type === '10000003':
                triggerId = ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID;

                main += '<div ' +
                    ' class="form-picker-div"' +
                    ' id="picker-div-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '">' +
                    '' +
                    '<div ' +
                    ' class="mui-input-row form-height-auto form-result"' +
                    ' id="picker-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="表格-新增的单选"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-Score=""' +
                    ' data-DisplayName="' + CRFDisplayName + '"' +
                    ' data-OtherValue="' + CRFItemOtherValue + '"' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="">';

                if(NameVisible === true){
                    main += '<label class="form-label w35 form-picker-label" ' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>' + DisplayName + '</span>' +
                        '</label>';
                }else{
                    main += '<label class="form-label w35 form-picker-label"' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>&nbsp;</span>' +
                        '</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){
                    main += '<span class="form-annotation-no-span">&nbsp;</span>';
                }else{
                    main += '<span ' +
                        'onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );" class="form-annotation-span"></span>';
                }

                main += '<div ' +
                    ' class="form-picker-container form-picker-container-' + NEWCRFRelID + '"' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-DisplayName="' + DisplayName + '"' +
                    ' data-layer="1"' +
                    " data-Valueset-Concepts=\'" + JSON.stringify(Concepts) + "\' " +
                    " data-Logic=\'" + Logic + "\' " +
                    ' onclick="showPickerTable(' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\' ' +
                    ' );" >';

                if(CRFItemValue === '' || CRFItemValue === undefined || CRFItemValue === null){
                    main += '<span class="form-picker-span">请选择</span>';
                }else{
                    main += '<span ' +
                        ' class="form-picker-span-res">' + CRFDisplayName + '</span>';
                }

                main += '</div>';

                main += '<a class="mui-navigate-right"></a>' +
                    '</div>';

                main += '<!--集合的内容-单选-其他输入框-start-->' +
                    '<div ' +
                    ' class="form-picker-other-div form-bottom-left-right-border form-result-picker-other"' +
                    ' id="other-picker-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="集合的表格-单选-其他输入框">' +
                    '<textarea ' +
                    ' class="form-picker-other-textarea"' +
                    ' onblur="pickBlurTable(' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\' ' +
                    ' );"' +
                    ' placeholder="请输入"' +
                    ' id="other-picker-input-' + ParentItemNo + '-' + childrenItemNo + '-'+ NEWCRFRelID + '">' + CRFItemOtherValue + '</textarea>' +
                    '</div>' +
                    '<!--集合的内容-单选-其他输入框-end-->' +
                    '' +
                    '</div>';

                //main + '</div>';
                break;
            //多选
            case type === '10000004' || type === '10001196':
                main += '<div ' +
                    ' class="form-checkbox-div form-checkbox-div-' + NEWCRFRelID + ' form-result"' +
                    ' id="checkbox-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="表格-新增的多选"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-Score=""' +
                    " data-Logic=\'" + JSON.stringify(Logic) + "\' " +
                    ' data-DisplayName="' + CRFDisplayName + '"' +
                    ' data-OtherValue="' + CRFItemOtherValue + '"' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="" >' +

                    '<div class="mui-input-row form-height-auto border-bottom-none padding-right-50">';

                if(NameVisible === true){
                    main += '<label class="form-label form-checkbox-label">' +
                        '<span>' + DisplayName + '</span>' +
                        '</label>';
                }else{
                    main += '<label class="form-label form-checkbox-label">&nbsp;</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){

                }else{
                    main += '<div onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );" class="form-annotation"></div>';

                }

                main += '</div>';

                for(var m=0;m<Concepts.length;m++){
                    var checkbox = Concepts[m];

                    main += '<div class="mui-input-row mui-checkbox form-height-auto">';

                    main += '<!--集合的表格的-多选-汉字展示-start-->' +
                        '<label ' +
                        ' id="checkbox-label-' + ParentItemNo + '-' + childrenItemNo + '-' + checkbox.Code + '-' + NEWCRFRelID + '"' +
                        ' >' + checkbox.DisplayName + '</label>' +
                        '<!--集合的表格的-多选-汉字展示-end-->' +

                        '<!--集合的表格的-多选-多选框-start-->' +
                        '<input ' +
                        ' id="checkbox-input-' + ParentItemNo + '-' + childrenItemNo + '-' + checkbox.Code + '-' + NEWCRFRelID + '"' +
                        ' value="' + checkbox.Code + '"' +
                        ' name="checkbox-name-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                        ' data-DisplayName="' + checkbox.DisplayName + '"' +
                        ' type="checkbox" ' +
                        ' onclick="getCheckboxTable(' +
                        ' \'' + checkbox.Code + '\', ' +
                        ' this, ' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );"' +
                        ' />' +
                        '<!--集合的表格的-多选-多选框-end-->';

                    if((checkbox.DisplayName).indexOf('其他') !== -1 || (checkbox.DisplayName).indexOf('其它') !== -1){
                        main += '<!--集合的表格-多选-其他输入框-start-->' +
                            '<div ' +
                            ' class="form-other-checkbox-div"' +
                            ' id="other-checkbox-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '" >' +

                            '<textarea ' +
                            ' class="form-checkbox-other-textarea" ' +
                            ' onblur="checkboxBlurTable(' +
                            ' \'' + ItemsNo + '\', ' +
                            ' \'' + ParentItemNo + '\', ' +
                            ' \'' + childrenItemNo + '\', ' +
                            ' \'' + NEWCRFRelID + '\' ' +
                            ' );"' +
                            ' placeholder="请输入"' +
                            ' id="other-checkbox-input-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '">' + CRFItemOtherValue + '</textarea>' +

                            '</div>' +
                            '<!--集合的表格-多选-其他输入框-end-->';
                    }else{

                    }

                    main += '</div>';

                }

                main += '</div>';
                break;
            //日期
            case type === '10000008':
                triggerId = ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID;

                main += '<div ' +
                    ' class="mui-input-row form-height-auto form-result form-time-div"' +
                    ' id="dtPicker-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="表格-新增的日期"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="">';

                if(NameVisible === true){
                    main += '<label class="form-label w35"' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>' + DisplayName + '</span>' +
                        '</label>';
                }else{
                    main += '<label class="form-label w35"' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>&nbsp;</span>' +
                        '</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){
                    main += '<span class="form-annotation-no-span">&nbsp;</span>';
                }else{
                    main += '<span onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );" class="form-annotation-span"></span>';
                }

                main += '<div ' +
                    ' class="form-dtPicker-container form-dtPicker-container-' + NEWCRFRelID + '"' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-type="date" ' +
                    ' onclick="showDtPickerTable(' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\' ' +
                    ')">';

                if(CRFItemValue === '' || CRFItemValue === undefined || CRFItemValue === null){
                    main += '<span class="form-picker-span">请选择</span>';
                }else{
                    main += '<span ' +
                        ' class="form-picker-span-res">' + CRFItemValue + '</span>';
                }

                main += '</div>';

                main += '<a class="mui-navigate-right"></a>';

                main += '</div>';
                break;
            //时间
            case type === '10000007':
                triggerId = ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID;

                main += '<div ' +
                    ' class="mui-input-row form-height-auto form-result form-time-div"' +
                    ' id="dtPicker-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="表格-新增的时间"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="">';

                if(NameVisible === true){
                    main += '<label class="form-label w35"' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>' + DisplayName + '</span>' +
                        '</label>';
                }else{
                    main += '<label class="form-label w35"' +
                        ' onclick="triggerTapTable(' +
                        ' \'' + triggerId + '\' ' +
                        ' );" >' +
                        '<span>&nbsp;</span>' +
                        '</label>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){
                    main += '<span class="form-annotation-no-span">&nbsp;</span>';
                }else{
                    main += '<span onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\' ' +
                        ' );" class="form-annotation-span"></span>';
                }

                main += '<div ' +
                    ' class="form-dtPicker-container form-dtPicker-container-' + NEWCRFRelID + '"' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-type="" ' +
                    ' onclick="showDtPickerTable(' +
                    ' \'' + ItemsNo + '\', ' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' \'' + NEWCRFRelID + '\' ' +
                    ')">';

                if(CRFItemValue === '' || CRFItemValue === undefined || CRFItemValue === null){
                    main += '<span class="form-picker-span">请选择</span>';
                }else{
                    main += '<span ' +
                        ' class="form-picker-span-res">' + CRFItemValue + '</span>';
                }

                main += '</div>';

                main += '<a class="mui-navigate-right"></a>';

                main += '</div>';
                break;
            //图片
            case type === '10000028':
                main += '<div ' +
                    ' class="form-img-up-containter form-img-up-containter-' + NEWCRFRelID + ' form-result form-img-up-div"' +
                    ' id="form-img-up-' + ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID + '"' +
                    ' data-log="表格-新增的文件上传-图片"' +
                    ' data-ItemNo="' + childrenItemNo + '"' +
                    ' data-Value="' + CRFItemValue + '"' +
                    ' data-SectionNo="' + SectionNo + '"' +
                    ' data-Res=""' +
                    ' data-OtherValue=""' +
                    ' data-MapPath="' + dataMapPath + '"' +
                    ' data-IsDisplay="' + IsDisplay + '"' +
                    ' data-RowNum="' + NEWCRFRelID + '"' +
                    ' data-Unit="">';

                main += '<div class="form-img-up-label form-top-left-right-border form-height-auto">';

                if(NameVisible === true){
                    main += '<div class="form-img-title form-height-auto">' + DisplayName + '</div>';
                }else{
                    main += '<div class="form-img-title form-height-auto">&nbsp;</div>';
                }

                if(InfoButtonContent === '' || InfoButtonContent === undefined || InfoButtonContent === null){

                }else{
                    main += '<div onclick="getAnnotationTable(' +
                        ' \'' + ItemsNo + '\', ' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + NEWCRFRelID + '\'' +
                        ' )"' +
                        ' style="line-height: 1;"' +
                        ' class="form-annotation-img"></div>';
                }

                main += '</div>';

                main += '<div class="form-img-up form-bottom-left-right-border">';

                for(var g=0;g<4;g++){
                    main += '<div ' +
                        ' class="form-img-up-item"' +
                        ' id="form-img-up-item-' + ParentItemNo + '-' + childrenItemNo + '-' + g + '-' + NEWCRFRelID + '">' +
                        '' +
                        '<img ' +
                        ' class="close-upimg"' +
                        ' id="form-img-up-del-' + ParentItemNo + '-' + childrenItemNo + '-' + g + '-' + NEWCRFRelID + '"' +
                        ' src="../form/resources/img/a7.png"' +
                        ' onclick="delImgTable(' +
                        ' \'' + ParentItemNo + '\', ' +
                        ' \'' + childrenItemNo + '\', ' +
                        ' \'' + g + '\', ' +
                        ' \'' + NEWCRFRelID + '\'' +
                        ' );" />' +
                        '' +
                        '<img ' +
                        ' id="form-img-up-img-' + ParentItemNo + '-' + childrenItemNo + '-' + g + '-' + NEWCRFRelID + '"' +
                        ' class="up-img"' +
                        ' src=""' +
                        ' data-preview-src=\'\'' +
                        ' data-preview-group="' + ParentItemNo + '-' + childrenItemNo + '-' + g + '-' + NEWCRFRelID + '"' +
                        ' style="width: 100%;height: 100%;" />' +
                        '' +
                        '<input ' +
                        ' type="file" name="file"' +
                        ' class="file file-' + NEWCRFRelID + '" value=""' +
                        ' id="' + ParentItemNo + '-' + childrenItemNo + '-' + g + '-' + NEWCRFRelID + '"' +
                        ' accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" />' +
                        '' +
                        '</div>';
                }

                /*main += '<!--图片组件写死为4个-start-->' +
                    '<div ' +
                    ' class="form-img-up-item"' +
                    ' id="form-img-up-item-' + ParentItemNo + '-' + childrenItemNo + '-0-' + NEWCRFRelID + '">' +
                    '' +
                    '<img ' +
                    ' class="close-upimg"' +
                    ' id="form-img-up-del-' + ParentItemNo + '-' + childrenItemNo + '-0-' + NEWCRFRelID + '"' +
                    ' src="../form/resources/img/a7.png"' +
                    ' onclick="delImgTable(' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' 0, ' +
                    ' \'' + NEWCRFRelID + '\'' +
                    ' );" />' +
                    '' +
                    '<img ' +
                    ' id="form-img-up-img-' + ParentItemNo + '-' + childrenItemNo + '-0-' + NEWCRFRelID + '"' +
                    ' class="up-img"' +
                    ' src=""' +
                    ' data-preview-src=\'\'' +
                    ' data-preview-group="' + ParentItemNo + '-' + childrenItemNo + '-0-' + NEWCRFRelID + '"' +
                    ' style="width: 100%;height: 100%;" />' +
                    '' +
                    '<input ' +
                    ' type="file" name="file"' +
                    ' class="file file-' + NEWCRFRelID + '" value=""' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-0-' + NEWCRFRelID + '"' +
                    ' accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" />' +
                    '</div>' +
                    '' +
                    '<div ' +
                    ' class="form-img-up-item"' +
                    ' id="form-img-up-item-' + ParentItemNo + '-' + childrenItemNo + '-1-' + NEWCRFRelID + '">' +
                    '' +
                    '<img ' +
                    ' class="close-upimg"' +
                    ' id="form-img-up-del-' + ParentItemNo + '-' + childrenItemNo + '-1-' + NEWCRFRelID + '"' +
                    ' src="../form/resources/img/a7.png"' +
                    ' onclick="delImgTable(' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' 1, ' +
                    ' \'' + NEWCRFRelID + '\'' +
                    ' );" />' +
                    '' +
                    '<img ' +
                    ' id="form-img-up-img-' + ParentItemNo + '-' + childrenItemNo + '-1-' + NEWCRFRelID + '"' +
                    ' class="up-img"' +
                    ' src=""' +
                    ' data-preview-src=\'\'' +
                    ' data-preview-group="' + ParentItemNo + '-' + childrenItemNo + '-1-' + NEWCRFRelID + '"' +
                    ' style="width: 100%;height: 100%;" />' +
                    '' +
                    '<input ' +
                    ' type="file" name="file"' +
                    ' class="file file-' + NEWCRFRelID + '" value=""' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-1-' + NEWCRFRelID + '"' +
                    ' accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" />' +
                    '</div>' +
                    '' +
                    '<div ' +
                    ' class="form-img-up-item"' +
                    ' id="form-img-up-item-' + ParentItemNo + '-' + childrenItemNo + '-2-' + NEWCRFRelID + '">' +
                    '' +
                    '<img ' +
                    ' class="close-upimg"' +
                    ' id="form-img-up-del-' + ParentItemNo + '-' + childrenItemNo + '-2-' + NEWCRFRelID + '"' +
                    ' src="../form/resources/img/a7.png"' +
                    ' onclick="delImgTable(' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' 2, ' +
                    ' \'' + NEWCRFRelID + '\'' +
                    ' );" />' +
                    '' +
                    '<img ' +
                    ' id="form-img-up-img-' + ParentItemNo + '-' + childrenItemNo + '-2-' + NEWCRFRelID + '"' +
                    ' class="up-img"' +
                    ' src=""' +
                    ' data-preview-src=\'\'' +
                    ' data-preview-group="' + ParentItemNo + '-' + childrenItemNo + '-2-' + NEWCRFRelID + '"' +
                    ' style="width: 100%;height: 100%;" />' +
                    '' +
                    '<input ' +
                    ' type="file" name="file"' +
                    ' class="file file-' + NEWCRFRelID + '" value=""' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-2-' + NEWCRFRelID + '"' +
                    ' accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" />' +
                    '</div>' +
                    '' +
                    '<div ' +
                    ' class="form-img-up-item"' +
                    ' id="form-img-up-item-' + ParentItemNo + '-' + childrenItemNo + '-3-' + NEWCRFRelID + '">' +
                    '' +
                    '<img ' +
                    ' class="close-upimg"' +
                    ' id="form-img-up-del-' + ParentItemNo + '-' + childrenItemNo + '-3-' + NEWCRFRelID + '"' +
                    ' src="../form/resources/img/a7.png"' +
                    ' onclick="delImgTable(' +
                    ' \'' + ParentItemNo + '\', ' +
                    ' \'' + childrenItemNo + '\', ' +
                    ' 3, ' +
                    ' \'' + NEWCRFRelID + '\'' +
                    ' );" />' +
                    '' +
                    '<img ' +
                    ' id="form-img-up-img-' + ParentItemNo + '-' + childrenItemNo + '-3-' + NEWCRFRelID + '"' +
                    ' class="up-img" src=""' +
                    ' data-preview-src=\'\'' +
                    ' data-preview-group="' + ParentItemNo + '-' + childrenItemNo + '-3-' + NEWCRFRelID + '"' +
                    ' style="width: 100%;height: 100%;" />' +
                    '' +
                    '<input ' +
                    ' type="file" name="file"' +
                    ' class="file file-' + NEWCRFRelID + '" value=""' +
                    ' id="' + ParentItemNo + '-' + childrenItemNo + '-3-' + NEWCRFRelID + '"' +
                    ' accept="image/jpg,image/jpeg,image/png,image/bmp" multiple="" />' +
                    '</div>' +
                    '<!--图片组件写死为4个-end-->';*/

                main += '</div>' +
                    '' +
                    '</div>';
                break;
        }
    }

    var res = header + main + button + interval + footer;

    $('#form-copy-div-' + ItemsNo + '-' + childrenNo + '-' + (NEWCRFRelID-1)).after(res);

    /****************滚动到指定位置-start******************/
    //获取顶部菜单的高度
    var formTabContainerHeight = $('.form-tab-container').innerHeight();

    //滚动到指定位置
    $('html, body').animate({
        scrollTop: ($('#form-copy-div-' + ItemsNo + '-' + childrenNo + '-'  + NEWCRFRelID).offset().top) - formTabContainerHeight - 0.5
    }, 500);
    /****************滚动到指定位置-start******************/

    //初始化手动增加的picker
    initAddPickerTable(NEWCRFRelID);

    //初始化手动增加的checkbox
    initAddCheckboxTable(NEWCRFRelID);

    //初始化手动增加的dtPicker
    initAddDtPickerTable(NEWCRFRelID);

    //初始化手动增加的img
    //$scope.initAddImg(NEWCRFRelID);

    //图片上传
    imgUpTable(NEWCRFRelID);

    initIsDelTable(ItemsNo, childrenNo);

}

/**
 * 行号的修正
 * @param ItemsNo
 * @param childrenNo
 */
function changeRowNumTable (ItemsNo, childrenNo) {
    var CRFNo = $('#CRFNo').val();
    var PageNo = $('#PageNo').val();
    var formTableId = 'form-aggregate-' + ItemsNo + '-' + childrenNo;
    var formTable = $('#' + formTableId);
    var Items = getAttr(formTableId, 'Items');
    var Children = getAttr(formTableId, 'Children');
    var SectionNo = getAttr(formTableId, 'SectionNo');
    if(ItemsNo === '' || ItemsNo === undefined || ItemsNo === null){

    }else{
        Items = JSON.parse(Items);
    }
    Children = JSON.parse(Children);

    var DefaultChilds = Children.DefaultChilds[0].Childs;//选择用来复制的孩子

    /*****************************行号的转换-start****************************/
    var formCopyContainer = $('.form-copy-container-' + ItemsNo + '-' + childrenNo);
    for(var w=0;w<formCopyContainer.length;w++){
        var formCopyContainerW = formCopyContainer[w];
        var formCopyContainerWId = formCopyContainerW.id;
        var CRFRelID = formCopyContainerWId.split('-')[5];

        if(+CRFRelID !== (w+1)){
            $('#form-copy-div-' + ItemsNo + '-' + childrenNo + '-' + CRFRelID)
                .attr('id', 'form-copy-div-' + ItemsNo + '-' + childrenNo + '-' + (w+1));
            var del = '<div ' +
                ' class="mui-btn form-table-button form-table-button-delete" ' +
                ' onclick="delTableTable(' +
                ' \'' + ItemsNo + '\', ' +
                ' \'' + childrenNo + '\', ' +
                ' \'' + (w+1) + '\' ' +
                ' )" ' +
                ' style="cursor: pointer; display: block;">' +
                '</div>';
            var add = '<div ' +
                ' class="mui-btn form-table-button form-table-button-add" ' +
                ' onclick="addTableTable(' +
                ' \'' + ItemsNo + '\', ' +
                ' \'' + childrenNo + '\', ' +
                ' \'' + (w+1) + '\' ' +
                ' )" ' +
                ' style="cursor: pointer;">' +
                '</div>';
            $('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-' + CRFRelID)
                .attr('id', 'form-copy-button-' + ItemsNo + '-' + childrenNo + '-' + (w+1))
                .html(del + add);
            // $('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-' + (w+1) + ' div.form-table-button-delete')
            //     .attr('onclick', 'delTableTable(' +
            //         ' \'' + ItemsNo + '\', ' +
            //         ' \'' + childrenNo + '\', ' +
            //         ' \'' + (w+1) + '\' ' +
            //         ')');
            // $('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-' + (w+1) + ' div.form-table-button-add')
            //     .attr('onclick', 'addTableTable(' +
            //         ' \'' + ItemsNo + '\', ' +
            //         ' \'' + childrenNo + '\', ' +
            //         ' \'' + (w+1) + '\' ' +
            //         ')');
            for(var x=0;x<DefaultChilds.length;x++){
                var xrr = DefaultChilds[x];
                var xchildrenItemNo = xrr.ItemNo;
                var xParentItemNo   = xrr.ParentItemNo;
                var xtype           = xrr.UIType.Code;
                var xValueset       = xrr.Valueset ? xrr.Valueset : '';
                var xConcepts       = xValueset.Concepts ? xValueset.Concepts : '';
                var xAutoCalc       = xrr.AutoCalc;
                var xInfoButtonContent = xrr.InfoButtonContent;
                var xUnit           = xrr.Unit;
                var xdanWei         = '';
                if(xUnit !== undefined && xUnit !== '' && xUnit !== null){
                    xdanWei         = xUnit.DisplayName;
                }else{
                    xdanWei         = '';
                }
                var xtriggerId      = '';
                var dataValue       = '';
                var dataDisplayname = '';
                var dataValuesetConcepts = '';
                var dataLogic       = '';
                switch (true) {
                    //标签
                    case xtype === '10000002':
                        $('#label-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'label-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('label-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));
                        break;
                    //数值框
                    case xtype === '10006719':
                        $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));
                        $('#input-getAutoCalc-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'input-getAutoCalc-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));

                        if(xAutoCalc === '' || xAutoCalc === undefined || xAutoCalc === null){
                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' label')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');

                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' input[type=number]')
                                .attr(
                                    'onblur',
                                    'inputBlurTable(' +
                                    ' this, ' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }else{
                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' label')
                                .attr(
                                    'onclick',
                                    'getAutoCalcTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\', ' +
                                    ' \'' + CRFNo + '\', ' +
                                    ' \'' + PageNo + '\' ' +
                                    ')');

                            $('#input-getAutoCalc-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                                .attr(
                                    'onclick',
                                    'getAutoCalcTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\', ' +
                                    ' \'' + CRFNo + '\', ' +
                                    ' \'' + PageNo + '\' ' +
                                    ')');

                        }

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' span.form-annotation-span')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' div.danWei')
                            .attr(
                                'onclick',
                                'showDanWeiTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ')');
                        break;
                    //单行文本
                    case xtype === '10000001':
                        $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' span.form-annotation-span')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' input[type=text]')
                            .attr(
                                'onblur',
                                'inputBlurTable(' +
                                ' this, ' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ')');
                        break;
                    //多行文本
                    case xtype === '10000009':
                        $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));
                        $('#other-multiline-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'other-multiline-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        $('#input-multiline-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'input-multiline-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' div.form-annotation')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        $('#input-multiline-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr(
                                'onblur',
                                'multilinekBlurTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ')');
                        break;
                    //单选
                    case xtype === '10000005' || xtype === '10000003':
                        xtriggerId = xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1);
                        $('#picker-div-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'picker-div-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        $('#picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));

                        dataValue = getAttr('picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'Value');
                        dataDisplayname = getAttr('picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'DisplayName');
                        dataValuesetConcepts = getAttr(xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID, 'Valueset-Concepts');
                        dataLogic = getAttr(xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID, 'Logic');
                        var picker = '';
                        var pickerRes = '';
                        if(dataDisplayname === '' || dataDisplayname === undefined || dataDisplayname === null){
                            pickerRes = '<span class="form-picker-span">请选择</span>';
                        }else{
                            pickerRes = '<span class="form-picker-span-res">' + dataDisplayname + '</span>';
                        }
                        picker = '<div class="form-picker-container form-picker-container-' + (w+1) + '" ' +
                            ' id="' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + '" ' +
                            ' data-displayname="' + dataDisplayname + '" ' +
                            ' data-layer="1" ' +
                            " data-valueset-concepts='" + dataValuesetConcepts + "' " +
                            " data-logic='" + dataLogic + "' " +
                            ' onclick="showPickerTable(' +
                            ' \'' + ItemsNo + '\', ' +
                            ' \'' + xParentItemNo + '\', ' +
                            ' \'' + xchildrenItemNo + '\', ' +
                            ' \'' + (w+1) + '\' ' +
                            ' );">' +
                            pickerRes +
                            '</div>';
                        $('#picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' a.mui-navigate-right').before(picker);
                        $('#' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID).remove();

                        /*$('#' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', '' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr('class', 'form-picker-container form-picker-container-' + (w+1))
                            .attr('onclick', 'showPickerTable(' +
                            ' \'' + ItemsNo + '\', ' +
                            ' \'' + xParentItemNo + '\', ' +
                            ' \'' + xchildrenItemNo + '\', ' +
                            ' \'' + (w+1) + '\' ' +
                            ')');*/
                        $('#other-picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'other-picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        $('#other-picker-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'other-picker-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        $('#long-picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'long-picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));

                        $('#picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' label')
                            .attr(
                                'onclick',
                                'triggerTapTable(' +
                                ' \'' + xtriggerId + '\' ' +
                                ')');

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#picker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' span.form-annotation-span')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        $('#other-picker-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr(
                                'onblur',
                                'pickBlurTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ')');
                        break;
                    //多选
                    case xtype === '10000004' || xtype === '10001196':
                        $('#checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr('class', 'form-checkbox-div form-checkbox-div-' + (w+1) + ' form-result');
                        setAttr('checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' div.form-annotation')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');

                        }

                        for(var y=0;y<xConcepts.length;y++){
                            var xcheckbox = xConcepts[y];
                            $('#checkbox-label-' + xParentItemNo + '-' + xchildrenItemNo + '-' + xcheckbox.Code + '-' + CRFRelID)
                                .attr('id', 'checkbox-label-' + xParentItemNo + '-' + xchildrenItemNo + '-' + xcheckbox.Code + '-' + (w+1));
                            $('#checkbox-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + xcheckbox.Code + '-' + CRFRelID)
                                .attr('id', 'checkbox-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + xcheckbox.Code + '-' + (w+1))
                                .attr('name', 'checkbox-name-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                                .attr('onclick', 'getCheckboxTable(' +
                                    ' \'' + xcheckbox.Code + '\', ' +
                                    ' this, ' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                            $('#other-checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                                .attr('id', 'other-checkbox-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                            $('#other-checkbox-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                                .attr('id', 'other-checkbox-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));

                            if((xcheckbox.DisplayName).indexOf('其他') !== -1 || (xcheckbox.DisplayName).indexOf('其它') !== -1){
                                $('#other-checkbox-input-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                                    .attr('onblur', 'checkboxBlurTable(' +
                                        ' \'' + ItemsNo + '\', ' +
                                        ' \'' + xParentItemNo + '\', ' +
                                        ' \'' + xchildrenItemNo + '\', ' +
                                        ' \'' + (w+1) + '\' ' +
                                        ')');

                            }else{

                            }
                        }
                        break;
                    //日期 || 时间
                    case xtype === '10000008' || xtype === '10000007':
                        xtriggerId = xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1);
                        $('#dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1));
                        setAttr('dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));
                        $('#' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID).remove();
                        /*$('#' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', '' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr('class', 'form-dtPicker-container form-dtPicker-container-' + (w+1))
                            .attr('onclick', 'showDtPickerTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ')');*/

                        $('#dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' label')
                            .attr(
                                'onclick',
                                'triggerTapTable(' +
                                ' \'' + xtriggerId + '\' ' +
                                ')');

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' span.form-annotation-span')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        dataValue = getAttr('dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'Value');
                        var dtPicker = '';
                        var dtPickerDataType = '';
                        if(dataValue === '' || dataValue === undefined || dataValue === null){
                            //日期
                            if(xtype === '10000008'){
                                dtPickerDataType = 'date';
                            }else{
                                dtPickerDataType = '';
                            }
                            dtPicker = '<div ' +
                                ' class="form-dtPicker-container form-dtPicker-container-' + (w+1) + '" ' +
                                ' id="' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + '" ' +
                                ' data-type="' + dtPickerDataType + '" ' +
                                ' onclick="showDtPickerTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ' );">' +
                                ' <span class="form-picker-span">请选择</span>' +
                                '</div>';
                        }else{
                            //日期
                            if(xtype === '10000008'){
                                dtPickerDataType = 'date';
                            }else{
                                dtPickerDataType = '';
                            }
                            dtPicker = '<div ' +
                                ' class="form-dtPicker-container form-dtPicker-container-' + (w+1) + '" ' +
                                ' id="' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + '" ' +
                                ' data-type="' + dtPickerDataType + '" ' +
                                ' onclick="showDtPickerTable(' +
                                ' \'' + ItemsNo + '\', ' +
                                ' \'' + xParentItemNo + '\', ' +
                                ' \'' + xchildrenItemNo + '\', ' +
                                ' \'' + (w+1) + '\' ' +
                                ' );">' +
                                ' <span class="form-picker-span-res">' + dataValue + '</span>' +
                                '</div>';
                        }

                        $('#dtPicker-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' a.mui-navigate-right').before(dtPicker);
                        break;
                    //图片上传
                    case xtype === '10000028':
                        $('#form-img-up-' + xParentItemNo + '-' + xchildrenItemNo + '-' + CRFRelID)
                            .attr('id', 'form-img-up-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1))
                            .attr('class', 'form-img-up-containter form-img-up-containter-' + (w+1) + ' form-result form-img-up-div');
                        setAttr('form-img-up-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1), 'RowNum', (w+1));

                        if(xInfoButtonContent === '' || xInfoButtonContent === undefined || xInfoButtonContent === null){

                        }else{
                            $('#form-img-up-' + xParentItemNo + '-' + xchildrenItemNo + '-' + (w+1) + ' div.form-annotation-img')
                                .attr(
                                    'onclick',
                                    'getAnnotationTable(' +
                                    ' \'' + ItemsNo + '\', ' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + (w+1) + '\' ' +
                                    ')');
                        }

                        for(var z=0;z<4;z++){
                            $('#form-img-up-item-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + CRFRelID)
                                .attr('id', 'form-img-up-item-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + (w+1));
                            $('#form-img-up-del-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + CRFRelID)
                                .attr('id', 'form-img-up-del-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + (w+1))
                                .attr('onclick', 'delImgTable(' +
                                    ' \'' + xParentItemNo + '\', ' +
                                    ' \'' + xchildrenItemNo + '\', ' +
                                    ' \'' + z + '\', ' +
                                    ' \'' + (w+1) + '\'' +
                                    ')');
                            $('#form-img-up-img-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + CRFRelID)
                                .attr('id', 'form-img-up-img-' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + (w+1));
                            $('#' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + CRFRelID)
                                .attr('id', '' + xParentItemNo + '-' + xchildrenItemNo + '-' + z + '-' + (w+1)).attr('class', 'file file-' + (w+1));
                        }
                        break;
                }
            }
        }

    }

    /*****************************行号的转换-end****************************/
}

/**
 * 计算母表格是否可删除
 * @param ItemsNo
 * @param childrenNo
 */
function initIsDelTable(ItemsNo, childrenNo) {
    var formCopyContainer = $('.form-copy-container-' + ItemsNo + '-' + childrenNo);
    var del = '<div ' +
        ' class="mui-btn form-table-button form-table-button-delete" ' +
        ' onclick="delTableTable(' +
        ' \'' + ItemsNo + '\', ' +
        ' \'' + childrenNo + '\', ' +
        ' 1 ' +
        ' )" ' +
        ' style="cursor: pointer; display: block;">' +
        '</div>';
    var add = '<div ' +
        ' class="mui-btn form-table-button form-table-button-add" ' +
        ' onclick="addTableTable(' +
        ' \'' + ItemsNo + '\', ' +
        ' \'' + childrenNo + '\', ' +
        ' 1 ' +
        ' )" ' +
        ' style="cursor: pointer;">' +
        '</div>';
    if(formCopyContainer.length === 1){
        //$('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-1 div.form-table-button-delete').hide();
        $('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-1').html(add);
    }else{
        //$('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-1 div.form-table-button-delete').show();
        $('#form-copy-button-' + ItemsNo + '-' + childrenNo + '-1').html(del + add);
    }
}

/**
 * 初始化手动增加的picker
 * @param NEWCRFRelID
 */
function initAddPickerTable (NEWCRFRelID) {
    setTimeout(function () {
        $(".form-picker-container-" + NEWCRFRelID).each(function(){
            var that = $(this);
            var id = that.attr('id');
            var pid = 'picker-' + id;
            var parent = $('#' + pid);
            var PARENT = $('#picker-div-' + id);
            var dataValue = getAttr(pid, 'Value');
            var dataDisplayName = getAttr(pid, 'DisplayName');
            var dataOtherValue = getAttr(pid, 'OtherValue');

            var valueLength = 0;
            if(dataDisplayName === '' || dataDisplayName === undefined || dataDisplayName === null){
                dataDisplayName = '';
            }else{
                valueLength = dataDisplayName.length;
            }

            var dataIsDisplay = getAttr(pid, 'IsDisplay');
            var dataRowNum = getAttr(pid, 'RowNum');

            if(dataIsDisplay === 'false'){
                PARENT.hide();
            }else{
                PARENT.show();
            }

            //没有其他，没有值
            if(valueLength === 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                //隐藏当前的其他输入框
                $('#other-picker-' + id).hide();

                //隐藏太长时的展示数据
                $('#long-picker-' + id).hide();

                $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                //没有其他，有值
            }else if(valueLength !== 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
                //隐藏当前的其他输入框
                $('#other-picker-' + id).hide();

                //隐藏太长时的展示数据
                $('#long-picker-' + id).hide();

                $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

                //有其他值
            }else if(dataOtherValue !== '' && (dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1) ){
                //展示当前的其他输入框
                $('#other-picker-' + id).show();

                //隐藏太长时的展示数据
                $('#long-picker-' + id).hide();

                $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

            }

            // //层级
            // var layer = that.attr('data-layer');
            // layer = parseInt(layer);
            //
            // //选项内容
            // var ValuesetConcepts = that.attr('data-Valueset-Concepts');
            //
            // ValuesetConcepts = JSON.parse(ValuesetConcepts);
            //
            // //逻辑跳转
            // var Logic = that.attr('data-Logic');
            // if(Logic !== '' && Logic !== undefined && Logic !== null){
            //     //Logic = JSON.parse(Logic);
            // }else{
            //     Logic = [];
            // }

            // var setData = [];
            var ScoreArr = [];

            // /**********************组织选择项-start**********************/
            // for(var i=0;i<ValuesetConcepts.length;i++){
            //     var arr = ValuesetConcepts[i];
            //     var Code = arr.Code;
            //     var DisplayName = (arr.DisplayName).replace(' ', '');//选项里还有空格，什么鬼
            //     var Score = arr.Score ? arr.Score : '';
            //
            //     setData.push({value:Code,text:DisplayName,Score:Score});
            //
            //     if(Code === dataValue){
            //         ScoreArr.push(Score);
            //     }
            // }
            //
            // //加个清空操作,md
            // setData.push({value:'empty',text:'清空',Score:''});
            // /**********************组织选择项-end**********************/

            var dataScore = '';
            if(ScoreArr.length > 0){
                dataScore = ScoreArr[0];
            }else{
                dataScore = '';
            }

            setAttr(pid, 'Score', dataScore);

            // that.on('tap', function() {
            //     var picker = new mui.PopPicker({layer:layer});
            //     picker.setData(setData);
            //     //$scope.beforeRemoveMuiPoppicker();
            //     picker.show(function(items) {
            //         console.log(items[0]);
            //         var res = items[0].text;
            //         var value = items[0].value;
            //         var score = items[0].Score ? items[0].Score : '';
            //
            //         var html = '';
            //
            //         if(res.substr(0, 2).indexOf('其它') !== -1 || res.substr(0, 2).indexOf('其他') !== -1 ){//为其他
            //             html = '<span class="form-picker-span-res">' + res + '</span>';
            //             $('#long-picker-' + id).hide();
            //             $('#other-picker-' + id).show();
            //             $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');
            //
            //             //$('#other-picker-' + id + ' textarea').focus();
            //
            //         }else if(res.substr(0, 2).indexOf('其它') === -1 && res.substr(0, 2).indexOf('其他') === -1 ){//不为其他
            //
            //             if(res === '清空' && value === 'empty'){
            //                 html = '<span class="form-picker-span">请选择</span>';
            //             }else{
            //                 html = '<span class="form-picker-span-res">' + res + '</span>';
            //             }
            //
            //             $('#long-picker-' + id).hide();
            //             $('#other-picker-' + id).hide();
            //             $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');
            //
            //             setAttr('picker-' + id, 'OtherValue', '');
            //             $('#other-picker-' + id + ' textarea').val('');
            //
            //         }
            //
            //         if(res === '清空' && value === 'empty'){
            //             setAttr('picker-' + id, 'Value', '');
            //             setAttr('picker-' + id, 'DisplayName', '');
            //             setAttr('picker-' + id, 'Score', '');
            //         }else{
            //             setAttr('picker-' + id, 'Value', value);
            //             setAttr('picker-' + id, 'DisplayName', res);
            //             setAttr('picker-' + id, 'Score', score);
            //         }
            //
            //         $('#' + id).html(html);
            //
            //         /**********************************逻辑跳转判断-start********************************/
            //         /**
            //          * 逻辑跳转的最多支持3层
            //          */
            //
            //         var LogicArr = [];//需要显示的数组
            //         var LogicBrr = [];//需要隐藏的数组
            //         var LogicCrr = [];//必须隐藏的数据
            //         for(var i=0;i<Logic.length;i++){
            //             var arr = Logic[i];
            //             var TriggerVal = arr.TriggerVal;    //触发值
            //             var TargetItemNo = arr.TargetItemNo;//目标id
            //             var parentNo = (id.split('-'))[0];
            //
            //             if(TriggerVal === value){
            //                 LogicArr.push(TargetItemNo);
            //             }else{
            //                 LogicBrr.push(TargetItemNo);
            //             }
            //
            //         }
            //
            //         LogicArr = uniqArrTable(LogicArr);
            //         LogicBrr = uniqArrTable(LogicBrr);
            //         LogicCrr = compareArrTable(LogicBrr, LogicArr);//绝对隐藏的数组
            //
            //         for(var j=0;j<LogicArr.length;j++){
            //             var brr = LogicArr[j];
            //             displayHideTable(parentNo, brr, 'show', dataRowNum);
            //         }
            //
            //         for(var k=0;k<LogicCrr.length;k++){
            //             var crr = LogicCrr[k];
            //             displayHideTable(parentNo, crr, 'hide', dataRowNum);
            //         }
            //
            //         var idArr = id.split('-');
            //         var ITEMNO = idArr[0];
            //         console.log(ITEMNO);//父级ID
            //         console.log(LogicArr);//需要显示的数组
            //         console.log(LogicBrr);//需要隐藏的数组
            //         console.log(LogicCrr);//必须要隐藏的数据
            //
            //         //对下下级的Logic判断
            //         if(LogicBrr.length > 0){
            //             for(var m=0;m<LogicBrr.length;m++){
            //                 var drr = LogicBrr[m];
            //                 var LOGIC = getAttr(ITEMNO + '-' + drr, 'Logic');
            //
            //                 if(LOGIC === '' || LOGIC === undefined || LOGIC === null){
            //
            //                 }else{
            //                     LOGIC = JSON.parse(LOGIC);
            //                 }
            //
            //                 if(LOGIC === undefined || LOGIC === '' || LOGIC === null){
            //
            //                 }else{
            //                     for(var n=0;n<LOGIC.length;n++){
            //                         var itemLOGIC = LOGIC[n];
            //                         var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
            //                         displayHideTable(ITEMNO, itemLOGICTargetItemNo, 'hide', dataRowNum);
            //                     }
            //                 }
            //
            //                 /*******************对多选的logic的判断-start*******************/
            //                 var LOGIC2 = getAttr('checkbox-' + ITEMNO + '-' + drr, 'Logic');
            //
            //                 if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){
            //
            //                 }else{
            //                     LOGIC2 = JSON.parse(LOGIC2);
            //                 }
            //
            //                 if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){
            //
            //                 }else{
            //                     for(var p=0;p<LOGIC2.length;p++){
            //                         var itemLOGIC2 = LOGIC2[p];
            //                         var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
            //                         displayHideTable(ITEMNO, itemLOGICTargetItemNo2, 'hide', dataRowNum);
            //                     }
            //                 }
            //                 /*******************对多选的logic的判断-end*******************/
            //
            //             }
            //         }
            //
            //         /**********************************逻辑跳转判断-end**********************************/
            //
            //         //MUI大坑！去掉多余的
            //         removeMuiPoppickerTable();
            //
            //         picker.dispose();
            //
            //     });
            //
            // });

        });

    }, true);
}

/**
 * 初始化手动增加的checkbox
 * @param NEWCRFRelID
 */
function initAddCheckboxTable (NEWCRFRelID) {
    setTimeout(function () {
        $('.form-checkbox-div-' + NEWCRFRelID).each(function () {
            var that = $(this);
            var id = that.attr('id');
            var idArr = id.split('-');
            var ItemsNo = idArr[1];
            var childrenNo = idArr[2];
            var dataValue = getAttr(id, 'Value');
            var dataDisplayName = getAttr(id, 'DisplayName');
            var dataOtherValue = getAttr(id, 'OtherValue');
            var dataRowNum = getAttr(id, 'RowNum');

            /*对展示隐藏的判断-start*/
            var dataIsDisplay = getAttr(id, 'IsDisplay');

            if(dataIsDisplay === 'false'){
                that.hide();
            }else{
                that.show();
            }
            /*对展示隐藏的判断-end*/

            var arr = dataValue.split('&');

            for(var i=0;i<arr.length;i++){
                var Code = arr[i];
                if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                    $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code).prop('checked', true);
                    $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code).addClass('blue');
                }else{
                    $('#checkbox-input-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).prop('checked', true);
                    $('#checkbox-label-' + ItemsNo + '-' + childrenNo + '-' + Code + '-' + dataRowNum).addClass('blue');
                }

            }

            //对其他，其它的判断
            if(dataOtherValue !== '' || dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1){
                if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                    $('#other-checkbox-' + ItemsNo + '-' + childrenNo).show();
                }else{
                    $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).show();
                }

            }else{
                if(dataRowNum === '' || dataRowNum === undefined || dataRowNum === null){
                    $('#other-checkbox-' + ItemsNo + '-' + childrenNo).hide();
                }else{
                    $('#other-checkbox-' + ItemsNo + '-' + childrenNo + '-' + dataRowNum).hide();
                }
            }

        });
    }, true);
}

/**
 * 初始化手动增加的dtPicker
 * @param NEWCRFRelID
 */
function initAddDtPickerTable (NEWCRFRelID) {
    // var dtPickerBeginYear = 1898;
    // var dtPickerEndYear = 3000;

    setTimeout(function () {
        $(".form-dtPicker-container-" + NEWCRFRelID).each(function(){
            var that = $(this);
            var id = that.attr('id');
            /*var type = that.attr('data-type');
            var options = {
                type:type,
                beginYear:dtPickerBeginYear,
                endYear:dtPickerEndYear
            };*/

            /*对展示隐藏的判断-start*/
            var dataIsDisplay = getAttr('dtPicker-' + id, 'IsDisplay');
            if(dataIsDisplay === 'true'){
                $('#dtPicker-' + id).show();
            }else{
                $('#dtPicker-' + id).hide();
            }

            /*that.on('tap', function() {
                var picker = new mui.DtPicker(options);
                picker.show(function(items) {
                    console.log(items);
                    var html = '<span class="form-picker-span-res">' + items.value + '</span>';
                    setAttr('dtPicker-' + id, 'Value', items.value);
                    console.log(id);
                    $('#' + id).html(html);
                    //MUI大坑！去掉多余的
                    removeMuiPoppickerTable();
                    picker.dispose();

                });

            });*/

        });

    }, true);
}

/**
 * 选择插件
 * @param ItemsNo
 * @param ParentItemNo
 * @param childrenItemNo
 * @param NEWCRFRelID
 */
function showPickerTable (ItemsNo, ParentItemNo, childrenItemNo, NEWCRFRelID) {
    var id = ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID;
    var pid = 'picker-' + id;
    var parent = $('#' + pid);
    var PARENT = $('#picker-div-' + id);
    var dataValue = getAttr(pid, 'Value');
    var dataDisplayName = getAttr(pid, 'DisplayName');
    var dataOtherValue = getAttr(pid, 'OtherValue');

    var valueLength = 0;
    if(dataDisplayName === '' || dataDisplayName === undefined || dataDisplayName === null){
        dataDisplayName = '';
    }else{
        valueLength = dataDisplayName.length;
    }

    // var dataIsDisplay = getAttr(pid, 'IsDisplay');
    var dataRowNum = getAttr(pid, 'RowNum');

    // if(dataIsDisplay === 'false'){
    //     PARENT.hide();
    // }else{
    //     PARENT.show();
    // }

    // //没有其他，没有值
    // if(valueLength === 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
    //     //隐藏当前的其他输入框
    //     $('#other-picker-' + id).hide();
    //
    //     //隐藏太长时的展示数据
    //     $('#long-picker-' + id).hide();
    //
    //     $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');
    //
    //     //没有其他，有值
    // }else if(valueLength !== 0 && dataOtherValue === '' && dataDisplayName.indexOf('其它') === -1 && dataDisplayName.indexOf('其他') === -1){
    //     //隐藏当前的其他输入框
    //     $('#other-picker-' + id).hide();
    //
    //     //隐藏太长时的展示数据
    //     $('#long-picker-' + id).hide();
    //
    //     $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');
    //
    //     //有其他值
    // }else if(dataOtherValue !== '' && (dataDisplayName.indexOf('其它') !== -1 || dataDisplayName.indexOf('其他') !== -1) ){
    //     //展示当前的其他输入框
    //     $('#other-picker-' + id).show();
    //
    //     //隐藏太长时的展示数据
    //     $('#long-picker-' + id).hide();
    //
    //     $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');
    //
    // }

    //层级
    var layer = getAttr(id, 'Layer');
    layer = parseInt(layer);

    //选项内容
    var ValuesetConcepts = getAttr(id, 'Valueset-Concepts');

    ValuesetConcepts = JSON.parse(ValuesetConcepts);

    //逻辑跳转
    var Logic = getAttr(id, 'Logic');
    if(Logic !== '' && Logic !== undefined && Logic !== null){
        Logic = JSON.parse(Logic);
    }else{
        Logic = [];
    }

    var setData = [];
    var ScoreArr = [];

    /**********************组织选择项-start**********************/
    for(var i=0;i<ValuesetConcepts.length;i++){
        var arr = ValuesetConcepts[i];
        var Code = arr.Code;
        var DisplayName = (arr.DisplayName).replace(' ', '');//选项里还有空格，什么鬼
        var Score = arr.Score ? arr.Score : '';

        setData.push({value:Code,text:DisplayName,Score:Score});

        if(Code === dataValue){
            ScoreArr.push(Score);
        }
    }

    //加个清空操作,md
    setData.push({value:'empty',text:'清空',Score:''});
    /**********************组织选择项-end**********************/

    var dataScore = '';
    if(ScoreArr.length > 0){
        dataScore = ScoreArr[0];
    }else{
        dataScore = '';
    }

    setAttr(pid, 'Score', dataScore);

    var picker = new mui.PopPicker({layer:layer});
    picker.setData(setData);

    picker.show(function(items) {
        console.log(items[0]);
        var res = items[0].text;
        var value = items[0].value;
        var score = items[0].Score ? items[0].Score : '';

        var html = '';

        if(res.substr(0, 2).indexOf('其它') !== -1 || res.substr(0, 2).indexOf('其他') !== -1 ){//为其他
            html = '<span class="form-picker-span-res">' + res + '</span>';
            $('#long-picker-' + id).hide();
            $('#other-picker-' + id).show();
            $('#picker-' + id).addClass('form-top-left-right-border').addClass('border-bottom-none').removeClass('border-bottom-eeeeee');

            //$('#other-picker-' + id + ' textarea').focus();

        }else if(res.substr(0, 2).indexOf('其它') === -1 && res.substr(0, 2).indexOf('其他') === -1 ){//不为其他

            if(res === '清空' && value === 'empty'){
                html = '<span class="form-picker-span">请选择</span>';
            }else{
                html = '<span class="form-picker-span-res">' + res + '</span>';
            }

            $('#long-picker-' + id).hide();
            $('#other-picker-' + id).hide();
            $('#picker-' + id).removeClass('form-top-left-right-border').addClass('border-bottom-eeeeee').removeClass('border-bottom-none');

            setAttr('picker-' + id, 'OtherValue', '');
            $('#other-picker-' + id + ' textarea').val('');

        }

        if(res === '清空' && value === 'empty'){
            setAttr('picker-' + id, 'Value', '');
            setAttr('picker-' + id, 'DisplayName', '');
            setAttr('picker-' + id, 'Score', '');
        }else{
            setAttr('picker-' + id, 'Value', value);
            setAttr('picker-' + id, 'DisplayName', res);
            setAttr('picker-' + id, 'Score', score);
        }

        $('#' + id).html(html);

        /**********************************逻辑跳转判断-start********************************/
        /**
         * 逻辑跳转的最多支持3层
         */

        var LogicArr = [];//需要显示的数组
        var LogicBrr = [];//需要隐藏的数组
        var LogicCrr = [];//必须隐藏的数据
        for(var i=0;i<Logic.length;i++){
            var arr = Logic[i];
            var TriggerVal = arr.TriggerVal;    //触发值
            var TargetItemNo = arr.TargetItemNo;//目标id
            var parentNo = (id.split('-'))[0];

            if(TriggerVal === value){
                LogicArr.push(TargetItemNo);
            }else{
                LogicBrr.push(TargetItemNo);
            }

        }

        LogicArr = uniqArrTable(LogicArr);
        LogicBrr = uniqArrTable(LogicBrr);
        LogicCrr = compareArrTable(LogicBrr, LogicArr);//绝对隐藏的数组

        for(var j=0;j<LogicArr.length;j++){
            var brr = LogicArr[j];
            displayHideTable(parentNo, brr, 'show', dataRowNum);
        }

        for(var k=0;k<LogicCrr.length;k++){
            var crr = LogicCrr[k];
            displayHideTable(parentNo, crr, 'hide', dataRowNum);
        }

        var idArr = id.split('-');
        var ITEMNO = idArr[0];
        console.log(ITEMNO);//父级ID
        console.log(LogicArr);//需要显示的数组
        console.log(LogicBrr);//需要隐藏的数组
        console.log(LogicCrr);//必须要隐藏的数据

        //对下下级的Logic判断
        if(LogicCrr.length > 0){
            for(var m=0;m<LogicCrr.length;m++){
                var drr = LogicCrr[m];
                var LOGIC = getAttr(ITEMNO + '-' + drr + '-' + dataRowNum, 'Logic');

                if(LOGIC === '' || LOGIC === undefined || LOGIC === null){

                }else{
                    LOGIC = JSON.parse(LOGIC);
                }

                if(LOGIC === undefined || LOGIC === '' || LOGIC === null){

                }else{
                    for(var n=0;n<LOGIC.length;n++){
                        var itemLOGIC = LOGIC[n];
                        var itemLOGICTargetItemNo = itemLOGIC.TargetItemNo;
                        displayHideTable(ITEMNO, itemLOGICTargetItemNo, 'hide', dataRowNum);
                    }
                }

                /*******************对多选的logic的判断-start*******************/
                var LOGIC2 = getAttr('checkbox-' + ITEMNO + '-' + drr + '-' + dataRowNum, 'Logic');

                if(LOGIC2 === '' || LOGIC2 === undefined || LOGIC2 === null){

                }else{
                    LOGIC2 = JSON.parse(LOGIC2);
                }

                if(LOGIC2 === undefined || LOGIC2 === '' || LOGIC2 === null){

                }else{
                    for(var p=0;p<LOGIC2.length;p++){
                        var itemLOGIC2 = LOGIC2[p];
                        var itemLOGICTargetItemNo2 = itemLOGIC2.TargetItemNo;
                        displayHideTable(ITEMNO, itemLOGICTargetItemNo2, 'hide', dataRowNum);
                    }
                }
                /*******************对多选的logic的判断-end*******************/

            }
        }

        /**********************************逻辑跳转判断-end**********************************/

        //MUI大坑！去掉多余的
        removeMuiPoppickerTable();

        picker.dispose();

    });
}

/**
 * 时间插件
 * @param ItemsNo
 * @param ParentItemNo
 * @param childrenItemNo
 * @param NEWCRFRelID
 */
function showDtPickerTable(ItemsNo, ParentItemNo, childrenItemNo, NEWCRFRelID) {
    var id = ParentItemNo + '-' + childrenItemNo + '-' + NEWCRFRelID;
    var dtPickerBeginYear = 1898;
    var dtPickerEndYear = 3000;
    var type = getAttr(id, 'Type');
    var options = {
        type:type,
        beginYear:dtPickerBeginYear,
        endYear:dtPickerEndYear
    };

    var picker = new mui.DtPicker(options);
    picker.show(function(items) {
        console.log(items);
        var html = '<span class="form-picker-span-res">' + items.value + '</span>';
        setAttr('dtPicker-' + id, 'Value', items.value);
        $('#' + id).html(html);
        //MUI大坑！去掉多余的
        removeMuiPoppickerTable();
        picker.dispose();

    });
}

/**
 * MUI大坑！去掉多余的.mui-poppicker
 */
function removeMuiPoppickerTable () {
    var crr = $('.mui-poppicker');
    for(var j=0;j<crr.length;j++){
        var drr = crr[j];
        drr.remove();
    }

    var err = $('.mui-backdrop');
    for(var k=0;k<err.length;k++){
        var frr = err[k];
        frr.remove();
    }

}
/*******************************************************表格的逻辑-end***********************************************************/

function isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/WindowsWechat/i) == 'windowswechat') {
        return true;
    } else {
        return false;
    }
}