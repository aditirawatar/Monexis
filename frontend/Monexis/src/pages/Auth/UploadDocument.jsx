import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch documents");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      await axios.post("http://localhost:5000/api/documents/upload", formData);
      alert("Document uploaded successfully");
      setFile(null);
      fetchDocuments();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Upload
      </button>

      <div className="mt-4 space-y-2">
        {documents.map((doc) => (
          <div key={doc._id}>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {doc.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
