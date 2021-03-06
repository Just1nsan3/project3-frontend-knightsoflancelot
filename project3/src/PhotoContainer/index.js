import React, { Component } from 'react';
import Photos from '../Photos';
import CreatePhoto from '../CreatePhoto';
import EditPhoto from '../EditPhoto';


class PhotoContainer extends Component {
  constructor(){
    super();

    this.state = {
      photos: [],
      showEdit: false,
      editPhotoId: null,
      photoToEdit: {
        title: '',
        description: ''
      }
    }
  }
  componentDidMount(){

    this.getPhotos().then((photos) => {
      this.setState({
        photos: photos.data
      })
    }).catch((err) => {
      console.log(err)
    });

  }
  getPhotos = async () => {

    const photos = await fetch('https://young-citadel-12186.herokuapp.com/');
    const parsedPhotos = photos.json();

    return parsedPhotos
  }
  addPhoto = async (photo, e) => {

    e.preventDefault();

    try {
      const createPhoto = await fetch('https://young-citadel-12186.herokuapp.com/', {
        method: 'POST',
        credintials: 'include',
        body: JSON.stringify(photo),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createPhoto.json();

      this.setState({photos: [...this.state.photos, parsedResponse.data]})
    } catch(err){
      console.log(err);
    }


  }
  deletePhoto = async (id, e) => {
    e.preventDefault();

    try {

      const deletePhoto = await fetch('https://young-citadel-12186.herokuapp.com/' + id, {
        method: 'DELETE'
      });

      const parsedResponse = await deletePhoto.json();

      if(parsedResponse.status === 200){
        this.setState({photos: this.state.photos.filter((photo, i) => photo._id !== id)});
      } else {
      }
    }catch(err){
      console.log(err);
    }
  }
  showModal = (id) => {
    const photoToEdit = this.state.photos.find((photo) => photo._id === id);


    this.setState({
      showEdit: true,
      editPhotoId: id,
      photoToEdit: photoToEdit
    });

  }
  closeAndEdit = async (e) => {
     e.preventDefault();

     try {

      const editPhoto = await fetch('https://young-citadel-12186.herokuapp.com/' + this.state.editPhotoId, {
        method: 'PUT',
        body: JSON.stringify(this.state.photoToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      });


      const parsedResponse = await editPhoto.json();
      const editedPhotoArray = this.state.photos.map((photo) => {

        if(photo._id === this.state.editPhotoId){

          photo.title = parsedResponse.data.title;
          photo.description = parsedResponse.data.description

        }

        return photo
      });

      this.setState({
        photos: editedPhotoArray,
        showEdit: false
      });



     } catch(err) {
      console.log(err)
     }
  }
  handleFormChange = (e) => {

    this.setState({
      photoToEdit: {
        ...this.state.photoToEdit,
        [e.target.name]: e.target.value
      }
    });
  }
  render(){
    return (
      <div>
        <Photos photos={this.state.photos} deletePhoto={this.deletePhoto} showModal={this.showModal}/>
        <CreatePhoto addPhoto={this.addPhoto} />

        {this.state.showEdit ? <EditPhoto closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} photoToEdit={this.state.photoToEdit}/> : null}
      </div>
    )
  }
}


export default PhotoContainer;