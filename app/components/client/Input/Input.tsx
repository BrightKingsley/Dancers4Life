/* eslint-disable react/display-name */
import React, { useState } from "react";
import ErrorContainer from "@/utils/validation/ErrorContainer";

interface ICustomInputFieldProps {
  type:
    | React.InputHTMLAttributes<HTMLInputElement>["type"]
    | "select"
    | "textarea";
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUpPress?: any;
  min?: number | string | any;
  showRequiredIcon?: boolean;
  passwordError?: boolean;
  removeBottomBorder?: boolean;
  autoComplete?: string;
  trailing?: React.ReactNode[];
  onClickActionButton?: () => void;
  onClickIcon?: () => void;
  extraLabel?: string;
  leading?: number | any;
  addPadding?: boolean;
  children?: React.ReactNode | undefined;
  errorMessage?: string;
  style?: string;
  className?: string;
  placeholder: string;
}

const Input: React.FC<ICustomInputFieldProps> = React.forwardRef(
  (
    {
      extraLabel,
      min,
      required,
      removeBottomBorder,
      showRequiredIcon,
      trailing,
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
      leading,
      addPadding,
      onClickIcon,
      passwordError,
      autoComplete,
      errorMessage,
      style,
      className,
      placeholder,
      ...otherProps
    },
    ref: any
  ) => {
    const [focused, setFocused] = useState(false);

    const inputStyles = `${style} block appearance-none focus:ring-0 leading-5 text-[1rem] font-[500] peer focus:outline-none ${
      readOnly
        ? "text-[#4D5154] focus:border-[#C8CCD0]"
        : "text-[#212529] focus:border-[#0c8ce9]"
    } ${
      errors
        ? "border-[#B00020] focus:border-[#B00020]"
        : "border-[#C8CCD0] focus:border-incoverGreen"
    }   rounded-lg w-full ${type !== "textarea" && "h-[52px]"} py-[12px] ${
      errors && "border-[#B00020]"
    } ${trailing && ""} ${children && "border-l-0"}`;

    const extraLabelElement = extraLabel?.length ? (
      <small className="text-[#4D5154] text-[14px] lg:leading-[16px] tracking-[0.03px] font-[600] mb-2">
        {extraLabel}
      </small>
    ) : null;

    const preInput = (
      <>
        {/* {children && (
          <div className="absolute flex items-center h-full ml-2">
            <span>{children}</span>
          </div>
        )}
        {leading && (
          <div
            className={`absolute inset-y-0 left-0 px-2 border-r flex items-center text-sm text-Gray font-[300] leading-5 cursor-pointer`}
            onClick={onClickIcon}
          >
            <span className="text-capitalize">{leading}</span>
          </div>
        )} */}
        {leading}
      </>
    );

    const postInput = (
      <>
        {trailing && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 cursor-pointer gap-2"
            onClick={onClickActionButton}
          >
            {trailing.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        )}
      </>
    );

    return (
      <>
        {/* <div className="w-full"> */}
        {extraLabelElement}
        <div
          className={`relative rounded-lg border p-2 flex items-center gap-2 bg-brand-orange/10 ${className} `}
        >
          {preInput}
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`focus:border-none w-full focus:outline-none bg-transparent placeholder:translate-y-[2px] flex-1 ${""}`}
            type={type}
            name={name}
            max={max}
            min={min}
            maxLength={maxLength}
            required={required}
            minLength={minLength}
            defaultValue={defaultValue}
            // value={defaultValue}
            onChange={onChange}
            onKeyUp={onKeyUpPress}
            readOnly={readOnly}
            autoComplete={autoComplete}
            ref={ref}
            {...otherProps}
            placeholder={placeholder}
            id={label}
          />
          {postInput}
        </div>
        {errors?.length > 0 && (
          <div className="ml-3 text-left">
            <ErrorContainer errors={errors} />
          </div>
        )}
        {/* </div> */}
      </>
    );
  }
);

export default Input;
