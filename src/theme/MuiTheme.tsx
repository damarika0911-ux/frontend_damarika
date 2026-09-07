import { createTheme } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const scrollBarStyles = {
  "& ::-webkit-scrollbar": {
    width: "8px",
  },
  "& ::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#72727230",
    borderRadius: "10px",
    border: "3px solid transparent",
    cursor: "default",
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#72727255",
  },
};

export const ParrotMuiTheme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: "#8b4513",
      dark: "#8b4513",
    },
    action: {
      disabledBackground: "#8b4513",
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        fontFamily: `'Poppins', sans-serif`,
        body: scrollBarStyles,
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#8b4513",
          width: "38px",
          height: "38px",
          fontWeight: 600,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        standard: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
      defaultProps: {
        IconComponent: (props) => (
          <KeyboardArrowDownIcon
            {...props}
            style={{
              opacity: 0.8,
              width: "0.9em",
              right: "5px",
              transition: "transform 300ms ease",
            }}
          />
        ),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "capitalize",
          "&.MuiButton-contained.Mui-disabled": {
            color: "#fff",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          height: "40px",
          borderRadius: 10,
          "&:hover:not(.MuiFocused):not(.MuiDisabled) .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#707070cc",
            },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#8b4513"} !important`,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: "4px",
          paddingBottom: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          "> .MuiMenuItem-root": {
            padding: "6px 12px",
            fontSize: "13px",
            fontWeight: 600,
            minHeight: "32px",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          borderRadius: "8px",
        },
        listbox: {
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          padding: "4px 0",
          "> .MuiAutocomplete-option": {
            padding: "8px 16px",
            fontSize: "13px",
            minHeight: "36px",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          fontSize: "14px",
          ".MuiInputLabel-root": {
            fontSize: "13px",
            color: "#71717A !important",
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "transparent",
            height: "46px",
            borderWidth: "1.5px !important",
          },
          "& .MuiFilledInput-input": {
            paddingTop: "16px",
            paddingBottom: "4px",
            borderRadius: "inherit",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "4px",
          fontSize: "11px",
          padding: "3px 9px",
          fontWeight: 600,
          background: "#e5c8b4",
          color: "#8B4513",
        },
      },
      defaultProps: {
        slotProps: {
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -8],
                },
              },
            ],
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "40px",
          height: "40px",
          padding: 0,
          minWidth: 60,
          "& .MuiTab-root": {
            textTransform: "capitalize",
            fontWeight: 600,
            fontSize: "14px",
            color: "rgba(5, 20, 14, 0.56)",
            padding: "8px 8px 16px",
            marginRight: 12,
            borderRadius: "0.3rem",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          border: "2px solid #E4E4E7",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
          "&.Mui-error": {
            borderColor: "#d32f2f",
          },
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
          "&.Mui-focused": {
            border: `2px solid ${"#8b4513"}`,
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          color: " rgba(122, 122, 122, 0.9)",
          lineHeight: "20px",
          "&.Mui-focused": {
            color: "#8b4513",
            fontWeight: 600,
            fontSize: "13px",
          },
          "&.MuiInputLabel-shrink": {
            fontSize: "13px",
          },
        },
        asterisk: { color: "red" },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 8px 24px 0px #18181B1A",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          ":before": { opacity: "1 !important" },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          opacity: 0,
          animation: "fadeIn 150ms ease-in 0ms forwards",
          marginLeft: "4px",
          marginRight: "4px",
        },
      },
    },
  },
});
