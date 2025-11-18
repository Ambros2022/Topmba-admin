'use client';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
interface ExampleProps {
	placeholder?: string;
	intaialvalue?: string;
	onChange?: any;
}
const DynamicJoditEditor = dynamic<any>(() => import('jodit-react'), { ssr: false });

const Example: React.FC<ExampleProps> = ({ intaialvalue = '', onChange }) => {
	const editor = useRef(null);
	const [values, setValues] = useState(intaialvalue);
	function onChanges(content) {
		setValues(content)
		onChange(content);
	}
	useEffect(() => {
		onChanges(values);
	}, [values]);
	return (
		<DynamicJoditEditor
			ref={editor}
			value={values}
			onChange={onChanges}

		/>
	);
}
export default Example;