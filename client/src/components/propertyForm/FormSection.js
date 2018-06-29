import React from 'react'
import FormItem from './FormItem'

const FormSection = ({name, fields, value, updateInputValue}) => {
    console.log(this.props)
    const form = [];

    form.push(
        <h5 className="center-align">
            <strong>{name}</strong>
        </h5>
    );

    for (let i in fields) {
        form.push(
            <FormItem
                name={fields[i].name}
                label={fields[i].label}
                value={value[fields[i].name]}
                type={fields[i].type}
                updateInputValue={updateInputValue}
                key={fields[i].name}
            />
        );
    }

    return form
};

export default FormSection