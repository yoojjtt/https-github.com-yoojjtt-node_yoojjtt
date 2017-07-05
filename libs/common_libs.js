
var router_name = 'common_libs';

function common_libs(router, parent)
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);

    return self;

}

/**
 * router분기 필요시 확장
 */
common_libs.prototype.handleRoutes = function(router, parent)
{
    var parent = parent;
}



/**
 * 오늘날짜...
 * **/
common_libs.prototype.toDate = function() {

    var v = new Date();

    var year = v.getFullYear();
    var month = v.getMonth()+1;
    month = this.zero_plus(month);

    var day = v.getDate();
    day = this.zero_plus(day);

    var hh = v.getHours();
    hh = this.zero_plus(hh);

    var mm = v.getMinutes();
    var mm = this.zero_plus(mm);

    var ss = v.getSeconds();
    ss = this.zero_plus(ss);

    var result = String(year)+String(month)+String(day)+
        String(hh)+String(mm)+String(ss);

    return result;

}

/**
 * random_number
 */
common_libs.prototype.random_number = function (min, max) {
    return Math.floor(Math.random()*(max+1-min)+min);
}

/**
 * white space 추가
 */
common_libs.prototype.white_space_plus = function (str, num) {
    var val = str;
    for(var i=0; i<num; i++) {
        val = val+" ";
    }
    return val;
}

/**
 * 날짜값변경 예) "20161102101125" -> "2016년 11월 02일"
 */
common_libs.prototype.yyyymmddTohangul = function (val) {
    var result = val;

    if(val=='' || val==undefined) { return; }

    var yyyy = val.substr(0,4);
    var mm = val.substr(4,2);
    var dd = val.substr(6,2);

    return result;
}

/**
 * 바이트길이값 가져오기 (문자, 원하는 바이트 길이만끔 잘라서 받기)
 */
common_libs.prototype.getStringFromByteLength = function (val, byteLength) {
    var contents = val;
    var str_character;
    var int_char_count;
    var int_contents_length;

    var returnValue = "";

    int_char_count = 0;
    int_contents_length = contents.length;

    for (k = 0; k < int_contents_length; k++) {
        str_character = contents.charAt(k);
        if (escape(str_character).length > 4)
            int_char_count += 2;
        else
            int_char_count++;

        if ( int_char_count > byteLength ) {
            break;
        }
        returnValue += str_character;
    }
    return returnValue;
}

/**
 * 바이트길이값 가져오기 (문자, 총길이(바이트) 확인용)
 */
common_libs.prototype.getBytes = function (val) {
    var contents = val;
    var str_character;
    var int_char_count;
    var int_contents_length;

    int_char_count = 0;
    int_contents_length = contents.length;

    for (k = 0; k < int_contents_length; k++) {
        str_character = contents.charAt(k);
        if (escape(str_character).length > 4)
            int_char_count += 2;
        else
            int_char_count++;
    }
    return int_char_count;
}

/**
 * UNIX_time을 년월일 시분초로 변화해서 받기.
 */
common_libs.prototype.timeConverter = function (UNIX_timestamp) {
    var self = this;
    var a = new Date(UNIX_timestamp * 1000);
    //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = self.zero_plus(a.getMonth()+1);
    var date = self.zero_plus(a.getDate());
    var hour = self.zero_plus(a.getHours());
    var min = self.zero_plus(a.getMinutes());
    var sec = self.zero_plus(a.getSeconds());
    var time = year + '' + month + '' + date + '' + hour + '' + min + '' + sec ;

    return time;
}

common_libs.prototype.zero_plus = function (str) {
    var result;
    if(str.toString().length==1)
    {
        result = "0"+str;
    }
    else {
        result = str;
    }
    return result;
}

common_libs.prototype.sleep = function (num){	//[1/1000초]
    var now = new Date();
    var stop = now.getTime() + num;
    while(true){
        now = new Date();
        if(now.getTime() > stop)return;
    }
}

/**
 * string String::cutByte(int len)
 * 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
 * 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
 */
String.prototype.cutByte = function(len) {
    var str = this;
    var count = 0;

    for(var i = 0; i < str.length; i++) {
        if(escape(str.charAt(i)).length >= 4)
            count += 2;
        else
        if(escape(str.charAt(i)) != "%0D")
            count++;


        if(count >  len) {
            if(escape(str.charAt(i)) == "%0A")
                i--;
            break;
        }
    }
    return str.substring(0, i);
}

/**
 * byte로 길이자르기
 * s : 시작위치
 * e : 끝나는위치
 */
String.prototype.cutByte_start_end = function(s, e) {
    var str = this;
    var cut_str = "";
    for ( var i=s; i<e; i++) {
        cut_str += str.charAt(i);
    }

    return cut_str;
}

/**
 * bool String::byte(void)
 * 해당스트링의 바이트단위 길이를 리턴합니다. (기존의 length 속성은 2바이트 문자를 한글자로 간주합니다)
 */
String.prototype.byte = function() {
    var str = this;
    var length = 0;
    for(var i = 0; i < str.length; i++)
    {
        if(escape(str.charAt(i)).length >= 4)
            length += 2;
        else if(escape(str.charAt(i)) == "%A7")
            length += 2;
        else
        if(escape(str.charAt(i)) != "%0D")
            length++;
    }
    return length;
}

module.exports = common_libs;