import ButtonFunction from '../../app/modules/ButtonFunction';

describe('ButtonFunction', () => {
  it('starts with default values', () => {
    const buttonFunction = new ButtonFunction();
    const expectedValues = {
      disabled: true,
      source: ''
    };
    expect(buttonFunction.disabled).toBe(expectedValues.disabled);
    expect(buttonFunction.source).toBe(expectedValues.source);
  });

  it('sets values as expected', () => {
    const buttonFunction = new ButtonFunction();
    const testValues = {
      disabled: false,
      filepath: 'testString',
      func: jest.fn()
    };
    buttonFunction.set(testValues.func, testValues.filepath);
    expect(buttonFunction.disabled).toBe(testValues.disabled);
    expect(buttonFunction.source).toBe(testValues.filepath);

    buttonFunction.function();
    expect(testValues.func).toHaveBeenCalled();
  });
});
