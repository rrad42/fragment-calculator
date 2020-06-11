import MassMap from './MassMap'
import { AminoAcidMasses } from './MassData';

test('mass map get', () => {
    const masses = new MassMap(AminoAcidMasses());
    expect(masses.get('H').toNumber()).toBeCloseTo(137.0589119);
    expect(masses.get('Z').toNumber()).toBe(0);
});

test('mass map merge', () => {
    const masses = new MassMap(AminoAcidMasses());
    masses.merge([['H', 2.0]]);
    expect(masses.get('H').toNumber()).toBeCloseTo(139.0589119);
});
