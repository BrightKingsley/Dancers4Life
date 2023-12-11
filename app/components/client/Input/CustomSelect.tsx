import React, { FC, ReactNode } from "react";
import Select, { components, StylesConfig } from "react-select";
import ErrorContainer from "@/utils/validation/ErrorContainer";
import { CannotBeSymbolError } from "@typegoose/typegoose/lib/internal/errors";
const customStyles: StylesConfig = {
  control: (base: Record<string, unknown>, state: any) => ({
    ...base,
    "*": {
      boxShadow: "none !important",
    },
    fontSize: "12px",
    height: "44px",
    border: "none",
    borderBottom: "1px solid gray",
    borderRadius: "0",
    width: "auto",
    boxShadow: "none",
    appearance: "none",
    backgroundColor: "transparent",
  }),
  input: (base: any, state: any) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: "transparent",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#212529",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "bold",

    fontSize: (state.hasValue || state.selectProps.inputValue) && "12px",
    lineHeight: (state.hasValue || state.selectProps.inputValue) && "16px",
    paddingRight: (state.hasValue || state.selectProps.inputValue) && 8,
    paddingLeft: (state.hasValue || state.selectProps.inputValue) && 8,
    color: "#ea580c",
    visibility: state.hasValue ? "hidden" : "visible",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ":hover": {
        backgroundColor: "rgb(234 88 12 / 0.1)",
        color: isSelected ? "#ea580c" : "default",
      },
      // backgroundColor: isSelected ? "#ea580c" : styles.backgroundColor,
      backgroundColor: isSelected
        ? "#ea580c"
        : isFocused
        ? "rgb(234 88 12 / 0.1)"
        : styles.backgroundColor,
      color: isSelected ? "#fff" : "default",
      cursor: isDisabled ? "not-allowed" : styles.cursor,
    };
  },
};

type SingleValue = {
  value: string | number;
  label: string;
};

type OptionModel = SingleValue[];

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

const CustomSelect: FC<{
  options: OptionModel;
  handleChange?: ((newValue: any, newAction: any) => void) | undefined;
  defaultValue?: any;
  inputValue?: any;
  components?: any;
  isDisabled?: boolean;
  placeholder?: string;
  containerClass?: any;
  className?: string;
  name: string;
  control?: any;
  errors?: any;
  isMulti?: boolean;
  extraLabel?: string;
}> = ({
  options,
  isDisabled,
  placeholder,
  containerClass,
  className,
  name,
  control,
  errors,
  defaultValue,
  inputValue,
  handleChange,
  isMulti = false,
  extraLabel,
}) => {
  return (
    <div className={`  ${containerClass}`}>
      {/* {extraLabel && (
        <h1 className="text-[#787878] text-[14px] lg:leading-[16px] tracking-[0.03px] font-[600] mb-2">
          {extraLabel}{" "}
        </h1>
      )} */}

      <Select
        placeholder={placeholder}
        classNamePrefix="react-select"
        className={`react-select-container text-[#787878] bg-transparent ${className}`}
        options={options}
        onChange={(newValue: any) => {
          if (handleChange) {
            console.log({ newValue });
            handleChange(newValue, name);
          }
        }}
        isDisabled={isDisabled}
        value={options?.find((c) => c.value === defaultValue)}
        isClearable
        styles={customStyles}
        components={{
          ...components,
          IndicatorSeparator: () => null,
          ValueContainer: CustomValueContainer,
        }}
        isMulti={isMulti}
      />

      {errors && (
        <div className="text-left ml-3">
          <ErrorContainer errors={errors} />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
