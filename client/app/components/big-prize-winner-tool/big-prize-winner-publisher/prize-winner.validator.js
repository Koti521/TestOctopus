class PrizeWinnerValidator {
    static forInstance(winner) {
        function hasValue(value) {
            return value && value.length > 0;
        }

        return {
            allFieldsAreEmpty: () => {
                return !hasValue(winner.name) &&
                    !hasValue(winner.location) &&
                    !hasValue(winner.prizeDescription);
            },

            allFieldsAreFilled: () => {
                return hasValue(winner.name) &&
                    hasValue(winner.location) &&
                    hasValue(winner.prizeDescription);
            }
        };
    }
}

export default PrizeWinnerValidator;