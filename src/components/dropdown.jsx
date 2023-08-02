import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./button";
import "./dropdown.css";
import Icon from "./icon";

export default function Dropdown({ label, options, onChange, initialSelection })
{
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const togglerEl = useRef(null);
  const dropdownRootEl = useRef(null);

  useEffect(() => {
    if (!selectedValue) {
      setSelectedValue(initialSelection);
    }
  }, [initialSelection]);

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
    setSelectedValue(item);
  }

  if (isOpen) {
    dropdownlist = createPortal(
      <div 
        tabIndex="0" 
        className="dropdown-list" 
        ref={dropdownRootEl} 
        onBlur={toggleDropdown}
      >
        {
          options.map(it => {
            

            return (
              <div 
                key={it.label} 
                className={"listitem " + textColors[it.color]}
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
      <Icon name="chevdown" size="small"></Icon>
      {dropdownlist}
    </div>
  );
}