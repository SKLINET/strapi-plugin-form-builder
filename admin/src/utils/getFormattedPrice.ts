export const getFormattedPrice = (value: number): string => {
    // Round to 2 decimal places
    const roundedValue = Math.round(value * 100) / 100;
    value = roundedValue;

    const _value: string[] = [];

    let _i = 0;
    for (let i = value.toString().length; i > 0; i--) {
        _value.unshift(value.toString().charAt(i - 1));
        _i++;

        if (_i % 3 === 0 && i !== 1) {
            if (value.toString().charAt(i) === '.' || value.toString().charAt(i) === ',') {
                _i = 1;
                continue;
            }
            _value.unshift(' ');
        }
    }

    if (value.toString().includes('.')) {
        const decimals = value.toString().split('.')[1];
        if (decimals.length === 1) {
            _value.push('0');
        }
    }

    return _value.join('');
};
