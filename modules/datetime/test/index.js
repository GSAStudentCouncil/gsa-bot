const { Datetime, Date, Time } = require('../index')

parse = string => {
	console.log(string[0], '\n', Datetime.parse(string[0]).toString('YYYY-MM-DD t hh:mm:ss WW'));
};

// parse`오후 7:15`
// parse`12월 12일의 다음날`  // ✅

// parse`십이월 십이일`   // ✅
// parse`십이월 이십일`   // ✅

// parse`다음 주 토요일`
// parse`1백만 일 1백만 시간 1백만 분 1백만 초 이후`

// parse`오전 6시` // ✅
// parse`네시간 3분 이전`
// parse`오전 6시로부터 네시간 3분 이전`

// parse`2023년의 마지막으로부터 5년 2개월 전`
// parse`2023년의 마지막` // 2023-12-31 23:59:59

parse`다음 날` // ✅
parse`다음 다음 날`  // ✅
// parse`전전전날`

// parse`오늘`
// parse`아침`
// parse`정오`
// parse`낮`
// parse`저녁`
// parse`밤`
// parse`자정`

// parse`어제 아침`    // ✅