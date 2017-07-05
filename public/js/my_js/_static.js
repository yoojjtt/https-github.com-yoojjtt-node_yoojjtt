//브라우져 체크
function chk_ie_verions()
{
    var _ua = navigator.userAgent;

    /* IE7,8,9,10,11 */
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var rv = -1;
        var trident = _ua.match(/Trident\/(\d.\d)/i);

        //ie11에서는 MSIE토큰이 제거되고 rv:11 토큰으로 수정됨 (Trident표기는 유지)
        if(trident != null && trident[1] == "7.0") return rv = "IE" + 11;
        if(trident != null && trident[1] == "6.0") return rv = "IE" + 10;
        if(trident != null && trident[1] == "5.0") return rv = "IE" + 9;
        if(trident != null && trident[1] == "4.0") return rv = "IE" + 8;
        if(trident == null) return rv = "IE" + 7;

        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
        return rv;
    }

    /* etc */
    var agt = _ua.toLowerCase();
    if (agt.indexOf("chrome") 		!= -1) return 'Chrome';
    if (agt.indexOf("opera") 		!= -1) return 'Opera';
    if (agt.indexOf("staroffice") 	!= -1) return 'Star Office';
    if (agt.indexOf("webtv") 		!= -1) return 'WebTV';
    if (agt.indexOf("beonex") 		!= -1) return 'Beonex';
    if (agt.indexOf("chimera") 		!= -1) return 'Chimera';
    if (agt.indexOf("netpositive") 	!= -1) return 'NetPositive';
    if (agt.indexOf("phoenix") 		!= -1) return 'Phoenix';
    if (agt.indexOf("firefox") 		!= -1) return 'Firefox';
    if (agt.indexOf("safari") 		!= -1) return 'Safari';
    if (agt.indexOf("skipstone") 	!= -1) return 'SkipStone';
    if (agt.indexOf("netscape") 	!= -1) return 'Netscape';
    if (agt.indexOf("mozilla/5.0") 	!= -1) return 'Mozilla';
}

//os체크
function getOSInfoStr()
{
    var ua = navigator.userAgent;

    if(ua.indexOf("NT 6.2") 		!= -1) return "Windows 8";
    else if(ua.indexOf("NT 6.1") 	!= -1) return "Windows 7";
    else if(ua.indexOf("NT 6.0") 	!= -1) return "Windows Vista/Server 2008";
    else if(ua.indexOf("NT 5.2") 	!= -1) return "Windows Server 2003";
    else if(ua.indexOf("NT 5.1") 	!= -1) return "Windows XP";
    else if(ua.indexOf("NT 5.0") 	!= -1) return "Windows 2000";
    else if(ua.indexOf("NT") 		!= -1) return "Windows NT";
    else if(ua.indexOf("9x 4.90") 	!= -1) return "Windows Me";
    //else if(ua.indexOf("98") 		!= -1) return "Windows 98";
    else if(ua.indexOf("Android") 	!= -1) return "Android";
    //else if(ua.indexOf("95") 		!= -1) return "Windows 95";
    else if(ua.indexOf("Win16") 	!= -1) return "Windows 3.x";
    else if(ua.indexOf("Windows") 	!= -1) return "Windows";
    else if(ua.indexOf("Linux") 	!= -1) return "Linux";
    else if(ua.indexOf("Macintosh") != -1) return "Macintosh";
    else if(ua.indexOf("iPad") 		!= -1) return "iPad";
    else return "";
}

