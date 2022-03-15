// ==UserScript==
// @name         GT Edition script for OCA - Integrated
// @namespace    http://tampermonkey.net/
// @version      3.0.11ANDNEWER
// @description  A custom script for OneConfig Advanced changing GUI and adding front-end based features.
// @author       WW TecHub, vojtech.kulhavy[at]hpe.com, jiri.zima[at]hpe.com
// @match        https://ngc-pro-oca-internal.houston.hp.com/oca/OCAInternalLogin
// @match        https://ngc-pro-ocac2-internal.houston.hp.com/ocacluster2/OCAInternalLogin
// @match        https://ngc-pro-oca-internal.bbn.hpecorp.net:1181/oca/OCAInternalLogin
// @match        https://h22246.www2.hpe.com/oca/OCAInternalLogin
// @match        https://h22246.www2.hpe.com/oca/OCAIntegrationLogin
// @match        https://ngc-pro-oca-internal.sgp.hpecorp.net:1181/oca/OCAInternalLogin
// @match        https://ngc-pro-oca-internal.in.hpecorp.net/oca/OCAInternalLogin
// @match        http*://*.houston.hp.com:50050/oca/OCAInternalLogin
// @match        https://ngc-itg-ocac2-internal.austin.hp.com/ocacluster2/OCAInternalLogin
// @match        https://ngc-itg-oca-internal.austin.hp.com/oca/OCAInternalLogin
// @match        https://h22246.www2.hpe.com/oca-cray/OCAInternalLogin

// ==/UserScript==

(function () {
    loading_init = function () {
        $("body").append('<div class="blockUI blockOverlay" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); cursor: wait; position: fixed;"></div><div class="GTblock" style="z-index: 1200; position: fixed; padding: 0px; margin: 0px; width: 280px; top: 40%; left: 40%; text-align: center; color: rgb(0, 0, 0);background-color:inherit!important; border: 1px solid rgb(0, 179, 136); cursor: wait; height: 100px;"><div class="maui-loading-div-dark" style="background-color: inherit!important; left: 30px; background: url(&quot;data:image/gif;base64,R0lGODlhIAAgAKIEAMu/Msu/M5macu3XAP///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzY3MEYxNUY1QzFGMTFFQjkzNERDQTI5ODkzNEY0NEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzY3MEYxNjA1QzFGMTFFQjkzNERDQTI5ODkzNEY0NEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcwRjE1RDVDMUYxMUVCOTM0RENBMjk4OTM0RjQ0QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcwRjE1RTVDMUYxMUVCOTM0RENBMjk4OTM0RjQ0QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUCAAQALAAAAAAgACAAAANlKLpM8zC6SJkVk8Ksx23dFj7fwmlnVWLjkEYrO75QTD+3t+a53fa7349ALBqPyGRxqCS2mM3nrOmUdqhVKwWbgyq1KCx4Kx5vymYX+sptI4WzNA6e5slddLNdvq/nx316f2CBGgkAIfkEBQIABAAsAAAAABUACgAAAx4IukzxMLIJXLy0XZyV3U/ngZBYkaH4gea6tWgAowkAIfkEBQIABAAsAAAAABUACgAAAx44ukzyMLI5XLy0XZyV3U/ngZBYkaH4gea6tagAowkAIfkEBQIABAAsCwAAABUACgAAAx4IukzxMLIJXLy0XZyV3U/ngZBYkaH4gea6tWgAowkAIfkEBQIABAAsCwAAABUACgAAAx44ukzyMLI5XLy0XZyV3U/ngZBYkaH4gea6tagAowkAIfkEBQIABAAsFgAAAAoAFQAAAxYIutz+MMpJayQ468C7/2AojmRpnmMCACH5BAUCAAQALBYAAAAKABUAAAMWOLrc/jDKSWskOGvBu/9gKI5kaZ5jAgAh+QQFAgAEACwWAAsACgAVAAADFgi63P4wyklrJDjrwLv/YCiOZGmeYwIAIfkEBQIABAAsFgALAAoAFQAAAxY4utz+MMpJayQ4a8G7/2AojmRpnmMCACH5BAUCAAQALAsAFgAVAAoAAAMeGLpM8DCyGVy8tF2cld1P54GQWJGh+IHmurUoAKMJACH5BAUCAAQALAsAFgAVAAoAAAMeKLpM8zCyKVy8tF2cld1P54GQWJGh+IHmurXoAKMJACH5BAUCAAQALAAAFgAVAAoAAAMeGLpM8DCyGVy8tF2cld1P54GQWJGh+IHmurUoAKMJACH5BAUCAAQALAAAFgAVAAoAAAMeKLpM8zCyKVy8tF2cld1P54GQWJGh+IHmurXoAKMJACH5BAUCAAQALAAACwAKABUAAAMWGLrc/jDKSWskOGvAu/9gKI5kaZ5jAgAh+QQFAgAEACwAAAsACgAVAAADFii63P4wyklrJDjrwbv/YCiOZGmeYwIAIfkEBQMABAAsAAAAAAoAFQAAAxYYutz+MMpJayQ4a8C7/2AojmRpnmMCADs=&quot;) 0% 0% / auto no-repeat scroll padding-box border-box;"> <label class="maui-loading-label" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 195px;">Initiating GT edition</label> </div></div>')
    }
    checkmaui=function () {
        if (maui.blockUI.isWaiting()==false && $(".logo").length>0) {
            loading_init()
            clearInterval(checkMA);
            serverTransaction({"method":"Run_Performance_TestingPage"},{"success":function () {getServerData({
                method: "executeScript",
                testScriptName: "GTedition"
            },function(a){eval(a.performanceTest.fileContent)})}})
            serverTransaction({"method":"Run_Performance_TestingPage"},{"success":function () {getServerData({
                method: "executeScript",
                testScriptName: "GTcomsols"
            },function(a){eval(a.performanceTest.fileContent)})}})
        }
    };
    window.addEventListener('load', function () {
        checkMA=setInterval(function(){checkmaui()},1000);
    })

})();
