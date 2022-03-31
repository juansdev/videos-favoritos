import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [
    UserService,
    VideoService
  ]
})
export class VideoNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public video: Video;
  public status: string;

  constructor(
    public _userService: UserService,
    public _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = "Guardar un nuevo video favorito";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1,this.identity.sub,"","","","",null,null);
    this.status = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._videoService.create(this.token,this.video).subscribe(
      response=>{
        if(response.status==="success"){
          this.status = "success";
          this._router.navigate(["/inicio"]);
        }
        else this.status = "error";
      },
      error=>{
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

}
