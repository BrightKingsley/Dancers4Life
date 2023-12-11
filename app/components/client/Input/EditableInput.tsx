/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from "react";
import { formatMoney } from "@/utils/functions/helpers/string-mutations";
import Select, { components } from "react-select";

interface IEditableInputFieldProps {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name?: string;
  label?: string;
  errors?: any;
  maxLength?: undefined | number;
  max?: number | string | any;
  defaultValue?: string | number;
  value?: string | number;
  minLength?: undefined | number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: any;
  onKeyUpPress?: any;
  min?: number | string | any;
  showRequiredIcon?: boolean;
  passwordError?: boolean;
  hasActionButton?: boolean;
  removeBottomBorder?: boolean;
  autoComplete?: string;
  actionButtonText?: any;
  onClickActionButton?: () => void;
  onClickIcon?: () => void;
  extraLabel?: string;
  hasIcon?: number | any;
  addPadding?: boolean;
  children?: React.ReactNode | undefined;
  errorMessage?: string;
  style?: string;
  initialText?: any;
  inputType: string;
  options?: Array<any>;
}

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const EditableTextItem: React.FC<IEditableInputFieldProps> = React.forwardRef(
  (
    {
      extraLabel,
      min,
      required,
      removeBottomBorder,
      showRequiredIcon,
      hasActionButton,
      actionButtonText,
      onClickActionButton,
      type,
      name,
      label,
      errors,
      maxLength,
      max,
      defaultValue,
      value,
      minLength,
      readOnly,
      onChange,
      onKeyUpPress,
      children,
      hasIcon,
      addPadding,
      onClickIcon,
      passwordError,
      autoComplete,
      errorMessage,
      inputType,
      style,
      initialText,
      options,
      ...otherProps
    },
    ref: any
  ) => {
    const [focused, setFocused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleBlur = () => {
      setIsEditing(false);
      // Save the changes or perform any required actions here
    };

    useEffect(() => {
      if (isEditing) {
        inputRef?.current?.focus();
      }
    }, [isEditing]);

    const handleDoubleClick = () => {
      setIsEditing(true);
    };

    return (
      <div>
        <div className="relative" onDoubleClick={handleDoubleClick}>
          {isEditing ? (
            options?.length ? (
              <>
                <Select
                  components={{
                    ...components,
                  }}
                  value={options?.find((c) => c.value === defaultValue)}
                  options={options}
                  getOptionLabel={(options) => options["name"]}
                  getOptionValue={(options) => options["id"]}
                  onChange={onChange}
                />
              </>
            ) : (
              <>
                <input
                  onFocus={() => setFocused(true)}
                  onChange={onChange}
                  onBlur={handleBlur}
                  type={type}
                  name={name}
                  max={max}
                  min={min}
                  maxLength={maxLength}
                  required={required}
                  minLength={minLength}
                  defaultValue={defaultValue}
                  // value={defaultValue}
                  onKeyUp={onKeyUpPress}
                  readOnly={readOnly}
                  autoComplete={autoComplete}
                  ref={ref}
                  {...otherProps}
                  placeholder=" "
                  id={label}
                />
              </>
            )
          ) : (
            <>
              <span>
                {inputType === "currency"
                  ? formatMoney(defaultValue)
                  : defaultValue}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default EditableTextItem;
