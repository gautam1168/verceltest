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
      if (dropdownRootEl.current)
      {
        const dropdownRect = dropdownRootEl.current.getBoundingClientRect();
        let top = rect.top + rect.height + 1;
        let left = rect.right - dropdownRect.width;
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
                className={"listitem " + selectedclass + "typography-" + it.color}
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
    <div className="dropdown-root typography-faded-1 typography-medium-14">
      {label}
      <Button onClick={toggleDropdown} ref={togglerEl}>
        {selectedValue && (
          <div className={"selecteditem " + "typography-" + selectedValue.color + " typography-semibold-14"}>
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