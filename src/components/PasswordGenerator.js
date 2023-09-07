import React, { useState, useEffect } from "react";

//Importing components
import PasswordList from "./PasswordList";
import Alert from "./Alert";

//Importing CSS files
import "./PasswordGenerator.css";

//Defining constants
const NUMBERS = "0123456789";
const ALPHABETS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SPECIAL_CHARS = "!@#$%^&*()_-+=<>?/";

//Password generator function
const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState(""); //Manages the value of generated password
  const [showAlert, setShowAlert] = useState(false); // State to control the alert
  const [previousPasswords, setPreviousPasswords] = useState([]); // Manages the list of previous password
  const [includeNumbers, setIncludeNumbers] = useState(true); //Manages the state of checkbox for including numbers
  const [includeAlphabets, setIncludeAlphabets] = useState(true); //Manages the state of checkbox for  including alphabets
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true); //Manages the state of checkbox for including special characters
  const [alertMessage, setAlertMessage] = useState("");
  // Save previous passwords to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "previousPasswords",
      JSON.stringify(previousPasswords)
    );
  }, [previousPasswords]);

  //Handles the Password Generation and Storing in Previous Password List
  const generatePasswordHandler = () => {
    const allChars = []; //To store items to use for password generation

    //Pushing criteria of items based on Users choice
    if (includeNumbers) allChars.push(NUMBERS);
    if (includeAlphabets) allChars.push(ALPHABETS);
    if (includeSpecialChars) allChars.push(SPECIAL_CHARS);

    if (allChars.length === 0) {
      setAlertMessage("Please select at least one character type.");
      setShowAlert(true);
      return;
    }

    const charset = allChars.join("");
    let newPassword = "";

    const passwordLength = 12; // Considering password length as 12

    //Gerenation of the password
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setGeneratedPassword(newPassword);
    setPreviousPasswords((previousPasswords) => [
      newPassword,
      ...previousPasswords.slice(0, 4),
    ]);
  };

  //Handles copying the generated password to the clipboard
  const copyToClipboardHandler = () => {
    if (!generatedPassword) {
      setAlertMessage("Please Generate a Password.");
      setShowAlert(true);
      return;
    }
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        setAlertMessage("Password copied to clipboard");
        setShowAlert(true);
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      });
  };

  return (
    <div className="password-generator">
      <h2>Random Password Generator</h2>
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeAlphabets}
            onChange={() => setIncludeAlphabets(!includeAlphabets)}
          />
          Include Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={generatePasswordHandler}>Generate Password</button>
      <button onClick={copyToClipboardHandler}>Copy to Clipboard</button>
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
      <div className="generated-password">
        {generatedPassword && <p>{generatedPassword}</p>}
      </div>
      <PasswordList passwordList={previousPasswords} />
    </div>
  );
};

export default PasswordGenerator;
