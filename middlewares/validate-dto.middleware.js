const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');

const validateDto = (dto, target = 'body') => {
    return async (req, res, next) => {
        const source = req[target];
        if (!source) {
            return res.status(400).json({ error: `Invalid target: ${target}` });
        }

        const dtoInstance = plainToInstance(dto, source);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            const formattedErrors = errors.map(err => {
                const constErrors = [];
                if (err.constraints) {
                    for (const e in err.constraints) {
                        constErrors.push(err.constraints[e]);
                    }
                }
                return {
                    property: err.property,
                    error: constErrors,
                };
            });
            return res.status(400).json({ errors: formattedErrors });
        }

        const dtoFields = Object.keys(new dto());
        req[target] = dtoFields.reduce((filtered, key) => {
            if (source[key] !== undefined) {
                filtered[key] = source[key];
            }
            return filtered;
        }, {});

        next();
    };
};

module.exports = validateDto;
