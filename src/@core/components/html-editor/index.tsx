// 'use client';
// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';

// interface ExampleProps {
//   placeholder?: string;
//   intaialvalue?: string;
//   onChange?: (content: string) => void;
// }

// const DynamicJoditEditor = dynamic<any>(() => import('jodit-pro-react'), { ssr: false });

// const Example: React.FC<ExampleProps> = ({ placeholder, intaialvalue = '', onChange }) => {
//   const editor = useRef<any>(null);
//   const [values, setValues] = useState(intaialvalue);

//   const config = useMemo(
//     () => ({
//       controls: {
//         font: {
//           list: { 'Poppins': 'Poppins' }
//         }, paragraph: {
//           list: {
//             p: 'Normal',
//             h1: 'Heading 1',
//             h2: 'Heading 2',
//             h3: 'Heading 3',
//             h4: 'Heading 4',
//             h5: 'Heading 5',
//             h6: 'Heading 6',
//           },
//           // font: false, // Disable font size control
//           // fontsize: false, // Disable the font size dropdown if used separately
//         },
//       },
//       placeholder: placeholder || 'Start typing...',
//       editorCssClass: 'custom-jodit-css' // Custom class for styling
//     }),
//     [placeholder]
//   );

//   const handleChange = useCallback(
//     (content: string) => {
//       // Only update if content has actually changed to avoid unnecessary re-renders
//       if (content !== values) {
//         setValues(content);
//         if (onChange) {
//           onChange(content);
//         }
//       }
//     },
//     [onChange, values]
//   );

//   useEffect(() => {
//     setValues(intaialvalue);
//   }, [intaialvalue]);

//   return (
//     <>
//       {/* <style jsx global>{`
//         .custom-jodit-css .jodit-wysiwyg {
//           font-family: 'Poppins', sans-serif !important;
//         }
//       `}</style> */}
//       <style>{`
//   .custom-jodit-css .jodit-wysiwyg {
//     font-family: 'Poppins', sans-serif !important;
//   }
// `}</style>
//       <DynamicJoditEditor
//         ref={editor}
//         value={values}
//         config={config}
//         onChange={handleChange}
//         tabIndex={1} // tabIndex for focus control
//       />
//     </>
//   );
// };

// export default Example;



'use client';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface ExampleProps {
  placeholder?: string;
  intaialvalue?: string;
  onChange?: (content: string) => void;
}

const DynamicJoditEditor = dynamic<any>(() => import('jodit-pro-react'), {
  ssr: false,
});

/**
 * 🔥 FULL WORD HTML CLEANER
 * Fixes:
 * - span font-weight → strong
 * - fake strong (font-weight: normal)
 * - nested tags
 * - invalid structure
 */
