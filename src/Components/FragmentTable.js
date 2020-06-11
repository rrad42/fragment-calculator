import React from 'react';
import FragmentCalculator from '../Mass/FragmentCalculator';

/**
 * Component that displays the table.
 *
 * @param {Object} props
 */
export default function FragmentTable(props) {
    let data = FragmentCalculator(
        props.sequence,
        props.charge,
        props.ionSeries,
        props.nTerm,
        props.cTerm,
        props.mods
    );

    return (
        <div>
            <h3>
                {props.charge}+ Fragment Ions ({props.ionSeries})
            </h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fragment</th>
                            <th>Ion</th>
                            <th>m/z</th>
                            <th>m/z</th>
                            <th>Ion</th>
                            <th className="text-right">Fragment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                <td className="text-left">{row[0]}</td>
                                <td style={{ color: 'blue' }}>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td style={{ color: 'orangered' }}>{row[4]}</td>
                                <td className="text-right">{row[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
