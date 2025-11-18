import React from 'react';
import Slider from '@material-ui/core/Slider';

interface DiscreteSliderLabelProps {
    ariaLabel: string;
    defaultValue: number;
    getAriaValueText: (value: number) => string;
    step: number;
    marks: { value: number; label: string }[];
    min: number;
    max: number;
    value: number;
    onChange: (event: any, value: number | number[]) => void;
    className?: string;
    valueLabelDisplay: 'auto' | 'on' | 'off';
}

const DiscreteSliderLabel: React.FC<DiscreteSliderLabelProps> = (props) => {
    return (
        <div className={`${props.className} w-100 `}>
            <Slider
                defaultValue={props.defaultValue}
                getAriaValueText={props.getAriaValueText}
                aria-labelledby="discrete-slider"
                step={props.step}
                marks={props.marks}
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
                valueLabelDisplay={props.valueLabelDisplay}
            />
        </div>
    );
};

export default DiscreteSliderLabel;