//쿠키 생성 ------
function set_Cookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 확인 ------
function get_Cookie(cName)
{
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

function deleteCookie(cookieName)
{
    var expireDate = new Date();

    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate( expireDate.getDate() - 1 );
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function ajaxFileUpload(_attachType, _relativeKey, _thumb_width, _thumb_height, _returnFn)
{
    var select_file = $('#uploaded_file').val();
    var ext = $('#uploaded_file').val().split('.').pop().toLowerCase();

    if(select_file == '')
    {
        alert('업로드 할 파일을 선택해 주세요.');
        $('#uploaded_file').focus();
        return;
    }

    if($.inArray(ext, ['png','gif','jpg','jpeg']) == -1) {
        alert('업로드는 이미지파일(png,jpg,gif)만 가능합니다.');
        return;
    }

    $("#loading").ajaxStart(function(){
        $(this).show();
    }).ajaxComplete(function(){
        $(this).hide();
    });

    var ins_id = get_Cookie('ss_userId');
    var send_url = "/m/fileUpload/S";
    $.ajaxFileUpload({
        url:send_url,
        secureuri:false,
        fileElementId:'uploaded_file',
        dataType: 'jsonp',
        data:{
            ins_id:ins_id,
            attachType:_attachType,
            relativeKey:_relativeKey,
            thumb_height:_thumb_height,
            thumb_width:_thumb_width },

        success: function (data, status) {

            if(typeof(data.error_no) != 'undefined')
            {
                if(data.error_no != 0) {
                    alert(data.error_no);
                }else {
                    alert(data.msg);
                }
            }

            _returnFn(data);

        },
        error: function (data, status, e) {
            //alert(e);
        }

    });

    return false;

}

function random_number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

/** 매칭단어 변경 **/
function CStr_change(str, sName, tDay, tMoney) {

    if(str == undefined) { return; }

    //var pattern = /\{([a-zA-Z]+),[\W]*([^,]+),[\W]*([A-Z]+)\}/g;
    var pattern = /\{학원명\}|{원생\}|{납부일\}|{수강료\}/g;
    var return_val = "";

    var re_str = str.replace(pattern, function($0,$1,$2,$3) {

        //console.log('$0 : '+$0);

        switch ($0) {
            case '{원생}':
                return_val = sName;
                break;
            case '{납부일}':
                return_val = tDay; //"2017년04월17일";
                break;
            case '{수강료}':
                return_val = tMoney; //"350,000원";
                break;
            case '{학원명}':
                return_val = "["+get_Cookie("ss_userName")+"]";
                break;
        }

        return return_val;

    });

    return re_str;
}

/** object에서 같은 값비교후 그 index값 주기 **/
function search_metch_key_to_index($obj, $key)
{
    //console.log($obj);

    var return_val = '';
    var obj;
    for(var i=0; i<$obj.length; i++) {
        obj = $obj[i];
        if (obj.id == $key) {
            return_val = i;
        }
    }

    return return_val;
}

/** 숫자만 **/
function numkeyCheck(e) {
    var keyValue = event.keyCode;

    if( ((keyValue >= 48) && (keyValue <= 57)) ) {
        return true;
    }
    else {
        return false;
    }
}

/**-------------------- 유효성 관련 함수 --------------------**/
/** 입력값이 NULL인지 체크 **/
function C_isNull(asValue)
{
    if (asValue == null || asValue == undefined || asValue.toString().replace(/ /g,"") == "")
    {
        return true;
    }

    return false;
}

/** 숫자검증 **/
function C_isNum(asValue)
{
    if (C_isNull(asValue)) return false;

    for (var i = 0; i < asValue.length; i++)
    {
        if (asValue.charAt(i) < '0' || asValue.charAt(i) > '9')
        {
            return false;
        }
    }

    return true;
}

/** 숫자만 입력 **/
function onlyEditableNumber(obj){
    var str = obj.value;
    str = new String(str);
    var Re = /[^0-9]/g;
    str = str.replace(Re,'');
    obj.value = str;
}

/** 영문자검증 **/
function C_isAlpha(asValue)
{
    if (C_isNull(asValue)) return false;

    for (var i = 0; i < asValue.length; i++)
    {
        if (!((asValue.charAt(i) >='a' && asValue <= 'z') || (asValue.charAt(i) >= 'A' && asValue <= 'Z')))
        {
            return false;
        }
    }

    return true;
}

/** 한글검증 **/
function C_isHangul(asValue)
{
    if (C_isNull(asValue)) return false;

    for (var i = 0; i < asValue.length; i++)
    {
        var c = escape(asValue.charAt(i));
        if (c.indexOf("%u") != -1)
        {
            return true;
        }
    }
    return false;
}

/** 한글입 **/
function C_isNotHangul(asValue){

    if ((event.keyCode<48) || (event.keyCode>57)) {
        event.returnValue = false;
        return false;
    }else{
        return true;
    }

}

/**
 입력값이 사용자가 정의한 포맷 형식인지 체크
 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
 **/
function C_isValidFormat(asValue, asFormat)
{
    if (C_isNull(asValue)) return true;
    if (asValue.search(asFormat) != -1) return true; //올바른 포맷 형식

    return false;
}

/**
 * 입력값이 이메일 형식인지 체크
 * * ex) if (!C_isValidEmail(form.email.value)) {
 * * alert("올바른 이메일 주소가 아닙니다.");
 * * }
 **/
function C_isValidEmail(asValue)
{
    var strFormat = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return C_isValidFormat(asValue, strFormat);
}

/** 입력값이 전화번호 형식(숫자-숫자-숫자)인지 체크 **/
function C_isValidPhone(asValue) {
    var strFormat = /^(\d+)-(\d+)-(\d+)$/;
    return C_isValidFormat(asValue, strFormat);
}

/**-------------------- 문자열 관련 함수 --------------------**/
// 캐릭터 타입 검증 'H'-한글, 'E'-영문, 'N'-숫자, 'Z'-기타
function C_getCharType(asValue)
{
    var bolHan = false;
    var bolAlp = false;
    var bolNum = false;
    var bolEtc = false;

    var retStr = "";

    if (C_isNull(asValue))
    {
        return "";
    }

    for (var i = 0; i < asValue.length; i++)
    {
        if (C_isAlpha(asValue.charAt(i)))
        {
            bolAlp = true;
            retStr += "E";
        }
        else if (C_isNum(asValue.charAt(i)))
        {
            bolNum = true;
            retStr += "N";
        }
        else if (C_isHangul(asValue.charAt(i)))
        {
            bolHan = true;
            retStr += "H";
        }
        else
        {
            bolEtc = true;
            retStr += "Z";
        }
    }

    return retStr;
}

/*
 입력값에 특정 문자(chars)가 있는지 체크
 특정 문자를 허용하지 않으려 할 때 사용
 ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
 alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
 }
 */
function C_containsChars(asValue)
{
    var asChars = "!,*&^%$#@~;`-+:?/<>{}[]\\=";
    for (var i = 0; i < asValue.length; i++)
    {
        if (asChars.indexOf(asValue.charAt(i)) != -1)	return true;
    }

    return false;
}


/*
 특수문자및 숫자사용 체크
 */
function C_containsCharsNum(asValue)
{
    var asChars = "!,*&^%$#@~;`-+:?/<>{}[]\\=0123456789.";
    for (var i = 0; i < asValue.length; i++)
    {
        if (asChars.indexOf(asValue.charAt(i)) != -1)	return true;
    }

    return false;
}



/*
 한글만사용 체크
 */
function C_containsCharsNumKOR(asValue)
{
    var asChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!,*&^%$#@~;`-+:?/<>{}[]\\=.";
    for (var i = 0; i < asValue.length; i++)
    {
        if (asChars.indexOf(asValue.charAt(i)) != -1)	return true;
    }

    return false;
}



/*
 입력값이 특정 문자(chars)만으로 되어있는지 체크
 특정 문자만 허용하려 할 때 사용
 ex) if (!C_containsCharsOnly("M", "MW")) {
 alert("성별 필드에는 M,W 문자만 사용할 수 있습니다.");
 }
 */
function C_containsCharsOnly(asValue, asChars)
{
    for (var i = 0; i < asValue.length; i++)
    {
        if (asChars.indexOf(asValue.charAt(i)) == -1) return false;
    }

    return true;
}

/*
 입력값이 사용자가 정의한 포맷 형식인지 체크
 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
 */
function C_isValidFormat(asValue, asFormat)
{
    if (C_isNull(asValue)) return true;
    if (asValue.search(asFormat) != -1) return true; //올바른 포맷 형식

    return false;
}

/*
 입력값의 바이트 길이를 리턴
 ex) if (getByteLength(form.title) > 100) {
 alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");
 }
 */
function C_getByteLength(asValue)
{
    var byteLength = 0;
    var	lsEsc = "%B2%B3%B4%B7%A8%AD%B1%D7%F7%B0%A7%B8%A1%BF%A4%B6%AE%C6%D0%AA%3F%3F%D8%BA%DE%BD%BC%BE%E6%F0%F8%DF%FE%B9";

    for (var i = 0; i < asValue.length; i++)
    {
        var oneChar = escape(asValue.charAt(i));

        if (oneChar.length == 1 )
        {
            byteLength ++;
        }
        else if (oneChar.indexOf("%u") != -1)
        {
            byteLength += 2;
        }
        else if (oneChar.indexOf("%") != -1)
        {
            if(lsEsc.indexOf(oneChar) != -1)
            {
                byteLength += 2;
            }
            else
            {
                byteLength += oneChar.length / 3;
            }
        }
    }

    return byteLength;
}

// 문자열에 있는 특정문자패턴을 다른 문자패턴으로 바꾸는 함수.
function C_Replace(asTarget, asSearch, asReplace)
{
    var strTemp = "";

    for (var i = 0 ; i < asTarget.length ; i++)
    {
        if (asTarget.charAt(i) != asSearch)
        {
            strTemp = strTemp + asTarget.charAt(i);
        }
        else
        {
            strTemp = strTemp + asReplace;
        }
    }

    return strTemp;
}

// 문자열에서 좌우 공백제거
function C_Trim(asValue)
{
    var intStart = 0;
    var intEnd   = 0;

    for (var i = 0 ; i < asValue.length ; i++)
    {
        if (asValue.charAt(i) != " ")
        {
            intStart = i;
            break;
        }
    }

    for (var j = asValue.length - 1 ; j >= 0 ; j--)
    {
        if (asValue.charAt(j) != " ")
        {
            intEnd = j + 1;
            break;
        }
    }

    return asValue.substring(intStart, intEnd);
}

// 문자열을 숫자 포맷으로 변경한다.(abDot : true(소수점 포함), false(소수점 미포함))
function C_toNumberFormatString(asValue, abDot)
{
    if (C_isNull(asValue)) return "";

    //var intNumber = parseFloat(C_removeComma(asValue), 10);
    var intNumber = C_removeComma(asValue, abDot);
    var bolMinus = false;
    var bolDot = false;
    var dotPos;
    var dotU;
    var dotD;
    var commaFlag;
    var strOut = "";

    if (intNumber < 0)
    {
        intNumber *= -1;
        bolMinus = true;
    }

    if (intNumber.toString().indexOf(".") > -1)
    {
        if (abDot == false)
        {
            intNumber = intNumber.substring(0, intNumber.toString().indexOf("."));
        }
    }

    if (intNumber.toString().indexOf(".") > -1)
    {
        dotPos = intNumber.toString().split(".");
        //dotU = dotPos[0];
        dotU = Number(dotPos[0], 10).toString();
        dotD = dotPos[1];
        bolDot = true;
    }
    else
    {
        //dotU = intNumber.toString();
        dotU = Number(intNumber.toString(), 10).toString();
        dotD = "";
    }

    commaFlag = dotU.length % 3;

    if (commaFlag)
    {
        strOut = dotU.substring(0, commaFlag);
        if (dotU.length > 3) strOut += ",";
    }

    for (var i = commaFlag; i < dotU.length; i+=3)
    {
        strOut += dotU.substring(i, i + 3) ;
        if (i < dotU.length - 3) strOut += ",";
    }

    if (bolMinus) strOut = "-" + strOut;
    if (bolDot) strOut = strOut + "." + dotD;

    return strOut;
}

// 입력값에서 콤마 및 공백을 없앤다.(abDot : true(소수점 포함), false(소수점 미포함))
function C_removeComma(asValue, abDot)
{
    var intNumber = asValue.toString().replace(/,/g, "").replace(/ /g, "");

    if (intNumber.toString().indexOf(".") > -1)
    {
        if (abDot == false)
        {
            intNumber = intNumber.substring(0, intNumber.toString().indexOf("."));
        }
    }

    return intNumber;
}
//입력값에서 콤마 및 공백을 없애고 숫자형식 문자열을 되돌린다.
function	C_getNumberTypeString(asValue)
{
    var		lsRet = C_removeComma(asValue,false);
    if(C_isNull(lsRet))
    {
        return "0";
    }
    else
    {
        return lsRet;
    }
}
// Left 빈자리 만큼 strPadChar 을 붙인다.
function C_LPad(strValue, intLength, strPadChar)
{
    var strTemp = "";
    var intPadCnt = intLength - strValue.length;

    for (var i = 0; i < intPadCnt; i++) strTemp += strPadChar;

    return strTemp + strValue;
}

// Right 빈자리 만큼 strPadChar 을 붙인다.
function C_RPad(strValue, intLength, strPadChar)
{
    var strTemp = "";
    var intPadCnt = intLength - strValue.length;

    for (var i = 0; i < intPadCnt; i++) strTemp += strPadChar;

    return strValue + strTemp;
}

// 대문자변환
function C_toUpperCase(asValue)
{
    if(C_isNull(asValue)) return asValue;
    return asValue.toUpperCase();
}

// 소문자변환
function C_toLowerCase(asValue)
{
    if(C_isNull(asValue)) return asValue;
    return asValue.toLowerCase();
}

/*
 문자열을 입력한 포맷으로 변경한다.
 ex) alert(C_StringFM("123456789", "xxx-xxx-xxxx"));
 */
function C_StringFM(strValue, strFormat)
{
    var strData;
    var strPattern;
    var intLen;
    var intPos;

    intPos = -1;
    strPattern = /-/g;

    if (strValue == null || strValue.length < 1 || strFormat == null || strFormat.length < 1) return strValue;

    strData = strValue.replace(strPattern, "");

    intLen = strData.length;

    if (intLen != strFormat.replace(strPattern, "").length) return strValue;

    while (true)
    {
        intPos = strFormat.indexOf("-", intPos + 1);

        if (intPos < 1) break;

        strData = strData.substr(0, intPos) + "-" + strData.substr(intPos);
    }

    return strData;
}

// 한글변환시 bolTag에 true를 넘기고 서버 코딩에서 사용시 반드시 디코딩한다.
function C_Encode(strValue, bolTag)
{
    return bolTag == true ? escape(encodeURI(strValue)) : encodeURI(strValue) ;
}

// 한글이 인코딩된 경우 bolTag에 true를 넘긴다.
function C_Decode(strValue, bolTag)
{
    return bolTag == true ? decodeURI(unescape(strValue)) : decodeURI(strValue);
}


//영문,숫자만 입력 체크
function C_HangulChk(Ev)
{
    var ev_code = (window.netscape)? Ev.which: event.keyCode;
    if ( !(ev_code == 0 || ev_code == 8 || ev_code == 94 || ev_code == 95 || (ev_code > 47 && ev_code < 58) || (ev_code > 96 && ev_code < 123))) {
        alert("숫자, 영어, '_'만 가능");
        if(window.netscape){
            Ev.preventDefault();
        } else {
            event.returnValue = false;
        }
        return false;
    } else {
        return true;
    }
}