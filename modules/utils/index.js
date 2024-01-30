function f(str) {
    let args = Array.from(arguments);
    args.shift();

    if (args.length === 0)
        return str;

    if (args.length === 1 && args[0].constructor.name === 'Object') {
        args = args[0];

        return str.split('{{}}')
            .map(e => e.replace(/{([_$a-zA-Z][_$\w]*)}/g, (_, group) => {
                return args[group];
            })).join('{}');
    } else {
        if (args[0].constructor.name === 'Array' && args.length === 1)
            args = args[0];

        let auto = false;
        let acc = 0;

        return str.split('{{}}')
            .map(e => e.replace(/{(\d*)}/g, (_, group) => {
                if (group === '') {
                    if (auto === false && acc !== 0)
                        throw new Error('cannot mix automatic and manual numbering');

                    auto = true;
                    return args[acc++];
                } else {
                    if (auto)
                        throw new Error('cannot mix automatic and manual numbering');

                    acc = parseInt(group);
                    if (acc >= args.length)
                        throw new RangeError('index (' + acc + ') out of range (0..' + (args.length - 1) + ')');
                    return args[acc];
                }
            })).join('{}');
    }
}

exports.f = f;