// TODO: date 를 간편하게 조작하는 라이브러리 - essentialib 에서 가져오기

function Datetime(date) {
    this.date = date;
}

Datetime.prototype = {
    toString(locale) {
        locale ||= 'ko-KR';
        return 'temp';
    }
};

Datetime = Object.assign(Datetime, {
});

exports.Datetime = Datetime;