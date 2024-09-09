const E = {};

function Int(v) {
    this.special = v;
    return this;
}

Int = Object.assign(Int, {
    special: null,
    min: null,
    max: null,

    range: (min, max) => {
        Int.min = min;
        Int.max = max;
        return Int;
    }
});

function Str(v) {
    this.special = v;
    return this;
}

function Bool(v) {
    this.special = v;
    return this;
}

let Greedy = {};
Greedy[Int] = 3;

// function Union(...args) {
//     return args;
// }
// function Optional(type, v) {
//     return type;
// }
// function Literal(...v) {
//     return v;
// }
// function Annotated(type) {
//     return type;
// }
// function Greedy(type) {
//     return type;
// }

//////////////////////////
// E.meal = new Entity(
//     ['']
// )
//
// 급식 = chat`${E.date} 급식`
//     .execute(({ date }) => `${date}일 급식입니다. ㅐㅕ조랴ㅗㅈㄷㄹ`)
//     .cron('0 0 12 * * *', () => [new Date().getDate()])
//     .cron('0 30 18 * * *', () => [new Date().getDate()]);
//
// //////////////////////////
// 공지 = chat`${Literal('회장', '부회장')} 알림 ${Int(Greedy).range(39, 41)}`
//     .execute((role, grade) => `${role}님의 알림입니다. ${grade}학번`);

//////////////////////////
function chat2(...args) {}

chat2`${Str} 알림 ${Greedy[Int]}`;

chat2`공지 ${Str} ${Int} ${Bool}`;
chat2`${Union(Str, Int, Bool)} ㅁㄴㅇㄹ ${Union(Int, Str)}`;
chat2`ㅁㄴㅇㄹ ${Optional(Int, 99)}`;
shop = chat2`${Literal('buy', 'sell')} ${Int} ${Int}`.execute((literal, a, b) =>
    `${a}를 ${literal}하고 ${b}개를 가지고 있습니다.`
);
upper = chat2`${Annotated(Str, s => s.isUpperCase())}`;
slap = chat2`${Greedy(Int)}`;

E = {
    coffee_name: ['아메리카노', '라떼', '마끼아또']
};

$ = (entry) => {
    for (let key in E) {
        if (E[key].includes(entry)) {
            return { [key]: entry };
        }
    }
}

$ = Object.assign($, E);

chat`${$('라떼')} 마실래요?`;