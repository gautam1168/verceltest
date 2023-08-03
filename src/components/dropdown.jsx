import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./button";
import "./dropdown.css";
import Icon from "./icon";

export default function Dropdown({ label, options, onChange, selectedValue })
{
  const [isOpen, setIsOpen] = useState(false);
  const togglerEl = useRef(null);
  const dropdownRootEl = useRef(null);

  useEffect(() => {
    if (isOpen)
    {
      const rect = togglerEl.current.getBoundingClientRect();
      console.log("dropdown: ", rect)
      if (dropdownRootEl.current)
      {
        const dropdownRect = dropdownRootEl.current.getBoundingClientRect();
        let top = rect.top + rect.height + 1;
        let left = rect.right - dropdownRect.width;
        console.log("Dropdown el styles: ", top, left);
        dropdownRootEl.current.style.top = `${top}px`;
        dropdownRootEl.current.style.left = `${left}px`;
        dropdownRootEl.current.focus();
      }
    }
  }, [isOpen, dropdownRootEl, togglerEl]);

  let dropdownlist = null; 

  const toggleDropdown = () => {
    setIsOpen(curr => !curr);
  }

  const textColors = {
    linkblue: "typography-link-lightblue",
    success: "typography-success-green-dark",
    warning: "typography-warning-yellow",
    failed: "typography-failed-red",
    faded: "typography-graya",
  };

  const handleSelect = (item) => {
    toggleDropdown();
    if (onChange)
    {
      onChange(item);
    }
  }

  if (isOpen) {
    dropdownlist = createPortal(
      <div 
        tabIndex="0" 
        className="dropdown-list" 
        ref={dropdownRootEl} 
        onBlur={() => setIsOpen(false)}
      >
        {
          options.map(it => {
            let selectedclass = "";
            if (it.label == selectedValue?.label)
            {
              selectedclass = " selected ";
            }
            return (
              <div 
                key={it.label} 
                className={"listitem " + selectedclass + textColors[it.color]}
                onClick={() => handleSelect(it)}
              >
                {it.icon && <Icon name={it.icon} size="regular" color={it.color}></Icon>}
                {it.label}
              </div>
            );
          })
        }
      </div>
      , document.body
    );
  }

  return (
    <div className="dropdown-root typography-gray9 typography-medium-14">
      {label}
      <Button onClick={toggleDropdown} ref={togglerEl}>
        {selectedValue && (
          <div className={"selecteditem " + textColors[selectedValue.color] + " typography-semibold-14"}>
            {selectedValue.icon && (
              <Icon
                name={selectedValue.icon}
                size="regular"
                color={selectedValue.color}
              >
              </Icon>
            )
            }
            {selectedValue.label}
          </div>)
        }
      </Button>
      <Icon name="chevdown" size="small" onClick={toggleDropdown}></Icon>
      {dropdownlist}
    </div>
  );
}