function cleanWordHTML(html: string): string {
  if (!html) return html;

  let cleaned = html;

  // 1. REGEX for basic style replacements (safe for SSR)
  cleaned = cleaned.replace(/([{";\s]|^)color:\s*[^;"]+;?/gi, '$1');
  cleaned = cleaned.replace(/([{";\s]|^)font-family:\s*[^;"]+;?/gi, '$1');
  cleaned = cleaned.replace(/([{";\s]|^)line-height:\s*[^;"]+;?/gi, '$1');
  cleaned = cleaned.replace(/([{";\s]|^)background-color:\s*transparent;?/gi, '$1');

  // 🔁 Convert Word's pt font-sizes to px with a direct 1:1 mapping 
  cleaned = cleaned.replace(/([{";\s]|^)font-size:\s*([\d.]+)pt;?/gi, (match, prefix, pt) => {
    const px = Math.round(parseFloat(pt));
    return `${prefix}font-size: ${px}px;`;
  });

  // ❌ Remove style attributes that only contain leftovers
  cleaned = cleaned.replace(/style="[^"]*"/gi, (match) => {
    const cleanedStyle = match
      .replace(/([{";\s]|^)color:\s*[^;"]+;?/gi, '$1')
      .replace(/([{";\s]|^)font-family:\s*[^;"]+;?/gi, '$1')
      .replace(/([{";\s]|^)line-height:\s*[^;"]+;?/gi, '$1')
      .replace(/([{";\s]|^)background-color:\s*transparent;?/gi, '$1')
      .replace(/;\s*;/g, ';')
      .replace(/style="\s*;*\s*"/g, '');

    return cleanedStyle === 'style=""' || cleanedStyle === '' ? '' : cleanedStyle;
  });

  // 2. ROBUST DOM PARSER for structural changes (Only runs on client)
  if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleaned, 'text/html');

      // 🔥 STEP 0: Unwrap Google Docs wrapper tags
      // Google Docs wraps ALL pasted content in <strong id="docs-internal-guid-...">
      // or <b id="docs-internal-guid-..."> even for normal (non-bold) text.
      // We must remove these wrapper tags FIRST before any other processing.
      const gdocWrappers = doc.body.querySelectorAll(
        'strong[id^="docs-internal-guid"], b[id^="docs-internal-guid"], span[id^="docs-internal-guid"]'
      );
      gdocWrappers.forEach(wrapper => {
        const parent = wrapper.parentNode;
        if (parent) {
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
          }
          parent.removeChild(wrapper);
        }
      });

      const elements = doc.body.querySelectorAll('*');

      elements.forEach(el => {
        const style = el.getAttribute('style');
        if (style) {
          let newStyle = style;

          // Convert inline font-weight to semantic <strong>
          if (/font-weight:\s*(700|bold)/i.test(newStyle)) {
            newStyle = newStyle.replace(/font-weight:\s*(700|bold);?/gi, '');
            if (el.tagName.toLowerCase() !== 'strong' && el.tagName.toLowerCase() !== 'b') {
              const strong = document.createElement('strong');
              while (el.firstChild) {
                strong.appendChild(el.firstChild);
              }
              el.appendChild(strong);
            }
          }

          // Convert inline font-style to semantic <em>
          if (/font-style:\s*italic/i.test(newStyle)) {
            newStyle = newStyle.replace(/font-style:\s*italic;?/gi, '');
            if (el.tagName.toLowerCase() !== 'em' && el.tagName.toLowerCase() !== 'i') {
              const em = document.createElement('em');
              while (el.firstChild) {
                em.appendChild(el.firstChild);
              }
              el.appendChild(em);
            }
          }

          // Remove explicit normal weight
          if (/font-weight:\s*(400|normal)/i.test(newStyle)) {
            newStyle = newStyle.replace(/font-weight:\s*(400|normal);?/gi, '');
          }

          newStyle = newStyle.replace(/;\s*;/g, ';').trim();

          if (!newStyle || newStyle === 'style=""' || newStyle === ';') {
            el.removeAttribute('style');
          } else {
            el.setAttribute('style', newStyle);
          }
        }
      });

      // 3. Flatten nested headings and block elements (Google Docs fix)
      // This prevents <h2><p>...</p></h2> which causes automatic bolding
      const blockTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];
      const allBlocks = doc.body.querySelectorAll(blockTags.join(','));

      allBlocks.forEach(block => {
        const nested = block.querySelectorAll(blockTags.join(','));
        nested.forEach(n => {
          // Move the nested block's content out or just replace it with its children
          // For headings inside headings, we usually just want the content
          const fragment = doc.createDocumentFragment();
          while (n.firstChild) {
            fragment.appendChild(n.firstChild);
          }
          if (n.parentNode) {
            n.parentNode.replaceChild(fragment, n);
          }
        });
      });

      cleaned = doc.body.innerHTML;
    } catch (e) {
      console.error('DOMParser failed in cleanWordHTML', e);
    }
  }

  // 4. Simple regex cleanup for formatting flaws
  cleaned = cleaned.replace(/<strong>\s*<p>/gi, '<p><strong>');
  cleaned = cleaned.replace(/<\/p>\s*<\/strong>/gi, '</strong></p>');
  cleaned = cleaned.replace(/<strong>\s*<\/strong>/gi, '');
  cleaned = cleaned.replace(/<em>\s*<\/em>/gi, '');
  cleaned = cleaned.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '<br>'); // Clean up excessive breaks

  let prev: string;
  do {
    prev = cleaned;
    cleaned = cleaned
      .replace(/<strong[^>]*>\s*<strong/gi, '<strong')
      .replace(/<\/strong>\s*<\/strong>/gi, '</strong>')
      .replace(/<em[^>]*>\s*<em/gi, '<em')
      .replace(/<\/em>\s*<\/em>/gi, '</em>');
  } while (cleaned !== prev);

  return cleaned;
}

const Example: React.FC<ExampleProps> = ({
  placeholder,
  intaialvalue = '',
  onChange,
}) => {
  const editor = useRef<any>(null);
  const onChangeRef = useRef(onChange);
  const contentRef = useRef(intaialvalue);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    contentRef.current = intaialvalue;
  }, [intaialvalue]);

  const config = useMemo(
    () => ({
      readonly: false,

      controls: {
        font: {
          list: { Poppins: 'Poppins' },
        },
        fontsize: {
          list: {
            '8': '8',
            '9': '9',
            '10': '10',
            '11': '11',
            '12': '12',
            '13': '13',
            '14': '14',
            '15': '15',
            '16': '16',
            '18': '18',
            '20': '20',
            '22': '22',
            '24': '24',
            '26': '26',
            '28': '28',
            '30': '30',
            '32': '32',
            '34': '34',
            '36': '36',
            '48': '48',
          },
        },
        paragraph: {
          list: {
            p: 'Normal',
            h1: 'Heading 1',
            h2: 'Heading 2',
            h3: 'Heading 3',
            h4: 'Heading 4',
            h5: 'Heading 5',
            h6: 'Heading 6',
          },
        },
      },

      placeholder: placeholder || 'Start typing...',
      editorCssClass: 'custom-jodit-css',

      /**
       * 🔥 Enable paste dialog so user can choose to keep Word formatting
       */
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      defaultActionOnPasteFromWord: 'insert_as_html',
      defaultActionOnPaste: 'insert_as_html',

      cleanHTML: {
        cleanOnPaste: true,
        removeEmptyElements: false,
        replaceNBSP: true,
      },

      /**
       * 🔥 CLEAN AFTER PASTE
       * This transforms the pasted chunk BEFORE insertion, preserving caret position.
       */
      processPasteHTML: (html: string) => {
        return cleanWordHTML(html);
      },
    }),
    [placeholder]
  );

  /**
   * ✅ Final clean before saving
   */
  const handleBlur = useCallback((content: string) => {
    const cleaned = cleanWordHTML(content);
    contentRef.current = cleaned;

    if (onChangeRef.current) {
      onChangeRef.current(cleaned);
    }
  }, []);

  /**
   * Track live content
   */
  const handleChange = useCallback((content: string) => {
    contentRef.current = content;
  }, []);

  return (
    <>
      <style>{`
  .custom-jodit-css .jodit-wysiwyg {
    font-family: 'Poppins', sans-serif !important;
    color: #000 !important;
  }

  .custom-jodit-css .jodit-wysiwyg * {
    color: #000 !important;
  }

  /* 🔥 Force Word-like sizes so headings don't jump to 32px automatically */
  .custom-jodit-css .jodit-wysiwyg h1 { font-size: 24px; font-weight: bold; }
  .custom-jodit-css .jodit-wysiwyg h2 { font-size: 20px; font-weight: bold; }
  .custom-jodit-css .jodit-wysiwyg h3 { font-size: 18px; font-weight: bold; }
  .custom-jodit-css .jodit-wysiwyg h4,
  .custom-jodit-css .jodit-wysiwyg h5,
  .custom-jodit-css .jodit-wysiwyg h6 { font-size: 16px; font-weight: bold; }
  .custom-jodit-css .jodit-wysiwyg p,
  .custom-jodit-css .jodit-wysiwyg span { font-size: 16px; }
`}</style>

      <DynamicJoditEditor
        ref={editor}
        value={cleanWordHTML(intaialvalue)} // 🔥 CLEAN INITIAL VALUE
        config={config}
        onBlur={handleBlur}
        onChange={handleChange}
        tabIndex={1}
      />
    </>
  );
};

export default Example;


// 'use client';
// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';

// interface ExampleProps {
//   placeholder?: string;
//   intaialvalue?: string;
//   onChange?: (content: string) => void;
// }

// const DynamicJoditEditor = dynamic<any>(() => import('jodit-pro-react'), { ssr: false });

// const Example: React.FC<ExampleProps> = ({ placeholder, intaialvalue = '', onChange }) => {
//   const editor = useRef<any>(null);
//   const [values, setValues] = useState(intaialvalue);

//   const config = useMemo(
//     () => ({
//       controls: {
//         font: {
//           list: { 'Poppins': 'Poppins' }
//         }, paragraph: {
//           list: {
//             p: 'Normal',
//             h1: 'Heading 1',
//             h2: 'Heading 2',
//             h3: 'Heading 3',
//             h4: 'Heading 4',
//             h5: 'Heading 5',
//             h6: 'Heading 6',
//           },
//           // font: false, // Disable font size control
//           // fontsize: false, // Disable the font size dropdown if used separately
//         },
//       },
//       placeholder: placeholder || 'Start typing...',
//       editorCssClass: 'custom-jodit-css' // Custom class for styling
//     }),
//     [placeholder]
//   );

//   const handleChange = useCallback(
//     (content: string) => {
//       // Only update if content has actually changed to avoid unnecessary re-renders
//       if (content !== values) {
//         setValues(content);
//         if (onChange) {
//           onChange(content);
//         }
//       }
//     },
//     [onChange, values]
//   );

//   useEffect(() => {
//     setValues(intaialvalue);
//   }, [intaialvalue]);

//   return (
//     <>
//       {/* <style jsx global>{`
//         .custom-jodit-css .jodit-wysiwyg {
//           font-family: 'Poppins', sans-serif !important;
//         }
//       `}</style> */}
//       <style>{`
//   .custom-jodit-css .jodit-wysiwyg {
//     font-family: 'Poppins', sans-serif !important;
//   }
// `}</style>
//       <DynamicJoditEditor
//         ref={editor}
//         value={values}
//         config={config}
//         onChange={handleChange}
//         tabIndex={1} // tabIndex for focus control
//       />
//     </>
//   );
// };

// export default Example;

