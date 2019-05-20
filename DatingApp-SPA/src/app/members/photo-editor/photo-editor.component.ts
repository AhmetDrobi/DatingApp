import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10MB file size
    });

    // tslint:disable-next-line: max-line-length
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; // To solve the problem that arises with-orgin and the bunch. Check the bookmark for comment #45

    // tslint:disable-next-line: max-line-length
    this.uploader.onSuccessItem = (item, response, status, header) => { // This is used to show the added photo to the array of the photo to the user without the need for a reload. The function onSuccess Activates on Success as the name suggests :)
      if (response) {
        const res: Photo = JSON.parse(response); // Parse the JSON response into an object (photo in this case)
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);

        // Case for first when uploading a photo for the first time for new users
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url; // Update the current user photo
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser)); // Update the localStorage
        }
      }
    };
  }
  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // tslint:disable-next-line: max-line-length
      // Filter out all other photos expect for the one with main=true. This will return the old main since the front end wasn't reloaded to update
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];

      this.currentMain.isMain = false; // Set the old main photo to false

      photo.isMain = true; // Set the new main photo to true w/o the need for a refreash
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url; // Update the current user photo
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser)); // Update the localStorage
    }, error => {
      this.alertify.error(error);
    });
  }
  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.slice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('The photo was deleted successfully!');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
