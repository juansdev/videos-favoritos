import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-detail',
  templateUrl: '../video-detail/video-detail.component.html',
  styleUrls: ['../video-detail/video-detail.component.css'],
  providers: [
    UserService,
    VideoService
  ]
})
export class VideoDetailComponent implements OnInit {


  public page_title:string;
  public identity;
  public token;
  public video: Video;
  public status: string;

  constructor(
    public _userService: UserService,
    public _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {
    this.page_title = "Modificar este video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1,this.identity.sub,"","","","",null,null);
    this.status = "";
  }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe(
      params=>{
        let id = +params["id"];
        if(id){
          this._videoService.getVideo(this.token,id).subscribe(
            response=>{
              if(response.status==="success"){
                this.video = response.video;
              }
            },
            error=>{
              this._router.navigate(["/inicio"]);
              console.log(error);
            }
          );
        }
        else this.status = "error";
      }
    );
  }

  getVideoIframe(url:any) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

}
