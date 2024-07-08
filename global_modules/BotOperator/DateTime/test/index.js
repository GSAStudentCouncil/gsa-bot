const { DateTime } = require('../index');

parse = string => {
	console.log(string[0]);
	const parsed = DateTime.parse(string[0]);
	console.log(parsed?.toString('YYYY-MM-DD t hh:mm:ss.sss WW'));
};

parseDuration = string => {
	console.log(string[0]);
	const parsed = DateTime.parseDuration(string[0]);
	console.log(`${parsed.from} ~ ${parsed.to}`);
}

// console.log(DateTime.now().gt({ year: 2024, month: 7, day: 7 }));

// parse`새벽 3시`    // ✅
// parse`오전 4시`    // ✅
// parse`오후 7:15`  // ✅
// parse`4시`   // ✅
// parse`11시`  // ✅
// parse`3월 4일`    // ✅
// parse`3월 4일 7시`   // ✅
// parse`3월 4일 7시 15분`   // ✅
// parse`3월 4일 오전 7시 15분 30초`   // ✅
// parse`3월 9일 오전 7시 3초`   // ✅
// parse`18시 34초`   // ✅

// parse`다음 날` // ✅
// parse`담날`   // ✅
// parse`다음 주` // ✅
// parse`담주` // ✅
// parse`저번 주` // ✅
// parse`저번주`  // ✅
// parse`지난주`  // ✅
// parse`지난 주 금요일` // ✅
// parse`지난주 수요일`  // ✅
// parse`1주 후` // ✅
// parse`3주 후` // ✅
// parse`다음 달` // ✅
// parse`1달 후` // ✅
// parse`다음 해` // ✅
// parse`1년 후` // ✅
// parse`다음 주 일요일` // ✅, 주일을 일월화수목금토 가 아니라 월화수목금토일 로 해서 '다음 주 일요일'을 보다 평상시 표현으로 사용할 수 있게 함.
// parse`저번 주 일요일`;  // ✅
// parse`다음 주 월요일`;
// parse`다다음 주`    // ✅
// parse`다다음 주 일요일`    // ✅
// parse`일요일`  // ✅
// parse`토요일`    // ✅
// parse`이번 주 일요일` // ✅
// parse`저저저번주일요일` // ✅
// parse`이번 해` // ✅
// parse`이번 주` // ✅
// parse`이번 달` // ✅
// parse`이번 주 일요일` // ✅

// parse`오늘`   // ✅
// parse`어제`   // ✅
// parse`내일`   // ✅
// parse`낼`   // ✅
// parse`모레`   // ✅
// parse`글피`    // ✅
// parse`그글피`   // ✅
// parse`그그글피`  // ✅
// parse`그제`   // ✅
// parse`그저께`  // ✅
// parse`그끄저께` // ✅
// parse`그그끄저께`    // ✅

// parse`3시간 후`    // ✅
// parse``   // ✅
// parse`5시간 13분 8초 후`    // ✅
// parse`4시간 3분 이전`    // ✅

// parse`아침`    // ✅
// parse`정오`    // ✅
// parse`점심`    // ✅
// parse`저녁`    // ✅
// parse`자정`    // ✅

// parse`7시`;   // ✅
// parse`8시`;   // ✅
// parse`9시`;   // ✅
// parse`12시`;  // ✅

// parseDuration`이번 주부터 다음 주`; // ✅
// parseDuration`오늘 3시부터 내일`    // ✅

// parse`3/4`;	// ✅
// parse`3-4`;	// ✅
// parse`2024/3/21`;	// ✅
// parse`2024.3.21`;	// ✅
// parse`2024-3-21`;	// ✅

// parseDuration`다음 주부터 다음 달까지`;	// ✅
// parseDuration`다음 주부터 2달 후 까지`;	// ✅
// parseDuration`금요일부터 다음 주 일요일까지`;	// ✅

// parseDuration`내일부터 어제까지`	// ✅
// parseDuration`3월 3일부터 다음 주 까지`	// ✅
// parse`이번주 일요일`	// ✅

// parse`이번주 일요일`	// ✅
// parse`이번주 일요일까지`	// ✅
// parseDuration`이번주 일요일까지`	// ✅
// parseDuration`오늘부터 이번주 일요일까지`	// ✅

// 기준 날짜에서 다시 parse
// datetime = DateTime.parse('이번주 일요일');
// console.log(datetime.toString());
// console.log(datetime.parse('3일 후').toString());	// 이번주 일요일에서 3일 후 ✅