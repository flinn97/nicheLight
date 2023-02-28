import React from 'react';

class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPicture: null,
    };

    this.handlePictureUpload = this.handlePictureUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePictureUpload(event) {
    this.setState({
      selectedPicture: URL.createObjectURL(event.target.files[0]),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Code to handle picture upload
  }

  render() {
    const { selectedPicture } = this.state;
    const { formStyle, labelStyle, containerStyle, imageContainerStyle, imageStyle, buttonStyle } = this.props;

    return (
      <form onSubmit={this.handleSubmit} style={formStyle}>
        <div style={containerStyle}>
          <label htmlFor="picture-upload" style={labelStyle}>
            Upload a Picture
          </label>
          <div style={imageContainerStyle}>
            {selectedPicture && <img src={selectedPicture} alt="Selected" style={imageStyle} />}
          </div>
        </div>
        <input id="picture-upload" type="file" accept="image/*" onChange={this.handlePictureUpload} style={{ display: 'none' }} />
        <button type="submit" style={buttonStyle}>
          Upload
        </button>
      </form>
    );
  }
}

export default PictureUploader;