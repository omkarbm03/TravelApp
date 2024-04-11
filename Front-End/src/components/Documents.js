import React, { Component } from 'react';
import M from 'materialize-css';
import NavBar from "./Navbar";
import { getDocumentNamesForUser, downloadDocument, uploadDocument} from "../Api";



class DocumentManager extends Component {
    constructor(props) {
      super(props);
      this.state = {
        documents: [],
        selectedFile: null,
      };
    }
  
    async componentDidMount() {
      M.AutoInit(); // Initialize Materialize components if needed
      const [success, data] = await getDocumentNamesForUser();
      console.log(data)
      if (success) {
        this.setState({ documents: data });
      }
    }
  
    handleFileChange = (event) => {
      this.setState({ selectedFile: event.target.files[0] });
    };
  
    handleUpload = async () => {
      const { selectedFile } = this.state;
      if (selectedFile) {
        const [success, response] = await uploadDocument(selectedFile);
        if (success) {
          M.toast({ html: 'File uploaded successfully!' });
          const [success, data] = await getDocumentNamesForUser();
          if (success) {
            this.setState({ documents: data });
          }
        } else {
          M.toast({ html: 'Failed to upload the file' });
        }
      } else {
        M.toast({ html: 'Please select a file to upload.' });
      }
    };
  
    render() {
      const { documents } = this.state;
  
      return (
        <div>
            <NavBar />
        
        
        <div className="container">
             
        <div className="row">
            <div className="col s12">
              <h4>Upload Document</h4>
              <input type="file" onChange={this.handleFileChange} />
              <button
                onClick={this.handleUpload}
                className="btn green"
              >
                <i className="material-icons left">upload</i>
                Upload
              </button>
            </div>
          </div>

          {/* Display a message if there are no documents */}
          {documents.length === 0 ? (
            <div className="row">
              <div className="col s12">
                <div className="card-panel hoverable">
                  <h5>There are no documents.</h5>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <h4>Documents</h4>
              {documents.map((doc, index) => (
                <div key={index} className="col s12 m6 l4">
                  <div className="card-panel hoverable">
                    <h5>{doc.OrignalFileName}</h5>
                    <button
                      onClick={() => downloadDocument(doc.SystemFileName)}
                      className="btn blue"
                    >
                      <i className="material-icons left">download</i>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        </div>
      );
    }
  }
  
  export default DocumentManager;