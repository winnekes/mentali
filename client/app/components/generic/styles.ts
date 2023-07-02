export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "transparent",
    color: "#dcdcdc",
    ":focus": {
      borderColor: "#9a2d67",
      boxShadow: "0 0 5px #9a2d67",
    },
    borderColor: state.isFocused && "#9a2d67",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "transparent",
    color: "#dcdcdc",
    ":focus": {
      borderColor: "#9a2d67",
      boxShadow: "0 0 5px #9a2d67",
    },
    ":hover": {
      borderColor: "rgba(255,255,255, .24)",
      boxShadow: "none",
    },
    borderColor: state.isFocused && "#9a2d67",
    boxShadow: "none",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#171923",
    color: "#dcdcdc",
    ":focus": {
      borderColor: "#9a2d67",
      boxShadow: "0 0 5px #9a2d67",
    },
    borderColor: state.isFocused && "#9a2d67",
  }),
  multiValue: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#694251",
    borderRadius: "7px",
    color: "#ffffff",
  }),
  multiValueLabel: (provided: any) => ({ ...provided, color: "#ffffff" }),
  indicatorSeparator: (provided: any) => ({ ...provided, backgroundColor: "#2D3748" }),
};
