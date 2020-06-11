import Mass from './Mass';

test('increment Mass', () => {
    const mass = new Mass('123', 1);
    mass.add('.123456789')
    expect(mass.toString()).toBe('123.123456789');
});

test('Mass and charge', () => {
    const mass = new Mass('123', 2);
    mass.add('.123456789')
    expect(mass.toString()).toBe('62.0653666278');
});
