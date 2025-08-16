import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCharCount?: boolean;
  minLength?: number;
  helperText?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  showCharCount = false,
  minLength,
  helperText,
  value = '',
  className = '',
  ...props
}) => {
  const textLength = String(value).length;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#41403D] font-medium mb-3">
          {label}
        </label>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-[#41403D] text-sm mb-3">{helperText}</p>
      )}
      
      <textarea
        value={value}
        className={`
          w-full px-3 py-3 
          border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          resize-none text-black
          ${className}
        `.trim()}
        {...props}
      />
      
      {showCharCount && minLength && (
        <p className="text-sm text-gray-500 text-right mt-1">
          {minLength ? `Min ${minLength} characters (${textLength}/${minLength})` : `${textLength} characters`}
        </p>
      )}
    </div>
  );
};

export default TextArea;
