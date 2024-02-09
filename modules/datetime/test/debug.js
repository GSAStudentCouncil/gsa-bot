const cultureInfo = require('../globalization/ko-KR.json');
const keys = Object.keys(cultureInfo.translate);
keys.sort((a, b) => a.length !== b.length ? b.length - a.length : a.localeCompare(b));

get = dateString => {
    const RE_NUMBER = /^[+-]?\d+$/;

    // tokenize dateString
    // '2020년 3월 2일 12시 34분 56초' -> [2020, 'year', 3, 'month', 2, 'day', 12, 'hour', 34, 'minute', 56, 'second']
    let tokens = [];
    let startIdx = 0;
    let foundLast = false, foundNow = false;     // 현재, 이전에 찾았는지 여부

    while (startIdx < dateString.length) {
        foundLast = foundNow;
        foundNow = false;

        if (dateString[startIdx] === ' ') {
            if (foundLast === true) {
                if (tokens.length >= 1) {
                    tokens[tokens.length - 1] = tokens[tokens.length - 1].trim();
                    if (RE_NUMBER.test(tokens[tokens.length - 1]))   // 마지막 토큰이 숫자면 정수로 변환
                        tokens[tokens.length - 1] = parseInt(tokens[tokens.length - 1]);
                }

                tokens.push(dateString[startIdx++]);
            }
            else {
                if (tokens.length === 0)
                    tokens.push(dateString[startIdx++]);
                else
                    tokens[tokens.length - 1] += dateString[startIdx++];
            }

            continue;
        }

        for (let key of keys) {     // translate에 있는 key들을 하나하나 매칭해보면서 tokens에 추가
            if (dateString.startsWith(key, startIdx)) {
                let value = cultureInfo.translate[key];

                if (tokens.length - 1 >= 0 && typeof tokens[tokens.length - 1] === 'number' && typeof value === 'number')   // '열한번째': [10, 1, 'th'] -> [11, 'th']
                    tokens[tokens.length - 1] += value;
                else {
                    if (tokens.length >= 1) {
                        tokens[tokens.length - 1] = tokens[tokens.length - 1].trim();
                        if (RE_NUMBER.test(tokens[tokens.length - 1]))   // 마지막 토큰이 숫자면 정수로 변환
                            tokens[tokens.length - 1] = parseInt(tokens[tokens.length - 1]);
                    }

                    if (Array.isArray(value))   // value가 배열이면 펼쳐서 tokens에 추가 (ex. '매주': ['every', 'week'])
                        tokens.push(...value);
                    else
                        tokens.push(value);
                }

                foundNow = true;
                startIdx += key.length;

                break;
            }
        }

        if (foundLast === true && foundNow === false) {
            // if (tokens.length - 1 >= 0 && RE_NUMBER.test(tokens[tokens.length - 1]))   // 마지막 토큰이 숫자면 정수로 변환
            //     tokens[tokens.length - 1] = parseInt(tokens[tokens.length - 1]);

            if (tokens.length >= 1) {
                tokens[tokens.length - 1] = tokens[tokens.length - 1].trim();
                if (RE_NUMBER.test(tokens[tokens.length - 1]))   // 마지막 토큰이 숫자면 정수로 변환
                    tokens[tokens.length - 1] = parseInt(tokens[tokens.length - 1]);
            }

            tokens.push(dateString[startIdx++]);
        } else if (foundNow === false) {
            // 매칭되지 않은 문자열은 기존 문자열의 정보를 훼손시켜서는 안되므로 그대로 더해줌
            if (tokens.length === 0)
                tokens.push(dateString[startIdx++]);
            else
                tokens[tokens.length - 1] += dateString[startIdx++];
        }
    }

    return [dateString, tokens];
}

get2 = dateString => {
    const _get = dstr => {
        let startIdx = 0;
        let chucks = [];
        let found = false;
        let foundBefore = false;

        while (startIdx < dstr.length) {
            foundBefore = found;
            found = false;

            for (let key of keys) {
                if (dstr.startsWith(key, startIdx)) {
                    let value = cultureInfo.translate[key];

                    if (chucks.length > 0 && typeof chucks[chucks.length - 1] === 'number' && typeof value === 'number')
                        chucks[chucks.length - 1] += value;
                    else if (Array.isArray(value))
                        chucks.push(...value);
                    else
                        chucks.push(value);

                    startIdx += key.length;
                    found = true;

                    break;
                }
            }

            if (!found) {
                if (chucks.length === 0)
                    chucks.push('');

                if (foundBefore)
                    chucks.push(dstr[startIdx++]);
                else
                    chucks[chucks.length - 1] += dstr[startIdx++];
            }
        }

        return chucks;
    };

    return dateString.split(/( )/).map(e => e === ' ' ? e : _get(e)).flat();
}

console.log(get2('어제나 오늘이나 다음주수요일'));