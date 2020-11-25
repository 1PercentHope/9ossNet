import React,{ Component, useState } from "react";
import { View, Text,Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import Axios from "axios";

export default class  Uploadimage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : {}
        }
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleSubmitFile = this.handleSubmitFile.bind(this);
    }
    // const [fileInputState, setFileInputState] = useState('');
    // const [previewSource, setPreviewSource] = useState({});
    // const [selectedFile, setSelectedFile] = useState({});

     handleFileInputChange(e){
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'angular_cloudinary');
        data.append('cloud_name', 'codexmaker');
        this.setState({image: data});
        console.log(data);
        console.log(file)
    };
    // const previewFile = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result);
    //     };
    // };
    handleSubmitFile(e){
    e.preventDefault();
    //     if (!selectedFile) return;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(selectedFile);
    //     reader.onloadend = () => {
    //         uploadImage(reader.result);
    //     };
    //     reader.onerror = () => {
    //         console.error('AHHHHHHHH!!');
            
    //     };
    // };
    // const uploadImage = async (base64EncodedImage) => {
    //     try {
             Axios.post('https://api.cloudinary.com/v1_1/codexmaker/image/upload',this.state.image)
            .then((res)=>{
                console.log(res)
            })

            // setFileInputState('');
            // setPreviewSource('');
           
        // } catch (err) {
        //     console.error(err);
        // }
        }
    render(){
  return (
    <View>
      <Card>
      <form onSubmit={this.handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={this.handleFileInputChange}
                    // value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
      </Card>
      
      {/* {previewSource && (
               <Card> <Image
                    // src={previewSource}
                    alt="chosen"
                />
                </Card>
            )} */}
    </View>
  );
}
}
