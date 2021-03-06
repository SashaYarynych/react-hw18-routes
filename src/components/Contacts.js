import React, { useState } from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact.js";
import contactsArr from "../dataFiles/contactsArr.js";
import "../css/contacts.css";

export default function Contacts() {
  const [searchText, setSearchText] = useState("");
  const [isMaleCheckboxChecked, setisMaleCheckboxChecked] = useState(true);
  const [isFemaleCheckboxChecked, setisFemaleCheckboxChecked] = useState(true);
  const [isNotSaidCheckboxChecked, setisNotSaidCheckboxChecked] = useState(
    true
  );

  const filterArr = () => {
    return contactsArr.filter((c) => {
      if (
        `${c.firstName.toLowerCase()} ${c.lastName.toLowerCase()} ${
          c.phone
        }`.includes(searchText.toLowerCase())
      ) {
        if (isMaleCheckboxChecked && c.gender === "male") {
          return true;
        }
        if (isFemaleCheckboxChecked && c.gender === "female") {
          return true;
        }
        if (isNotSaidCheckboxChecked && !c.gender ) {
          return true;
        }
      }
    });
  };

  return (
    <div className="contact-wrapper">
      <div className="search">
        <input
          type="text"
          valuue={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div>
        <input
          checked={isMaleCheckboxChecked}
          type="checkbox"
          onChange={() => setisMaleCheckboxChecked(!isMaleCheckboxChecked)}
        />
        <label>male</label>
        <input
          checked={isFemaleCheckboxChecked}
          type="checkbox"
          onChange={() => setisFemaleCheckboxChecked(!isFemaleCheckboxChecked)}
        />
        <label>female</label>
        <input
          checked={isNotSaidCheckboxChecked}
          type="checkbox"
          onChange={() =>
            setisNotSaidCheckboxChecked(!isNotSaidCheckboxChecked)
          }
        />
        <label>not said</label>
      </div>
      {[...filterArr()].length !== 0 ? (
        <div className="contactList">
          {[...filterArr()].map((contact, i) => (
            <Link className="link" to={`/contact/:${contact.phone}`}>
              <Contact
                firstName={contact.firstName}
                lastName={contact.lastName}
                phone={contact.phone}
                gender={contact.gender}
                key={i}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="not-found-results">results not found</p>
      )}
    </div>
  );
}
