// import React, { useEffect, useRef, ChangeEvent } from 'react';
// import intlTelInput from 'intl-tel-input';
// import 'intl-tel-input/build/css/intlTelInput.css';

// interface PhoneInputProps {
//   onChange: any;
//   value: string;
//   ariaDescribedby: string;
//   id: string;
// }

// const PhoneInput: React.FC<any> = ({ onChange, value, ariaDescribedby, id }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const iti = useRef<any>(null); // 'any' used here as the type for intlTelInput instance

//   useEffect(() => {
//     const loadUtils = async () => {
//       await import('intl-tel-input/build/js/utils');
//       const input = inputRef.current;
//       if (input) { // Ensure input is not null
//         iti.current = intlTelInput(input, {
//           initialCountry: 'in',
//           preferredCountries: ['in'],
//           utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js'
//         });

//         // Listen for changes
//         iti.current?.input?.addEventListener('input', handleInputChange);
//       }
//     };

//     loadUtils();

//     return () => {
//       iti.current?.input?.removeEventListener('input', handleInputChange); // Remove event listener
//       iti.current?.destroy();
//     };
//   }, []);

//   const handleInputChange = () => {
//     const number = iti.current?.getNumber();
//     onChange({ target: { value: number, name: id } } as ChangeEvent<HTMLInputElement>);
//   };

//   useEffect(() => {
//     if (value && iti.current) {
//       iti.current?.setNumber(value);
//     }
//   }, [value]);

//   return (
//     <span className='phoneInput'>
//       <input type="tel" ref={inputRef} className="form-control" placeholder="" id={id}
//         aria-describedby={ariaDescribedby} />
//     </span>
//   );
// };

// export default PhoneInput;
