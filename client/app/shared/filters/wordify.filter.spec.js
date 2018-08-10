import wordifyFilter from './wordify.filter';

describe('Wordify Filter', () => {
    let filter;

    beforeEach(() => {
        filter = wordifyFilter();
    });

    afterEach(() => {
        filter = null;
    });

    it('should be defined', () => {
        expect(filter).to.be.defined;
    });

    it('should use lower mode by default if mode is not specified', () => {
        let output = filter('TwoWords', 'lower');
        expect(output).to.equal('two words');
    });

    it('should decamelize words with lower case', () => {
        let output = filter('TwoWords', 'lower');
        expect(output).to.equal('two words');
    });

    it('should decamelize words with upper case', () => {
        let output = filter('TwoWords', 'upper');
        expect(output).to.equal('Two Words');
    });

    it('should decamelize words with first upper case', () => {
        let output = filter('TwoWords', 'firstUpper');
        expect(output).to.equal('Two words');
    });
});