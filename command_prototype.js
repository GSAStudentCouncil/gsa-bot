const Entity = {};

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

class Str {}
class Bool {}

function Union(...args) {
    return args;
}

function Optional(type, v) {
    return type;
}

function Literal(...v) {
    return v;
}

function Annotated(type) {
    return type;
}

function Greedy(type) {
    return type;
}

//////////////////////////
급식 = chat`${Entity.date} 급식`
    .execute((date) => `${date}일 급식입니다. ㅐㅕ조랴ㅗㅈㄷㄹ`)
    .cron('0 0 12 * * *', () => [new Date().getDate()])
    .cron('0 30 18 * * *', () => [new Date().getDate()]);

//////////////////////////
공지 = chat`${Literal('회장', '부회장')} 알림 ${Int(Greedy).range(39, 41)}`
    .execute((role, grade) => `${role}님의 알림입니다. ${grade}학번`);

//////////////////////////


chat2`공지 ${Str} ${Int} ${Bool}`;
chat2`${Union(Str, Int, Bool)} ㅁㄴㅇㄹ ${Union(Int, Str)}`;
chat2`ㅁㄴㅇㄹ ${Optional(Int, 99)}`;
shop = chat2`${Literal('buy', 'sell')} ${Int} ${Int}`.execute((literal, a, b) =>
    `${a}를 ${literal}하고 ${b}개를 가지고 있습니다.`
);
upper = chat2`${Annotated(Str, s => s.isUpperCase())}`;
slap = chat2`${Greedy(Int)}`;