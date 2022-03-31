import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    UserService,
    VideoService
  ]
})
export class HomeComponent implements OnInit {

  public page_title:string;
  public identity:any;
  public token:any;
  public status: string;
  public videos:any;
  //Paginación
  public page;
  public next_page;
  public prev_page;
  public number_pages:any;

  constructor(
    private _userService:UserService,
    private _videoService:VideoService,
    private _route: ActivatedRoute,
    private _router:Router
  ) {
    this.page_title = "Mis videos";
    this.status = "";
    this.videos = {};
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page = 1;
    this.prev_page = 1;
    this.next_page = 2;
    this.number_pages = [];
  }

  ngOnInit(): void {
    this.actualPageVideos();
  }

  actualPageVideos(){
    this._route.params.subscribe(
      params=>{
        let page = params["page"];
        if(!page){
          page = 1
          this.prev_page = 1;
          this.next_page = 2;
        }
        this.getVideos(page);
      }
    );
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page:any){
    this._videoService.getVideos(this.token, page).subscribe(
      response=>{
        if(response.status==="success"){
          this.videos = response.videos;
          let number_pages = [];
          for (let index = 1; index < response.total_pages+1; index++) {
            number_pages.push(index);
          }
          this.number_pages = number_pages;
          if(page >=2) this.prev_page=page-1;
          else this.prev_page=1;
          if(page < response.total_pages) this.next_page = parseInt(page)+1;
          else this.next_page = response.total_pages;
        }
        else this.status = "error";
      },
      error=>{
        console.log(error);
        this.status = "error";
      }
    );
  }

  getThumb(url:string, size:any=null) {
    var video, results, thumburl;

     if (url === null) {
         return '';
     }

     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];

     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }

      return thumburl;
  }

  deleteVideo(id:any){
    this._videoService.delete(this.token,id).subscribe(
      response=>{
        this.status = "success";
        this.getVideos(this.page);
        this.actualPageVideos();
      },
      error=>{
        console.log(error);
        this.status = "error";
      }
    );
  }

}
