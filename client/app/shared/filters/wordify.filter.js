import decamelize from 'decamelize';
import capitalize from 'capitalize';

/* 
    Wordify string 

    Supported mode: 
    1. firstUpper
    filter('twoWords', 'firtsUpper') => 'Two words'
    
    2. upper
    filter('twoWords', 'upper') => 'Two Words'
    
    3. lower (Default)
    filter('twoWords', 'lower') or filter('twoWords') => 'two words'
*/

let wordifyFilter = () => {
    const upperMode = 'upper';
    const firstUpperMode = 'firstUpper';

    return (input, mode) => {
        let output = decamelize(input, ' ');

        if (mode === upperMode) {
            output = capitalize.words(output);
        } else if (mode === firstUpperMode) {
            output = capitalize(output);
        }

        return output;
    }
}

export default wordifyFilter;