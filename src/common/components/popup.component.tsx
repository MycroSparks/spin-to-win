import React, { useEffect } from "react";
import styles from "./popup.module.css";
import classNames from "../../core/global/class-names";

interface Props {
  open: boolean;
  setOpen: (e: boolean) => void;
  closeOnOutsideClick?: boolean;
  closeOnContentClick?: boolean;
  fullWidth?: boolean;
  fancy?: boolean;
  containerStyle?: React.CSSProperties;
  noDefaultCloseButton?: boolean;
  children?: React.ReactNode;
}

// Component from one of my other projects, pretty easy and flexible to use, also why it uses .css file unlike all the other inline css styling I did here
export const Popup: React.FC<Props> = (props) => {
  useEffect(() => {
    document.body.style.overflowY = props.open ? "hidden" : "unset";

    return function cleanup() {
      document.body.style.overflowY = "unset";
    };
  }, [props.open]);

  return props.open ? (
    <div
      className={styles.popup}
      onMouseDown={() =>
        props.closeOnOutsideClick ? props.setOpen(false) : ""
      }
    >
      <div
        className={classNames(
          styles.popupInner,
          props.fancy ? styles.fancy : null
        )}
        style={{ ...props.containerStyle }}
        onMouseDown={(e) => {
          if (!props.closeOnContentClick) {
            e.stopPropagation();
          } else {
            props.setOpen(false);
          }
        }}
      >
        {props.closeOnContentClick || props.noDefaultCloseButton ? null : (
          <button
            className={classNames(
              styles.popupButton,
              props.fancy ? styles.fancyButton : null
            )}
            onClick={() => props.setOpen(false)}
          >
            {"CLOSE"}
          </button>
        )}
        {props.children ?? null}
      </div>
    </div>
  ) : null;
};
