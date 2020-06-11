import { AminoAcidMasses } from './MassData';
import { expDependencies } from 'mathjs';

test('increment Mass', () => {
    const masses = AminoAcidMasses();
    expect(masses['A'].toNumber()).toBeCloseTo(71.03711381);
    expect(masses['C'].toNumber()).toBeCloseTo(103.0091845);
    expect(masses['D'].toNumber()).toBeCloseTo(115.0269431);
    expect(masses['E'].toNumber()).toBeCloseTo(129.0425931);
    expect(masses['F'].toNumber()).toBeCloseTo(147.0684139);
    expect(masses['G'].toNumber()).toBeCloseTo(57.02146374);
    expect(masses['H'].toNumber()).toBeCloseTo(137.0589119);
    expect(masses['I'].toNumber()).toBeCloseTo(113.084064);
    expect(masses['K'].toNumber()).toBeCloseTo(128.0949631);
    expect(masses['L'].toNumber()).toBeCloseTo(113.084064);
    expect(masses['M'].toNumber()).toBeCloseTo(131.0404847);
    expect(masses['N'].toNumber()).toBeCloseTo(114.0429275);
    expect(masses['P'].toNumber()).toBeCloseTo(97.05276388);
    expect(masses['Q'].toNumber()).toBeCloseTo(128.0585775);
    expect(masses['R'].toNumber()).toBeCloseTo(156.1011111);
    expect(masses['S'].toNumber()).toBeCloseTo(87.03202844);
    expect(masses['T'].toNumber()).toBeCloseTo(101.0476785);
    expect(masses['V'].toNumber()).toBeCloseTo(99.06841395);
    expect(masses['W'].toNumber()).toBeCloseTo(186.079313);
    expect(masses['Y'].toNumber()).toBeCloseTo(163.0633286);
});

