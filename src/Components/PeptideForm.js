import React, { useState } from 'react';

/**
 * Enum for ion series selection.
 */
export const IonSeries = {
    A_X: 'a-x',
    B_Y: 'b-y',
    C_Z: 'c-z',
};

/**
 * Inputs for first page load. Each item
 * is a field in the form.
 */
export const defaultInputs = {
    sequence: 'PEPTIDE',
    charge: 1,
    ionSeries: IonSeries.B_Y,
    nTerm: '',
    cTerm: '',
    mods: [
        ['^', '79.9663304104'],
        ['*', '15.9949146221'],
        ['C', '57.021464'],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
    ],
};

/**
 * Creates the fields for inputting peptide mods.
 * This is only part of the component created by PeptideForm
 *
 * @param {Object} inputs
 * @param {function} setInputs
 * @returns {Array}
 */
function makeModFields(inputs, setInputs) {
    const mods = inputs.mods;
    const modFields = [];
    for (let i = 0; i < inputs.mods.length; ++i) {
        let mod = mods[i];
        modFields.push(
            <div key={i} className="form-row">
                <div className="form-group col-3">
                    <input
                        type="text"
                        maxLength="1"
                        value={mod[0]}
                        className="form-control form-control-sm"
                        onChange={(e) => {
                            let nextInputs = { ...inputs };
                            nextInputs.mods[i][0] = e.target.value;
                            setInputs(nextInputs);
                        }}
                    />
                </div>
                <div className="form-group col-9">
                    <input
                        type="text"
                        value={mod[1]}
                        className="form-control form-control-sm"
                        onChange={(e) => {
                            let nextInputs = { ...inputs };
                            nextInputs.mods[i][1] = e.target.value;
                            setInputs(nextInputs);
                        }}
                    />
                </div>
            </div>
        );
    }
    return modFields;
}

/**
 * Component that displays the form.
 *
 * @param {Object} props
 */
export default function PeptideForm(props) {
    let [inputs, setInputs] = useState(defaultInputs);

    let handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Peptide:</label>
                <input
                    className="form-control"
                    value={inputs.sequence}
                    onChange={(e) =>
                        setInputs({ ...inputs, sequence: e.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Calculate</button>
            </div>
            <div className="form-group">
                <label>Ion Series</label>
                <select
                    className="form-control"
                    value={inputs.ionSeries}
                    onChange={(e) =>
                        setInputs({ ...inputs, ionSeries: e.target.value })
                    }
                >
                    {Object.values(IonSeries).map((value, index) => (
                        <option key={index}>{value}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Charge</label>
                <input
                    className="form-control"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.charge}
                    onChange={(e) =>
                        setInputs({ ...inputs, charge: e.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <label>Modifications</label>

                <div className="form-row">
                    <div className="col-3">n-term</div>
                    <div className="form-group col-9">
                        <input
                            type="text"
                            value={inputs.nTerm}
                            className="form-control form-control-sm"
                            onChange={(e) =>
                                setInputs({ ...inputs, nTerm: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-3">c-term</div>
                    <div className="form-group col-9">
                        <input
                            type="text"
                            value={inputs.cTerm}
                            className="form-control form-control-sm"
                            onChange={(e) =>
                                setInputs({ ...inputs, cTerm: e.target.value })
                            }
                        />
                    </div>
                </div>

                {makeModFields(inputs, setInputs)}
            </div>
        </form>
    );
}
