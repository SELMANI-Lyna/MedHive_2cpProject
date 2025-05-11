import { useState } from "react"

function LicenceUpload({ onLicenceChange }) {
    const [file,setFile]= useState(null);
    const [error, setError]=useState("");

    const validationFile =(e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ["application/pdf", "image/jpg", "image/png"];
        const maxSize = 5*1024*1024;

        if (selectedFile) {
            if(!allowedTypes.includes(selectedFile.type))
              {
                setError("only PDF, JPG and PNG files are allowed.");
                setFile(null);
              } else if (selectedFile.size/ 1024 > maxSize) {
                setError("File size must be less than 5MB");
                setFile(null);
              } else {
                setError("");
                setFile(selectedFile);
                onLicenceChange(selectedFile); // On notifie le parent du changement du fichier
              }
        }
    };
  return (
    <div>
      <h2>License
      {<span className="text-red-500">*</span>}
      </h2>
      <input 
      type="file"
      onChange={validationFile}
      className="w-full p-2 mb-4 border-b border-gray-400 focus:outline-none focus:border-green-400 focus:border-b-2"
      required={true}
      accept=".pdf, .jpg, .png"/>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {file && <p className="text-green-600 text-sm">File selected: {file.name}</p>}
    </div>
  )
}

export default LicenceUpload
